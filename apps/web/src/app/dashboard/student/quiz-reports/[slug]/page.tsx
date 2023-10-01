"use client";
import { Heading } from "../../../../../components/ui";
import React, { Dispatch, SetStateAction, useState } from "react";
import { ResultTable } from "../[slug]/_component/ResultTable";

import initialData from "../../../../../../public/mockdata/student-quiz-result.json";
import { StudentView } from "src/components/ui/StudentView";

interface Props {
  quizreportData: Record<string, any>[];
  setStudentScore: Dispatch<SetStateAction<number>>;
}

export default function ExpandedReport({
  params
}: {
  params: { slug: string };
}) {
  const [pageURL, setPageURL] = useState(params.slug);

  const fullscore = initialData.fullscore;

  return (
    <StudentView>
      <div className="flex-col gap-4">
        <div className="flex justify-between">
          <Heading>{initialData["quiz-name"]}</Heading>
          <Heading>
            Score: {initialData.score}/{initialData.fullscore}
          </Heading>
        </div>
        <div className=" p-5 rounded-sm border mt-5">
          <ResultTable
            studentquizResult={initialData.result}
            studentscore={initialData.score}
            fullscore={initialData.fullscore}
          />
        </div>
      </div>
    </StudentView>
  );
}
