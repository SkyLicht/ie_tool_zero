"use client";
import React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { WeekInfo } from "@/lib/date-utils";

type Props = {
  year: number;
  week: number;
  onWeekChange: (week: number) => void;
};
const WeekSelector = ({ year, week, onWeekChange }: Props) => {
  const [weeks, setWeeks] = React.useState<
    { weekNumber: number; days: { name: string; date: string }[] }[]
  >(WeekInfo.getAllWeeks(year));
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<number>(week);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[70px] justify-between"
        >
          {value}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit  p-0">
        <section className="w-full h-[300px] overflow-y-auto flex  p-1 ">
          <div className="w-fit  h-fit grid grid-cols-4 gap-2  p-1">
            {weeks.map((week) => (
              <div
                key={`week-selector-year-${year}-week-${week.weekNumber}`}
                className="w-fit "
              >
                <TooltipDay
                  weekNumber={week.weekNumber}
                  days={week.days}
                  onClick={() => {
                    setValue(week.weekNumber);
                    setOpen(false);
                    onWeekChange(week.weekNumber);
                  }}
                />
              </div>
            ))}
          </div>
        </section>
      </PopoverContent>
    </Popover>
  );
};

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function TooltipDay({
  weekNumber,
  days,
  onClick,
}: {
  weekNumber: number;
  days: { name: string; date: string }[];
  onClick: () => void;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className={cn(
              "h-8 w-12 rounded-lg",
              "select-none border-0 text-neutral-200 font-semibold bg-gradient-to-r from-blue-800 to-indigo-900 rounded-lg transition-all duration-400 ease-in-out",
              "font-semibold text-base",
            )}
            onClick={onClick}
          >
            {weekNumber}
          </button>
        </TooltipTrigger>
        {/*<TooltipContent className="bg-black">*/}
        {/*  <div className="flex flex-col gap-1">*/}
        {/*    {days.map((day) => (*/}
        {/*      <div*/}
        {/*        key={`week-selector-day-${day.date}`}*/}
        {/*        className={cn(*/}
        {/*          "flex flex-row justify-center items-center gap-2",*/}
        {/*          "h-fit w-fit ",*/}
        {/*        )}*/}
        {/*      >*/}
        {/*        <h3 className="text-base font-semibold text-white">*/}
        {/*          {day.name}*/}
        {/*        </h3>*/}
        {/*        <h3 className="text-base text-white">{day.date}</h3>*/}
        {/*      </div>*/}
        {/*    ))}*/}
        {/*  </div>*/}
        {/*</TooltipContent>*/}
      </Tooltip>
    </TooltipProvider>
  );
}

export default WeekSelector;
