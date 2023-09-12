import { DashboardView, Heading } from "../../../../components/ui";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Quizzes() {
  return (
    <DashboardView>
      <div className="flex flex-row justify-between items-center">
        <Heading>Quizzes</Heading>
        <Button>Create New</Button>
      </div>
      <Link href="/dashboard/teacher/quizzes/1234">
        <Button>Debug: Open a completed quiz from the past</Button>
      </Link>
    </DashboardView>
  );
}
