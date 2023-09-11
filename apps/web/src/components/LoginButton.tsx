"use client";

import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { supabase } from "../utils/supabase/client";
import { Button } from "@/components/ui/button";

export const LoginButton = () => {
  const handleLoginClick = async () => {
    // loginMutation.mutate({
    //   name: "dyllon", email: "dyllon@example.com"
    // })
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "azure",
      options: {
        scopes: "email profile offline_access",
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
    console.log(data, error);
  };

  return (
    <Button
      onClick={handleLoginClick}
      data-cy="login-button"
    >
      Login With Microsoft Account
    </Button>
  );
};
