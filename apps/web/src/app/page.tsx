"use client"
import {log} from "logger";
import * as React from 'react';
import {Button, Heading, Spinner, Text} from "@chakra-ui/react";
import {trpc} from "../utils/trpc";
import Page from "../components/Page";
import { Link } from '@chakra-ui/next-js'

export default function Home() {
  const user = trpc.user.get.useQuery("1234");
  console.log("user", user)

  return (
    <Page>
      <Heading>Toohakai</Heading>
      {/*<Text>*/}
      {/*  user: {JSON.stringify(user.data)}*/}
      {/*</Text>*/}
      <Link href='/login' _hover={{ color: 'blue.500' }}>
        <Button>
          Login as Teacher
        </Button>
      </Link>
      {/*<Spinner/>*/}
    </Page>
  );
}
