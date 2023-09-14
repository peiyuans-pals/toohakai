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
interface Props {
  initialData: any;
}
const formSchema = z.object({
  topic_name: z.string().min(2, {
    message: "Topic Name must contain at least 2 characters"
  })
});
export const EditQuestionBankButton = ({ initialData }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic_name: initialData.topic_name
    }
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mr-1">Edit</Button>
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
