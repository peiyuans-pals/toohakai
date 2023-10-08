import { TrpcRouterOutputs } from "../../../../../utils/trpc/lib";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { number } from "zod";

interface QuizGridProps {
  quizzes: NonNullable<TrpcRouterOutputs["quiz"]["list"]>;
}

const QuizGrid = ({ quizzes }: QuizGridProps) => {
  if (quizzes.length === 0) {
    return <p>No quizzes found</p>;
  }

  return (
    <div>
      {quizzes.map((quiz) => (
        <Link key={quiz.id} href={`/dashboard/teacher/quizzes/${quiz.id}`}>
          <Card className="h-fit">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-semibold">
                {quiz.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                {quiz.numOfQuestions} Question
                {quiz.numOfQuestions === 1 ? "" : "s"}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default QuizGrid;
