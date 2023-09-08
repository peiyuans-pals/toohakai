"use client"

import React, {useState} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {trpc} from "./client";
import {CreateTRPCClientOptions, httpBatchLink} from "@trpc/client";
import superjson from "superjson";
import {supabase} from "../supabase/client";
import {AppRouter} from "api";

interface Props {
  children: React.ReactNode,
}
/**
 * The reason for using useState in the creation of the queryClient and the TRPCClient,
 * as opposed to declaring them outside of the component, is to ensure that each request
 * gets a unique client when using SSR. If you use client side rendering then you can
 * move them if you wish.
 */

export default function TrpcProvider({children}: Props) {
  const [queryClient] = useState(() => new QueryClient({}));
  const [trpcClient] = useState(() => trpc.createClient({
    links: [
      httpBatchLink({
        url: `http://localhost:5001/trpc`, // TODO
        headers: async () => {
          const {data: { session}} = await supabase.auth.getSession()
          console.log("trpc/provider -> session", session)
          if (!session) return {
            "X-SLAY-QUEEN": "true" // unauthorized
          }
          return {
            Authorization: `Bearer ${session.access_token}`
          };
        },
      })
    ],
    transformer: superjson,
  })
  )
  return (
    <trpc.Provider queryClient={queryClient} client={trpcClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  )
};
