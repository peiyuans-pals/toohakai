import {Button, DashboardView, Heading} from "../../../../components/ui";
import Link from "next/link";

export default function Quizzes() {
  return (
    <DashboardView>
      <div className="flex flex-row justify-between items-center">
        <Heading>Quizzes</Heading>
        <Button primary>
          Create New
        </Button>
      </div>
      <Link href="/dashboard/teacher/quizzes/1234">
        <Button primary>
          Debug: Open a completed quiz from the past
        </Button>
      </Link>
    </DashboardView>
  )
}
