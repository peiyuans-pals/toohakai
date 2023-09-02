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
    loginMutation.mutate({
      name: "cherr", email: "cher@example.com"
    })
  }

  return (
    <Page>
      <Heading>Login</Heading>
      <Button onClick={handleLoginClick}>
        Sign in With School Email
      </Button>
    </Page>
  );
}
