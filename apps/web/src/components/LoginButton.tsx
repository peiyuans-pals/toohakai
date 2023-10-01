"use client";

import { supabase } from "../utils/supabase/client";
import { Button } from "@/components/ui/button";
import { cn } from "../utils/shadcn";

interface Props {
  className?: string;
}

export const LoginButton = ({ className }: Props) => {
  const handleLoginClick = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "azure",
      options: {
        scopes: "email profile offline_access",
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
    console.log(data, error);
    // todo: report error to hyperdx
  };

  return (
    <Button
      className={cn("", className)}
      onClick={handleLoginClick}
      data-cy="login-button"
    >
      Login
    </Button>
  );
};
