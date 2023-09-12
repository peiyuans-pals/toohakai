import { DashboardView, Heading } from "../../../../components/ui";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Quizzes() {
  return (
    <DashboardView>
      <div className="flex flex-row justify-between items-center">
        <Heading>Quizzes</Heading>
        <Button>Create New</Button>
      </div>
      <Tabs defaultValue="all" className="w-[400px] my-2">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>

      <div className="mt-2"></div>
      <Link href="/dashboard/teacher/quizzes/1234">
        <Button>Debug: Open a completed quiz from the past</Button>
      </Link>
    </DashboardView>
  );
}
