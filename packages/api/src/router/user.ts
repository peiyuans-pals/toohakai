import { z } from 'zod';
import {createTRPCRouter, publicProcedure} from "../utils/trpc";

export const userRouter = createTRPCRouter({
  list: publicProcedure
    .meta({
      description: 'List users',
    })
    .query(() => {
    return []; //  todo
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
      description: 'Create a user',
    })
    .input(z.object({ name: z.string().min(5) }))
    .mutation(async (opts: any) => {
      // use your ORM of choice
      // return await UserModel.create({
      //   data: opts.input,
      // });
      return { msg: "user model goes here", opts: opts} // todo
    }),
});
