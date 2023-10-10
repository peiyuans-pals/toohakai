"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { EditQuestionButton } from "./EditQuestionButton";
import { RemoveQuestionButton } from "./RemoveQuestionButton";
import { TrpcReactQueryOptions } from "../../../../../../utils/trpc/lib";
import { trpc } from "../../../../../../utils/trpc/client";

interface Props {
  id: number;
  initialData: TrpcReactQueryOptions["questionBank"]["get"]["initialData"];
}

export const QuestionsDataTable = ({ id, initialData }: Props) => {
  const { data: questionBank, refetch } = trpc.questionBank.get.useQuery(id, {
    initialData
  });

  if (!questionBank) {
    return <p>Question bank doesnt exist</p>;
  }

  if (!questionBank.questions.length) {
    return <p className="center">Question bank doesnt have any questions</p>;
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-full">Question</TableHead>
            <TableHead colSpan={2}>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {questionBank.questions.map((question) => (
            <TableRow key={question.id}>
              <TableCell>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item">
                    <AccordionTrigger className="text-left">
                      {question.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul>
                        {question.answers.map((answer, index) => (
                          <li key={answer.id} className="flex items-center">
                            {index + 1}. {answer.text}
                            {answer.isCorrect && (
                              <CheckCircledIcon className="ml-1" />
                            )}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TableCell>
              <TableCell className="flex gap-1 flex-col lg:flex-row justify-between items-center">
                <EditQuestionButton
                  questionBankId={id}
                  previousData={question}
                />
                <RemoveQuestionButton
                  questionBankId={id}
                  questionId={question.id}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
