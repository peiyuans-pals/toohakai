"use client"

import {useRouter} from "next/navigation";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";

export const LoginButton = () => {

  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleLoginClick = async () => {
    // loginMutation.mutate({
    //   name: "dyllon", email: "dyllon@example.com"
    // })
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'azure',
      options: {
        scopes: 'email offline_access',
        redirectTo: `${window.location.origin}/auth/callback`
      },
    })
    console.log(data, error)
  }

  return <button className="btn" onClick={handleLoginClick}>Login</button>
}
