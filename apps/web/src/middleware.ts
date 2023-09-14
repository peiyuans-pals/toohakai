import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import { nextRedirect } from "./utils/next/redirect";

// TODO: https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
// import type { Database } from '@/lib/database.types'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // const supabase = createMiddlewareClient<Database>({ req, res }) // TODO
  const supabase = createMiddlewareClient({ req, res });

  // await supabase.auth.getSession();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  // if user is signed in and the current path is /login redirect the user to /dashboard
  if (user && req.nextUrl.pathname === "/") {
    return nextRedirect("/dashboard", req.url)
  }

  // if user is not signed in and the current path is not / redirect the user to /
  if (!user && req.nextUrl.pathname !== "/") {
    return nextRedirect("/", req.url)
  }

  return res;
}

export const config = {
  matcher: ["/", "/dashboard/:path*"]
};
