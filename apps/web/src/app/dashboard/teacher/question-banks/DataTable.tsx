"use client";

import { trpc } from "../../../../utils/trpc/client";
import Link from "next/link";
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
import { EditQuestionButton } from "src/components/ui/EditQuestionButton";
import { RemoveQuestionButton } from "src/components/ui/RemoveQuestionButton";
interface Props {
  // initialData: any[];
  initialData: unknown;
}

export const QuestionBankDataTable = ({ initialData }: Props) => {
  // const { data: questionBanksData } = trpc.questionBank.list.useQuery(
  //   undefined,
  //   {
  //     initialData
  //   }
  // );
  const questionBanksData = initialData;
  return (
    <div>
      <Table>
        <TableCaption>List of questions in question bank</TableCaption>
        <TableHeader>
          <TableRow>
            {/* <TableHead className="w-[100px]">ID</TableHead> */}
            <TableHead className="w-full">Question</TableHead>
            <TableHead colSpan={2}>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {questionBanksData.question_bank[0].question_list.map(
            (questionBank) => (
              <TableRow key={questionBank.id}>
                {/* <TableCell className="font-medium">{questionBank.id}</TableCell> */}
                <TableCell>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item">
                      <AccordionTrigger>
                        {questionBank.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul>
                          <li className="flex items-center">
                            1. {questionBank.option1}
                            {questionBank.correct == "1" && (
                              <CheckCircledIcon className="ml-1" />
                            )}
                          </li>
                          <li className="flex items-center">
                            2. {questionBank.option2}
                            {questionBank.correct == "2" && (
                              <CheckCircledIcon className="ml-1" />
                            )}
                          </li>
                          <li className="flex items-center">
                            3. {questionBank.option3}
                            {questionBank.correct == "3" && (
                              <CheckCircledIcon className="ml-1" />
                            )}
                          </li>
                          <li className="flex items-center">
                            4. {questionBank.option4}
                            {questionBank.correct == "4" && (
                              <CheckCircledIcon className="ml-1" />
                            )}
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TableCell>
                <TableCell className="flex">
                  <EditQuestionButton initialData={questionBank}/>
                  <RemoveQuestionButton initialData={questionBank}/>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
      {/* <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {questionBanksData.question_bank[0].question_list.map((questionBank) => (
            <tr key={questionBank.id}>
              <td className="border px-4 py-2">{questionBank.id}</td>
              <td className="border px-4 py-2">{questionBank.name}</td>
              <td className="border px-4 py-2 flex flex-row gap-1">
                <Link
                  href={`/dashboard/teacher/question-banks/${questionBank.id}`}
                >
                  <button className="btn btn-primary">View</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};
