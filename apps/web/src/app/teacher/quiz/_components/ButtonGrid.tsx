//Custom Button Group Component by Zen
//Originally from Shadcn's RadioGroup
"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "src/utils/shadcn";

interface ButtonGridProps {
  children: React.ReactNode;
  className?: string;
}

interface ButtonGridItemProps {
  children: React.ReactNode;
  percentage: number;
  isCorrect: boolean;
  className?: string;
  questionEndedState: boolean;

}
export const ButtonGrid = ({ children, className}: ButtonGridProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-5 rounded-md p-1 text-muted-foreground",
        className
      )}
    >
      {children}
    </div>
  );
};
ButtonGrid.displayName = RadioGroupPrimitive.Root.displayName;

export const ButtonGridItem = ({ children, className, percentage, isCorrect, questionEndedState }: ButtonGridItemProps) => {
  const c = (questionEndedState && isCorrect) ? "shadow-lg bg-primary text-primary-foreground " : null
  const c2 = (questionEndedState && isCorrect) ? "bg-green-700 " : null
  return (
    <div
      className={cn(
        "whitespace-nowrap relative rounded-sm border h-[200px] text-4xl font-medium ring-offset-background -z-20 ",
        className, c
      )}
    >
      

      <div className="z-10 relative">{children}</div>
      {
        questionEndedState ? 
        <div className={cn("bg-slate-300 h-full absolute top-0 left-0 -z-10", c2)} 
        style={{width:`${percentage}%`}}></div> : null
      }
    </div>
  );
      };

