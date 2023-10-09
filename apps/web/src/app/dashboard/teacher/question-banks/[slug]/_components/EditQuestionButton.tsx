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
import {
  TrpcReactQueryOptions,
  TrpcRouterInputs,
  TrpcRouterOutputs
} from "../../../../../../utils/trpc/lib";
import { trpc } from "../../../../../../utils/trpc/client";
import { useState } from "react";

interface Props {
  questionBankId: number;
  previousData: NonNullable<
    TrpcRouterOutputs["questionBank"]["get"]
  >["questions"][0];
}

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

export const EditQuestionButton = ({ questionBankId, previousData }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question_name: previousData.title,
      option1: previousData.answers[0].text,
      option2: previousData.answers[1].text,
      option3: previousData.answers[2].text,
      option4: previousData.answers[3].text,
      correct: (
        previousData.answers.findIndex(
          (answer: any) => answer.isCorrect === true
        ) + 1
      ).toString() as "1" | "2" | "3" | "4"
    }
  });

  const trpcUtils = trpc.useContext();

  const [isOpen, setOpen] = useState<boolean>(false);

  const mutation = trpc.questionBank.updateQuestion.useMutation({
    onSuccess: () => {
      trpcUtils.questionBank.get.invalidate(questionBankId); // force a refetch
      setOpen(false);
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values);
    mutation.mutate({
      id: questionBankId,
      questionId: previousData.id,
      title: values.question_name,
      // answers: [values.option1, values.option2, values.option3, values.option4],
      answers: [
        {
          id: previousData.answers[0].id,
          text: values.option1
        },
        {
          id: previousData.answers[1].id,
          text: values.option2
        },
        {
          id: previousData.answers[2].id,
          text: values.option3
        },
        {
          id: previousData.answers[3].id,
          text: values.option4
        }
      ],
      correctAnswer: parseInt(values.correct)
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mr-1">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Edit Question</DialogTitle>
          <DialogDescription>
            Edit Question. Click &quot;Save Changes&quot; when you&apos;re done.
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
                      defaultValue={field.value}
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
            <DialogFooter className="mt-5">
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
