"use client";
// todo: use server

import { Heading } from "../../../components/ui";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { trpc } from "../../../utils/trpc/client";
import { NextPage } from "../../../types/next";

export default function PreQuiz({ searchParams }: NextPage) {
  const mock_participants = [
    { id: 1, name: "John" },
    { id: 2, name: "Doe" },
    { id: 3, name: "Dan" },
    { id: 4, name: "Joel" },
    { id: 5, name: "Kai" },
    { id: 6, name: "Zen" },
    { id: 7, name: "Grace" },
    { id: 8, name: "Rainer" },
    { id: 9, name: "Peter" },
    { id: 10, name: "William" },
    { id: 11, name: "Ben" },
    { id: 12, name: "Zack" }
  ];

  const quizId = parseInt(searchParams.quiz_id as string);

  const { data: quizSession, isLoading } = trpc.quiz.get.useQuery(quizId);

  if (isLoading) return <p>Loading...</p>;

  if (!quizSession) {
    return <p>No quiz exists with id {quizId}</p>;
  }

  return (
    <div className="flex justify-center items-center  bg-background/75 rounded-lg z-40 top-1/2 left-1/2 mr-[-50%] translate-x-[-50%] translate-y-[-50%] h-screen w-screen fixed">
      <div className=" flex rounded-md bg-background border h-[90%] w-[75%]">
        <div className="w-[50%]">
          <div className=" flex flex-col justify-center items-center h-[50%] border-b">
            <Heading>PIN: 123456</Heading>
          </div>
          <div className="flex flex-col justify-center items-center h-[50%]">
            <Heading>QR Code to Quiz</Heading>
            <Image
              src="/mock_qr_code.png"
              width={250}
              height={250}
              alt="QR code of quiz"
              className=" drop-shadow-lg mb-5 "
            />
          </div>
        </div>
        <div className="flex flex-col h-[100%] border-l w-[50%]">
          <div className="flex flex-col justify-center items-center  w-[100%] h-[100%]">
            <Card className="w-[450px]">
              <CardHeader>
                <Heading>{quizSession.title}</Heading>
              </CardHeader>
              <CardContent>
                <p className="text-xl">
                  Time per question: {quizSession.timePerQuestion} seconds
                </p>
                <p className="text-xl">
                  Total number of questions: {quizSession.numOfQuestions}
                </p>
                <p className="text-xl">
                  Total participants: {mock_participants.length}
                </p>
                <ScrollArea className="mt-5 h-[400px] text-center w-[100%] rounded-md border">
                  <div className="p-4">
                    <h4 className="mb-4 text-sm font-medium leading-none">
                      Participants
                    </h4>
                    {mock_participants.map((participant) => (
                      <div key={participant.id}>
                        <div className="text-sm">{participant.name}</div>
                        <Separator className="my-2" />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button>Start Session</Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    // todo: redirect to /dashboard
                  }}
                >
                  Cancel Session
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
