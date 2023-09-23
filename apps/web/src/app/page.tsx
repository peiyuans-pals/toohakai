import * as React from "react";
import { LoginButton } from "../components/LoginButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { TestLoginButton } from "./_components/TestLoginButton";
import { NextPage } from "../types/next";

export default function LoginPage({ params, searchParams }: NextPage) {
  const enableTestLogin = searchParams?.test === "true";

  return (
    <div className="flex flex-row min-h-screen justify-center items-center bg-gradient-to-br from-green-800 to-green-700">
      <Card className="h-96 w-96 rounded-md">
        <CardHeader>
          <CardTitle>Toohakai</CardTitle>
          <CardDescription>A fun quiz app</CardDescription>
        </CardHeader>
        {/*<CardContent className="flex-1">*/}
        {/*  <p>Card Content</p>*/}
        {/*</CardContent>*/}
        <CardFooter className="gap-2">
          <LoginButton />
          {enableTestLogin && <TestLoginButton />}
        </CardFooter>
      </Card>
    </div>
  );
}
