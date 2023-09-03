"use client"

import {Button, Heading, Text} from "@chakra-ui/react";
import Page from "../../components/Page";
import {Link} from "@chakra-ui/next-js";
import {trpc} from "../../utils/trpc";
import {useRouter} from "next/navigation";

export default function Login() {
  const router = useRouter()
  const loginMutation = trpc.user.create.useMutation({
      onSuccess: () => {
        router.push("/dashboard")
      }
    })

  const handleLoginClick = () => {
    // todo: next-auth + azure ad
    loginMutation.mutate({
      name: "dyllon", email: "dyllon@example.com"
    })
  }

  return (
    <Page>
      <Heading>Sign in with your school email</Heading>
      <Button onClick={handleLoginClick}>
        Sign in
      </Button>
    </Page>
  );
}
