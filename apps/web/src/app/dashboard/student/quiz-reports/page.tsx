"use client";

import { trpcServer } from "../../../../utils/trpc/server";
import { cookies } from "next/headers";
import { NavTopBar } from "../_component/NavTopBar";
import { TopicBar } from "../quiz-reports/_components/TopicBar";
import { StudentQuizReportCards } from "../quiz-reports/_components/Cards";

import quizreport_topics from "../../../../../public/mockdata/quiz-topics.json";
import quizreport_data from "../../../../../public/mockdata/student-quiz-reports.json";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { StudentView } from "src/components/ui/StudentView";
import { Heading } from "src/components/ui";

export default function StudentQuizReports() {
  const [topic, setTopic] = useState("");
  const [searchText, setSearchText] = useState("");
  const [date, setDate] = useState("");

  let sortedData = quizreport_data["quiz-reports"];

  if (topic || date || searchText) {
    sortedData = quizreport_data["quiz-reports"].filter(
      (item) =>
        item.topic.includes(topic) &&
        item.date.includes(date) &&
        item.name.includes(searchText)
    );
  }

  return (
    <StudentView>
      <Heading>Student Quiz Reports</Heading>
      <div className="flex flex-row justify-between items-center gap-4 pt-2">
        <Input
          name="searchBar"
          placeholder="Quiz Name"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <TopicBar
          topic={topic === "" ? "Topic" : topic}
          setTopic={setTopic}
          quizreport_topics={quizreport_topics["quiz-topics"]}
        />
        <Input
          name="MonthPicker"
          type="month"
          onChange={(e) => setDate(getDate(e.target.value))}
        />
      </div>
      <div className="pt-2">
        <StudentQuizReportCards initialData={sortedData} />
      </div>
    </StudentView>
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
