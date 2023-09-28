"use client";

import Link from "next/link";
import { cn } from "../../../utils/shadcn";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { ClockIcon, ColorWheelIcon, HomeIcon } from "@radix-ui/react-icons";
import { StudentView } from "src/components/ui/StudentView";
import { StudentDashboardCards } from "./_component/Card";


const navItems = [
  {
    name: "Home",
    href: "/student/main",
    icon: <HomeIcon fontSize={100}/>
  },
  {
    name: "Quiz Reports",
    href: "/student/quiz-reports",
    icon: <ClockIcon />
  }
];

export default function HomePage() {
  return (
    <StudentView>
      <div className="pt-2 justify-center justify-items-center">
        <StudentDashboardCards initialData={navItems}/>
      </div>
    </StudentView>
  );
}

/**
 * <div className="flex flex-col gap-4 absolute">
      {navItems.map((item) => (
        <Link href={item.href}>
          <Button variant="pill">
            <ClockIcon />
          </Button>
          <Heading>{item.name}</Heading>
        </Link>
      ))}
    </div>
 */
