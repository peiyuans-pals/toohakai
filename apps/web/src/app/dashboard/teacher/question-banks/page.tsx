import { DashboardView, Heading } from "../../../../components/ui";
import { trpcServer } from "../../../../utils/trpc/server";
import { cookies } from "next/headers";
import { QuestionBankCards } from "./_components/Cards";
import { NewQuestionBankButton } from "./_components/NewQuestionBankButton";

export default async function QuestionBanks() {
  const questionBanks = await trpcServer(cookies).questionBank.list.query();

  return (
    <DashboardView>
      <div className="flex flex-row justify-between items-center mb-4">
        <Heading>Question Bank - Topics</Heading>
        <NewQuestionBankButton />
      </div>
      <QuestionBankCards initialData={questionBanks} />
    </DashboardView>
  );
}
