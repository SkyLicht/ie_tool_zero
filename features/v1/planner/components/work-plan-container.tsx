import React from "react";
import { WorkPlanModel } from "@/features/types/work-plan";

const WorkPlanContainer = ({ data }: { data: WorkPlanModel }) => {
  return (
    <div className="h-full  w-[268px] flex flex-col  justify-between px-2 text-neutral-200 font-semibold select-none">
      <div className=" w-full flex flex-col">
        <div className="flex flex-row">
          <h3>{data.platform.platform}</h3>
        </div>
        <div className="flex flex-row gap-2">
          <h3>SUK:</h3>
          <h3>{data.platform.sku}</h3>
        </div>
        <div className="flex flex-row gap-2">
          <h3>Target oee:</h3>
          <h3 className="text-neutral-400">{data.target_oee * 100}%</h3>
        </div>
        <div className="flex flex-row gap-2">
          <h3>Planned hrs:</h3>
          <h3 className="text-neutral-400">{data.planned_hours}</h3>
        </div>
        <div className="flex flex-row gap-2">
          <h3>UPH:</h3>
          <h3 className="text-neutral-400">{data.uph_meta}</h3>
        </div>
        <div className="flex flex-row gap-2">
          <h3>Commit:</h3>
          <h3 className="text-neutral-400">{data.commit}</h3>
        </div>

        <div className="w-full flex flex-row justify-between">
          <div className="flex flex-row gap-2 ">
            <h3>FT:</h3>
            <h3 className="text-neutral-400">{data.ft}</h3>
          </div>
          <div className="flex flex-row gap-2 ">
            <h3>ICT:</h3>
            <h3 className="text-neutral-400"> {data.ict}</h3>
          </div>
          <div className="flex flex-row gap-2 ">
            <h3>HC:</h3>
            <h3 className="text-neutral-400">{data.head_count}</h3>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-end pb-1">
        <button className="btn_sub_action">edit</button>
      </div>
    </div>
  );
};

export default WorkPlanContainer;
