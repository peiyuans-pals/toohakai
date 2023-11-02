import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import Link from "next/link";
import { TrpcReactQueryOptions, TrpcRouterOutputs } from "../../../../../utils/trpc/lib";

type ReportsSummary = TrpcReactQueryOptions["quiz"]["getReportsSummary"]["initialData"]

type Report = ReportsSummary[keyof ReportsSummary]

interface Props {
  initialData: Record<string, any> // ReportsSummary // todo: set as trpc type
}

export const QuizReportCards = ({ initialData }: Props) => {

  if (initialData === undefined) {
    return <p>
      No reports available
    </p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
      {(Object.values(initialData)).map((reportSummary) => {

        console.log("QuizReportCards data", reportSummary)

        if (typeof reportSummary === "number") return null
        if (typeof reportSummary.quiz === "number") return null

        return <Link
          target={"_blank"}
          key={reportSummary.quiz.id.toString()}
          href={`/dashboard/teacher/quiz-reports/${reportSummary.quiz.id}`}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {reportSummary.quiz.QuestionBank?.title ?? ""}
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportSummary.quiz.title}</div>
            </CardContent>
            <CardFooter className="flex-col justify-start items-start bottom-0">
              <p className="text-xs text-muted-foreground">
                Average Score: {reportSummary.averageScore}
              </p>
              <p className="text-xs text-muted-foreground">
                {reportSummary.quiz.numOfQuestions} Questions
              </p>
              <p className="text-xs text-muted-foreground">{reportSummary.quiz.updatedAt.toLocaleString()}</p>
            </CardFooter>
          </Card>
        </Link>
      })}
    </div>
  );
};
