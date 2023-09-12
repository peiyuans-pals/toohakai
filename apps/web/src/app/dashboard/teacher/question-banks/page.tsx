import { DashboardView, Heading } from "../../../../components/ui";
import { trpcServer } from "../../../../utils/trpc/server";
import { QuestionBankDataTable } from "./DataTable";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { QuestionBankCards } from "./Cards";

export default async function QuestionBanks() {
  const questionBanks = await trpcServer(cookies).questionBank.list.query();

  return (
    <DashboardView>
      <div className="flex flex-row justify-between items-center mb-4">
        <Heading>QuestionBanks</Heading>
        <div>
          <Button variant="secondary" className="mr-2">
            Edit
          </Button>
          <Button>Create New</Button>
        </div>
      </div>
      {/*<Link href="/dashboard/teacher/question-banks/1234">*/}
      {/*  <button className="btn">Click me to open a question bank</button>*/}
      {/*</Link>*/}
      {/*<QuestionBankDataTable initialData={questionBanks} />*/}

      <QuestionBankCards initialData={questionBanks} />
    </DashboardView>
  );
}
