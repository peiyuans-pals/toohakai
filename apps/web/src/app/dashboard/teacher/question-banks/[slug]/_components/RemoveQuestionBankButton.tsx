"use client";

import { trpc } from "../../../../../../utils/trpc/client";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
interface Props {
  id: number;
}
export const RemoveQuestionBankButton = ({ id }: Props) => {
  const router = useRouter();

  const trpcUtils = trpc.useContext();

  const mutation = trpc.questionBank.delete.useMutation({
    onSuccess: () => {
      console.log("successfully deleted");
      trpcUtils.questionBank.list.invalidate(); // force a refetch
      router.replace("/dashboard/teacher/question-banks");
    }
  });

  const handleDelete = async () => {
    await mutation.mutateAsync(id);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="destructive">Delete Question Bank</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="mb-2 text-center">This action cannot be undone!</p>
        <Button
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 w-full"
          onClick={handleDelete}
        >
          Confirm Removal
        </Button>
      </PopoverContent>
    </Popover>
  );
};
