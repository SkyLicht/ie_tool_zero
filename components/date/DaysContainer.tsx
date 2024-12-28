import React, { useMemo } from "react";
import { WeekInfo } from "@/lib/date-utils";
import { cn } from "@/lib/utils";

type Props = {
  year: number;
  week: number;
  selected_day: string | null;
  onClick: (date: string) => void;
};
const DaysContainer = ({ year, week, onClick }: Props) => {
  const selected_week = useMemo(() => {
    return WeekInfo.getWeekDays(week, year);
  }, [year, week]);
  return (
    <div className="flex flex-row gap-2 items-center ">
      {selected_week.map((day) => (
        <div key={`selected-week-${week}-${year}-${day.name}`}>
          <button
            className={cn(
              "bg-gradient-to-r from-blue-800 to-sky-600 p-2 rounded-lg text-white",
            )}
            onClick={() => onClick(day.date)}
          >
            <span>{day.name}</span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default DaysContainer;
