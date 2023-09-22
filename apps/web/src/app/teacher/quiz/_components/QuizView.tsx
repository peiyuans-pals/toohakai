"use client";

import {
  ButtonGrid,
  ButtonGridItem
} from "src/app/teacher/quiz/_components/ButtonGrid";
import { trpc } from "../../../../utils/trpc/client";
import { TrpcReactQueryOptions } from "../../../../utils/trpc/lib";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

interface Props {
  id: number;
  initialData: TrpcReactQueryOptions["questionBank"]["get"]["initialData"];
}
export const QuizView = ({ id, initialData }: Props) => {
  const { data: questionBank, refetch } = trpc.questionBank.get.useQuery(id, {
    initialData
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(10);
  const [timerEnded, setTimerState] = useState<boolean>(false);
  const percentage = [25,10,15,50]

  // every second, decrement countdown
  useEffect(() => {
    if (countdown >= 0) {
      setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      //setCountdown(10);
      setTimerState(true)
    }
  }, [countdown]);
  const question_id = 0; //mock question ID
  
 
  if (!questionBank) {
    return (
      <div className="flex items-center justify-center h-screen">
        Quiz not found.
      </div>
    );
  }

  return (
    <div className="p-5 flex flex-col h-screen">
      <h1 className="text-4xl font-bold text-gray-900">{questionBank.title}</h1>
      <p className="text-xl">{questionBank.questions[question_id].title}</p>
      <Progress className="mt-5" value={countdown * 10}></Progress>
        <div
          className="flex flex-col mt-auto mb-10"
        >
          <ButtonGrid>
            {questionBank.questions[question_id].answers.map((answer, key) => (
              <div key={key} className="flex items-center justify-center">
                <ButtonGridItem
                  percentage={percentage[key]}
                  className="flex items-center w-full justify-center"
                  isCorrect={answer.isCorrect}
                  timerEnded={timerEnded}
                >
                  {answer.text}
                </ButtonGridItem>
              </div>
            ))}
          </ButtonGrid>

          {/* <Button
            disabled={isSubmitted}
            type="submit"
            className=" text-xl mt-2"
          >
            Submit
          </Button> */}
        </div>
    </div>
  );
};
