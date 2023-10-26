"use server";
import { cookies } from "next/headers";
import { trpcServer } from "../../../../utils/trpc/server";
import { QuizView } from "./_components/QuizView";

interface PageProps {
  params: { slug: string };
}
export default async function Quiz({ params }: PageProps) {
  const id = parseInt(params.slug);
  const quiz = await trpcServer(cookies).quiz.get.query(id);
  const timePerQuestion = 20;//quiz?.timePerQuestion;
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
    return (
      <div>
        <QuizView
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

