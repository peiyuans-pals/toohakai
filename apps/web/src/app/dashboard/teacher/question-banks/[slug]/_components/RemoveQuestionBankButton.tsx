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
interface Props {
  id: number;
}
export const RemoveQuestionBankButton = ({ id }: Props) => {
  const mutation = trpc.questionBank.delete.useMutation({
    onSuccess: () => {
      console.log("successfully deleted");
    }
  });

  const handleDelete = async () => {
    await mutation.mutateAsync({ id });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="destructive">Delete Question Bank</Button>
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
