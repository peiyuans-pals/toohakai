"use server";
import { cookies } from "next/headers";
import { ButtonGroup, ButtonGroupItem } from "src/app/student/quiz/_components/ButtonGroup";
import { trpcServer } from "../../../utils/trpc/server";
import { QuizView } from "./_components/QuizView";

export default async function Quiz() {
  const id = 1;
  const questionBank = await trpcServer(cookies).questionBank.get.query(id);
  return (
  <QuizView id={1} initialData={questionBank}></QuizView>
  
  );
}
