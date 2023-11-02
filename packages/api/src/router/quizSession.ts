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
import { QuizStatus, QuizParticipant, QuizDisplayMode } from "@prisma/client";
import { differenceInMilliseconds } from "date-fns";
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
  questionDuration: number;
};

type CurrentQuestionResultsResponse = {
  quizId: number;
  question: {
    id: number;
    title: string;
    results: Array<{
      // tallied results
      id: number; // answer id
      text: string; // answer text
      isCorrect: boolean;
      percentage: string;
      tally: number;
    }>;
  };
  questionReviewTime: number;
};

type MessageEvents = {
  join: (data: QuizParticipant) => void; // when a user joins a room - happens only once
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

        // todo: set first question as active

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
  changeQuestion: protectedProcedure
    .input(
      z.object({
        quizId: z.number(),
        questionId: z.number(),
        questionDisplayMode: z.nativeEnum(QuizDisplayMode)
      })
    )
    .mutation(async (opts) => {
      const quizId = opts.input.quizId;
      const questionId = opts.input.questionId;
      const questionDisplayMode = opts.input.questionDisplayMode;

      const quiz = await prisma.quiz.update({
        where: {
          id: quizId
        },
        data: {
          currentQuestion: {
            connect: {
              id: questionId
            }
          },
          currentQuestionDisplayMode: questionDisplayMode,
          startEventTime: new Date(),
          endEventTime: new Date(Date.now() + 30 * 1000) // 30 seconds from now // todo: make this dynamic
        }
      });

      if (questionDisplayMode === "QUESTION") {
        const question = await prisma.question.findUnique({
          where: {
            id: questionId
          },
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
        });

        ee.emit("currentQuestion", {
          quizId,
          question,
          questionDuration: quiz.timePerQuestion
        });
      }

      if (questionDisplayMode === "REVIEW") {
        const results = await prisma.quizResponse.findMany({
          where: {
            quizId: quizId,
            questionId: questionId
          },
          select: {
            answer: {
              select: {
                id: true,
                text: true,
                isCorrect: true
              }
            },
            questionId: true,
            userId: true
          }
        });

        const question = await prisma.question.findUnique({
          where: {
            id: questionId
          },
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
        });

        if (question) {
          interface HashMap {
            [key: string]: {
              id: number;
              text: string;
              isCorrect: boolean;
              tally: number;
            };
          }

          const initialTallyValueNestedArray = question.answers.map(
            (answer) => [
              answer.id,
              {
                id: answer.id,
                text: answer.text,
                isCorrect: answer.isCorrect,
                tally: 0
              }
            ]
          );

          const initialTallyValue = Object.fromEntries(
            initialTallyValueNestedArray
          );

          const resultsTally: HashMap = results.reduce((acc, result) => {
            if (acc[result.answer.id.toString()]?.tally) {
              // add to tally
              acc[result.answer.id.toString()].tally += 1;
            } else {
              // create new entry
              acc[result.answer.id.toString()].tally = 1;
            }
            return acc;
          }, initialTallyValue as HashMap);

          const resultsTallyWithLabel = Object.values(resultsTally).map(
            (resultTallyItem) => {
              return {
                ...resultTallyItem,
                percentage: `${(resultTallyItem.tally / results.length) * 100}%`
              };
            }
          );

          ee.emit("currentQuestionResults", {
            quizId,
            question: {
              ...question,
              results: resultsTallyWithLabel
            },
            questionReviewTime: quiz.timePerQuestion // todo
          });
        }
      }

      return { status: "success", message: "Question changed successfully!" };
    }),
  timeLeft: publicProcedure
    .input(z.object({ quizId: z.number() }))
    .subscription((opts) => {
      return observable<{
        timeLeft: number;
        startEventTime: Date;
        endEventTime: Date;
        currentQuestionDisplayMode: QuizDisplayMode;
        currentQuestionId: number;
      }>((socketEmit) => {
        const timer = setInterval(() => {
          // get quiz from db
          prisma.quiz
            .findUnique({
              where: {
                id: opts.input.quizId
              },
              select: {
                startEventTime: true,
                endEventTime: true,
                currentQuestionDisplayMode: true,
                currentQuestion: {
                  select: {
                    id: true
                  }
                }
              }
            })
            .then((quiz) => {
              // console.log("then quiz", quiz);

              if (!quiz) {
                throw new TRPCError({
                  code: "BAD_REQUEST",
                  message: "Invalid quiz id"
                });
              }

              const timeLeft = differenceInMilliseconds(
                quiz.endEventTime,
                new Date()
              );

              // emits a number every second
              socketEmit.next({
                timeLeft,
                startEventTime: quiz.startEventTime,
                endEventTime: quiz.endEventTime,
                currentQuestionDisplayMode: quiz.currentQuestionDisplayMode,
                currentQuestionId: quiz.currentQuestion?.id ?? 0
              });
            });
        }, 1000);

        return () => {
          clearInterval(timer);
        };
      });
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

                // event on listeners
                ee.on("currentQuestion", onCurrentQuestion);
              })
              .catch((_error: Error) => {});
          })
          .catch((error: Error) => {
            // todo
            console.error(error);
            // socketEmit.next({ message: "authy error", error: error.toString() });
          })
          .finally(() => {
            // todo: kick the user and move the below up to the thenable

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
                  currentQuestionDisplayMode: true,
                  timePerQuestion: true
                }
              })
              .then((res) => {
                if (res) {
                  socketEmit.next({
                    quizId: input.quizId,
                    question: res.currentQuestion,
                    questionDuration: res.timePerQuestion
                  });
                }
              });
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
          resultsData: CurrentQuestionResultsResponse
        ) => {
          console.log("currentQuestionResults", resultsData);
          socketEmit.next(resultsData);
        };

        // create handler
        ee.on("currentQuestionResults", onCurrentQuestionResults);

        // todo: emit results immediately once (when user connects to subscription)

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
    }),
  submitResponse: protectedProcedure
    .input(
      z.object({
        quizId: z.number(),
        questionId: z.number(),
        answerId: z.number()
      })
    )
    .mutation(async (opts) => {
      const { user } = opts.ctx.user.data;
      const userId = user!.id;
      const quizId = opts.input.quizId;
      const questionId = opts.input.questionId;
      const answerId = opts.input.answerId;

      // todo: check if user is a participant of this quiz

      const quizParticipant = await prisma.quizParticipant.findUnique({
        where: {
          quizId_userId: {
            userId,
            quizId
          }
        }
      });

      if (!quizParticipant) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You are not a participant of this quiz"
        });
      }

      // todo: check if question is still current in db
      // if not return trpc error // todo: handle this error in frontend
      const quiz = await prisma.quiz.findUnique({
        where: {
          id: quizId
        },
        select: {
          currentQuestion: {
            select: {
              id: true
            }
          }
        }
      });

      if (!quiz) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid quiz id"
        });
      }

      if (quiz.currentQuestion?.id !== questionId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Question is not current"
        });
      }

      // todo: submit answer to db

      await prisma.quizResponse.create({
        data: {
          quizId,
          answerId,
          questionId,
          userId
        }
      });

      // return success
      return { status: "success", message: "Answer submitted successfully!" };

      //
    })
});
