import React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function DateRangePicker() {
  const [date, setDate] = React.useState({
    from: new Date(2024, 0, 5),
    to: addDays(new Date(2024, 0, 5), 35),
  });

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
            className="border-0"
            styles={{
              head_cell: {
                width: "40px",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "var(--muted-foreground)",
                paddingTop: "8px",
                paddingBottom: "8px",
              },
              cell: {
                width: "40px",
                height: "40px",
                fontSize: "0.875rem",
              },
              nav: {
                marginBottom: "8px",
              },
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
