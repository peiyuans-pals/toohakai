"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";

interface Props {
  topic: string;
  quizreport_topics: { topic: string }[];
  setTopic: Dispatch<SetStateAction<string>>;
}

export const TopicBar = ({ topic, quizreport_topics, setTopic }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>{topic}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {quizreport_topics.map((item) => (
          <DropdownMenuItem
            key={item.topic}
            onSelect={() => setTopic(item.topic)}
          >
            {item.topic}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
