import { NextResponse } from "next/server";

export const nextRedirect = (url: string | URL, requestUrl: string | URL) => {
  return NextResponse.redirect(
    new URL(url, process.env.NEXT_PUBLIC_DEPLOYMENT_DOMAIN ?? requestUrl)
  );
};
