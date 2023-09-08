import {DashboardView, Heading} from "../../../../components/ui";
import Link from "next/link";
import {trpcServer} from "../../../../utils/trpc/server";
import {QuestionBankDataTable} from "./DataTable";

export default async function QuestionBanks () {

  const questionBanks = await trpcServer.questionBank.list.query()

  return (
    <DashboardView>
      <div className="flex flex-row justify-between items-center">
        <Heading>QuestionBanks</Heading>
        <button className="btn btn-primary w-32 h-6">Create New</button>
      </div>
      {/*<Link href="/dashboard/teacher/question-banks/1234">*/}
      {/*  <button className="btn">Click me to open a question bank</button>*/}
      {/*</Link>*/}
      <QuestionBankDataTable initialData={questionBanks} />
    </DashboardView>
  );
}
