"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle
} from "@/components/ui/card";
import Link from "next/link";
import { trpc } from "../../../../../utils/trpc/client";
import { TrpcReactQueryOptions } from "../../../../../utils/trpc/lib";
import { NewQuizButton } from "./NewQuizButton";

interface Props {
  initialData: TrpcReactQueryOptions["questionBank"]["list"]["initialData"];
}

export const QuestionBankCards = ({ initialData }: Props) => {
  const { data: questionsBanks, isLoading } = trpc.questionBank.list.useQuery(
    undefined,
    {
      initialData
    }
  );
  console.log(questionsBanks);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
      {questionsBanks?.map((questionBank) => (
        <Card key={questionBank.id} className="h-fit">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-semibold">
              {questionBank.title}
            </CardTitle>
            {/*<svg*/}
            {/*  xmlns="http://www.w3.org/2000/svg"*/}
            {/*  viewBox="0 0 24 24"*/}
            {/*  fill="none"*/}
            {/*  stroke="currentColor"*/}
            {/*  strokeLinecap="round"*/}
            {/*  strokeLinejoin="round"*/}
            {/*  strokeWidth="2"*/}
            {/*  className="h-4 w-4 text-muted-foreground"*/}
            {/*>*/}
            {/*  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />*/}
            {/*</svg>*/}
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              {questionBank.questionsCount} Questions
            </p>
          </CardContent>
          <CardFooter>
            <div className="flex flex-row md:flex-col lg:flex-col xl:flex-col 2xl:flex-row justify-between w-full gap-1">
              <Link
                key={questionBank.id}
                href={`/dashboard/teacher/quiz/${questionBank.id}`}
              >
                <Button className="w-full h-full" variant="outline">
                  View
                </Button>
              </Link>
              <NewQuizButton initialData={questionBank}></NewQuizButton>
            </div>
          </CardFooter>
          {/*<CardFooter className="flex flex-row justify-between">*/}
          {/*  <EditQuestionBankButton initialData={questionBank} />*/}
          {/*  <RemoveQuestionBankButton initialData={questionBank} />*/}
          {/*</CardFooter>*/}
        </Card>
      ))}
    </div>
  );
};
