"use client"

import {Button, Heading, Text} from "@chakra-ui/react";
import Page from "../../components/Page";
import {Link} from "@chakra-ui/next-js";

export default function Login() {
  return (
    <Page>
      <Heading>Login</Heading>
      <Link href="/dashboard">
        <Button>
          Sign in With School Email
        </Button>
      </Link>
    </Page>
  );
}
