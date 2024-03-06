"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({
  name,
  className,
  required,
}: {
  name: string;
  required: boolean;
  className?: string;
}) {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>

      <input
        aria-hidden={true}
        tabIndex={-1}
        autoComplete="off"
        style={{
          position: "relative",
          top: "50%",
          left: "-50%",
          border: "0px",
          width: "1px",
          height: "1px",
          padding: "0px",
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0px, 0px, 0px, 0px)",
          whiteSpace: "nowrap",
          overflowWrap: "normal",
        }}
        name={name}
        defaultValue={date ? format(date, "yyyy-MM-dd") : ""}
        className="focus:outline-none hover:outline-none"
        required={required}
      />
    </Popover>
  );
}
