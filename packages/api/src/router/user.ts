//import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../utils/trpc";
import { prisma } from "../utils/prisma";

export const userRouter = createTRPCRouter({
  me: protectedProcedure
    .meta({
      description: "Get current user"
    })
    .query((opts) => {
      const { user } = opts.ctx.user.data;
      if (!user) {
        throw new Error("You are not logged in");
      }
      const { id, email, identities } = user;
      return { id, email, identities };
    }),
  login: protectedProcedure
    .meta({
      description: "Login after oauth frontend flow"
    })
    .query(async (opts) => {
      const { user } = opts.ctx.user.data;
      const userId = user!.id;
      const response = await prisma.user.upsert({
        where: {
          id: userId
        },
        update: {
          lastLoginAt: new Date()
        },
        create: {
          id: userId,
          lastLoginAt: new Date()
        }
      });
      return {
        success: true,
        status: "user logged in successfully",
        role: response.role
      };
    })

  // TODO: everything below should be disabled (admin only)
  // list: publicProcedure
  //   .meta({
  //     description: "List users"
  //   })
  //   .query(() => {
  //     return prisma.user.findMany(); //  todo
  //   }),
  // get: publicProcedure
  //   .meta({
  //     description: "Get a user by passing user id as input"
  //   })
  //   .input(z.string())
  //   .query((opts) => {
  //     opts.input; // string
  //     return { id: opts.input, name: "Bilbo" }; // todo
  //   }),
  // create: publicProcedure
  //   .meta({
  //     description: "Create a user!"
  //   })
  //   .input(
  //     z.object({ name: z.string().min(4).max(250), email: z.string().email() })
  //   )
  //   .mutation(async (_opts) => {
  //     console.log("trying to create a user");
  //     // TODO
  //     // const newUser = await prisma.user.create({
  //     //   data: {
  //     //     name: opts.input.name,
  //     //     email: opts.input.email,
  //     //     role: 'STUDENT',
  //     //   }
  //     // }).catch(err => {
  //     //   log(err)
  //     // });
  //     return { success: true, status: "user created successfully" };
  //   })
});
