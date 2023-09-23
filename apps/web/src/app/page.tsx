import * as React from "react";
import { Heading, Text } from "../components/ui/";
import { LoginButton } from "../components/LoginButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TestLoginButton } from "./_components/TestLoginButton";

export default function LoginPage() {
  return (
    <div className="flex flex-row min-h-screen justify-center items-center bg-gradient-to-br from-green-800 to-green-700">
      {/*<div className="flex flex-col justify-center">*/}
      {/*  <div className="flex flex-col justify-center h-96 w-96 shadow-lg rounded-sm bg-white">*/}
      {/*    <div className="self-center">*/}
      {/*      <Heading>Toohakai</Heading>*/}
      {/*    </div>*/}
      {/*    <div className="self-center mt-24">*/}
      {/*      <Text>A really cool quiz app</Text>*/}
      {/*    </div>*/}
      {/*    <div className="self-center mt-2">*/}
      {/*      <LoginButton />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <Card className="h-96 w-96">
        <CardHeader>
          <CardTitle>Toohakai</CardTitle>
          <CardDescription>A fun quiz app</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <p>Card Content</p>
        </CardContent>
        <CardFooter className="gap-2">
          <LoginButton />
          <TestLoginButton />
        </CardFooter>
      </Card>
    </div>
  );
}
