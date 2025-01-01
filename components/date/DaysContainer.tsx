import React, { useMemo } from "react";
import { WeekInfo } from "@/lib/date-utils";
import { cn } from "@/lib/utils";

type Props = {
  year: number;
  week: number;
  selected_day: string | null;
  onClick: (date: string, name: string) => void;
};
const DaysContainer = ({ year, week, onClick, selected_day }: Props) => {
  const selected_week = useMemo(() => {
    return WeekInfo.getWeekDays(week, year);
  }, [year, week]);
  return (
    <div className="flex flex-row gap-2 items-center ">
      {selected_week.map((day) => (
        <div key={`selected-week-${week}-${year}-${day.name}`}>
          <button
            className={cn("btn_secondary-surface", "")}
            onClick={() => onClick(day.date, day.name)}
          >
            {selected_day === day.name ? (
              <span className="text-blue-400 text-base">
                {day.name} {day.date}
              </span>
            ) : (
              <span>{day.name}</span>
            )}
          </button>
        </div>
      ))}
    </div>
  );
};

export default DaysContainer;
