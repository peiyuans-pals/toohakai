import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { HomeIcon } from "@radix-ui/react-icons";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import Link from "next/link";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface Props {
  initialData: { name: string; href: string; icon: React.JSX.Element }[];
}

export const StudentDashboardCards = ({ initialData }: Props) => {
  return (
    <div className="grid grid-rows sm:grid-cols-3  gap-4 flex-col">
      {initialData.map((item) => (
        <Link key={item.name} href={`${item.href}`}>
          <Card>
            <CardHeader className="flex">
              <CardTitle className="flex font-bold justify-center">
                {item.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center h-full items-center">
              {item.icon}
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};
