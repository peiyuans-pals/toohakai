"use client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
    studentlist: string[];
    student: string;
    setStudent: Dispatch<SetStateAction<string>>;
  }

  /*
    TODO: Figure a way to pass both Props and setTopic. 
    {topic, quizreport_topics}: Props work, but {topic, quizreport_topics,setTopic}: Props} cannot
  */
export const StudentDropDownBar = ({student, studentlist, setStudent}: Props) => {
    return(
        <DropdownMenu>
                    <DropdownMenuTrigger><Button>{student}</Button></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {studentlist.map((item) => (
                            <DropdownMenuItem onSelect={() => setStudent(item)}>{item}</DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
            </DropdownMenu>
    );
}
/**
 * {quizreport_topics.teacher_quizreports_topics.map((item) => (
                            <DropdownMenuItem onSelect={() => setTopic(item.topic)}>{item.topic}</DropdownMenuItem>
                        ))}
 */