"use client";
import React, { useMemo } from "react";

import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
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
  // const [weeks, set] = React.useState<
  //   { weekNumber: number; days: { name: string; date: string }[] }[]
  // >(WeekInfo.getAllWeeks(year));

  const weeks = useMemo(() => WeekInfo.getAllWeeks(year), [year]);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<number>(week);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          aria-expanded={open}
          className="w-[80px] flex flex-row justify-between items-center btn_primary "
        >
          <CalendarIcon />
          <span className=" text-lg">{value == 0 ? "-" : value}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-fit bg-transparent p-0  card-container"
      >
        <section className="w-fit  h-[300px] scroll-blue overflow-y-auto flex  p-1 ">
          <ul className="w-fit  h-fit grid grid-cols-4 gap-2  p-1">
            {weeks.map((_week) => (
              <div
                key={`week-selector-year-${year}-week-${_week.weekNumber}`}
                className="w-fit "
              >
                <button
                  className={cn(
                    "w-[60px]",
                    {
                      "btn_secondary-surface-selected":
                        _week.weekNumber === value,
                    },
                    {
                      "btn_secondary-surface": _week.weekNumber !== value,
                    },
                  )}
                  onClick={() => {
                    setValue(_week.weekNumber);
                    setOpen(false);
                    onWeekChange(_week.weekNumber);
                  }}
                >
                  <span className={week == _week.weekNumber ? "text-base" : ""}>
                    {_week.weekNumber}
                  </span>
                </button>
              </div>
            ))}
          </ul>
        </section>
      </PopoverContent>
    </Popover>
  );
};

// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { CalculatorIcon, Calendar1Icon, CalendarIcon } from "lucide-react";
//
// function TooltipDay({
//   weekNumber,
//   days,
//   onClick,
// }: {
//   weekNumber: number;
//   days: { name: string; date: string }[];
//   onClick: () => void;
// }) {
//   return (
//     <TooltipProvider>
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <button
//             type="button"
//             className={cn(
//               "h-8 w-12 rounded-lg",
//               "select-none border-0 text-neutral-200 font-semibold bg-gradient-to-r from-blue-800 to-indigo-900 rounded-lg transition-all duration-400 ease-in-out",
//               "font-semibold text-base",
//             )}
//             onClick={onClick}
//           >
//             {weekNumber}
//           </button>
//         </TooltipTrigger>
//         {/*<TooltipContent className="bg-black">*/}
//         {/*  <div className="flex flex-col gap-1">*/}
//         {/*    {days.map((day) => (*/}
//         {/*      <div*/}
//         {/*        key={`week-selector-day-${day.date}`}*/}
//         {/*        className={cn(*/}
//         {/*          "flex flex-row justify-center items-center gap-2",*/}
//         {/*          "h-fit w-fit ",*/}
//         {/*        )}*/}
//         {/*      >*/}
//         {/*        <h3 className="text-base font-semibold text-white">*/}
//         {/*          {day.name}*/}
//         {/*        </h3>*/}
//         {/*        <h3 className="text-base text-white">{day.date}</h3>*/}
//         {/*      </div>*/}
//         {/*    ))}*/}
//         {/*  </div>*/}
//         {/*</TooltipContent>*/}
//       </Tooltip>
//     </TooltipProvider>
//   );
// }

export default WeekSelector;
