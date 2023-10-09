"use server";

import { ProfileButton } from "../../../components/ProfileButton";
import { Page } from "../../../components/ui";
import { trpcServer } from "../../../utils/trpc/server";
import { cookies } from "next/headers";
import { Input } from "@/components/ui/input";
import { NavSidebar } from "./NavSidebar";
import { Menu } from "lucide-react";
import { MobileSideBar } from "./MobileSideBar";

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const me = await trpcServer(cookies).user.me.query();

  const login = await trpcServer(cookies).user.login.query();

  return (
    <Page>
      <div className="flex flex-row sticky h-16 items-center justify-between px-6 border-b bg-white">
        <div>
          <MobileSideBar></MobileSideBar>
        </div>
        <div>
          <p className="font-extrabold text-2xl text-primary select-none">
            toohakai
          </p>
        </div>
        <div className="flex flex-row items-center">
          <ProfileButton initialData={me} />
        </div>
      </div>
      <div className="flex flex-1 flex-row min-h-full justify-stretch items-stretch">
        <div className="sm:flex flex-col w-48 md:w-48 lg:w-64 p-4 hidden gap-1 items-stretch">
          <NavSidebar />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </Page>
  );
}
