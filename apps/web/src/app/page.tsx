import * as React from 'react';
// import {trpc} from "../utils/trpc";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {Page, Heading, Button, Text} from "../components/ui/";
import Link from "next/link";
import {LoginButton} from "../components/LoginButton";

export default function Home() {
  // const {data: user, isLoading, isError} = trpc.user.get.useQuery("1234");
  // console.log("user", user)

  const supabase = createClientComponentClient()

  const user = supabase.auth.getUser()

  return (
    <Page>
      <Heading>Toohakai</Heading>
      <Text>A really cool quiz app</Text>
      <LoginButton />
    </Page>
  );
}
