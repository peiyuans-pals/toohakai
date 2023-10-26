"use client";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { trpc } from "../../../../../../utils/trpc/client";
import { TrashIcon } from "@radix-ui/react-icons";
interface Props {
  questionBankId: number;
  questionId: number;
}
export const RemoveQuestionButton = ({ questionBankId, questionId }: Props) => {
  const trpcUtils = trpc.useContext();

  const mutation = trpc.questionBank.deleteQuestion.useMutation({
    onSuccess: () => {
      // console.log("successfully deleted");
      trpcUtils.questionBank.get.invalidate(questionBankId); // force a refetch
    }
  });

  const handleDelete = async () => {
    await mutation.mutateAsync({ id: questionBankId, questionId });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="destructive">
          <TrashIcon className="mr-2 h-4 w-4" />
          Remove
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>This action cannot be undone</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 w-full"
          onClick={handleDelete}
        >
          Confirm Removal
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
