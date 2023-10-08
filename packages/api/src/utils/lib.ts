import { createTRPCRouter } from "./trpc";
import { userRouter } from "../router/user";
import { questionBankRouter } from "../router/questionBank";
import { quizRouter } from "../router/quiz";
import { quizSessionRouter } from "../router/quizSession";

export const appRouter = createTRPCRouter({
  user: userRouter,
  questionBank: questionBankRouter,
  quiz: quizRouter,
  quizSession: quizSessionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
