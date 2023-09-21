"use client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
    topic: string;
    quizreport_topics: { teacher_quizreports_topics: { topic: string; }[]; };
    setTopic: Dispatch<SetStateAction<string>>;
  }

  /*
    TODO: Figure a way to pass both Props and setTopic. 
    {topic, quizreport_topics}: Props work, but {topic, quizreport_topics,setTopic}: Props} cannot
  */
  export const TopicBar = ({topic, quizreport_topics, setTopic}: Props) => {
    return(
        <DropdownMenu>
                    <DropdownMenuTrigger><Button>{topic}</Button></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {quizreport_topics.teacher_quizreports_topics.map((item) => (
                            <DropdownMenuItem onSelect={() => setTopic(item.topic)}>{item.topic}</DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
            </DropdownMenu>
    );
}