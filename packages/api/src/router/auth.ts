import { createTRPCRouter, publicProcedure } from "../utils/trpc";
import { z } from "zod";

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .meta({
      description: "Login"
    })
    .input(
      z.object({
        provider: z.string(),
        token: z.string()
      })
    )
    .mutation(async (_opts) => {})
});
