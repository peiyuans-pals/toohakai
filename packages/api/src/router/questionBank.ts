import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from "../utils/trpc";
import { z } from "zod";
import { prisma } from "../utils/prisma";
import { generateQuestion, generateQuestionTyped } from "../utils/gpt";

const mockData = [
  { id: "101", name: "Physics", questions: [] },
  { id: "102", name: "Chemistry", questions: [] }
];

export const questionBankRouter = createTRPCRouter({
  list: protectedProcedure
    .meta({
      description: "List user's questionBanks"
    })
    .query(async (opts) => {
      const { user } = opts.ctx.user.data;
      const userId = user!.id;

      const questionBanks = await prisma.questionBank.findMany({
        where: {
          authorId: userId
        },
        include: {
          _count: {
            select: { questions: true }
          }
        }
      });
      return questionBanks.map((questionBank) => {
        return {
          ...questionBank,
          questionsCount: questionBank._count?.questions
        };
      });
    }),
  count: protectedProcedure
    .meta({
      description: "Count user's questionBanks"
    })
    .query(async (opts) => {
      const { user } = opts.ctx.user.data;
      const userId = user!.id;
      return await prisma.questionBank.count({
        where: {
          authorId: userId
        }
      });
    }),
  get: protectedProcedure
    .meta({
      description: "Get a questionBank by passing questionBank id as input"
    })
    .input(z.number())
    .query(async (opts) => {
      const id = opts.input; // string

      const questionBank = await prisma.questionBank.findUnique({
        where: {
          id
        },
        include: {
          questions: {
            include: {
              answers: true
            }
          }
        }
      });

      return questionBank;
    }),
  create: protectedProcedure
    .meta({
      description: "Create a questionBank!"
    })
    .input(
      z.object({
        title: z.string().min(4).max(32)
      })
    )
    .mutation(async (opts) => {
      console.log("trying to create a questionBank");

      const questionBank = await prisma.questionBank.create({
        data: {
          title: opts.input.title,
          // authorId: opts.ctx.user.data.user!.id,
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
        status: "questionBank created successfully",
        questionBank
      };
    }),
  delete: protectedProcedure
    .meta({
      description: "Delete a questionBank!"
    })
    .input(z.number())
    .mutation(async (opts) => {
      console.log("trying to delete a questionBank");

      const result = await prisma.questionBank.delete({
        where: {
          id: opts.input
        }
      });

      return {
        success: true,
        status: "questionBank deleted successfully",
        id: result.id
      };
    }),
  update: protectedProcedure
    .meta({
      description: "Update a questionBank!"
    })
    .input(
      z.object({
        id: z.number(),
        title: z.string().min(4).max(32).optional()
      })
    )
    .mutation(async (opts) => {
      const newQuestionBank = await prisma.questionBank.update({
        where: {
          id: opts.input.id
        },
        data: {
          ...(opts.input.title ? { title: opts.input.title } : {})
        }
      });
      return {
        success: true,
        status: "questionBank updated successfully",
        questionBank: newQuestionBank
      };
    }),
  addQuestion: protectedProcedure
    .meta({
      description: "Add a question to a questionBank!"
    })
    .input(
      z.object({
        id: z.number(),
        title: z.string().min(4).max(100),
        answers: z.array(z.string().min(1).max(32)).length(4),
        correctAnswer: z.number().min(1).max(4)
      })
    )
    .mutation(async (opts) => {
      const questionBank = await prisma.questionBank.update({
        where: {
          id: opts.input.id
        },
        data: {
          questions: {
            create: {
              title: opts.input.title,
              answers: {
                create: opts.input.answers.map((answer, index) => {
                  return {
                    text: answer,
                    isCorrect: index + 1 === opts.input.correctAnswer
                  };
                })
              }
            }
          }
        }
      });
      return {
        success: true,
        status: "question added successfully",
        questionBank
      };
    }),
  updateQuestion: protectedProcedure
    .meta({
      description: "Update a question in a questionBank!"
    })
    .input(
      z.object({
        id: z.number(),
        questionId: z.number(),
        title: z.string().min(4).max(100).optional(),
        answers: z
          .array(
            z.object({
              id: z.number(),
              text: z.string().min(1).max(32)
            })
          )
          .length(4),
        correctAnswer: z.number().min(1).max(4).optional()
      })
    )
    .mutation(async (opts) => {
      const questionBank = await prisma.questionBank.update({
        where: {
          id: opts.input.id
        },
        data: {
          questions: {
            update: {
              where: {
                id: opts.input.questionId
              },
              data: {
                ...(opts.input.title ? { title: opts.input.title } : {}),
                answers: {
                  updateMany: opts.input.answers?.map((answer, index) => {
                    return {
                      where: {
                        questionId: opts.input.questionId,
                        id: answer.id
                      },
                      data: {
                        text: answer.text,
                        isCorrect: index + 1 === opts.input.correctAnswer
                      }
                    };
                  })
                }
              }
            }
          }
        }
      });
      return {
        success: true,
        status: "question updated successfully",
        questionBank
      };
    }),
  deleteQuestion: protectedProcedure
    .meta({
      description: "Delete a question from a questionBank!"
    })
    .input(
      z.object({
        id: z.number(),
        questionId: z.number()
      })
    )
    .mutation(async (opts) => {
      const questionBank = await prisma.questionBank.update({
        where: {
          id: opts.input.id
        },
        data: {
          questions: {
            delete: {
              id: opts.input.questionId
            }
          }
        }
      });
      return {
        success: true,
        status: "question deleted successfully",
        questionBank
      };
    }),
  generateQuestion: publicProcedure
    .meta({
      description: "Generate a question from GPT"
    })
    .input(
      z.object({
      topic: z.string().min(3).max(30),
      // model (either gpt3.5 or llama2)
      model: z.union([z.literal("gpt3.5"), z.literal("llama2")])
    })
    )
    .mutation(async (opts) => {
      const { topic } = opts.input;

      // return await generateQuestion(topic)

      const generated = await generateQuestionTyped(topic);
      console.log("generated", generated);

      return { generated };

      // return {
      //   generated: {
      //     questionTitle:
      //       "Which of the following is the main function of chlorophyll in plants?",
      //     answers: [
      //       { text: "A. Absorbs sunlight for photosynthesis", isCorrect: true },
      //       { text: "B. Stores excess water in the cells", isCorrect: false },
      //       { text: "C. Helps in respiration process", isCorrect: false },
      //       {
      //         text: "D. Transports nutrients throughout the plant",
      //         isCorrect: false
      //       }
      //     ],
      //     reason:
      //       "Chlorophyll is responsible for absorbing sunlight and converting it into energy through the process of photosynthesis. It captures light energy from the sun and uses it to synthesize carbohydrates, which are essential for the plant's growth and survival."
      //   }
      // };
    })
});
