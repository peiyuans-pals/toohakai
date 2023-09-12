import React from "react";
import { cn } from "../../utils/shadcn";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const Page = ({ children, className }: Props) => {
  return (
    <div
      // minHeight="100vh"
      // display="flex"
      // flexDirection="column"
      // alignItems="center"
      // justifyContent="center"
      // gap={4}
      // width="100vw"
      // // marginY={2}
      // // marginX="auto"
      // paddingY={0}
      // paddngX={4}
      // textAlign="center"
      className={cn("min-h-screen flex flex-col justify-start", className)}
    >
      {children}
    </div>
  );
};
