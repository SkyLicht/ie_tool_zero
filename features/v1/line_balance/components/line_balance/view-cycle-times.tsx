"use server";
import React from "react";
import { getCycleTimesByTakeId } from "@/features/request/request-line_balance";
import { catchErrorTyped, customPackagedError } from "@/lib/licht-request";
import CycleTimeContainer from "@/features/v1/line_balance/components/line_balance/cycle-time-container";
import DeleteForm from "@/features/v1/components/forms/delete-form";
import { deleteTake } from "@/features/v1/line_balance/actions/action-detele-task";

type Props = {
  index: string | undefined;
  selected_take: string | undefined;
  token: string;
};
const ViewCycleTimes = async ({ index, selected_take, token }: Props) => {
  if (!selected_take) {
    return (
      <p className={"font-bold"}>
        There is no selected take to view cycle times
      </p>
    );
  }

  const [error, records] = await catchErrorTyped(
    getCycleTimesByTakeId(token, selected_take),
    [...customPackagedError, Error],
  );

  if (error) {
    return (
      <p className={"font-bold"}>An unexpected error occurred {error.name}</p>
    );
  }

  if (!records) {
    return <p className={"font-bold"}>No data found</p>;
  }

  return (
    <div className="overflow-y-auto scroll-blue pr-2">
      <div className="w-full flex flex-row items-center justify-between p-2 ">
        <div>
          <h3 className="card_title">Cycle Times</h3>
        </div>
        <div>
          {index && index !== "1" ? (
            <DeleteForm
              id={selected_take}
              promise={deleteTake}
              params={{ title: "Take", replace: "?selected_take=" }}
            />
          ) : (
            <div></div>
          )}
        </div>
      </div>

      <ul className="flex flex-col gap-2">
        {records.map((cycle_time) => (
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
