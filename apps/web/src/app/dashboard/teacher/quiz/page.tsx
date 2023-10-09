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
        <Heading>Quiz</Heading>
      </div>
				<div className="flex flex-row justify-between items-center mb-4">
        <p>Start a quiz session by selecting "Start quiz" on a question bank.</p>
      </div>
				<div className="flex gap-2 flex-row justify-start items-center mb-4">
        <NewQuestionBankButton/> 

			</div>
      <QuestionBankCards initialData={questionBanks} />
    </DashboardView>
  );
}
