"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useState } from "react";

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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
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
  );
};
/**
 * {quizreport_topics.teacher_quizreports_topics.map((item) => (
                            <DropdownMenuItem onSelect={() => setTopic(item.topic)}>{item.topic}</DropdownMenuItem>
                        ))}
 */
