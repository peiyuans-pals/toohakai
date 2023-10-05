"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useState } from "react";
import { ComboboxDemo } from "@/components/ui/combobox";

interface Props {
  studentlist: string[];
  student: string;
  setStudent: Dispatch<SetStateAction<string>>;
}

export const StudentDropDownBar = ({
  student,
  studentlist,
  setStudent
}: Props) => {
  return <ComboboxDemo></ComboboxDemo>;
};

/**
 * <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>{student}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {studentlist.map((item) => (
          <DropdownMenuItem
            key={studentlist.indexOf(item)}
            onSelect={() => setStudent(item)}
          >
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
 */
