import React from "react";
import {
  LineBalanceQuery,
  RefactorRecordsQuery,
  WorkPlanQuery,
} from "@/features/types/line-balance";
type Props = {
  data: LineBalanceQuery;
};

const LineBalanceStaticsInfo = ({ data }: Props) => {
  return (
    <div className="flex flex-col gap-2 font-roboto">
      <WorkPlanInfo work_plan={data.takes.slice(-1)[0].work_plan} />
      <div className="w-fit container">
        <Bottleneck record={data.smt_bottleneck} />
        <Bottleneck record={data.packing_bottleneck} />
      </div>
    </div>
  );
};

export default LineBalanceStaticsInfo;

const WorkPlanInfo = ({ work_plan }: { work_plan: WorkPlanQuery }) => {
  return (
    <div className="flex flex-col gap-2 text-lg font-semibold tracking-wide text-stone-300 ">
      <div className="w-fit flex flex-col container">
        <div className="flex flex-row gap-2 justify-center items-center">
          <h3>Work Plan</h3>
          <h3>{work_plan.str_date}</h3>
          <h3>{work_plan.line.factory}</h3>
          <h3>{work_plan.line.name}</h3>
        </div>
        <div className="flex flex-row gap-2 ">
          <h3>{work_plan.platform.sku}</h3>
          <h3>{work_plan.platform.platform}</h3>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col items-center">
            <h3>UPH</h3>
            <h3 className="text-2xl">{work_plan.uph_target}</h3>
          </div>
          <div className="flex flex-col items-center">
            <h3>Target OEE</h3>
            <h3 className="text-2xl">{work_plan.target_oee * 100}%</h3>
          </div>
        </div>
        <div className="flex flex-row gap-2 ">
          <h3>Planned hours</h3>
          <h3>{work_plan.planned_hours}</h3>
        </div>
        <div className="flex flex-row gap-2 ">
          <h3>Goal</h3>
          <h3>{work_plan.commit}</h3>
        </div>
      </div>

      <div className="w-fit flex flex-row gap-4 items-center text-stone-300  font-black tracking-wide  container">
        <div className="flex flex-col items-center">
          <h3>CT</h3>
          <h3>Target </h3>
        </div>
        <h3 className="text-4xl">
          {(3600 / work_plan.platform.uph).toFixed(2)}
        </h3>
      </div>
    </div>
  );
};

const Bottleneck = ({ record }: { record: RefactorRecordsQuery }) => {
  return (
    <div className="flex flex-row gap-2 text-lg text-stone-300 font-black tracking-wide tex">
      <div>{record.area.section}</div>
      <div>{record.station.operation_name}</div>
      <div>{(record.last_ct / 1000).toFixed(2)}</div>
      <span>sec</span>
    </div>
  );
};
