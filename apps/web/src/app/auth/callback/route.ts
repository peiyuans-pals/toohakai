import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import type { NextRequest } from "next/server";
import { nextRedirect } from "../../../utils/next/redirect";
import { trpcServer } from "../../../utils/trpc/server";
// import type { Database } from '@/lib/database.types' // TODO

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    // const supabase = createRouteHandlerClient<Database>({ cookies }) // TODO
    const supabase = createRouteHandlerClient({ cookies });
    const res = await supabase.auth.exchangeCodeForSession(code);
    // console.log("supabase exchanged codes successfully");

    // TODO: call api server to create/update user
    const userId = res.data.session?.user.id;

    if (userId) {
      const response = await trpcServer(cookies).user.login.query();
    }
  }

  // URL to redirect to after sign in process completes
  return nextRedirect("/dashboard", request.url);
}
