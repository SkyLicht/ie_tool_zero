"use client";
import React from "react";
import WeekSelector from "@/components/date/WeekSelector";
import { useRouter } from "next/navigation";
type Props = {
  week: number;
};

const LineBalanceWeekSelector = ({ week }: Props) => {
  const router = useRouter();
  return (
    <div>
      <WeekSelector
        year={2025}
        week={Number(week)}
        onWeekChange={(week) => {
          router.push(`?year=${2025}&week=${week}`);
        }}
      />
    </div>
  );
};

export default LineBalanceWeekSelector;
