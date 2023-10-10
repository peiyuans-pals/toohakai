"use client";

import Link from "next/link";
import { cn } from "../../../utils/shadcn";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import {
  ClockIcon,
  ColorWheelIcon,
  EnterIcon,
  HomeIcon
} from "@radix-ui/react-icons";
import { StudentView } from "src/components/ui/StudentView";
import { StudentDashboardCards } from "./_component/Card";

const navItems = [
  {
    name: "Home",
    href: "/dashboard/student",
    icon: <HomeIcon className="w-1/2 h-1/2" />
  },
  {
    name: "Quiz Reports",
    href: "/dashboard/student/quiz-reports",
    icon: <ClockIcon className="w-1/2 h-1/2" />
  },
  {
    name: "Join Quiz Room",
    href: "/student/join-quiz",
    icon: <EnterIcon className="w-1/2 h-1/2" />
  }
];

export default function HomePage() {
  return (
    <StudentView>
      <StudentDashboardCards initialData={navItems} />
    </StudentView>
  );
}
