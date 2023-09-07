"use client"

import React, {useState} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {trpc} from "./client";
import {httpBatchLink} from "@trpc/client";
import superjson from "superjson";

interface Props {
  children: React.ReactNode,
}

export default function TrpcProvider({children}: Props) {
  const [queryClient] = useState(() => new QueryClient({}));
  const [trpcClient] = useState(() => trpc.createClient({
    links: [
      httpBatchLink({
        url: `` // TODO
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
