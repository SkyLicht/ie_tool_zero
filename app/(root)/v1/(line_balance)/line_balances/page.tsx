"use server";
import React from "react";
import { catchErrorTyped, customPackagedError } from "@/lib/licht-request";
import { getLineBalancesByWeek } from "@/features/request/request-line_balance";
import { auth } from "@/auth";
import Link from "next/link";

const LineBalancePage = async () => {
  const session = await auth();

  if (!session) {
    return <p className={"font-bold"}>You are not logged in!</p>;
  }

  const [error, data] = await catchErrorTyped(
    getLineBalancesByWeek({
      token: session.user.token,
      week: 2,
    }),
    [...customPackagedError, Error],
  );

  if (error) {
    return (
      <p className={"font-bold"}>An unexpected error occurred {error.name}</p>
    );
  }
  return (
    <div className="w-full grid grid-cols-6 ">
      {data.map((record) => (
        <Link
          href={`/v1/line_balances/${record.id}`}
          key={record.id}
          className="border-white border-2"
        >
          {record.layout.factory_name}
        </Link>
      ))}
    </div>
  );
};

export default LineBalancePage;
