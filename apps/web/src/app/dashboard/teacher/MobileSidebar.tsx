"use client";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { cn } from "../../../utils/shadcn";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
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
    name: "Quiz Reports",
    href: "/dashboard/teacher/quiz-reports"
  }
];
interface SidebarItemProps {
  item: (typeof sidebarItems)[0];
  pathname: string;
}

const SidebarItem = ({ item, pathname }: SidebarItemProps) => {
  return (
    <SheetClose asChild>
      <Link
        href={item.href}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          pathname === item.href
            ? "bg-primary hover:bg-primary text-white hover:text-white"
            : pathname.endsWith(item.href) && item.name !== "Home"
            ? "border border-primary text-primary"
            : "hover:bg-muted",
          "justify-end text-end"
        )}
      >
        {item.name}
      </Link>
    </SheetClose>
  );
};
export const MobileSideBar = () => {
  const pathname = usePathname();
  return (
    <div>
      <Sheet>
        <SheetTrigger className="block sm:hidden ">
          <Menu />
        </SheetTrigger>
        <SheetContent className="w-64" side="left">
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
            <SheetDescription className="flex flex-col gap-2 pt-8">
              {sidebarItems.map((item) => (
                <SidebarItem key={item.href} item={item} pathname={pathname} />
              ))}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};
