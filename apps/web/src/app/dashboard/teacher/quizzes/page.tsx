import {Button, DashboardView, Heading} from "../../../../components/ui";
import Link from "next/link";

export default function Quizzes() {
  return (
    <DashboardView>
      <Heading>Quizzes</Heading>
      <Link href="/dashboard/teacher/quizzes/1234">
        <Button>
          Debug: Open a quiz
        </Button>
      </Link>
    </DashboardView>
  )
}
