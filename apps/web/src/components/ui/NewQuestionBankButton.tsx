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

export const NewQuestionBankButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create New Question Bank</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Question Bank</DialogTitle>
          <DialogDescription>
            Create a new question bank. Click &quot;New Question Bank&quot; when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Topic Name</Label>
            <Input placeholder="Physics Quiz Revision" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">New Question Bank</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
