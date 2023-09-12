import * as React from "react";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Page, Heading, Button, Text } from "../components/ui/";
import Link from "next/link";
import { LoginButton } from "../components/LoginButton";

export default function Home() {
  // const {data: user, isLoading, isError} = trpc.user.get.useQuery("1234");
  // console.log("user", user)

  // const supabase = createClientComponentClient();

  // const user = supabase.auth.getUser();

  return (
    <div className="flex flex-row min-h-screen justify-center bg-gradient-to-br from-blue-900 to-blue-400">
    <div className="flex flex-col justify-center">
      <div className="flex flex-col justify-center h-96 w-96 shadow-lg rounded-sm bg-white">
        <div className="self-center">
          <Heading>Toohakai</Heading>
        </div>
        <div className="self-center mt-24">
          <Text>A really cool quiz app</Text>
        </div>
        <div className="self-center mt-2">
          <LoginButton />
        </div>
      </div>
    </div>
  </div>
  );
}
