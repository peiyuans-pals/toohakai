"use client";

import { ButtonGroup, ButtonGroupItem } from "./ButtonGroup";
import { trpc } from "../../../../../utils/trpc/client";
import {
  TrpcReactQueryOptions,
  TrpcRouterOutputs
} from "../../../../../utils/trpc/lib";
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
import { supabase } from "../../../../../utils/supabase/client";

interface Props {
  quiz: TrpcRouterOutputs["quiz"]["get"];
}

type CurrentQuestion = Parameters<
  NonNullable<
    Parameters<
      TrpcRouterOutputs["quizSession"]["currentQuestion"]["subscribe"]
    >[0]["next"]
  >
>[0]["question"];

export const QuizView = ({ quiz }: Props) => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [quizComplete, setQuizComplete] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] =
    useState<CurrentQuestion | null>(null);
  const [countdown, setCountdown] = useState<number>(0);

  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    const getAccessToken = async () => {
      const supabaseSession = await supabase.auth.getSession();
      const accessToken = supabaseSession?.data.session?.access_token ?? "";
      setAccessToken(accessToken);
    };

    getAccessToken();
  }, []);

  const submitResponseMutation = trpc.quizSession.submitResponse.useMutation({
    onSuccess: () => {
      setIsSubmitted(true);
      // todo
    }
  });

  trpc.quizSession.timeLeft.useSubscription(
    {
      quizId: quiz!.id
    },
    {
      enabled: !quizComplete && !!quiz,
      onData: (data) => {
        // console.log("timeLeft", data);
        // if data.timeLeft is not NAN, set countdown to data.timeLeft
        if (!isNaN(data.timeLeft)) {
          setCountdown(Math.floor(data.timeLeft / 1000)); // make this int
        }
      }
    }
  );

  trpc.quizSession.currentQuestion.useSubscription(
    {
      quizId: quiz?.id ?? 0,
      accessToken: accessToken
    },
    {
      onData: (data) => {
        console.log("socketListener", data);
        console.log("currentQuestion", data.question);
        setCurrentQuestion(data.question);
        setCountdown(data.questionDuration);
      },
      enabled: !!accessToken
    }
  );

  const formSchema = z.object({
    answer_id: z.coerce.number({
      required_error: "Please select an answer",
      invalid_type_error: "Please select an answer"
    })
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  if (!quiz) {
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
                {quiz!.title} has ended.
              </h1>
            </CardHeader>
            <CardContent>
              <p className="text-xl">Quiz has now been completed</p>
              <p className="text-xl">
                Your results have been saved successfully
              </p>

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

  if (!currentQuestion) {
    return (
      <div className="p-5 flex flex-col w-screen justify-center items-center h-screen">
        <Card>
          <CardHeader>
            <h1 className="text-4xl font-bold text-gray-900">
              {quiz!.title} is going to start soon!
            </h1>
          </CardHeader>
          <CardContent>
            <p className="text-xl">
              Please wait for the teacher to start the quiz
            </p>
            <p className="text-xl">Stay on this page!</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values);
    submitResponseMutation.mutate({
      quizId: quiz!.id,
      questionId: currentQuestion!.id,
      answerId: values.answer_id
    });
  }

  return (
    <div className="p-5 flex flex-col h-screen">
      <p className="text-xl">{quiz?.title}</p>
      <Progress
        className="mt-2 mb-4"
        value={
          ((countdown % quiz.timePerQuestion) / quiz!.timePerQuestion!) * 100
        }
      />
      <Heading>{currentQuestion.title}</Heading>
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
                    {currentQuestion.answers.map((answer) => (
                      <div
                        key={answer.id}
                        className="flex items-center justify-center"
                      >
                        <ButtonGroupItem
                          value={String(answer.id)}
                          className="flex items-center w-full justify-center"
                        >
                          {answer.text}
                          {/*{isSubmitted ? (*/}
                          {/*  <CheckCircledIcon className="ml-2" />*/}
                          {/*) : null}*/}
                        </ButtonGroupItem>
                      </div>
                    ))}
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
