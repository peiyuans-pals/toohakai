import { DashboardView, Heading } from "../../../../../components/ui";
import { NewQuestionButton } from "src/components/ui/NewQuestionButton";
import MockData from "../../../../../../public/mockdata/question-bank.json";
import { QuestionBankDataTable } from "../DataTable";
export default function QuestionBank() {
  return (
    <DashboardView>
      <div className="flex flex-row justify-between items-center mb-4">
        <Heading>Question Bank - Bank</Heading>
        <div>
          <NewQuestionButton />
        </div>
      </div>
      <QuestionBankDataTable initialData={MockData} />
    </DashboardView>
  );
}
