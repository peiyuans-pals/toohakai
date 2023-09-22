"use client";

import {
  ButtonGrid,
  ButtonGridItem
} from "src/app/teacher/quiz/_components/ButtonGrid";
import { trpc } from "../../../../utils/trpc/client";
import { TrpcReactQueryOptions } from "../../../../utils/trpc/lib";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface Props {
  id: number;
  initialData: TrpcReactQueryOptions["questionBank"]["get"]["initialData"];
}
export const QuizView = ({ id, initialData }: Props) => {
  const { data: questionBank, refetch } = trpc.questionBank.get.useQuery(id, {
    initialData
  });
  const router = useRouter()
  const [countdown, setCountdown] = useState<number>(10);
  const [timerEnded, setTimerState] = useState<boolean>(false);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  
  const percentage = [25, 10, 15, 50]; //Percentage of students choosing option 1,2,3,4 respectively

  // every second, decrement countdown
  useEffect(() => {
    if (countdown >= 0) {
      setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      //setCountdown(10);
      setTimerState(true);
    }
  }, [countdown]);
  const question_id = [0, 1]; //mock question IDs
  let i = 0;

  function nextQn() {
    
    if (questionIndex < question_id.length-1){
    setCountdown(10);
    setTimerState(false);
    setQuestionIndex(questionIndex + 1);
    return 
    }
    router.push("/dashboard/")
    

  }

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
      <p className="text-xl">
        {questionBank.questions[question_id[questionIndex]].title}
      </p>
      <Progress className="mt-5" value={countdown * 10}></Progress>
      <div className="flex flex-col mt-auto mb-10">
        <ButtonGrid>
          {questionBank.questions[question_id[questionIndex]].answers.map(
            (answer, key) => (
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
            )
          )}
        </ButtonGrid>
        <Button className="text-4xl h-20" onClick={nextQn} disabled={!timerEnded}>
          Next
        </Button>
      </div>
    </div>
  );
};
