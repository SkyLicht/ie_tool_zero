import React from "react";
import { RefactorRecordsQuery } from "@/features/types/line-balance";
import { cn } from "@/lib/utils";

type Props = {
  records: RefactorRecordsQuery[];
};
const LineBalanceStaticsBottlenecks = ({ records }: Props) => {
  return (
    <div className="h-full w-fit  container overflow-auto scroll-blue ">
      <div className="flex flex-col ">
        {records.map((record) => {
          return (
            <Bottlenecks key={`bottleneck-id-${record.id}`} record={record} />
          );
        })}
      </div>
    </div>
  );
};

export default LineBalanceStaticsBottlenecks;

const Bottlenecks = ({ record }: { record: RefactorRecordsQuery }) => {
  return (
    <div className="flex flex-row gap-4 tracking-wide border-b-0 border-stone-700    ">
      <div className="flex items-center ">
        <h3 className="font-semibold ">{record.station.operation_name}</h3>
      </div>
      <div className="flex flex-row gap-2 justify-center">
        {record.all_ct.map((ct, index) => {
          const isGreater = () => {
            if (index > 0) {
              return ct - record.all_ct[index - 1];
            }

            return 0;
          };
          return (
            <div
              key={`ct-index-${record.station_id}-${index}`}
              className="flex flex-row gap-1 items-center"
            >
              <h3 className="text-lg font-semibold text-stone-200">
                {(ct / 1000).toFixed(2)}s
              </h3>
              <span
                className={cn(
                  "text-sm",
                  isGreater() >= 0 ? "text-red-600" : "text-green-700",
                )}
              >
                ({isGreater() / 1000})
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
