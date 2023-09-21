"use server";

import { DashboardView, Heading } from "../../../../../components/ui";
import { NewQuestionButton } from "./_components/NewQuestionButton";
import MockData from "../../../../../../public/mockdata/question-bank.json";
import { QuestionsDataTable } from "./_components/DataTable";
import { EditQuestionBankButton } from "./_components/EditQuestionBankButton";
import { trpcServer } from "../../../../../utils/trpc/server";
import { cookies } from "next/headers";
import { Header } from "./_components/Header";
import { RemoveQuestionBankButton } from "./_components/RemoveQuestionBankButton";

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
        <div className="flex flex-row gap-2">
          <EditQuestionBankButton id={id} currentName={questionBank.title} />
          <RemoveQuestionBankButton id={id} />
          <NewQuestionButton questionBankId={id} questionBankName={questionBank.title} />
        </div>
      </div>
      <QuestionsDataTable id={id} initialData={questionBank} />
    </DashboardView>
  );
}
