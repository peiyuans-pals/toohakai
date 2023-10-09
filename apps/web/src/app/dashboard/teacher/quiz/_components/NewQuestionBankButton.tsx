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

const formSchema = z.object({
  topic_name: z
    .string()
    .min(4, {
      message: "Topic Name must contain at least 4 characters"
    })
    .max(32, { message: "Topic Name must contain at most 32 characters" })
});

export const NewQuestionBankButton = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic_name: ""
    }
  });

  const trpcUtils = trpc.useContext();

  const mutation = trpc.questionBank.create.useMutation({
    onSuccess: () => {
      form.reset();
      setOpen(false);
      trpcUtils.questionBank.list.invalidate(); // force a refetch
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    mutation.mutate({
      title: values.topic_name
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex-none">New Question Bank</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Question Bank</DialogTitle>
          <DialogDescription>
            Create a new question bank. Click &quot;New Question Bank&quot; when
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="topic_name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-2 py-4">
                  <FormLabel className="text-left">Topic Name</FormLabel>
                  <FormControl>
                    <Input
                      className="col-span-3"
                      placeholder="Eg. Physics Quiz Revision"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-4" />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
