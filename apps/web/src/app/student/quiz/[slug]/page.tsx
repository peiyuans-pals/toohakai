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
  const timePerQuestion = quiz?.timePerQuestion;
  const questionBankId = quiz?.questionBankId;
  const quizTitle = quiz?.title;

  if (!quiz) {
    return <div className="flex flex-col items-center justify-center h-screen">
    <p>No Quiz exists</p>
    </div>
  }

  if (quiz.status === "ENDED") {
    return <div className="mb-4 flex flex-col items-center justify-center h-screen">
    <p>Quiz has ended</p>
    </div>
  }

  return (
    <div>
      <QuizView quiz={quiz}></QuizView>;
    </div>
  );
}
