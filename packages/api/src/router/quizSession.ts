import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from "../utils/trpc";
import { observable } from "@trpc/server/observable";
import { prisma } from "../utils/prisma";
import { z } from "zod";
import { EventEmitter } from "events";
import { TRPCError } from "@trpc/server";
import { Prisma, QuizStatus, QuizParticipant, User } from "@prisma/client";
import { supabase } from "../utils/supabase";

// create a global event emitter (could be replaced by redis, etc)
export const ee = new EventEmitter();

type SocketData = any;

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
    }),
  listen: publicProcedure // todo: make this protected via ws auth
    .input(z.object({ quizId: z.number(), accessToken: z.string() }))
    .subscription(({ ctx, input }) => {
      return observable<SocketData>((emit) => {
        // event listeners
        const onQuizParticipantJoin = (newParticipant: SocketData) => {
          emit.next(newParticipant);
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
              })
              .catch((error: Error) => {
                console.error(error);
                // todo: kick the user
              });

            console.log({
              message: "oooh hellooooo",
              socketId: ctx.socketId,
              user: ctx.user,
              input
            });

            ee.on("listen", onQuizParticipantJoin);
          })
          .catch((error: Error) => {
            // todo
            emit.next({ message: "authy error", error: error.toString() });
          });

        // unsubscribe function when client disconnects or stops subscribing
        return () => {
          console.log("client disconnected");
          // turn off all event listeners
          ee.off("listen", onQuizParticipantJoin);

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
                });
            })
            .catch((error: Error) => {
              console.log(error);
              // todo
            });
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
      return observable<QuizParticipant[]>((emit) => {
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

              return {
                ...participant,
                name: data?.user?.user_metadata.full_name ?? "oops no name"
              };
            })
          );

          emit.next(participantsWithData);
        };

        onQuizParticipantJoin().then(_r => {}); // emit once on connection to subscription

        ee.on("join", onQuizParticipantJoin);

        // unsubscribe function when client disconnects or stops subscribing
        return () => {
          ee.off("join", onQuizParticipantJoin);
        };
      });
    })
});
