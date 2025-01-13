"use server";
import React from "react";
import { catchErrorTyped, customPackagedError } from "@/lib/licht-request";
import { getLineBalancesByWeek } from "@/features/request/request-line_balance";
import Link from "next/link";
import LineBalanceWeekSelector from "@/features/v1/line_balance/components/line-balance-week-selector";
import { getServerSideProps } from "@/lib/service-side";

const LineBalancePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ week: string }>;
}) => {
  const session = await getServerSideProps();

  const week = (await searchParams).week;

  const [error, data] = await catchErrorTyped(
    getLineBalancesByWeek({
      token: session.user.token,
      week: Number(week) || 1,
    }),
    [...customPackagedError, Error],
  );

  if (error) {
    return (
      <p className={"font-bold"}>An unexpected error occurred {error.name}</p>
    );
  }

  if (!week) {
    return (
      <div className="w-full grid grid-cols-6 ">
        <LineBalanceWeekSelector week={week ? Number(week) : 0} />
        <p className={"font-bold"}>Select a week</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full grid grid-cols-6 ">
        <LineBalanceWeekSelector week={Number(week)} />
        <p className={"font-bold"}>No line balances found for this week</p>
      </div>
    );
  }
  return (
    <div className="w-full grid grid-cols-6 ">
      <LineBalanceWeekSelector week={Number(week)} />
      {data.map((record) => (
        <Link
          href={`/v1/line_balances/${record.id}`}
          key={record.id}
          className="flex text-neutral-200 font-semibold flex-row gap-2 container"
        >
          <span>{record.layout.factory_name}</span>
          <span>{record.layout.line_name}</span>
          <div>
            <span>Week: {record.week}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default LineBalancePage;
