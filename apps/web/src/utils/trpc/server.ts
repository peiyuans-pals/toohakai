import { type AppRouter } from "api";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

function getBaseUrl() {
  // if (typeof window !== 'undefined')
  //   // browser should use relative path
  //   return '';
  // if (process.env.VERCEL_URL)
  //   // reference for vercel.com
  //   return `https://${process.env.VERCEL_URL}`;
  if (process.env.NEXT_PUBLIC_TOOHAKAI_API_URL)
    // reference for render.com
    return `http://${process.env.NEXT_PUBLIC_TOOHAKAI_API_URL}`;
  if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test")
    // assume localhost
    // return `http://localhost:${String(Stringprocess.env.PORT ?? 5001)}`;
    return `http://localhost:5001`;
  throw new Error(
    "No NEXT_PUBLIC_TOOHAKAI_API_URL or PORT environment variable specified."
  );
}

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
          console.log("trpc/server -> session", session);
          if (!session) return {};
          return {
            Authorization: `Bearer ${session.access_token}`
          };
        }
      })
    ],
    transformer: superjson
  });

// TODO: change this to use remote url (not local package)
// export const trpcServer = appRouter.createCaller({
//   links: [
//     httpBatchLink({
//       url: `${getBaseUrl()}/trpc `,
//       // headers: () => {
//       //   // @ts-ignore
//       //   const {session} = supabase.auth.getSession().then(({data}) => data)
//       //   if (!session) return {}
//       //   return {
//       //     Authorization: `Bearer ${session.access_token}`
//       //   };
//       // },
//     })
//   ],
// })
