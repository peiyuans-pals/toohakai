import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import { nextRedirect } from "../../../utils/next/redirect";
// import type { Database } from '@/lib/database.types' // TODO

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    // const supabase = createRouteHandlerClient<Database>({ cookies }) // TODO
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
    console.log("supabase exchanged codes successfully");

    // TODO: call api server to create/update user
  }

  // URL to redirect to after sign in process completes
  return nextRedirect("/dashboard", request.url)
}
