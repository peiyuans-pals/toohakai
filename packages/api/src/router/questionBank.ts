import {createTRPCRouter, publicProcedure} from "../utils/trpc";
import {z} from "zod";

const mockData = [
  {id: "101", name: "Physics", questions: []},
  {id: "102", name: "Chemistry", questions: []},
]

export const questionBankRouter = createTRPCRouter({
    list: publicProcedure
      .meta({
          description: 'List questionBanks',
        }
      ).query(() => {
          return mockData; // todo
        }
      ),
    get: publicProcedure
      .meta({
          description: 'Get a questionBank by passing questionBank id as input',
        }
      )
      .input(z.string()).query((opts: any) => {
        opts.input; // string
        return mockData[0]; // todo
      }
    ),
  }
);
