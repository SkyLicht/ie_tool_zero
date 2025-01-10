import React from "react";
import ChartLineBalance from "@/features/v1/line_balance/components/line_balance_statics/chart-line-balance";
import { LineBalanceQuery } from "@/features/types/line-balance";

type Props = {
  data: LineBalanceQuery;
};
const ChartLineBalanceContainer = ({ data }: Props) => {
  return (
    <div className="content_full container_secondary select-none">
      <ChartLineBalance
        data={data.refactored_records.map((r) => {
          return {
            name: r.station.operation_name,
            ct: r.last_ct == 0 ? 0 : r.last_ct / 1000,
            has_updated: r.has_updated,
          };
        })}
        ct_meta={3600 / data.takes.slice(-1)[0].work_plan.platform.uph}
      />
    </div>
  );
};

export default ChartLineBalanceContainer;
