"use client";
import React from "react";
import { RecordQuery } from "@/features/types/line-balance";
import { CycleTimeTimer } from "@/features/v1/line_balance/components/form/add-cycle-time";

type Props = {
  record: RecordQuery;
};
const CycleTimeContainer = ({ record }: Props) => {
  return (
    <li className="container">
      <div className="flex justify-between">
        <div className="flex flex-row gap-2">
          <span>{record.area.name}</span>
          <span>{record.station.operation_name}</span>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-2">
          <div>23.5</div>
          {record.cycle_time.map((cycle_time, index) => (
            <div
              key={`cycle-time-${record.id}-${index}`}
              className="h-[50px] bg-blue-800"
            >
              <CycleTimeTimer cycle_time={cycle_time} />
            </div>
          ))}
        </div>
      </div>
    </li>
  );
};

export default CycleTimeContainer;
