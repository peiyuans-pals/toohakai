"use client";

import { ButtonGrid, ButtonGridItem } from "src/app/teacher/quiz/_components/ButtonGrid";
import { trpc } from "../../../../utils/trpc/client";
import { TrpcReactQueryOptions } from "../../../../utils/trpc/lib";
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

interface Props {
  id: number;
  initialData: TrpcReactQueryOptions["questionBank"]["get"]["initialData"];
}
export const QuizView = ({ id, initialData }: Props) => {
  const { data: questionBank, refetch } = trpc.questionBank.get.useQuery(id, {
    initialData
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(10);

  // every second, decrement countdown
  useEffect(() => {
    if (countdown >= 0) {
      setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setCountdown(10);
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
    console.log(values);
    setIsSubmitted(true);
  }

  if (!questionBank) {
    return (
      <div className="flex items-center justify-center h-screen">
        Quiz not found.
      </div>
    );
  }

  return (
    <div className="p-5 flex flex-col h-screen">
      <Heading>{questionBank.title}</Heading>
      <p className="text-xl">{questionBank.questions[question_id].title}</p>
      <Progress className="mt-5" value={countdown * 10}></Progress>
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
                  <ButtonGrid
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
                          <ButtonGridItem
                            value={String(answer.id)}
                            className="flex items-center w-full justify-center"
                          >
                            {answer.text}
                            {answer.isCorrect && isSubmitted ? (
                              <CheckCircledIcon className="ml-2" />
                            ) : null}
                          </ButtonGridItem>
                        </div>
                      )
                    )}
                  </ButtonGrid>
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
