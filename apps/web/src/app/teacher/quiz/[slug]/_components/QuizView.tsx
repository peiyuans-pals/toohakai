"use client";

import { ButtonGrid, ButtonGridItem } from "./ButtonGrid";
import { trpc } from "../../../../../utils/trpc/client";
import { TrpcReactQueryOptions, TrpcRouterOutputs } from "../../../../../utils/trpc/lib";
import { useEffect, useRef, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import Link from "next/link";
import { QuizChart } from "./QuizChart";
import { supabase } from "../../../../../utils/supabase/client";
import { cleanName } from "../../../../../utils/strings";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";

interface Props {
  quizId: number;
  quizTitle: string;
  timePerQuestion: number;
  rngSequence: number[];
}

type CurrentQuestion = Parameters<
  NonNullable<
    Parameters<
      TrpcRouterOutputs["quizSession"]["currentQuestion"]["subscribe"]
    >[0]["next"]
  >
>[0]["question"];

type CurrentQuestionResults = Parameters<
  NonNullable<
    Parameters<
      TrpcRouterOutputs["quizSession"]["currentQuestionResults"]["subscribe"]
    >[0]["next"]
  >
>[0]["question"];

type Participants = Parameters<
  NonNullable<
    Parameters<
      TrpcRouterOutputs["quizSession"]["participantsSubscription"]["subscribe"]
    >[0]["next"]
  >
>[0];

export const QuizView = ({
  quizId,
  quizTitle,
  timePerQuestion,
  rngSequence
}: Props) => {

  const [countdown, setCountdown] = useState<number>(timePerQuestion);
  const [timerDuration, setTimerDuration] = useState<number>(timePerQuestion);
  const [questionEndedState, setQuestionEndedState] = useState<boolean>(false);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [quizComplete, setQuizComplete] = useState<boolean>(false);
  const [manualControl, setManualControl] = useState<boolean>(false);

  const [currentQuestion, setCurrentQuestion] =
    useState<CurrentQuestion | null>(null);
  const [currentQuestionResults, setCurrentQuestionResults] =
    useState<CurrentQuestionResults | null>(null);
  const [participants, setParticipants] = useState<Participants>([]);

  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    const getAccessToken = async () => {
      const supabaseSession = await supabase.auth.getSession();
      const accessToken = supabaseSession?.data.session?.access_token ?? "";
      setAccessToken(accessToken);
    };

    getAccessToken();
  }, []);

  trpc.quizSession.currentQuestion.useSubscription(
    { quizId: quizId, accessToken },
    {
      onData: (data) => {
        console.log("socketListener", data);
          console.log("currentQuestion", data.question);
          setCurrentQuestion(data.question);
          setCountdown(data.questionDuration);
      },
      onStarted: () => {
        console.log("socketListener", "quiz started");
      },
      enabled: !!accessToken
    }
  );

  trpc.quizSession.currentQuestionResults.useSubscription(
    { quizId: quizId, accessToken },
    {
      onData: (data) => {
        console.log("socketListener", data);
          console.log("currentQuestionResults", data.question);
          setCurrentQuestionResults(data.question);
          // setCountdown(data.questionDuration); // todo
      }
    }
  );

  trpc.quizSession.participantsSubscription.useSubscription(
    { quizId },
    {
      onData: (data) => {
        console.log("socketListener (users)", data);
        setParticipants(data);
      }
    }
  );

  let intervalRef = useRef<ReturnType<typeof setInterval>>();
  const decreaseNum = () => {
    if (countdown > 0) {
      setCountdown((prev) => prev - 1);
    }

    if (countdown == 0 && !questionEndedState) {
      setQuestionEndedState(true);
      setCountdown(10);
      setTimerDuration(10);
    }

    if (countdown == 0 && questionEndedState) {
      nextQn();
    }
  };

  useEffect(() => {
    intervalRef.current = setInterval(decreaseNum, 1000);
    return () => clearInterval(intervalRef.current);
  }, [countdown]);

  function nextQn() {
    if (questionIndex < rngSequence.length - 1) {
      clearInterval(intervalRef.current);
      setQuestionEndedState(false);
      setQuestionIndex(questionIndex + 1);
      setManualControl(false);
      setCountdown(timePerQuestion);
      setTimerDuration(timePerQuestion);
      intervalRef.current = setInterval(decreaseNum, 1000);
      return;
    }
    setQuizComplete(true);
    return;
  }
  function stopTimer() {
    clearInterval(intervalRef.current);
    setManualControl(true);
    return;
  }

  if (!quizId) {
    return (
      <div className="flex items-center justify-center h-screen">
        Quiz not found.
      </div>
    );
  }

  if (quizComplete) {
    return (
      <div className="p-5 flex flex-col w-screen justify-center items-center h-screen">
        <div>
          <Card>
            <CardHeader>
              <h1 className="text-4xl font-bold text-gray-900">{quizTitle}</h1>
            </CardHeader>
            <CardContent>
              <p className="text-xl">Quiz has now been completed</p>
              <p className="text-xl">
                Everyone's results have been saved successfully
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/dashboard/teacher">Return to Dashboard</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return <p>loading...</p>;
  }

  const resultsData = currentQuestionResults?.answers.map((answer) => {
    return {
      option: answer.text,
      correct: answer.isCorrect,
      label: "25%",
      tally: 25
    };
  });

  return (
    <div className="p-5 flex flex-row h-screen">
      <div className="flex flex-col flex-grow">
        <p className="text-2xl">{quizTitle}</p>
        <h1 className="text-4xl font-bold text-gray-900">
          {currentQuestion.title}
        </h1>
        <Progress className="mt-5" value={(countdown / timerDuration) * 100}></Progress>
        {questionEndedState && !manualControl && (
          <p className="text-2xl self-end">
            Next question in {countdown} seconds.
          </p>
        )}
        {!questionEndedState && !manualControl && (
          <p className="text-2xl self-end">
            Question ends in {countdown} seconds.
          </p>
        )}
        {questionEndedState && resultsData && <QuizChart results={resultsData}/>}

        <div className="flex flex-col mt-auto mb-10">
          {!questionEndedState && (
            <ButtonGrid>
              {currentQuestionResults?.answers.map((answer, key) => (
                <div key={key} className="flex items-center justify-center">
                  <ButtonGridItem
                    percentage={0}
                    className="flex items-center w-full justify-center"
                    isCorrect={answer.isCorrect}
                    questionEndedState={questionEndedState}
                  >
                    {answer.text}
                  </ButtonGridItem>
                </div>
              ))}
            </ButtonGrid>
          )}
          <div className="flex justify-end">
            {manualControl && questionEndedState && (
              <Button
                className="text-2xl h-16 w-60"
                onClick={nextQn}
                disabled={!questionEndedState}
              >
                Next Question
              </Button>
            )}
            {!manualControl && questionEndedState && (
              <Button
                className="text-2xl h-16 w-60"
                onClick={stopTimer}
                disabled={!questionEndedState}
              >
                Stop Countdown
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-64">
        <div className="p-4">
          <h3 className="mb-4 font-medium leading-none">Participants</h3>
          {participants.map((participant) => (
            <div key={participant.userId}>
              <div className="text-sm flex flex-row justify-start items-center">
                <p className="flex-1">{cleanName(participant.name)}</p>
                <div className="ml-4">
                  {participant.connectionStatus === "CONNECTED" ? ( // todo: checkbox when submitted
                    <CheckCircledIcon color="green" />
                  ) : (
                    <CrossCircledIcon color="red" />
                  )}
                </div>
              </div>
              <Separator className="my-2 mx-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
