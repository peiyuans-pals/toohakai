import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import { nextRedirect } from "./utils/next/redirect";
import * as process from "process";

// TODO: https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
// import type { Database } from '@/lib/database.types'

export async function middleware(req: NextRequest) {
  /**
   *  CONTENT SECURITY POLICY
   */

  // const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

  // script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
  // style-src 'self' 'nonce-${nonce}';

  // const cspHeaderValue = `
  //   default-src 'self';
  //   script-src 'self' 'unsafe-eval' 'unsafe-inline' blob: data:;
  //   style-src 'self' 'unsafe-inline';
  //   img-src 'self' blob: data:;
  //   font-src 'self';
  //   object-src 'none';
  //   base-uri 'self';
  //   form-action 'self';
  //   frame-ancestors 'none';
  //   block-all-mixed-content;
  //   report-to http://reportcollector.example.com/collector.cgi;
  // `
  //
  // const requestHeaders = new Headers()
  // // requestHeaders.set('x-nonce', nonce)
  // requestHeaders.set(
  //   'Content-Security-Policy-Report-Only',
  //   // Replace newline characters and spaces
  //   cspHeaderValue.replace(/\s{2,}/g, ' ').trim()
  // )
  //
  // const res = NextResponse.next({
  //   headers: requestHeaders,
  //   request: {
  //     headers: requestHeaders,
  //   },
  // });

  const res = NextResponse.next();

  /**
   * SUPABASE
   */

  // const supabase = createMiddlewareClient<Database>({ req, res }) // TODO
  const supabase = createMiddlewareClient({ req, res });

  // await supabase.auth.getSession();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  // if user is signed in and the current path is /login redirect the user to /dashboard
  if (user && req.nextUrl.pathname === "/") {
    return nextRedirect("/dashboard", req.url);
  }

  // if user is not signed in and the current path is not / redirect the user to /
  if (!user && req.nextUrl.pathname !== "/") {
    return nextRedirect("/", req.url);
  }

  return res;
}

export const config = {
  matcher: [
    "/", "/dashboard/:path*",
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    // {
    //   source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
    //   missing: [
    //     { type: 'header', key: 'next-router-prefetch' },
    //     { type: 'header', key: 'purpose', value: 'prefetch' },
    //   ],
    // },
  ]
};
