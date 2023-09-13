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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
interface Props {
  // initialData: any[];
  initialData: unknown;
}
export const EditQuestionBankButton = ({ initialData }: Props) => {
  // const { data: questionBanksData } = trpc.questionBank.list.useQuery(
  //   undefined,
  //   {
  //     initialData
  //   }
  // );
  const questionBanksData = initialData;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mr-1">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Edit Question Bank</DialogTitle>
          <DialogDescription>
            Edit Question Bank. Click &quot;Save Changes&quot; when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Topic Name</Label>
            <Input
              value={questionBanksData.topic_name}
              placeholder="Option 1"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
