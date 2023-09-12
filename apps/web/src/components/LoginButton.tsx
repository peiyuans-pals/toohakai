"use client";

import { supabase } from "../utils/supabase/client";
import { Button } from "@/components/ui/button";

export const LoginButton = () => {
  const handleLoginClick = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "azure",
      options: {
        scopes: "email profile offline_access",
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
    console.log(data, error);
    // todo: report error to glitchtip
  };

  return (
    <Button
      className="btn w-24"
      onClick={handleLoginClick}
      data-cy="login-button"
    >
      Login
    </Button>
  );
};
