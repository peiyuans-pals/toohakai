import { createTRPCRouter } from "./trpc";
import { userRouter } from "../router/user";
import { questionBankRouter } from "../router/questionBank";
//import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { quizRouter } from "../router/quiz";

export const appRouter = createTRPCRouter({
  user: userRouter,
  questionBank: questionBankRouter,
  quiz: quizRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
