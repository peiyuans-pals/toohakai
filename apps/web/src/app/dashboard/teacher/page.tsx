"use server";

import { DashboardView, Text } from "../../../components/ui";
import { trpcServer } from "../../../utils/trpc/server";
import { cookies } from "next/headers";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { SummaryCard, SummaryCardProps } from "./SummaryCard";
import { getCleanedNameFromIdentities } from "../../../utils/strings";
// import RandomNumber from "./_components/RandomNumber";

export default async function DashboardRoot() {
  const questionBankCount = await trpcServer(
    cookies
  ).questionBank.count.query();

  const me = await trpcServer(cookies).user.me.query();
  const name = getCleanedNameFromIdentities(me);

  const summaryData: (SummaryCardProps & { href?: string })[] = [
    {
      title: "Average Quiz Score",
      currentValue: "82%",
      changeInValue: "+6%",
      href: "/dashboard/teacher/quiz-reports"
    },
    {
      title: "Quiz Banks",
      currentValue: questionBankCount.toString(),
      changeInValue: "+0",
      href: "/dashboard/teacher/question-banks"
    }
  ];

  const quizzes = await trpcServer(cookies).quiz.list.query();

  const ongoingQuizzes = quizzes.filter((quiz) => quiz.status === "ONGOING");

  return (
    <DashboardView>
      <Card className="shadow-stone-50 mb-4">
        <CardHeader>
          <CardTitle>Good afternoon, {name}</CardTitle>
        </CardHeader>
      </Card>

      {ongoingQuizzes.length > 0 && (
      <div className="mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {ongoingQuizzes.map((quiz) => (
            <SummaryCard
              key={quiz.id}
              title="ongoing quiz"
              subtitle={quiz.title}
              currentValue={quiz.status}
              href={`/teacher/quiz/${quiz.id}`}
            />
          ))}
        </div>
      </div>
      )
      }

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {summaryData.map((summaryItem) => (
          <SummaryCard
            key={summaryItem.title}
            title={summaryItem.title}
            currentValue={summaryItem.currentValue}
            changeInValue={summaryItem.changeInValue}
            href={summaryItem.href}
          />
        ))}
      </div>

      {/*<RandomNumber />*/}
    </DashboardView>
  );
}
