"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const topbarItems = [
  {
    name: "Home",
    href: "/dashboard/student"
  },
  {
    name: "Quiz Reports",
    href: "/dashboard/student/quiz-reports"
  },
  {
    name: "Join Room",
    href: "/student/join-quiz-room"
  }
];

export const NavTopBar = () => {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Home</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {topbarItems.map((item) => (
          <Link key={item.name} href={item.href}>
            <DropdownMenuItem key={item.name}>{item.href}</DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
