import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle
} from "@/components/ui/card";
import Link from "next/link";
import { EditQuestionBankButton } from "src/components/ui/EditQuestionBankButton";
import { RemoveQuestionBankButton } from "src/components/ui/RemoveQuestionBankButton";

interface Props {
  // initialData: Record<string, any>[]; // todo: set as trpc type
  initialData: unknown;
}

export const QuestionBankCards = ({ initialData }: Props) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {initialData.question_bank.map((item) => (
        <Card key={item.id} className="h-fit">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {item.topic_name}
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.topic_name}</div>
            <p className="text-xs text-muted-foreground">
              {item.question_list.length} Questions
            </p>
          </CardContent>
          <CardFooter className="flex flex-row justify-between">
            <Link
              key={item.id}
              href={`/dashboard/teacher/question-banks/${item.id}`}
            >
              <Button variant="outline">View</Button>
            </Link>
            <EditQuestionBankButton initialData={item} />
            <RemoveQuestionBankButton initialData={item} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
