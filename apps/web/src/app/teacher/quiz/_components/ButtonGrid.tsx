//Custom Button Group Component by Zen
//Originally from Shadcn's RadioGroup
"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

import { cn } from "src/utils/shadcn";

const ButtonGrid = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn(
        "flex flex-col border rounded-md p-1 text-muted-foreground",
        className
      )}
      {...props}
      ref={ref}
    />
  );
});
ButtonGrid.displayName = RadioGroupPrimitive.Root.displayName;

const ButtonGridItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "whitespace-nowrap rounded-sm px-3 py-3 text-xl font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-85 data-[state=checked]:bg-accent data-[state=checked]:text-foreground data-[state=checked]:shadow-sm",
        className
      )}
      {...props}
      asChild
    >
      <button type="button">{children}</button>
    </RadioGroupPrimitive.Item>
  );
});
ButtonGridItem.displayName = RadioGroupPrimitive.Item.displayName;

export { ButtonGrid, ButtonGridItem };
