"use client";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PlusIcon } from "lucide-react";
import WorkPlanForm from "@/features/v1/planner/components/forms/WorkPlanForm";
import { Platform } from "@/features/types/platform";

const WorkDayAddWorkPlan = ({
  work_day_id,
  line_id,
  str_date,
  platforms,
}: {
  line_id: string;
  work_day_id: string;
  str_date: string;
  platforms: Platform[];
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-row justify-between ">
      <h3 className="text-lg font-semibold  ">Work plan</h3>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button role="button" aria-expanded={open} className="btn_primary">
            <PlusIcon />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-fit  p-0 bg-transparent">
          <section className="w-[350px] p-2 bg-licht_on_surface rounded-lg">
            <WorkPlanForm
              line_id={line_id}
              work_day_id={work_day_id}
              str_date={str_date}
              onSuccess={() => setOpen(false)}
              platforms={platforms}
            />
          </section>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default WorkDayAddWorkPlan;
