"use server";
import React from "react";
import ActionLinesForm from "@/features/v1/components/forms/ActionLinesForm";
import { auth } from "@/auth";
import { getLinesGroupedByFactory } from "@/features/request/line-request";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import ViewLineBalance from "@/features/v1/line_balance/components/view-line-balance";

const CycleTimePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ date: string }>;
}) => {
  // Check if the 'date' query param exists
  const { date } = await searchParams;
  // if (!date) {
  //   redirect(
  //     `/v1/cycle_times?date=${format(new Date().toLocaleDateString(), "yyyy-MM-dd")}`,
  //   );
  // }
  const session = await auth();

  if (!session) {
    return <p className={"font-bold"}>You are not logged in!</p>;
  }

  const responds = await getLinesGroupedByFactory(session?.user.token);

  if (responds.error) {
    return <p className={"font-bold"}>{responds.error.message}</p>;
  }

  return (
    <div className="w-full h-full flex flex-col  gap-2 ">
      <div className="w-full flex flex-row gap-4 items-center justify-between ">
        <h3 className="card_title">Line Balances</h3>
        <ActionLinesForm data={responds.data || []} />
      </div>
      <ViewLineBalance token={session.user.token} />
    </div>
  );
};

export default CycleTimePage;
