"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "./client";
import { httpBatchLink, splitLink, wsLink } from "@trpc/client";
import superjson from "superjson";
import { supabase } from "../supabase/client";
import { getBaseUrl, wsClient } from "./lib";
import { AppRouter } from "api";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface Props {
  children: React.ReactNode;
}
/**
 * The reason for using useState in the creation of the queryClient and the TRPCClient,
 * as opposed to declaring them outside of the component, is to ensure that each request
 * gets a unique client when using SSR. If you use client side rendering then you can
 * move them if you wish.
 */

export default function TrpcProvider({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient({}));
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        splitLink({
          condition: (op) => {
            return op.type === "subscription";
          },
          true: wsLink<AppRouter>({
            // use ws for subscriptions
            client: wsClient
          }),
          false: httpBatchLink({
            // use http for queries and mutations
            url: `${getBaseUrl()}/trpc`, // TODO
            maxURLLength: 2083,
            headers: async () => {
              const {
                data: { session }
              } = await supabase.auth.getSession();
              // console.log("trpc/provider -> session", session);
              if (!session)
                return {
                  "X-SLAY-QUEEN": "true" // unauthorized
                };
              return {
                Authorization: `Bearer ${session.access_token}`
              };
            }
          })
        })
      ],
      transformer: superjson
    })
  );
  return (
    <trpc.Provider queryClient={queryClient} client={trpcClient}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
