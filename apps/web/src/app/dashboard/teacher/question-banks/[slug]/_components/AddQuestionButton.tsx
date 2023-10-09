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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { trpc } from "../../../../../../utils/trpc/client";
import { useState } from "react";
import { ReloadIcon, PlusIcon, RocketIcon } from "@radix-ui/react-icons";

const formSchema = z.object({
  question_name: z.string().min(2, {
    message: "Question Name must contain at least 2 characters"
  }),
  option1: z.string().min(1, {
    message: "Must contain at least 1 character"
  }),
  option2: z.string().min(1, {
    message: "Must contain at least 1 character"
  }),
  option3: z.string().min(1, {
    message: "Must contain at least 1 character"
  }),
  option4: z.string().min(1, {
    message: "Must contain at least 1 character"
  }),
  correct: z.enum(["1", "2", "3", "4"], {
    required_error: "You need to select the correct option for this question"
  })
});

interface Props {
  questionBankId: number;
  questionBankName: string;
}

export const AddQuestionButton = ({
  questionBankId,
  questionBankName
}: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question_name: "",
      option1: "",
      option2: "",
      option3: "",
      option4: ""
    }
  });

  const [isOpen, setOpen] = useState<boolean>(false);

  const trpcUtils = trpc.useContext();

  const mutation = trpc.questionBank.addQuestion.useMutation({
    onSuccess: () => {
      form.reset();
      setOpen(false);
      trpcUtils.questionBank.get.invalidate(questionBankId).then(); // force a refetch
    }
  });

  const generateQuestion = trpc.questionBank.generateQuestion.useMutation({
    onSuccess: (data) => {
      // change form values
      const { generated } = data;
      form.setValue("question_name", generated.questionTitle);
      form.setValue("option1", generated.answers[0].text);
      form.setValue("option2", generated.answers[1].text);
      form.setValue("option3", generated.answers[2].text);
      form.setValue("option4", generated.answers[3].text);
      // set correct radio button
      form.setValue("correct", "2"); // TODO: fix this - it doesnt work :(
    }
  });

  const handleAutoGenerate = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    generateQuestion.mutate({ topic: questionBankName, model: "gpt3.5" });
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("onSubmit - AddQuestion", values);
    mutation.mutate({
      id: questionBankId,
      title: values.question_name,
      answers: [values.option1, values.option2, values.option3, values.option4],
      correctAnswer: parseInt(values.correct)
    });
    // disable all form fields
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          New Question
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>New Question</DialogTitle>
          <DialogDescription>
            Click &quot;Add Question&quot; when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="grid grid-cols-1 items-center"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="question_name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-2 col-span-4">
                  <FormLabel className="text-right col-span-1 mt-2">
                    Question
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="col-span-3"
                      placeholder="Type your question here."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-4 text-right" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="option1"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-2 col-span-4">
                  <FormLabel className="text-right col-span-1 mt-2">
                    Option 1
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="col-span-3"
                      placeholder="Option 1"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-4 text-right" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="option2"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-2 col-span-4">
                  <FormLabel className="text-right col-span-1 mt-2">
                    Option 2
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="col-span-3"
                      placeholder="Option 2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-4 text-right" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="option3"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-2 col-span-4">
                  <FormLabel className="text-right col-span-1 mt-2">
                    Option 3
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="col-span-3"
                      placeholder="Option 3"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-4 text-right" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="option4"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-2 col-span-4">
                  <FormLabel className="text-right col-span-1 mt-2">
                    Option 4
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="col-span-3"
                      placeholder="Option 4"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-4 text-right" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="correct"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-2 col-span-4 mt-5">
                  <FormLabel className="self-start text-right mt-2">
                    Correct Answer
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="col-span-3 grid grid-cols-1 items-center gap-4 self-start"
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id="r1" />
                        <Label htmlFor="r1">Option 1</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="2" id="r2" />
                        <Label htmlFor="r2">Option 2</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="3" id="r3" />
                        <Label htmlFor="r3">Option 3</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="4" id="r4" />
                        <Label htmlFor="r4">Option 4</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className="col-span-4 text-right" />
                </FormItem>
              )}
            />
            {generateQuestion?.data?.generated.reason && (
              <div className="mt-4 space-y-2 items-center col-span-4">
                <p className="text-xs">
                  Reason: {generateQuestion.data.generated.reason}
                </p>
              </div>
            )}
            <DialogFooter className="flex flex-row justify-between items-center mt-5">
              <Button
                onClick={handleAutoGenerate}
                disabled={generateQuestion.isLoading}
              >
                {generateQuestion.isLoading ? (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <RocketIcon className="mr-2 h-4 w-4" />
                )}
                Auto-generate
              </Button>
              <Button type="submit">
                <PlusIcon className="mr-2 h-4 w-4" />
                Add Question
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
