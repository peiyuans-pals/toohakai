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
interface Props {
  // initialData: any[];
  initialData: unknown;
}
export const RemoveQuestionBankButton = ({ initialData }: Props) => {
  // const { data: questionBanksData } = trpc.questionBank.list.useQuery(
  //   undefined,
  //   {
  //     initialData
  //   }
  // );
  const questionBanksData = initialData;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="destructive">Remove</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>This action cannot be undone</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 w-full">
          Confirm Removal
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
