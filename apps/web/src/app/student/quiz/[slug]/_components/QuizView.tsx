"use client";

import { ButtonGroup, ButtonGroupItem } from "./ButtonGroup";
import { trpc } from "../../../../../utils/trpc/client";
import { TrpcReactQueryOptions } from "../../../../../utils/trpc/lib";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { Heading } from "src/components/ui";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import Link from "next/link";

interface Props {
  questionBankId: number;
  initialData: TrpcReactQueryOptions["questionBank"]["get"]["initialData"];
	timePerQuestion: number;
}
export const QuizView = ({ questionBankId, initialData, timePerQuestion }: Props) => {
  const { data: questionBank, refetch } = trpc.questionBank.get.useQuery(questionBankId, {
    initialData
  }); //  todo: student doesnt have access to this, need to get question from the socket

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [quizComplete, setQuizComplete] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(timePerQuestion);

  trpc.quizSession.listen.useSubscription(undefined, {
    onData: (data) => {
      console.log("socketListener", data);
    }
  });

  // every second, decrement countdown
  useEffect(() => {
		console.log(countdown)
    if (countdown >= 0) {
      setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setCountdown(timePerQuestion);
    }
  }, [countdown]);
  const question_id = 0; //mock question ID
  const formSchema = z.object({
    answer_id: z.coerce.number({
      required_error: "Please select an answer",
      invalid_type_error: "Please select an answer"
    })
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values);
    setIsSubmitted(true);
  }

  if (!questionBank) {
    return (
      <div className="flex items-center justify-center h-screen">
        Quiz not found.
      </div>
    );
  }
  if (quizComplete) {
    return (
      <div className="p-5 flex flex-col w-screen justify-center items-center h-screen">
        <div>
          <Card>
            <CardHeader>
              <h1 className="text-4xl font-bold text-gray-900">
                {questionBank.title}
              </h1>
            </CardHeader>
            <CardContent>
              <p className="text-xl">Quiz has now been completed</p>
              <p className="text-xl">Results have been saved successfully</p>

              <p className="text-xl mt-5">Your Score for this quiz: 8/10</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                {/* Temporary link, supposed to redirect back to student's dashboard */}
                <Link href="/dashboard">Return to home</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }
  return (
    <div className="p-5 flex flex-col h-screen">
      <Heading>{questionBank.title}</Heading>
      <p className="text-xl">{questionBank.questions[question_id].title}</p>
      <Progress className="mt-5" value={(countdown / timePerQuestion)*100}></Progress>
      <Form {...form}>
        <form
          className="flex flex-col mt-auto mb-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="answer_id"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ButtonGroup
                    id="form"
                    disabled={isSubmitted}
                    onValueChange={field.onChange}
                  >
                    {questionBank.questions[question_id].answers.map(
                      (answer) => (
                        <div
                          key={answer.id}
                          className="flex items-center justify-center"
                        >
                          <ButtonGroupItem
                            value={String(answer.id)}
                            className="flex items-center w-full justify-center"
                          >
                            {answer.text}
                            {answer.isCorrect && isSubmitted ? (
                              <CheckCircledIcon className="ml-2" />
                            ) : null}
                          </ButtonGroupItem>
                        </div>
                      )
                    )}
                  </ButtonGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isSubmitted}
            type="submit"
            className=" text-xl mt-2"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
