import {createTRPCRouter, protectedProcedure} from "../utils/trpc";
import {z} from "zod";

const mockData = [
  {id: "101", name: "Physics", questions: []},
  {id: "102", name: "Chemistry", questions: []},
]

export const questionBankRouter = createTRPCRouter({
  list: protectedProcedure
    .meta({
      description: 'List user\'s questionBanks',
    })
    .query(() => {
      return mockData; // todo
    }),
  count: protectedProcedure
    .meta({
      description: 'Count user\'s questionBanks',
    })
    .query(() => {
      return mockData.length; // todo
    }),
  get: protectedProcedure
    .meta({
        description: 'Get a questionBank by passing questionBank id as input',
      }
    )
    .input(z.string())
    .query((opts) => {
        opts.input; // string
        return mockData[0]; // todo
      }
    ),
  create: protectedProcedure
    .meta({
      description: 'Create a questionBank!',
    })
    .input(z.object({
      name: z.string().min(4).max(250
      )
    }))
    .mutation(async (_opts) => {
      console.log("trying to create a questionBank")
      // todo: prisma goes here
      return {success: true, status: "questionBank created successfully"}
    }),
  delete: protectedProcedure
    .meta({
      description: 'Delete a questionBank!',
    })
    .input(z.object({
      id: z.string().min(4).max(250)
    }))
    .mutation(async (_opts) => {
      console.log("trying to delete a questionBank")
      // todo
      return {success: true, status: "questionBank deleted successfully"}
    })
  }
);
