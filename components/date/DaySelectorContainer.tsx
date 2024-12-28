"use client";
import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import WeekSelector from "@/components/date/WeekSelector";
import DaysContainer from "@/components/date/DaysContainer";

const DaySelectorContainer = () => {
  const params = useSearchParams();
  const router = useRouter();
  // const year = params.get("year") || null;
  const week = params.get("week") || 1;
  const selected_day = params.get("selected_day") || null;
  return (
    <div className="flex flex-row gap-2 items-center">
      <WeekSelector
        year={2025}
        week={Number(week)}
        onWeekChange={(week) => {
          router.push(
            `?year=${2025}&week=${week}&selected_day=${selected_day}`,
          );
        }}
      />
      <DaysContainer
        year={2025}
        week={Number(week)}
        selected_day={selected_day}
        onClick={(day) => {
          router.push(
            `/v1/workdays/${day}?year=${2025}&week=${week}&selected_day=${day}`,
          );
        }}
      />
    </div>
  );
};

export default DaySelectorContainer;
