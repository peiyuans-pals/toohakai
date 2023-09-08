"use client"

import {trpc} from "../utils/trpc/client";
import {supabase} from "../utils/supabase/client";
import {useRouter} from "next/navigation";

interface Props {
  initialData: any
}

export const ProfileButton = ({ initialData }: Props) => {

  const router = useRouter()

  const me = trpc.user.me.useQuery(undefined, {
    initialData,
    meta: {

    }
  })

  // const initials = me.data?.name.split(" ").map((name: string) => name[0]).join("")

  const handleLogoutClick = async () => {
    console.log("logout")
    await supabase.auth.signOut()
    router.refresh();
  }

  return <div className="flex items-center justify-center rounded-full h-12 w-12 bg-green-600">
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost rounded-btn">
        <p className="font-bold text-white">
          AB
        </p>
      </label>
      <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
        <li><a>User's name</a></li>
        <li><a>Settings</a></li>
        <li><a onClick={handleLogoutClick}>Logout</a></li>
      </ul>
    </div>
  </div>
}
