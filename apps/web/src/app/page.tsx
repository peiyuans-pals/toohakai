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
    <div className="flex flex-col min-h-screen justify-center items-center bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-green-300 to-green-500">
      <h1 className="text-4xl font-bold mb-4">Toohakai</h1>
      <h2 className="text-2xl mb-8">Assess and practice, in the classroom and beyond</h2>
      <LoginButton className="bg-white text-green-700 py-5 px-10 text-lg hover:bg-green-500 hover:text-white" />
      {enableTestLogin && <TestLoginButton />}
    </div>
  );
}
