"use client";

import { trpc } from "../utils/trpc/client";
import { supabase } from "../utils/supabase/client";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


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
<DropdownMenu>
  <DropdownMenuTrigger>
  <div className="flex items-center justify-center rounded-full mr-10 h-12 w-12 bg-green-600">
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost rounded-btn">
          <p className="font-bold text-white">{initials}</p>
        </label>
        </div>
    </div>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>{userNameCleaned}</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem><a onClick={handleLogoutClick}>Logout</a></DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>


    
        // {/* <ul
        //   tabIndex={0}
        //   className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
        // >
        //   <li>
        //     <a>{userNameCleaned}</a>
        //   </li>
        //   <li>
        //     <a>Settings</a>
        //   </li>
        //   <li>
        //     <a onClick={handleLogoutClick}>Logout</a>
        //   </li>
        // </ul> */}

  );
};
