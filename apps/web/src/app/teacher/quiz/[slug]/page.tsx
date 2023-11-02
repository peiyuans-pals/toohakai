"use server";
import { cookies } from "next/headers";
import { trpcServer } from "../../../../utils/trpc/server";
import { QuizView } from "./_components/QuizView";

interface PageProps {
  params: { slug: string };
}
export default async function Quiz({ params }: PageProps) {
  const quizId = parseInt(params.slug);
  const quiz = await trpcServer(cookies).quiz.get.query(quizId);
  const timePerQuestion = quiz!.timePerQuestion; //quiz?.timePerQuestion;
  const numOfQuestions = quiz?.numOfQuestions;
  const questionBankId = quiz?.questionBankId;
  const quizTitle = quiz?.title;
  function getRngSequence(questionLen: number, questionsToUse: number) {
    const randomNumbers: number[] = [];
    while (randomNumbers.length < questionsToUse) {
      const randomNum = Math.floor(Math.random() * questionLen);
      if (!randomNumbers.includes(randomNum)) {
        randomNumbers.push(randomNum);
      }
    }
    return randomNumbers;
  }
  if (
    typeof questionBankId === "number" &&
    typeof timePerQuestion === "number" &&
    typeof quizTitle === "string"
  ) {
    const questionBank = await trpcServer(cookies).questionBank.get.query(
      questionBankId
    );

    const rngSequence = getRngSequence(
      questionBank?.questions!.length!,
      numOfQuestions!
    );

    if (!quiz) {
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <p>No Quiz exists</p>
        </div>
      );
    }

    if (quiz?.status === "ENDED") {
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <p>Quiz has ended</p>
        </div>
      );
    }

    return (
      <div>
        <QuizView
          quizId={quizId}
          questionBankId={questionBankId}
          quizTitle={quizTitle}
          initialData={questionBank}
          timePerQuestion={timePerQuestion}
          rngSequence={rngSequence}
        ></QuizView>
      </div>
    );
  } else return <p>No Quiz exists</p>;
}
