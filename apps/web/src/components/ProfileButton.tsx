"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import { trpc } from "../utils/trpc/client";
import { supabase } from "../utils/supabase/client";
import { useRouter } from "next/navigation";

interface Props {
  initialData: any;
}

export const ProfileButton = ({ initialData }: Props) => {
  const router = useRouter();

  const { data: me } = trpc.user.me.useQuery(undefined, {
    initialData
  });

  const userIdentity = Array.isArray(me.identities) ? me.identities[0] : null;

  const userName: string = userIdentity?.identity_data?.name ?? "Z Z"; // just in case there's no name default to ZZ
  const userNameCleaned = userName.replace(/[^a-zA-Z ]/g, "");
  const initials = userNameCleaned
    .split(" ")
    .map((name: string) => name[0])
    .join("")
    .slice(0, 2);

  const handleLogoutClick = async () => {
    console.log("logout");
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div className="flex items-center justify-center rounded-full h-12 w-12">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{userNameCleaned}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="cursor-pointer" onClick={handleLogoutClick}>Log Out</DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
