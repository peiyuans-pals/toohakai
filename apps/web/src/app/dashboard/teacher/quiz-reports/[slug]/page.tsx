"use client"
import { DashboardView, Heading } from "../../../../../components/ui";
import React, { Dispatch, SetStateAction, useState } from "react";
import initialData from "../../../../../mockdata/teacher_quizreports_expanded.json";
import { StudentDropDownBar } from "./StudentDropDownBar";
import { QuizResultTable } from "./QuizResultTable";

interface Props {
  quizreportData: Record<string, any>[];
  setStudentScore: Dispatch<SetStateAction<number>>;
}

export default function ExpandedReport({ params }: { params: { slug: string }}) {
  //trpc.call for quizreportexpanded data window.location.href.split("/").pop()
  const [pageURL, setPageURL] = useState(params.slug);
  const [studentquiz, setStudentQuiz] = useState(initialData.data[0].quiz)

  var student_names = initialData.data.map((student) => student.student);
  const [studentName, setStudentName] = useState(student_names[0]);
  
  let studentscore = initialData.data[0].score;
  let filteredStudentQuiz =initialData.data[0].quiz;
  const fullscore = initialData.fullscore;
  
  if (studentName) {
    var filteredStudent = initialData.data.find((student) => student.student===studentName);
    filteredStudentQuiz = filteredStudent?.quiz!;
    studentscore = filteredStudent?.score!    
  }

  return (
    <DashboardView>
      <Heading>{initialData.name}</Heading>
      <div className="flex pt-2">
        <StudentDropDownBar studentlist={student_names} student={studentName} setStudent={setStudentName}/>
      </div>
      <QuizResultTable studentquizResult={filteredStudentQuiz} studentname={studentName} studentscore={studentscore} fullscore={fullscore}/>
    </DashboardView>
  );
}
