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
        <div>
          <Input
            name="MonthPicker"
            type="month"
            onChange={(e) => setDate(getDate(e.target.value))}
          />
        </div>
      </div>
      <div className="pt-2">
        <QuizReportCards initialData={sortedData} />
      </div>
    </DashboardView>
  );
}

function getDate(input_date: string) {
  if (input_date === "") {
    return "";
  }

  var month = input_date.split("-")[1];

  switch (month) {
    case "01":
      month = "January";
      break;
    case "02":
      month = "February";
      break;
    case "03":
      month = "March";
      break;
    case "04":
      month = "April";
      break;
    case "05":
      month = "May";
      break;
    case "06":
      month = "June";
      break;
    case "07":
      month = "July";
      break;
    case "08":
      month = "August";
      break;
    case "09":
      month = "September";
      break;
    case "10":
      month = "October";
      break;
    case "11":
      month = "November";
      break;
    case "12":
      month = "December";
      break;
  }
  return month + " " + input_date.split("-")[0];
}