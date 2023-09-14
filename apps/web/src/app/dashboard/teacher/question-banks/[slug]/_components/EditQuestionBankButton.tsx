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
import { trpc } from "../../../../../../utils/trpc/client";
import { useState } from "react";
interface Props {
  id: number;
  currentName: string;
}
const formSchema = z.object({
  topic_name: z.string().min(4, {
    message: "Topic Name must contain at least 4 characters"
  })
});
export const EditQuestionBankButton = ({ id, currentName }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic_name: currentName
    }
  });

  const [isOpen, setOpen] = useState<boolean>(false);

  const trpcUtils = trpc.useContext();

  const mutation = trpc.questionBank.update.useMutation({
    onSuccess: () => {
      form.reset();
      setOpen(false);
      trpcUtils.questionBank.get.invalidate(id); // force a refetch
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    mutation.mutate({
      id,
      title: values.topic_name
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Edit Question Bank Name</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Edit Question Bank</DialogTitle>
          <DialogDescription>
            Edit Question Bank. Click &quot;Save Changes&quot; when you&apos;re
            done.
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
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
