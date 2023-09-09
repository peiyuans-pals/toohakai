"use client";

import { createTRPCReact } from "@trpc/react-query";
import { type AppRouter } from "api";
import { httpBatchLink } from "@trpc/client";
import { supabase } from "../supabase/client";
import superjson from "superjson";

export const trpc = createTRPCReact<AppRouter>({});
