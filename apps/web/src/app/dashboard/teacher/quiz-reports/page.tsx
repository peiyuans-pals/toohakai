"use client";
import { DashboardView, Heading } from "../../../../components/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TopicBar } from "src/app/dashboard/teacher/quiz-reports/_components/TopicBar";
import { Input } from "@/components/ui/input";
import { QuizReportCards } from "src/app/dashboard/teacher/quiz-reports//_components/Cards";

import quizreport_topics from "../../../../mockdata/teacher_quizreports_topics.json";
import quizreport_summary from "../../../../mockdata/teacher_quizreports_summary.json";
import { MonthPicker } from "./_components/MonthPicker";

export default function QuizReports() {
  const [topic, setTopic] = useState("");
  const [searchText, setSearchText] = useState("");
  const [date, setDate] = useState("");

  //TODO: Do a proper fix for default
  let sortedData = quizreport_summary.summary.filter((item) =>
    item.topic.includes("")
  );

  if (topic || date || searchText) {
    sortedData = quizreport_summary.summary.filter(
      (item) =>
        item.topic.includes(topic) &&
        item.date.includes(date) &&
        item.name.includes(searchText)
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
          quizreport_topics={quizreport_topics}
        />
        <MonthPicker date={date} setDate={setDate} />
      </div>
      <div className="pt-2">
        <QuizReportCards initialData={sortedData} />
      </div>
    </DashboardView>
  );
}
