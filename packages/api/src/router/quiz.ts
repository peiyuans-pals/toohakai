import { prisma } from "../utils/prisma";
import { createTRPCRouter, protectedProcedure } from "../utils/trpc";
import { z } from "zod";

const mockData = [
    { title: "Physics quiz 2 Jan", authorId: 12, questionBankId: 13 },
    { title: "Chemistry quiz 2 Jan", authorId: 14, questionBankId: 15 }
];

export const quizRouter = createTRPCRouter({
    list: protectedProcedure
        .meta({
            description: "List user's quizzes"
        })
        .query(async (opts) => {

            const { user } = opts.ctx.user.data;
            const userId = user!.id;

            const allQuizzes = await prisma.quiz.findMany({
                where: {
                    authorId: userId
                }
            });

            return allQuizzes; // todo
        }),
    count: protectedProcedure
        .meta({
            description: "Count number of quizzes of user"
        })
        .query(async (opts) => {
            const { user } = opts.ctx.user.data;
            const userId = user!.id;
            return await prisma.quiz.count({
                where: {
                    authorId: userId
                }
            });
        }),
    get: protectedProcedure
        .meta({
            description: "Get quiz by passing in quiz id as input"
        })
        .input(z.number())
        .query(async (opts) => {
            const id = opts.input;
            const findQuiz = await prisma.quiz.findUnique({
                where: {
                    id
                },
            });
            return findQuiz;
        }),
    create: protectedProcedure
        .meta({
            description: "Create quiz!"
        })
        .input(
            z.object({
                title: z.string().min(4).max(250),
                questionBankId: z.number(),
            })
        )
        .mutation(async (opts) => {
            console.log("trying to create a quiz");
            const newQuiz = await prisma.quiz.create({
                data: {
                    title: opts.input.title,
                    questionBankId: opts.input.questionBankId,
                    author: {
                        connect: {
                            id: opts.ctx.user.data.user!.id
                        }
                    }
                },
                include: {
                    author: true
                }
            });

            return { success: true, status: "quiz created successfully", newQuiz };
        }),
    delete: protectedProcedure
        .meta({
            description: "Delete a quiz!"
        })
        .input(
            z.object({
                id: z.number()
            })
        )
        .mutation(async (opts) => {
            console.log("trying to delete a quiz");
            // todo
            const deleteQuiz = await prisma.quiz.delete({
                where: {
                    id: opts.input.id,
                }
            });
            return { success: true, status: "quiz deleted successfully", deleteQuiz };
        })
});
