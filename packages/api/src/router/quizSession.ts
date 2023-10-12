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
    .subscription(() => {
      return observable<SocketData>((emit) => {
        const onQuizParticipantJoin = (newParticipant: SocketData) => {
          emit.next(newParticipant);
        };

        ee.on("listen", onQuizParticipantJoin);

        // unsubscribe function when client disconnects or stops subscribing
        return () => {
          ee.off("listen", onQuizParticipantJoin);
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

        ee.on("join", onQuizParticipantJoin);

        // unsubscribe function when client disconnects or stops subscribing
        return () => {
          ee.off("join", onQuizParticipantJoin);
        };
      });
    })
});
