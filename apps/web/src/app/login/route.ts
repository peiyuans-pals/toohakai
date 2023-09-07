import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {

  // TODO: check if user is logged in, and redirect accordingly

  return NextResponse.redirect(new URL('/dashboard/teacher', request.url))
}
