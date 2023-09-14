import { DashboardView, Heading } from "../../../../components/ui";
import { trpcServer } from "../../../../utils/trpc/server";
import { QuestionBankDataTable } from "./DataTable";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { QuestionBankCards } from "./Cards";
import { NewQuestionBankButton } from "src/components/ui/NewQuestionBankButton";
import MockData from "../../../../../public/mockdata/question-bank.json";

export default async function QuestionBanks() {
  const questionBanks = await trpcServer(cookies).questionBank.list.query();

  return (
    <DashboardView>
      <div className="flex flex-row justify-between items-center mb-4">
        <Heading>Question Bank - Topics</Heading>
        <div>
          {/* <Button variant="secondary" className="mr-2">
            Edit
          </Button> */}
          <NewQuestionBankButton />
        </div>
      </div>
      {/*<Link href="/dashboard/teacher/question-banks/1234">*/}
      {/*  <button className="btn">Click me to open a question bank</button>*/}
      {/*</Link>*/}
      {/*<QuestionBankDataTable initialData={questionBanks} />*/}

      {/* <QuestionBankCards initialData={questionBanks} /> */}
      <QuestionBankCards initialData={MockData} />
    </DashboardView>
  );
}
