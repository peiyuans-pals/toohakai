import {DashboardView, Heading} from "../../../../components/ui";
import {trpcServer} from "../../../../utils/trpc/server";
import {QuestionBankDataTable} from "./DataTable";
import {cookies} from "next/headers";

export default async function QuestionBanks () {

  const questionBanks = await trpcServer(cookies).questionBank.list.query()

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
