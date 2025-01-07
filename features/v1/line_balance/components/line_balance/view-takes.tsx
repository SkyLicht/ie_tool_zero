"use server";
import React from "react";
import TakesContainer from "@/features/v1/line_balance/components/line_balance/takes-container";
import AddTakeForm from "@/features/v1/line_balance/components/form/add-take-form";
import { catchErrorTyped, customPackagedError } from "@/lib/licht-request";
import { getStationsByLayoutId } from "@/features/request/request-station";

type Props = {
  line_balance_id: string;
  selected_take: string | undefined;
  token: string;
};
const ViewTakes = async ({ line_balance_id, token, selected_take }: Props) => {
  const [error, stations] = await catchErrorTyped(
    getStationsByLayoutId(line_balance_id),
    [...customPackagedError, Error],
  );

  if (error) {
    return (
      <p className={"font-bold"}>An unexpected error occurred {error.name}</p>
    );
  }

  return (
    <div className="w-full flex flex-row justify-between   gap-4">
      <TakesContainer
        line_balance_id={line_balance_id}
        token={token}
        selected_take={selected_take}
      />
      <AddTakeForm
        line_balance_id={line_balance_id}
        stations={stations || []}
      />
    </div>
  );
};

export default ViewTakes;
