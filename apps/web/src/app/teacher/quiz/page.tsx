"use server";
import { cookies } from "next/headers";
import { ButtonGroup, ButtonGroupItem } from "src/app/student/quiz/_components/ButtonGroup";
import { trpcServer } from "../../../utils/trpc/server";
import { QuizView } from "./_components/QuizView";
import { Button } from "@/components/ui/button";

export default async function Quiz() {
  function onSubmit(){
    console.log("Click")
  }
  const id = 1;
  const questionBank = await trpcServer(cookies).questionBank.get.query(id);
  return (
    <div>
  <QuizView id={1} key={1} initialData={questionBank}></QuizView>
  </div>
  
  );
}
