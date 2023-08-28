import {AppRouter} from "api";
import {getFetch, httpBatchLink, loggerLink} from "@trpc/client";
import {createTRPCReact} from "@trpc/react-query";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import superjson from "superjson";
import {useState} from "react";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

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


export const trpc = createTRPCReact<AppRouter>();


export const TrpcProvider: React.FC<{ children: React.ReactNode }> = ({
                                                                        children,
                                                                      }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {queries: {staleTime: 5000}},
      })
  );

  const url = `${getBaseUrl()}/trpc`;

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink({
          enabled: () => true,
        }),
        httpBatchLink({
          url,
          fetch: async (input, init?) => {
            const fetch = getFetch();
            return fetch(input, {
              ...init,
              credentials: "include",
            });
          },
        }),
      ],
      transformer: superjson,
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
        < ReactQueryDevtools/>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

