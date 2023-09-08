import { inferAsyncReturnType, initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { TRPCPanelMeta } from "trpc-panel";
import { trpcExpress } from "../index";
import { supabase } from "./supabase";

export const createTrpcContext = async ({
  req,
  res: _res
}: trpcExpress.CreateExpressContextOptions) => {
  // TODO
  async function getUserFromHeader() {
    if (req.headers.authorization) {
      const access_token = req.headers.authorization.split(" ")[1];
      if (access_token) {
        return await supabase.auth.getUser(access_token);
      }
    }
    return null;
  }

  const user = await getUserFromHeader();
  return {
    user
  };
};

export type Context = inferAsyncReturnType<typeof createTrpcContext>;

const t = initTRPC
  .meta<TRPCPanelMeta>()
  .context<typeof createTrpcContext>()
  .create({
    transformer: superjson
    // errorFormatter({ shape, error }) {
    //   return {
    //     ...shape,
    //     data: {
    //       ...shape.data,
    //       zodError:
    //         error.cause instanceof ZodError ? error.cause.flatten() : null,
    //     },
    //   };
    // },
  });

const isAuthed = t.middleware((opts) => {
  const { ctx } = opts;
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return opts.next({
    ctx: {
      user: ctx.user
    }
  });
});

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(isAuthed);
