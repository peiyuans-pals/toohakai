"use client";

import {
  ButtonGrid,
  ButtonGridItem
} from "src/app/teacher/quiz/_components/ButtonGrid";
import { trpc } from "../../../../utils/trpc/client";
import { TrpcReactQueryOptions } from "../../../../utils/trpc/lib";
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

interface Props {
  id: number;
  initialData: TrpcReactQueryOptions["questionBank"]["get"]["initialData"];
}
export const QuizView = ({ id, initialData }: Props) => {
  const { data: questionBank, refetch } = trpc.questionBank.get.useQuery(id, {
    initialData
  });
  const [countdown, setCountdown] = useState<number>(10);
  const [questionEndedState, setQuestionEndedState] = useState<boolean>(false);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [quizComplete, setQuizComplete] = useState<boolean>(false);
  const [manualControl, setManualControl] = useState<boolean>(false);

  let intervalRef = useRef<ReturnType<typeof setInterval>>();
  const decreaseNum = () => {
    if (countdown > 0) {
      setCountdown((prev) => prev - 1);
    }

    if (countdown == 0 && !questionEndedState) {
      setQuestionEndedState(true);
      setCountdown(10);
    }

    if (countdown == 0 && questionEndedState) {
      nextQn();
    }
  };

  useEffect(() => {
    intervalRef.current = setInterval(decreaseNum, 1000);
    return () => clearInterval(intervalRef.current);
  }, [countdown, decreaseNum]);
  const question_id = [0, 1]; //mock question IDs
  let i = 0;

  function nextQn() {
    if (questionIndex < question_id.length - 1) {
      clearInterval(intervalRef.current);
      setQuestionEndedState(false);
      setQuestionIndex(questionIndex + 1);
      setManualControl(false);
      setCountdown(10);
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
  //mock results (only percentage of people who chose option was hardcoded)
  let results_1 = [
    {
      option:
        questionBank?.questions[question_id[questionIndex]].answers[0].text,
      correct:
        questionBank?.questions[question_id[questionIndex]].answers[0]
          .isCorrect,
      label: `${35}%`,
      tally: 35
    },
    {
      option:
        questionBank?.questions[question_id[questionIndex]].answers[1].text,
      correct:
        questionBank?.questions[question_id[questionIndex]].answers[1]
          .isCorrect,
      label: `${10}%`,
      tally: 10
    },
    {
      option:
        questionBank?.questions[question_id[questionIndex]].answers[2].text,
      correct:
        questionBank?.questions[question_id[questionIndex]].answers[2]
          .isCorrect,
      label: `${5}%`,
      tally: 5
    },
    {
      option:
        questionBank?.questions[question_id[questionIndex]].answers[3].text,
      correct:
        questionBank?.questions[question_id[questionIndex]].answers[3]
          .isCorrect,
      label: `${50}%`,
      tally: 50
    }
  ];

  if (!questionBank) {
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
              <h1 className="text-4xl font-bold text-gray-900">
                {questionBank.title}
              </h1>
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

  return (
    <div className="p-5 flex flex-col h-screen">
      <h1 className="text-4xl font-bold text-gray-900">{questionBank.title}</h1>
      <p className="text-2xl">
        {questionBank.questions[question_id[questionIndex]].title}
      </p>
      <Progress className="mt-5" value={countdown * 10}></Progress>
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
      {questionEndedState && <QuizChart results={results_1}></QuizChart>}

      <div className="flex flex-col mt-auto mb-10">
        {!questionEndedState && (
          <ButtonGrid>
            {questionBank.questions[question_id[questionIndex]].answers.map(
              (answer, key) => (
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
              )
            )}
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
  );
};
