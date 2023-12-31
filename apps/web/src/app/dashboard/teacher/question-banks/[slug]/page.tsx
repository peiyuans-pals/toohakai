"use server";

import { DashboardView, Heading } from "../../../../../components/ui";
import { AddQuestionButton } from "./_components/AddQuestionButton";
import MockData from "../../../../../../public/mockdata/question-bank.json";
import { QuestionsDataTable } from "./_components/DataTable";
import { EditQuestionBankButton } from "./_components/EditQuestionBankButton";
import { trpcServer } from "../../../../../utils/trpc/server";
import { cookies } from "next/headers";
import { Header } from "./_components/Header";
import { RemoveQuestionBankButton } from "./_components/RemoveQuestionBankButton";
import { CreateQuizButton } from "./_components/CreateQuizButton";

interface PageProps {
  params: { slug: string };
}
export default async function QuestionBank({ params }: PageProps) {
  const id = parseInt(params.slug);
  const questionBank = await trpcServer(cookies).questionBank.get.query(id);

  if (!questionBank) {
    return <p>No Question Bank exists with id {params.slug}</p>;
  }

  return (
    <DashboardView>
      <div className="flex flex-row justify-between items-center mb-4">
        <div>
          <p className="text-stone-700">Question Bank</p>
          <Header id={id} initialData={questionBank} />
        </div>
      </div>
      <div className="flex justify-end flex-row gap-2">
        <CreateQuizButton id={questionBank.id} initialData={questionBank} />
        <EditQuestionBankButton id={id} currentName={questionBank.title} />
        <AddQuestionButton
          questionBankId={id}
          questionBankName={questionBank.title}
        />
      </div>
      <QuestionsDataTable id={id} initialData={questionBank} />
    </DashboardView>
  );
}
