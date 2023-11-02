"use client";

import { ButtonGrid, ButtonGridItem } from "./ButtonGrid";
import { trpc } from "../../../../../utils/trpc/client";
import {
  TrpcReactQueryOptions,
  TrpcRouterOutputs
} from "../../../../../utils/trpc/lib";
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

interface Props {
  quizId: number;
  questionBankId: number;
  quizTitle: string;
  initialData: TrpcReactQueryOptions["questionBank"]["get"]["initialData"];
  timePerQuestion: number;
  rngSequence: number[];
}
export const QuizView = ({
  quizId,
  questionBankId,
  quizTitle,
  initialData,
  timePerQuestion,
  rngSequence
}: Props) => {
  const { data: questionBank } = trpc.questionBank.get.useQuery(
    questionBankId,
    {
      initialData,
      refetchOnMount: false
    }
  );

  useEffect(() => {
    console.log("rngSequence", rngSequence);
  }, []);
  const [countdown, setCountdown] = useState<number>(timePerQuestion);
  const [timer, setTimer] = useState<number>(timePerQuestion);
  const [isQuestionResultsMode, setIsQuestionResultsMode] =
    useState<boolean>(false);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [quizComplete, setQuizComplete] = useState<boolean>(false);
  const [manualControl, setManualControl] = useState<boolean>(false);

  const [currentQuestion, setCurrentQuestion] =
    useState<CurrentQuestion | null>(null);
  const [currentQuestionResults, setCurrentQuestionResults] =
    useState<CurrentQuestionResults | null>(null);

  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    const getAccessToken = async () => {
      const supabaseSession = await supabase.auth.getSession();
      const accessToken = supabaseSession?.data.session?.access_token ?? "";
      setAccessToken(accessToken);
    };

    getAccessToken();
  }, []);

  const changeQuestionMutation = trpc.quizSession.changeQuestion.useMutation({
    onSuccess: () => {
      console.log("changeQuestionMutation success");
    }
  });

  const quiz = trpc.quiz.get.useQuery(quizId);

  const changeStatusMutation = trpc.quizSession.changeStatus.useMutation({
    onSuccess: () => {
      console.log("changeStatusMutation success");
      // todo: navigate to results page
    }
  });

  useEffect(() => {
    // only once: check if quiz currentQuestion is null, if so, change to first question
    if (quiz.data && quiz.data.currentQuestionId === null) {
      changeQuestionMutation.mutate({
        quizId: quizId,
        questionId: rngSequence[0],
        questionDisplayMode: "QUESTION"
      });
    }
  }, [quiz.data]);

  function nextQn() {
    if (questionIndex < rngSequence.length - 1) {
      console.log("nextQn", questionIndex, rngSequence.length - 1);
      const nextQnId = rngSequence[questionIndex + 1];

      changeQuestionMutation.mutate({
        quizId: quizId,
        questionId: nextQnId,
        questionDisplayMode: "QUESTION"
      });

      setQuestionIndex((cur) => cur + 1);
      // setManualControl(false);
    } else {
      setQuizComplete(true);
      console.log("quiz complete");
      // todo call server
      changeStatusMutation.mutate({
        quizId: quizId,
        status: "ENDED"
      });
    }
  }

  function stopReviewCountdown() {
    setManualControl(true);
    return;
  }

  trpc.quizSession.timeLeft.useSubscription(
    {
      quizId: quizId
    },
    {
      enabled: !quizComplete,
      onData: (data) => {
        // console.log("timeLeft", data);
        // if data.timeLeft is not NAN, set countdown to data.timeLeft
        if (!isNaN(data.timeLeft)) {
          setCountdown(Math.floor(data.timeLeft / 1000)); // make this int
        }
        setIsQuestionResultsMode(data.currentQuestionDisplayMode === "REVIEW");
      }
    }
  );

  trpc.quizSession.currentQuestion.useSubscription(
    {
      quizId,
      accessToken
    },
    {
      enabled: !quizComplete,
      onData: (data) => {
        console.log("currentQuestion", data);
        setCurrentQuestion(data.question);
      }
    }
  );

  trpc.quizSession.currentQuestionResults.useSubscription(
    {
      quizId,
      accessToken
    },
    {
      enabled: !quizComplete,
      onData: (data) => {
        console.log("currentQuestionResults", data);
        setCurrentQuestionResults(data.question);
      }
    }
  );

  // when countdown hits 0, call changeQuestion
  useEffect(() => {
    if (countdown <= 0 && !isQuestionResultsMode) {
      // switch to results view
      changeQuestionMutation.mutate({
        quizId: quizId,
        questionId: currentQuestion?.id ?? 0,
        questionDisplayMode: "REVIEW"
      });
    } else if (countdown <= 0 && isQuestionResultsMode && !manualControl) {
      // switch to next question
      nextQn();
    }
  }, [countdown]);

  if (!quiz) {
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
              <p className="text-xl">Results have been saved successfully</p>
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
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-5 flex flex-col h-screen">
      <div className="flex flex-row">
        <h1 className="text-2xl">{quizTitle}</h1>
        <div className="flex-grow"></div>

        {isQuestionResultsMode && !manualControl && (
          <p className="text-2xl self-end">
            Next question in {countdown} seconds.
          </p>
        )}

        {!isQuestionResultsMode && !manualControl && (
          <p className="text-2xl self-end">
            Question ends in {countdown} seconds.
          </p>
        )}
      </div>
      <Progress
        className="mt-1 mb-5"
        value={((countdown % timer) / timer) * 100}
      ></Progress>
      <p className="text-4xl font-bold text-gray-900">
        {currentQuestion.title}
      </p>
      {isQuestionResultsMode && currentQuestionResults && (
        <QuizChart results={currentQuestionResults?.results}></QuizChart>
      )}

      <div className="flex flex-col mt-auto mb-10">
        {!isQuestionResultsMode && (
          <ButtonGrid>
            {currentQuestion.answers.map((answer, key) => (
              <div key={key} className="flex items-center justify-center">
                <ButtonGridItem
                  percentage={0}
                  className="flex items-center w-full justify-center"
                  questionEndedState={isQuestionResultsMode}
                >
                  {answer.text}
                </ButtonGridItem>
              </div>
            ))}
          </ButtonGrid>
        )}
        <div className="flex justify-end">
          {manualControl && isQuestionResultsMode && (
            <Button
              className="text-2xl h-16 w-60"
              onClick={nextQn}
              disabled={!isQuestionResultsMode}
            >
              Next Question
            </Button>
          )}
          {!manualControl && isQuestionResultsMode && (
            <Button
              className="text-2xl h-16 w-60"
              onClick={stopReviewCountdown}
              disabled={!isQuestionResultsMode}
            >
              Stop Countdown
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
