"use client";
// todo: use server

import { Heading } from "../../../components/ui";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { trpc } from "../../../utils/trpc/client";
import { NextPage } from "../../../types/next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  TrashIcon
} from "@radix-ui/react-icons";
import { TrpcRouterOutputs } from "../../../utils/trpc/lib";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { cleanName } from "../../../utils/strings";
import QRCode from "react-qr-code";

type Participants = Parameters<
  NonNullable<
    Parameters<
      TrpcRouterOutputs["quizSession"]["participantsSubscription"]["subscribe"]
    >[0]["next"]
  >
>[0];

export default function PreQuiz({ searchParams }: NextPage) {
  const quizId = parseInt(searchParams.quiz_id as string);

  const { data: quizSession, isLoading } = trpc.quiz.get.useQuery(quizId);

  const router = useRouter();

  const changeQuizStatusMutation = trpc.quizSession.changeStatus.useMutation({
    onSuccess: (data) => {
      router.push(`/teacher/quiz/${quizId}`);
    }
  });

  const [participants, setParticipants] = useState<Participants>([]); // todo: use server

  // const initialPartipants = trpc.quizSession.getParticipants.useQuery({
  //   quizId: quizId
  // }); // add onSuccess handler

  trpc.quizSession.participantsSubscription.useSubscription(
    { quizId },
    {
      onData: (data) => {
        console.log("socketListener (users)", data);
        setParticipants(data);
      }
    }
  );

  const handleStartClick = () => {
    changeQuizStatusMutation.mutate({
      quizId: quizId,
      status: "ONGOING"
    });
  };

  if (isLoading) return <p>Loading...</p>;

  if (!quizSession) {
    return <p>No quiz exists with id {quizId}</p>;
  }

  if (quizSession.status === "ONGOING") {
    return <p>Quiz is already ongoing</p>; // should we redirect the user to the quiz page?
  }

  if (quizSession.status === "ENDED") {
    return <p>Quiz is already completed</p>; // should we redirect the user to the quiz-reports page?
  }

  if (quizSession.status === "CANCELLED") {
    return <p>Quiz was cancelled</p>; // should we redirect the user to the question bank page?
  }

  return (
    <div className="flex justify-center items-center  bg-background/75 rounded-lg z-40 top-1/2 left-1/2 mr-[-50%] translate-x-[-50%] translate-y-[-50%] h-screen w-screen fixed">
      <div className=" flex rounded-md bg-background border h-[90%] w-[75%]">
        <div className="w-[50%]">
          <div className=" flex flex-col justify-center items-center h-[50%] border-b">
            <Heading>Room ID: {quizSession.id}</Heading>
            <Heading>PIN: {quizSession.pinCode}</Heading>
          </div>
          <div className="flex flex-col justify-center items-center h-[50%]">
            <Heading>Scan QR Code!</Heading>
            {/*<Image*/}
            {/*  src="/mock_qr_code.png"*/}
            {/*  width={250}*/}
            {/*  height={250}*/}
            {/*  alt="QR code of quiz"*/}
            {/*  className=" drop-shadow-lg mb-5 "*/}
            {/*/>*/}

            <div>
              <QRCode value={`${window.location.origin}/student/join-quiz`} />
            </div>
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
                  Total participants: {participants.length}
                </p>
                <p className="text-xl">
                  Total participants online:{" "}
                  {
                    participants.filter(
                      (p) => p.connectionStatus === "CONNECTED"
                    ).length
                  }
                </p>
                <ScrollArea className="mt-5 h-[400px] text-center w-[100%] rounded-md border">
                  <div className="p-4">
                    <h4 className="mb-4 text-sm font-pnpm medium leading-none">
                      Participants
                    </h4>
                    {participants.map((participant) => (
                      <div key={participant.userId}>
                        <div className="text-sm flex flex-row justify-start items-center">
                          {cleanName(participant.name)}
                          <div className="ml-4">
                            {participant.connectionStatus === "CONNECTED" ? (
                              <CheckCircledIcon color="green" />
                            ) : (
                              <CrossCircledIcon color="red" />
                            )}
                          </div>
                        </div>
                        <Separator className="my-2" />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button>Start Session</Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <p className="mb-2 text-center">
                      Are you sure you&apos;re ready to start the session?
                    </p>
                    <Button
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow-sm w-full"
                      onClick={handleStartClick}
                    >
                      Yes, Start Session
                    </Button>
                  </PopoverContent>
                </Popover>

                <Button variant="destructive">Return to Dashboard</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
