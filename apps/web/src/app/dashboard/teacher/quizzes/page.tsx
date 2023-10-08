import { DashboardView, Heading } from "../../../../components/ui";
import Link from "next/link";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpcServer } from "../../../../utils/trpc/server";
import { NewQuizButton } from "./_components/NewQuizButton";
import QuizGrid from "./_components/QuizGrid";

export default async function Quizzes() {
  const questionBanks = await trpcServer(cookies).questionBank.list.query(); // will this cause worse performance?
  const quizzes = await trpcServer(cookies).quiz.list.query();
  return (
    <DashboardView>
      <div className="flex flex-row justify-between items-center">
        <Heading>Quizzes</Heading>
        <NewQuizButton initialData={questionBanks} />
      </div>
      <Tabs defaultValue="all" className="w-[400px] my-2">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <QuizGrid quizzes={quizzes} />
        </TabsContent>
        <TabsContent value="upcoming">
          TODO: filter by upcoming quizzes
        </TabsContent>
        <TabsContent value="past">filter by past quizes</TabsContent>
      </Tabs>

      {/*<Link href="/dashboard/teacher/quizzes/1234">*/}
      {/*  <Button>Debug: Open a completed quiz from the past</Button>*/}
      {/*</Link>*/}
    </DashboardView>
  );
}
