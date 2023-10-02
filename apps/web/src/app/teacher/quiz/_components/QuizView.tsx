"use client";

import {
  ButtonGrid,
  ButtonGridItem
} from "src/app/teacher/quiz/_components/ButtonGrid";
import { trpc } from "../../../../utils/trpc/client";
import { TrpcReactQueryOptions } from "../../../../utils/trpc/lib";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import Link from "next/link";

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

  const percentage = [25, 10, 15, 50]; //Percentage of students choosing option 1,2,3,4 respectively

  useEffect(() => {
    if (countdown > 0 && !questionEndedState) {
      setTimeout(() => setCountdown(countdown - 1), 1000);
      return;
    }
    if (countdown == 0 && questionEndedState && !manualControl) {
      nextQn();
      return;
    }
    if (countdown > 0 && questionEndedState && !manualControl) {
      setTimeout(() => setCountdown(countdown - 1), 1000);      
      return;
    }
    setQuestionEndedState(true);
    setCountdown(10);
    return;
  }, [countdown]);
  const question_id = [0, 1]; //mock question IDs
  let i = 0;

  function nextQn() {
    if (questionIndex < question_id.length - 1) {
      setCountdown(10);
      setQuestionEndedState(false);
      setManualControl(false);
      setQuestionIndex(questionIndex + 1);
      return;
    }
    setQuizComplete(true);
    return;
  }
  function pauseTimer() {
    setManualControl(true);
    return;
  }

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
      <p className="text-xl">
        {questionBank.questions[question_id[questionIndex]].title}
      </p>
      <Progress className="mt-5" value={countdown * 10}></Progress>
      {questionEndedState && !manualControl && (
        <p className="text-xl self-end">
          Next question in {countdown} seconds.
        </p>
      )}
      {!questionEndedState && !manualControl && (
        <p className="text-xl self-end">
          Question ends in {countdown} seconds.
        </p>
      )}

      <div className="flex flex-col mt-auto mb-10">
        <ButtonGrid>
          {questionBank.questions[question_id[questionIndex]].answers.map(
            (answer, key) => (
              <div key={key} className="flex items-center justify-center">
                <ButtonGridItem
                  percentage={percentage[key]}
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
        <div className="h-16 flex justify-end">
          {manualControl && questionEndedState && (
            <Button
              className="text-xl h-16 w-48"
              onClick={nextQn}
              disabled={!questionEndedState}
            >
              Next Question
            </Button>
          )}
          {!manualControl && questionEndedState && (
            <Button
              className="text-xl h-16 w-48"
              onClick={pauseTimer}
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
