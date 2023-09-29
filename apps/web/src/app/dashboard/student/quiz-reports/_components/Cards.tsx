import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { SizeIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface Props {
  initialData: Record<string, any>[]; // todo: set as trpc type
}

export const StudentQuizReportCards = ({ initialData }: Props) => {
  return (
    <div className="grid grid-rows-1 sm:grid-cols-4 gap-4">
      {initialData.map((item) => (
        <Link
          target={"_blank"}
          key={item.id}
          href={`/dashboard/student/quiz-reports/${item.id}`}
        >
          <Card className=" h-[200px] relative">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.topic}
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
              <div className="text-2xl font-bold">{item.name}</div>
            </CardContent>
            <CardFooter className="flex-col justify-start items-start absolute bottom-0">
              <p className="text-xs text-muted-foreground">
                Score: {item.score}/{item.fullscore}
              </p>
              <p className="text-xs text-muted-foreground">
                {item.length} Questions
              </p>
              <p className="text-xs text-muted-foreground">{item.date}</p>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
};
