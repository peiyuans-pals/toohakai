import { createTRPCRouter } from "./trpc";
import { userRouter } from "../router/user";
import { questionBankRouter } from "../router/questionBank";

export const appRouter = createTRPCRouter({
  user: userRouter,
  questionBank: questionBankRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
