import { type AppRouter } from "api";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { getBaseUrl } from "./lib";

export const trpcServer = (cookies: any) =>
  createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: `${getBaseUrl()}/trpc`,
        headers: async () => {
          const supabaseServer = createServerComponentClient(
            {
              cookies
            },
            {
              supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL
            }
          );

          const {
            data: { session }
          } = await supabaseServer.auth.getSession();
          // console.log("trpc/server -> session", session);
          if (!session) return {};
          return {
            Authorization: `Bearer ${session.access_token}`
          };
        }
      })
    ],
    transformer: superjson
  });
