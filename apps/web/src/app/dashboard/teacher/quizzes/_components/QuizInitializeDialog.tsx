"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from "@/components/ui/command";
import { cn } from "../../../../../utils/shadcn";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { trpc } from "../../../../../utils/trpc/client";
import { useState } from "react";
import { TrpcReactQueryOptions } from "../../../../../utils/trpc/lib";
import { useRouter } from "next/navigation";

interface Props {
  initialData: TrpcReactQueryOptions["questionBank"]["list"]["initialData"];
}

export const NewQuizButton = ({ initialData }: Props) => {
  const router = useRouter()
  const [isOpen, setOpen] = useState<boolean>(false);
  const [maxQns, setMaxQns] = useState<number>(0);
  const { data: questionsBanks } = trpc.questionBank.list.useQuery(undefined, {
    initialData
  });
  const formSchema = z.object({
    quiz_name: z.string().min(2, {
      message: "Quiz name must contain at least 2 characters"
    }),
    question_bank_id: z.number({
      required_error: "Please select a question bank"
    }),
    no_of_questions: z.coerce
      .number({
        required_error: "Please enter number of questions"
      })
      .min(1, {
        message: "No. of questions must be a minimum of 1 question"
      })
      .max(maxQns, {
        message: "Exceeded maximum number of questions in question bank"
      }),
    timer: z.coerce
      .number({
        required_error: "Please enter time per question"
      })
      .min(1, {
        message: "Timer must have minimum of 30 seconds"
      })
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quiz_name: "",
      no_of_questions: 0,
      timer: 0
    }
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    //setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create New Quiz</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>New Quiz</DialogTitle>
          <DialogDescription>Create New Quiz</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="grid grid-cols-1 items-center"
            onSubmit={form.handleSubmit(onSubmit)}
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
              name="question_bank_id"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-2 col-span-4">
                  <FormLabel className="text-right col-span-1 mt-2">
                    Question Bank
                  </FormLabel>
                  <Popover modal={true}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="col-span-3 justify-between flex "
                        >
                          {field.value
                            ? questionsBanks?.find(
                                (questionBank) =>
                                  questionBank.id === field.value
                              )?.title +
                              " (" +
                              maxQns +
                              " questions)"
                            : "Select Question Bank"}
                          <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[250px] p-0">
                      <Command>
                        <CommandInput placeholder="Search Question Banks..." />
                        <CommandEmpty>No Question Banks Found.</CommandEmpty>
                        <CommandGroup className=" overflow-y-scroll max-h-[200px]">
                          {questionsBanks?.map((questionBank) => (
                            <CommandItem
                              value={questionBank.title}
                              key={questionBank.id}
                              onSelect={() => {
                                form.setValue(
                                  "question_bank_id",
                                  questionBank.id
                                );
                                setMaxQns(questionBank.questionsCount);
                              }}
                            >
                              <CheckIcon
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  questionBank.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {questionBank.title +
                                " (" +
                                questionBank.questionsCount +
                                ")"}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
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
              <Button type="submit">Start New Quiz Session</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
