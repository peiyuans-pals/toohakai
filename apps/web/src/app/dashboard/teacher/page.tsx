"use server";

import { DashboardView, Text } from "../../../components/ui";
import { trpcServer } from "../../../utils/trpc/server";
import { cookies } from "next/headers";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { SummaryCard, SummaryCardProps } from "./SummaryCard";
import { getCleanedNameFromIdentities } from "../../../utils/strings";
import RandomNumber from "./_components/RandomNumber";

const summaryData: SummaryCardProps[] = [
  {
    title: "Average Quiz Score",
    currentValue: "82%",
    changeInValue: "+6%"
  },
  {
    title: "Quiz Banks",
    currentValue: "12",
    changeInValue: "+2"
  }
];

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
      changeInValue: "+6%"
    },
    {
      title: "Quiz Banks",
      currentValue: questionBankCount.toString(),
      changeInValue: "+0",
      href: "/dashboard/teacher/question-banks"
    }
  ];

  return (
    <DashboardView>
      <Card className="shadow-stone-50 mb-4">
        <CardHeader>
          <CardTitle>Good afternoon, {name}</CardTitle>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-4 gap-4">
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

      <RandomNumber />
    </DashboardView>
  );
}
