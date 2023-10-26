import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from "../utils/trpc";
import { observable } from "@trpc/server/observable";
import { prisma } from "../utils/prisma";
import { z } from "zod";
import { EventEmitter } from "events";
import TypedEmitter from "typed-emitter";
import { TRPCError } from "@trpc/server";
import { QuizStatus, QuizParticipant } from "@prisma/client";
import { supabase } from "../utils/supabase";

// create a global event emitter (could be replaced by redis, etc)
export const ee = new EventEmitter() as TypedEmitter<MessageEvents>;

type CurrentQuestionResponse = {
  quizId: number;
  question: {
    id: number;
    title: string;
    answers: Array<{
      id: number;
      text: string;
    }>;
  } | null;
  questionStartTime: Date | null;
  questionDuration: number;
};

type CurrentQuestionResultsResponse = {
  quizId: number;
  question: {
    id: number;
    title: string;
    answers: Array<{
      id: number;
      text: string;
      isCorrect: boolean;
      percentage: number;
    }>;
  };
  questionReviewTime: number;
};

type MessageEvents = {
  join: (data: QuizParticipant) => void; // when a user joins a room - happens only once
  startQuiz: (data: { quizId: number }) => void;
  currentQuestion: (data: CurrentQuestionResponse) => void;
  currentQuestionResults: (data: CurrentQuestionResultsResponse) => void;
};

export const quizSessionRouter = createTRPCRouter({
  randomNumber: publicProcedure.subscription(() => {
    return observable<{ randomNumber: number }>((emit) => {
      const timer = setInterval(() => {
        // emits a number every second
        emit.next({ randomNumber: Math.random() });
      }, 200);

      return () => {
        clearInterval(timer);
      };
    });
  }),
  join: protectedProcedure
    .input(z.object({ quizId: z.number(), pinCode: z.string() }))
    .mutation(async (opts) => {
      const { user } = opts.ctx.user.data;
      const userId = user!.id;
      const quizId = opts.input.quizId;
      const pinCode = opts.input.pinCode;

      // verify pinCode
      const quiz = await prisma.quiz.findUnique({
        where: {
          id: quizId
        }
      });

      if (quiz?.pinCode !== pinCode) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid pin code"
        });
      }

      const joinQuiz = await prisma.quizParticipant.upsert({
        where: {
          quizId_userId: {
            userId,
            quizId
          }
        },
        update: {}, // ? what to update ?
        create: {
          userId,
          quizId,
          connectionStatus: "DISCONNECTED"
        }
      });

      // emit event
      ee.emit("join", joinQuiz);

      return { status: "success", message: "Joined quiz successfully!" };
    }),
  changeStatus: protectedProcedure
    .input(z.object({ quizId: z.number(), status: z.nativeEnum(QuizStatus) })) // todo: change status validation to match prisma status enum
    .mutation(async (opts) => {
      const quizId = opts.input.quizId;
      const status = opts.input.status;
      const quiz = await prisma.quiz.update({
        where: {
          id: quizId
          // status: "NOT_STARTED"
        },
        data: {
          status: status
        }
      });

      if (!quiz) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid quiz id"
        });
      }

      if (status === "ONGOING") {
        // start quiz - set active qn to 1 and enable timer
        // set quizQuestion to 1 with countdown timer
        console.log("starting quiz via event emitter");
        ee.emit("startQuiz", { quizId });

        // make teacher also join the room
        const { user } = opts.ctx.user.data;
        const userId = user!.id;
        await prisma.quizParticipant.upsert({
          where: {
            quizId_userId: {
              userId,
              quizId
            }
          },
          update: {}, // ? what to update ?
          create: {
            userId,
            quizId,
            connectionStatus: "DISCONNECTED"
          }
        });
      }
    }),
  currentQuestion: publicProcedure // todo: make this protected via ws auth
    .input(z.object({ quizId: z.number(), accessToken: z.string() }))
    .subscription(async ({ input }) => {
      const user = await supabase.auth.getUser(input.accessToken);

      return observable<CurrentQuestionResponse>((socketEmit) => {
        // event listeners
        const onCurrentQuestion = (data: CurrentQuestionResponse) => {
          console.log("currentQuestion", data);
          socketEmit.next(data);
        };

        // nested thenable
        supabase.auth
          .getUser(input.accessToken)
          .then((user) => {
            // emit.complete(); // ???

            prisma.quizParticipant
              .update({
                where: {
                  quizId_userId: {
                    userId: user.data.user!.id,
                    quizId: input.quizId
                  }
                },
                data: {
                  connectionStatus: "CONNECTED"
                }
              })
              .then((joinQuiz) => {
                ee.emit("join", joinQuiz);

                // emit current question immediately if exists
                prisma.quiz
                  .findUnique({
                    where: {
                      id: input.quizId
                    },
                    select: {
                      currentQuestion: {
                        select: {
                          id: true,
                          title: true,
                          answers: {
                            select: {
                              id: true,
                              text: true
                            }
                          }
                        }
                      },
                      currentQuestionStartTime: true,
                      timePerQuestion: true
                    }
                  })
                  .then((res) => {
                    if (res) {
                      socketEmit.next({
                        quizId: input.quizId,
                        question: res.currentQuestion,
                        questionStartTime: res.currentQuestionStartTime,
                        questionDuration: res.timePerQuestion
                      });
                    }
                  });

                // event on listeners
                ee.on("currentQuestion", onCurrentQuestion);
              })
              .catch((error: Error) => {
                console.error(error);
                // todo: kick the user
              });
          })
          .catch((error: Error) => {
            // todo
            console.error(error);
            // socketEmit.next({ message: "authy error", error: error.toString() });
          });

        // unsubscribe function when client disconnects or stops subscribing
        return () => {
          console.log("client disconnected");
          // turn off all event listeners
          ee.off("currentQuestion", onCurrentQuestion);

          // update quizparticipants table
          supabase.auth
            .getUser(input.accessToken)
            .then((user) => {
              prisma.quizParticipant
                .update({
                  where: {
                    quizId_userId: {
                      userId: user.data.user!.id,
                      quizId: input.quizId
                    }
                  },
                  data: {
                    connectionStatus: "DISCONNECTED"
                  }
                })
                .then((joinQuiz) => {
                  ee.emit("join", joinQuiz);
                })
                .catch((error: Error) => {
                  console.error(error);
                });
            })
            .catch((error: Error) => {
              console.log("error", error);
              // todo
            });
        };
      });
    }),
  currentQuestionResults: publicProcedure // todo: make this protected via ws auth
    .input(z.object({ quizId: z.number(), accessToken: z.string() }))
    .subscription(async ({ input }) => {
      const user = await supabase.auth.getUser(input.accessToken);
      return observable<CurrentQuestionResultsResponse>((socketEmit) => {
        const onCurrentQuestionResults = (
          data: CurrentQuestionResultsResponse
        ) => {
          console.log("currentQuestionResults", data);
          socketEmit.next(data);
        };

        ee.on("currentQuestionResults", onCurrentQuestionResults);

        return () => {
          ee.off("currentQuestionResults", onCurrentQuestionResults);
        };
      });
    }),
  getParticipants: protectedProcedure
    .input(z.object({ quizId: z.number() }))
    .query(async (opts) => {
      const quizId = opts.input.quizId;
      const participants = await prisma.quizParticipant.findMany({
        where: {
          quizId: quizId
        }
      });

      const participantsWithData = await Promise.all(
        participants.map(async (participant) => {
          const { data, error } = await supabase.auth.admin.getUserById(
            participant.userId
          );

          if (error) {
            throw error;
          }

          return {
            ...participant,
            name: data?.user?.user_metadata.full_name ?? "oops no name"
          };
        })
      );

      return participantsWithData;
    }),
  participantsSubscription: publicProcedure
    .input(z.object({ quizId: z.number() }))
    .subscription((opts) => {
      return observable<
        Array<
          QuizParticipant & {
            name: string;
          }
        >
      >((emit) => {
        const onQuizParticipantJoin = async () => {
          // get all participants for this quiz
          const participants = await prisma.quizParticipant.findMany({
            where: {
              quizId: opts.input.quizId
            }
          });

          const participantsWithData = await Promise.all(
            participants.map(async (participant) => {
              const { data, error } = await supabase.auth.admin.getUserById(
                participant.userId
              );

              if (error) {
                throw error;
              }

              return {
                ...participant,
                name: data?.user?.user_metadata.full_name ?? "no name"
              };
            })
          );

          emit.next(participantsWithData);
        };

        onQuizParticipantJoin().then((_r) => {}); // emit once on connection to subscription

        ee.on("join", onQuizParticipantJoin);

        // unsubscribe function when client disconnects or stops subscribing
        return () => {
          ee.off("join", onQuizParticipantJoin);
        };
      });
    })
});

//

interface StartQuizArgs {
  quizId: number;
}

ee.on("startQuiz", async ({ quizId }: StartQuizArgs) => {
  const quizQuestionsQuery = await prisma.quiz.findUnique({
    where: {
      id: quizId
    },
    select: {
      QuestionBank: {
        select: {
          questions: {
            select: {
              id: true,
              title: true,
              answers: {
                select: {
                  id: true,
                  text: true,
                  isCorrect: true
                }
              }
            }
          }
        }
      }
    }
  });

  const quizQuestions = quizQuestionsQuery?.QuestionBank.questions;

  if (!quizQuestions || quizQuestions.length === 0) {
    throw new Error("No questions found in quiz");
  }

  const quizState = await prisma.quiz.update({
    where: {
      id: quizId
    },
    data: {
      currentQuestionStartTime: new Date(), // set now
      currentQuestion: {
        connect: {
          id: quizQuestions[0].id // todo: get first question id
        }
      }
    }
  });
  ee.emit("currentQuestion", {
    quizId,
    question: quizQuestions[0],
    questionStartTime: quizState.currentQuestionStartTime,
    questionDuration: quizState.timePerQuestion
  });

  setTimeout(async () => {
    // todo: get results from db
    ee.emit("currentQuestionResults", {
      quizId,
      question: {
        ...quizQuestions[0],
        answers: quizQuestions[0].answers.map((answer) => {
          return {
            ...answer,
            percentage: 25 // todo
          };
        })
      },
      questionReviewTime: 10
    });
  }, 10 * 1000); // 10 seconds // todo

  setTimeout(async () => {
    ee.emit("currentQuestion", {
      quizId,
      question: quizQuestions[1],
      questionStartTime: quizState.currentQuestionStartTime,
      questionDuration: quizState.timePerQuestion
    });
  }, quizState.timePerQuestion * 1000);

  setTimeout(async () => {
    // todo: get results from db
    ee.emit("currentQuestionResults", {
      quizId,
      question: {
        ...quizQuestions[1],
        answers: quizQuestions[1].answers.map((answer) => {
          return {
            ...answer,
            percentage: 25 // todo
          };
        })
      },
      questionReviewTime: 10
    });
  }, 10 * 1000); // 10 seconds // todo
});
