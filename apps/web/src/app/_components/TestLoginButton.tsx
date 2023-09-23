"use client";
// login button for testing

import { Button } from "@/components/ui/button";
import { supabase } from "../../utils/supabase/client";
import { useRouter } from "next/navigation";

export const TestLoginButton = () => {
  const router = useRouter()
  const handleTestLoginClick = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'test@example.com',
      password: 'password',
    })
    console.log(data, error)
    router.refresh()
  }

  return (
    <Button data-cy="test-login" onClick={handleTestLoginClick}>
      Test Login
    </Button>
  )
}
