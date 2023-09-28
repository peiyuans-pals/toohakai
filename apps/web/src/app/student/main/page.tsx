"use client";

import Link from "next/link";
import { cn } from "../../../utils/shadcn";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { ClockIcon, ColorWheelIcon } from "@radix-ui/react-icons";
import { StudentView } from "src/components/ui/StudentView";

const navItems = [
  {
    name: "Quiz Reports",
    href: "/student/quiz-reports",
    icon: ClockIcon
  }
];

export default function HomePage() {
  return (
    <StudentView>
      <p>test</p>
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
