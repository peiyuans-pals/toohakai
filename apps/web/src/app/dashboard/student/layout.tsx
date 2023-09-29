"use server";

import { Metadata } from "next";
import "../../../app/styles.css";
import "../../../app/globals.css";
import { Page } from "src/components/ui";
import { NavTopBar } from "./_component/NavTopBar";
import { trpcServer } from "../../../utils/trpc/server";
import { cookies } from "next/headers";
import { ProfileButton } from "src/components/ProfileButton";

export default async function StudentLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const me = await trpcServer(cookies).user.me.query();

  const login = await trpcServer(cookies).user.login.query();

  return (
    <Page>
      <div className="flex flex-row sticky h-16 items-center justify-between px-6 border-b bg-white">
        <p className="font-extrabold text-2xl text-primary">toohakai</p>
      </div>
      <div className="flex flex-row items-center justify-between bg-black">
        <div className="pl-4">
          <NavTopBar />
        </div>
        <ProfileButton initialData={me} />
      </div>
      <div className="flex">{children}</div>
    </Page>
  );
}
