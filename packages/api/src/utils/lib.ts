import { createTRPCRouter } from "./trpc";
import { userRouter } from "../router/user";
import { questionBankRouter } from "../router/questionBank";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

export const appRouter = createTRPCRouter({
  user: userRouter,
  questionBank: questionBankRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
