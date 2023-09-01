import { z } from 'zod';
import {createTRPCRouter, publicProcedure} from "../utils/trpc";
import {prisma} from "../utils/prisma";
import { log } from "logger";

export const userRouter = createTRPCRouter({
  list: publicProcedure
    .meta({
      description: 'List users',
    })
    .query(() => {
    return prisma.user.findMany(); //  todo
  }),
  get: publicProcedure
    .meta({
      description: 'Get a user by passing user id as input',
    })
    .input(z.string()).query((opts: any) => {
    opts.input; // string
    return { id: opts.input, name: 'Bilbo' }; // todo
  }),
  create: publicProcedure
    .meta({
      description: 'Create a user!',
    })
    .input(z.object({ name: z.string().min(5).max(250), email: z.string().email() }))
    .mutation(async (opts) => {
      console.log("trying to create a user")
      const newUser = await prisma.user.create({
        data: {
          name: opts.input.name,
          email: opts.input.email,
          role: 'STUDENT',
        }
      }).catch(err => {
        log(err)
      });
      return { success: true, status: "user created successfully"}
    }),
});
