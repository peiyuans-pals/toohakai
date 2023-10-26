import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "./utils/lib";

export { appRouter, type AppRouter } from "./utils/lib";
export { createTrpcContext } from "./utils/trpc";

export * as trpcExpress from "@trpc/server/adapters/express";
import { inferObservableValue } from "@trpc/server/observable";

/**
 * Inference helpers for input types
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helpers for output types
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export type InferObservable<TObservable> = inferObservableValue<TObservable>;
