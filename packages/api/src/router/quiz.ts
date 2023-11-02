import { prisma } from "../utils/prisma";
import { createTRPCRouter, protectedProcedure } from "../utils/trpc";
import { z } from "zod";
import { User, Quiz } from "@prisma/client";

type QuizReportHashmap = {
  [key: string]: {
    user: User;
    responses: {
      questionId: number;
      answer: string;
      isCorrect: boolean;
    }[];
  };
};

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

      return allQuizzes;
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
        }
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
        numOfQuestions: z.number(),
        timePerQuestion: z.number()
      })
    )
    .mutation(async (opts) => {
      console.log("trying to create a quiz");

      const newQuiz = await prisma.quiz.create({
        data: {
          title: opts.input.title,
          numOfQuestions: opts.input.numOfQuestions,
          timePerQuestion: opts.input.timePerQuestion,
          pinCode: Math.floor(Math.random() * 1000000)
            .toString()
            .padStart(6, "0")
            .toString(),
          QuestionBank: {
            connect: {
              id: opts.input.questionBankId
            }
          },
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

      return {
        success: true,
        status: "quiz created successfully",
        quiz: newQuiz
      };
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
      const deleteQuiz = await prisma.quiz.delete({
        where: {
          id: opts.input.id
        }
      });
      return { success: true, status: "quiz deleted successfully", deleteQuiz };
    }),
  update: protectedProcedure
    .meta({
      description: "Update a quiz!"
    })
    .input(
      z.object({
        id: z.number(),
        title: z.string().min(4).max(32).optional(),
        questionBankId: z.number()
      })
    )
    .mutation(async (opts) => {
      const newQuiz = await prisma.quiz.update({
        where: {
          id: opts.input.id
        },
        data: {
          ...(opts.input.title ? { title: opts.input.title } : {})
        }
      });
      return {
        success: true,
        status: "quiz updated successfully",
        quiz: newQuiz
      };
    }),
  getReportsSummary: protectedProcedure.query(async () => {
    // get all quiz responses tabulated by quizId

    const quizResponses = await prisma.quizResponse.findMany({
      include: {
        answer: {
          select: {
            isCorrect: true
          }
        },
        Quiz: {
          include: {
            QuestionBank: {
              include: {
                questions: true
              }
            }
          }
        }
      }
    });

    // grou (reduce) into key value pairs by quizId

    type quizReportsSummaryHashmap = {
      [key: string]: {
        quiz: Quiz;
        participants: {
          [key: string]: {
            userId: string;
            responses: {
              questionId: number;
              isCorrect: boolean;
            }[];
          };
        };
        averageScore: number;
      };
    };

    const quizReports = quizResponses.reduce((acc, curr) => {
      if (!acc[curr.quizId]) {
        acc[curr.quizId] = {
          quiz: curr.Quiz,
          participants: {
            [curr.userId.toString()]: {
              userId: curr.userId,
              responses: [
                {
                  questionId: curr.questionId,
                  isCorrect: curr.answer.isCorrect
                }
              ]
            }
          },
          averageScore: 0 // todo in next reducer
        };
      } else {
        if (!acc[curr.quizId].participants[curr.userId.toString()]) {
          acc[curr.quizId].participants[curr.userId.toString()] = {
            userId: curr.userId,
            responses: [
              {
                questionId: curr.questionId,
                isCorrect: curr.answer.isCorrect
              }
            ]
          };
        } else {
          acc[curr.quizId].participants[curr.userId.toString()].responses.push({
            questionId: curr.questionId,
            isCorrect: curr.answer.isCorrect
          });
        }
      }
      return acc;
    }, {} as quizReportsSummaryHashmap);

    console.log("quizReports", quizReports);

    return quizReports as Exclude<typeof quizReports, "number">;
  }),
  getReport: protectedProcedure
    .meta({ description: "Get results of a quiz" })
    .input(z.object({ quizId: z.number() }))
    .query(async (opts) => {
      const quiz = await prisma.quiz.findUnique({
        where: {
          id: opts.input.quizId
        }
      });

      const quizResponses = await prisma.quizResponse.findMany({
        where: {
          quizId: opts.input.quizId
        },
        include: {
          User: true,
          answer: {
            select: {
              id: true,
              questionId: true,
              isCorrect: true,
              text: true
            }
          }
        }
      });

      const quizReports = quizResponses.reduce((acc, curr) => {
        if (!acc[curr.userId]) {
          acc[curr.userId] = {
            user: curr.User,
            responses: [
              {
                questionId: curr.questionId,
                answer: curr.answer.text,
                isCorrect: curr.answer.isCorrect
              }
            ]
          };
        } else {
          acc[curr.userId].responses.push({
            questionId: curr.questionId,
            answer: curr.answer.text,
            isCorrect: curr.answer.isCorrect
          });
        }
        return acc;
      }, {} as QuizReportHashmap);

      return {
        quiz,
        quizReports
      };
    })
});
