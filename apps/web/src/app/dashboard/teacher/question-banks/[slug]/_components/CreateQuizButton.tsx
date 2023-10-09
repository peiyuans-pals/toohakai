"use client";

import { trpc } from "../../../../../../utils/trpc/client";
import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PlayIcon, ReaderIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { TrpcReactQueryOptions } from "../../../../../../utils/trpc/lib";

interface QuizProps {
  no_of_questions: number;
  quiz_name: string;
  timer: number;
}

interface Props {
  id: number;
  initialData: TrpcReactQueryOptions["questionBank"]["get"]["initialData"];
}

export const CreateQuizButton = ({ id, initialData }: Props) => {
  const questionBank = trpc.questionBank.get.useQuery(id, {
    initialData,
    refetchOnMount: false
  });

  const maxNumberOfQuestions = questionBank.data?.questions.length ?? 0;

  const [isOpen, setOpen] = useState<boolean>(false);

  const formSchema = z.object({
    quiz_name: z.string().min(2, {
      message: "Quiz name must contain at least 2 characters"
    }),
    no_of_questions: z.coerce
      .number({
        required_error: "Please enter number of questions"
      })
      .min(1, {
        message: "No. of questions must be a minimum of 1 question"
      })
      .max(maxNumberOfQuestions, {
        message: "Exceeded maximum number of questions in question bank"
      }),
    timer: z.coerce
      .number({
        required_error: "Please enter time per question"
      })
      .min(5, {
        message: "Timer must have minimum of 5 seconds"
      })
      .max(30, {
        message: "Timer must have maximum of 30 seconds"
      })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quiz_name: "",
      no_of_questions: Math.min(5, maxNumberOfQuestions),
      timer: 30
    }
  });

  const trpcUtils = trpc.useContext();

  const router = useRouter();

  const mutation = trpc.quiz.create.useMutation({
    onSuccess: (data) => {
      setOpen(false);
      trpcUtils.quiz.list.invalidate().then();
      form.reset();
      // navigate to /teacher/prequiz
      router.push(`/teacher/prequiz?quiz_id=${data.quiz.id}`);
    }
  });

  function onSubmit(data: z.infer<typeof formSchema>) {// console.log(data);
    console.log("createQuiz - data", data);
    mutation.mutate({
      title: data.quiz_name,
      questionBankId: id,
      numOfQuestions: data.no_of_questions,
      timePerQuestion: data.timer
    });
  }

  function onErrors(errors: any) {
    console.log("createQuiz - errors", errors);
    // todo
  }

  // const mock_participants = [
  //   { id: 1, name: "John" },
  //   { id: 2, name: "Doe" },
  //   { id: 3, name: "Dan" },
  //   { id: 4, name: "Joel" },
  //   { id: 5, name: "Kai" },
  //   { id: 6, name: "Zen" },
  //   { id: 7, name: "Grace" },
  //   { id: 8, name: "Rainer" },
  //   { id: 9, name: "Peter" },
  //   { id: 10, name: "William" },
  //   { id: 11, name: "Ben" },
  //   { id: 12, name: "Zack" }
  // ];

  // if (initializeQuiz) { // todo: refactor this into a seperate modal component
  //   return (
  //     <div className="flex justify-center items-center  bg-background/75 rounded-lg z-40 top-1/2 left-1/2 mr-[-50%] translate-x-[-50%] translate-y-[-50%] h-screen w-screen fixed">
  //       <div className=" flex rounded-md bg-background border h-[90%] w-[75%]">
  //         <div className="w-[50%]">
  //           <div className=" flex flex-col justify-center items-center h-[50%] border-b">
  //             <Heading>PIN: 123456</Heading>
  //           </div>
  //           <div className="flex flex-col justify-center items-center h-[50%]">
  //             <Heading>QR Code to Quiz</Heading>
  //             <Image
  //               src="/mock_qr_code.png"
  //               width={250}
  //               height={250}
  //               alt="QR code of quiz"
  //               className=" drop-shadow-lg mb-5 "
  //             />
  //           </div>
  //         </div>
  //         <div className="flex flex-col h-[100%] border-l w-[50%]">
  //           <div className="flex flex-col justify-center items-center  w-[100%] h-[100%]">
  //             <Card className="w-[450px]">
  //               <CardHeader>
  //                 <Heading>{quizSettings.quiz_name}</Heading>
  //               </CardHeader>
  //               <CardContent>
  //                 <p className="text-xl">
  //                   Time per question: {quizSettings.timer} seconds
  //                 </p>
  //                 <p className="text-xl">
  //                   Total number of questions: {quizSettings.no_of_questions}
  //                 </p>
  //                 <p className="text-xl">
  //                   Total participants: {mock_participants.length}
  //                 </p>
  //                 <ScrollArea className="mt-5 h-[400px] text-center w-[100%] rounded-md border">
  //                   <div className="p-4">
  //                     <h4 className="mb-4 text-sm font-medium leading-none">
  //                       Participants
  //                     </h4>
  //                     {mock_participants.map((participant) => (
  //                       <div key={participant.id}>
  //                         <div className="text-sm">{participant.name}</div>
  //                         <Separator className="my-2" />
  //                       </div>
  //                     ))}
  //                   </div>
  //                 </ScrollArea>
  //               </CardContent>
  //               <CardFooter className="flex justify-between">
  //                 <Button>Start Session</Button>
  //                 <Button
  //                   variant="destructive"
  //                   onClick={() => {
  //                     // todo: clear form and hide modal
  //                   }}
  //                 >
  //                   Cancel Session
  //                 </Button>
  //               </CardFooter>
  //             </Card>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlayIcon className="mr-2 h-4 w-4" />
          Create New Quiz
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>New Quiz</DialogTitle>
          <DialogDescription>Create New Quiz</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="grid grid-cols-1 items-center"
            onSubmit={form.handleSubmit(onSubmit, onErrors)}
          >
            <FormField
              control={form.control}
              name="quiz_name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-2 col-span-4">
                  <FormLabel className="text-right col-span-1 mt-2">
                    Quiz Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="col-span-3"
                      placeholder="Quiz Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-4 text-right" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="no_of_questions"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-2 col-span-4">
                  <FormLabel className="text-right col-span-1 mt-2">
                    No. of Questions
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="col-span-3"
                      placeholder="0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-4 text-right" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="timer"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-2 col-span-4">
                  <FormLabel className="text-right col-span-1 mt-2">
                    Time Per Question (Sec)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="col-span-3"
                      placeholder="30"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-4 text-right" />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-5">
              <Button type="submit"><ReaderIcon className="mr-2 h-4 w-4" />
                                                  Create Quiz</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
