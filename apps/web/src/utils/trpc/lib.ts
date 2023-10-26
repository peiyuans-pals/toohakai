import { inferReactQueryProcedureOptions } from "@trpc/react-query";
import {
  AppRouter,
  InferObservable,
  RouterInputs,
  RouterOutputs,
} from "api";
import { createWSClient } from "@trpc/client";

export function getBaseUrl() {
  // if (typeof window !== 'undefined')
  //   // browser should use relative path
  //   return '';
  // if (process.env.VERCEL_URL)
  //   // reference for vercel.com
  //   return `https://${process.env.VERCEL_URL}`;
  if (process.env.NEXT_PUBLIC_TOOHAKAI_API_URL)
    // reference for render.com
    return process.env.NEXT_PUBLIC_TOOHAKAI_API_URL;
  if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test")
    // assume localhost
    // return `http://localhost:${String(Stringprocess.env.PORT ?? 5001)}`;
    return `http://localhost:5001`;
  throw new Error(
    "No NEXT_PUBLIC_TOOHAKAI_API_URL environment variable specified."
  );
}

export type TrpcReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type TrpcRouterInputs = RouterInputs;
export type TrpcRouterOutputs = RouterOutputs;
export type TrpcInferObservable<TObservable> = InferObservable<TObservable>;

export const wsClient = createWSClient({
  url: `${getBaseUrl().replace(/^http/, "ws")}`
});
