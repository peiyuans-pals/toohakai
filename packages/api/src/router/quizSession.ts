import { createTRPCRouter, publicProcedure } from "../utils/trpc";
import { observable } from "@trpc/server/observable";

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
  })
});
