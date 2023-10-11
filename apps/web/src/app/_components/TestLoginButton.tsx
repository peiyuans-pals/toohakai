"use client";
// login button for testing

import { Button } from "@/components/ui/button";
import { supabase } from "../../utils/supabase/client";
import { useRouter } from "next/navigation";

export const TestLoginButton = () => {
  const router = useRouter();
  const handleTestLoginClick = async () => {
    console.log("test login clicked");
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "test@example.com",
      password: "password"
    });
    console.log(data, error);
    router.replace("/dashboard/teacher");
  };

  return (
    <Button data-cy="test-login-button" onClick={handleTestLoginClick}>
      Test Login
    </Button>
  );
};
