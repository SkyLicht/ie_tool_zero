import React from "react";
import TakesContainer from "@/features/v1/line_balance/components/line_balance/takes-container";
import AddTakeForm from "@/features/v1/line_balance/components/form/add-take-form";

type Props = {
  line_balance_id: string;
  token: string;
};
const ViewTakes = async ({ line_balance_id, token }: Props) => {
  return (
    <div className="w-full flex flex-row justify-between container gap-4">
      <TakesContainer line_balance_id={line_balance_id} token={token} />
      <AddTakeForm line_balance_id={line_balance_id} />
    </div>
  );
};

export default ViewTakes;
