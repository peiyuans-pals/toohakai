import { DashboardView, Heading } from "../../../../../components/ui";
import { trpcServer } from "../../../../../utils/trpc/server";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";

export default async function Quiz({ params }: { params: { slug: string } }) {

  const quiz = await trpcServer(cookies).quiz.get.query(parseInt(params.slug));

  if (!quiz) {
    return <p>No quiz exists with id {params.slug}</p>;
  }

  return (
    <DashboardView>
      <div className="flex flex-row justify-between items-center mb-4">
        <div>
      <p className="text-stone-700">Quiz</p>
      <Heading>{quiz.title}</Heading>
        </div>
        <Button>smth</Button>
      </div>

        <p>Number of qns: {quiz.numOfQuestions}</p>
        <p>time per qns: {quiz.timePerQuestion}</p>

    </DashboardView>
  );
}

