"use client";
import { DashboardView, Heading } from "../../../../components/ui";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { TopicBar } from "src/app/dashboard/teacher/quiz-reports/TopicBar";
import { Input } from "@/components/ui/input";
import { QuizReportCards } from "./Cards";

import quizreport_topics from "../../../../mockdata/teacher_quizreports_topics.json";
import quizreport_summary from "../../../../mockdata/teacher_quizreports_summary.json";

export default function QuizReports() {
    const [topic, setTopic] = useState("Topics");
    const [searchText, setSearchText] = useState("");
    const [date, setDate] = useState("");

    let sortedData = [quizreport_summary]


    if (topic) {
        sortedData = quizreport_summary.summary.filter((item) => item.topic === topic)
    }

    if (date) {
        sortedData = quizreport_summary.summary.filter((item) => item.date.includes(getDate(date)))
    }

    if (searchText) {
        sortedData = quizreport_summary.summary.filter((item) => item.name.includes(searchText))
    }

    return(
        <DashboardView>
            <div className="flex flex-row justify-between items-center">
                <Heading>Quiz Reports</Heading>
            </div>
            <div className="flex flex-row justify-between items-center" >
                <TopicBar topic={topic} setTopic={setTopic} quizreport_topics= {quizreport_topics} />
                <Input type="month" onChange={e => console.log(getDate(e.target.value))}/>
                <Input placeholder="Quiz Name" />
            </div>
            <QuizReportCards initialData={sortedData}/>
        </DashboardView>
    );
}


function getDate(input_date) {
    var month = input_date.split(" ")[1];
    switch(month){
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
    
    return month + " " +  input_date.split(" ")[0]
}