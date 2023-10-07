import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@radix-ui/react-dropdown-menu";
import { Dispatch, SetStateAction, useState } from "react";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
interface Props {
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
}

export const MonthPicker = ({ date, setDate }: Props) => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  return (
    <Popover>
      <PopoverTrigger
        className=" w-auto bg-primary text-white hover:bg-primary/90 hover:text-white"
        asChild
      >
        <Button variant="outline">{date === "" ? "Select Date" : date}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Select Year and Month</h4>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                type="number"
                min="2000"
                max="2099"
                step="1"
                className="col-span-2 h-8"
                onChange={(e) => {
                  setYear(e.target.value),
                    setDate(month + " " + e.target.value);
                }}
                value={year}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="month">Month</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>{month === "" ? "Month" : month}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className=" bg-white border p-1">
                  {months.map((mapped_month) => (
                    <DropdownMenuItem
                      key={mapped_month}
                      onSelect={() => {
                        setMonth(mapped_month);
                        setDate(mapped_month + " " + year);
                      }}
                    >
                      {mapped_month}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Button
                id="resetinput"
                onClick={() => {
                  setDate(""), setMonth(""), setYear("");
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
