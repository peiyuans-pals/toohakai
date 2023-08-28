import {createTRPCNext} from "@trpc/next";
import {AppRouter} from "api";
import {httpBatchLink} from "@trpc/client";
import superjson from "superjson";

function getBaseUrl() {
  // if (typeof window !== 'undefined')
  //   // browser should use relative path
  //   return '';
  // if (process.env.VERCEL_URL)
  //   // reference for vercel.com
  //   return `https://${process.env.VERCEL_URL}`;
  if (process.env.API_SERVER_URL)
    // reference for render.com
    return `http://${process.env.API_SERVER_URL}`;
  if  (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test")
    // assume localhost
    return `http://localhost:${process.env.PORT ?? 5001}`;
  throw new Error("No API_SERVER_URL or PORT environment variable specified.");
}
export const trpc = createTRPCNext<AppRouter>({
  config(opts) {
    return {
      transformer: superjson,
      links: [
        httpBatchLink({
          /**
           * If you want to use SSR, you need to use the server's full URL
           * @link https://trpc.io/docs/ssr
           **/
          url: `${getBaseUrl()}/api/trpc`,
          // You can pass any HTTP headers you wish here
          async headers() {
            return {
              // authorization: getAuthCookie(),
            };
          },
        }),
      ],
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   **/
  ssr: false,
});
