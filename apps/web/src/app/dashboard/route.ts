import { NextRequest, NextResponse } from "next/server";
import * as process from "process";
import { nextRedirect } from "../../utils/next/redirect";

export async function GET(request: NextRequest) {
  // TODO: check if its a teacher or student, and redirect accordingly

  return nextRedirect("/dashboard/teacher", request.url)
}
