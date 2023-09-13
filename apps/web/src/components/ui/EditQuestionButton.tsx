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
export const EditQuestionButton = ({ initialData }: Props) => {
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
          <DialogTitle>Edit Question</DialogTitle>
          <DialogDescription>
            Edit Question. Click &quot;Save Changes&quot; when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Question</Label>
            <Textarea
              value={questionBanksData.question}
              className="col-span-3"
              placeholder="Type your question here."
            />
            <Label className="text-right">Option 1</Label>
            <Input
              value={questionBanksData.option1}
              placeholder="Option 1"
              className="col-span-3"
            />
            <Label className="text-right">Option 2</Label>
            <Input
              value={questionBanksData.option2}
              placeholder="Option 2"
              className="col-span-3"
            />
            <Label className="text-right">Option 3</Label>
            <Input
              value={questionBanksData.option3}
              placeholder="Option 3"
              className="col-span-3"
            />
            <Label className="text-right">Option 4</Label>
            <Input
              value={questionBanksData.option4}
              placeholder="Option 4"
              className="col-span-3"
            />
            <Label className="text-right self-start mt-2">Correct Answer</Label>
            <RadioGroup
              className="col-span-3 grid grid-cols-1 items-center gap-4 self-start mt-2"
              defaultValue={questionBanksData.correct}
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
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
