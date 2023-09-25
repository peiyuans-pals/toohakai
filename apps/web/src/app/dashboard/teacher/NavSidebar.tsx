"use client";

import Link from "next/link";
import { cn } from "../../../utils/shadcn";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";

const sidebarItems = [
  {
    name: "Home",
    href: "/dashboard/teacher"
  },
  {
    name: "Question Banks",
    href: "/dashboard/teacher/question-banks"
  },
  {
    name: "Quizzes",
    href: "/dashboard/teacher/quizzes"
  },
  {
    name: "Quiz Reports",
    href: "/dashboard/teacher/quiz-reports"
  }
];

export const NavSidebar = () => {
  const pathname = usePathname();
  return (
    <nav className="flex flex-1 space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 p-0 pr-4 border-r">
      {sidebarItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-primary hover:bg-primary text-white hover:text-white"
              : "hover:bg-muted",
            "justify-start"
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};
