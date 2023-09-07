import {appRouter} from "api";
import {httpBatchLink} from "@trpc/client";

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
  if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test")
    // assume localhost
    return `http://localhost:${process.env.PORT ?? 5001}`;
  throw new Error("No API_SERVER_URL or PORT environment variable specified.");
}

export const trpcServer = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/trpc `,
    })
  ],
})
