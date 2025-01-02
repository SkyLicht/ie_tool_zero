import React from "react";
import { getLineBalancesByWeek } from "@/features/request/request-line_balance";
import { catchErrorTyped, customPackagedError } from "@/lib/licht-request";
import { format } from "date-fns";

type Props = {
  token: string;
};
const ViewLineBalance = async ({ token }: Props) => {
  const [error, data] = await catchErrorTyped(
    getLineBalancesByWeek(
      token,
      format(new Date().toLocaleDateString(), "yyyy-MM-dd"),
    ),
    [...customPackagedError, Error],
  );

  if (error) {
    return (
      <p className={"font-bold"}>An unexpected error occurred {error.name}</p>
    );
  }

  console.log(data);

  return (
    <div className="grid grid-cols-3 boder">
      {data.map((record) => {
        return (
          <div key={record.id} className="surface_container">
            <div className="flex flex-row gap-4">
              <h1>{record.layout.line_name}</h1>
              <h2>{record.layout.factory_name}</h2>
              <div className="flex flex-row gap-1">
                <h3>Week </h3>
                <h2>{record.week}</h2>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ViewLineBalance;
