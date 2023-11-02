"use client";
import { DashboardView, Heading } from "../../../../components/ui";
import { useState } from "react";
import { TopicBar } from "src/app/dashboard/teacher/quiz-reports/_components/TopicBar";
import { Input } from "@/components/ui/input";
import { QuizReportCards } from "src/app/dashboard/teacher/quiz-reports//_components/Cards";

import { MonthPicker } from "./_components/MonthPicker";
import { trpc } from "../../../../utils/trpc/client";

export default function QuizReports() {

  const { data: reportsSummary, isLoading } = trpc.quiz.getReportsSummary.useQuery();

  const [topic, setTopic] = useState("");
  const [searchText, setSearchText] = useState("");
  const [date, setDate] = useState("");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!reportsSummary && !isLoading) {
    return <div>
      <p>No reports</p>
    </div>;
  }

  const reportsSummaryArray = Object.values(reportsSummary!);

  const topics = reportsSummaryArray.map((item) => ({ topic: item.quiz.QuestionBank.title }));

  //TODO: Do a proper fix for default
  let sortedData = (reportsSummaryArray).filter((item) =>
    item.quiz.title.includes("")
  );

  if (topic || date || searchText) {
    sortedData = reportsSummaryArray.filter(
      (item) =>
        item.quiz.title.includes(topic) &&
        // item.quiz.updatedAt.includes(date) &&
        item.quiz.QuestionBank.title.includes(searchText)
    );
  }

  return (
    <DashboardView>
      <div className="flex flex-row justify-between items-center">
        <Heading>Quiz Reports</Heading>
      </div>
      <div className="flex flex-row justify-between items-center gap-4 pt-2">
        <Input
          name="SearchBar"
          placeholder="Quiz Name"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <TopicBar
          topic={topic === "" ? "Topic" : topic}
          setTopic={setTopic}
          quizreport_topics={topics}
        />
        <MonthPicker date={date} setDate={setDate} />
      </div>
      <div className="pt-2">
        <QuizReportCards initialData={sortedData} />
      </div>
    </DashboardView>
  );
}
