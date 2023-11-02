"use client";
import { DashboardView, Heading } from "../../../../../components/ui";
import React, { Dispatch, SetStateAction, useState } from "react";
import { QuizResultTable } from "./_components/QuizResultTable";
import { StudentComboBox } from "./_components/StudentComboBox";
import { trpc } from "../../../../../utils/trpc/client";

interface Props {
  quizreportData: Record<string, any>[];
  setStudentScore: Dispatch<SetStateAction<number>>;
}

export default function ExpandedReport({
  params
}: {
  params: { slug: string };
}) {
  const { data: initialData, isLoading } =
    trpc.quiz.getReportsSummary.useQuery();

  console;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!initialData) {
    return <div>No report found</div>;
  }

  return null;

  // var student_names = initialData.map((student) => student.student);
  // const [studentName, setStudentName] = useState(student_names[0]);
  //
  // let studentscore = initialData.data[0].score;
  // let filteredStudentQuiz = initialData.data[0].quiz;
  // const fullscore = initialData.fullscore;
  //
  // if (studentName) {
  //   var filteredStudent = initialData.data.find(
  //     (student) => student.student === studentName
  //   );
  //   filteredStudentQuiz = filteredStudent?.quiz!;
  //   studentscore = filteredStudent?.score!;
  // }
  //
  // return (
  //   <DashboardView>
  //     <Heading>{initialData.name}</Heading>
  //     <div className="flex pt-2">
  //       <StudentComboBox
  //         studentlist={student_names}
  //         student={studentName}
  //         setStudent={setStudentName}
  //       />
  //     </div>
  //     <QuizResultTable
  //       studentquizResult={filteredStudentQuiz}
  //       studentname={studentName}
  //       studentscore={studentscore}
  //       fullscore={fullscore}
  //     />
  //   </DashboardView>
  // );
}
