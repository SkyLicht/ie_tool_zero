import React from "react";
import { getLineBalancesByWeek } from "@/features/request/request-line_balance";
import { catchErrorTyped, customPackagedError } from "@/lib/licht-request";
import { format } from "date-fns";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  token: string;
};
const ViewLineBalance = async ({ token }: Props) => {
  const [error, data] = await catchErrorTyped(
    getLineBalancesByWeek({
      token: token,
      str_date: format(new Date().toLocaleDateString(), "yyyy-MM-dd"),
    }),
    [...customPackagedError, Error],
  );

  if (error) {
    return (
      <p className={"font-bold"}>An unexpected error occurred {error.name}</p>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4 boder">
      {data.map((record) => {
        return (
          <Link
            href={`cycle_times/${record.id}`}
            key={record.id}
            className="card_title surface_container cursor-pointer"
          >
            <div className="flex flex-row gap-3">
              <h2>{record.layout.factory_name}</h2>
              <h1>{record.layout.line_name}</h1>
              <div className="flex flex-row gap-1">
                <h3>Week </h3>
                <h2>{record.week}</h2>
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <h3>Takes</h3>
              <h1>{record.takes.length}</h1>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ViewLineBalance;
