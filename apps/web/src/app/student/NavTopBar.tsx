"use client";

import { redirect, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const topbarItems = [
  {
    name: "Home",
    href: "/dashboard/student"
  },
  {
    name: "Quiz Reports",
    href: "/dashboard/student/quiz-reports"
  }
];

export const NavTopBar = () => {
  const pathname = usePathname();
  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className=" bg-3">{buttonName(pathname)}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {topbarItems.map((item) => (
            <DropdownMenuItem key={item.name} onSelect={redirect(item.href)}>
              {item.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

function buttonName(path_name: string) {
  switch (path_name) {
    case "/dashboard/student":
      return "Home";
    case "/dashboard/student/quiz-reports":
      return "Quiz Reports";
  }
}

/**
   * <nav className="flex flex-1 space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 p-0 pr-4 border-r">
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
   */
