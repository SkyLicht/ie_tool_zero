"use server";
import React from "react";
import { getCycleTimesByTakeId } from "@/features/request/request-line_balance";
import { catchErrorTyped, customPackagedError } from "@/lib/licht-request";
import CycleTimeContainer from "@/features/v1/line_balance/components/line_balance/cycle-time-container";

type Props = {
  selected_take: string | undefined;
  token: string;
};
const ViewCycleTimes = async ({ selected_take, token }: Props) => {
  if (!selected_take) {
    return (
      <p className={"font-bold"}>
        There is no selected take to view cycle times
      </p>
    );
  }

  const [error, line_balance] = await catchErrorTyped(
    getCycleTimesByTakeId(token, selected_take),
    [...customPackagedError, Error],
  );

  if (error) {
    return (
      <p className={"font-bold"}>An unexpected error occurred {error.name}</p>
    );
  }

  if (!line_balance) {
    return <p className={"font-bold"}>No data found</p>;
  }

  return (
    <div className="overflow-y-auto scroll-blue pr-2">
      <h3>Cycle Times</h3>
      <ul className="flex flex-col gap-2">
        {line_balance.map((cycle_time) => (
          <CycleTimeContainer
            record={cycle_time}
            key={`cycle-time-container-${cycle_time.id}`}
          />
        ))}
      </ul>
    </div>
  );
};

export default ViewCycleTimes;
