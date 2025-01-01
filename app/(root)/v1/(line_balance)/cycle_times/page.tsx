"use server";
import React from "react";
import ActionLinesForm from "@/features/v1/components/forms/ActionLinesForm";
import { auth } from "@/auth";
import { getLinesGroupedByFactory } from "@/features/request/line-request";
import { redirect } from "next/navigation";
import { format } from "date-fns";

const CycleTimePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ date: string }>;
}) => {
  // Check if the 'date' query param exists
  const { date } = await searchParams;
  if (!date) {
    redirect(
      `/v1/cycle_times?date=${format(new Date().toLocaleDateString(), "yyyy-MM-dd")}`,
    );
  }
  const session = await auth();

  if (!session) {
    return <p className={"font-bold"}>You are not logged in!</p>;
  }

  const responds = await getLinesGroupedByFactory(session?.user.token);

  if (responds.error) {
    return <p className={"font-bold"}>{responds.error.message}</p>;
  }

  return (
    <div className="w-full flex flex-col  ">
      <div className="w-fit flex flex-row gap-4 items-center justify-between container">
        <h3 className="card_title">Cycle Time</h3>
        <ActionLinesForm data={responds.data || []} str_date={date} />
      </div>
    </div>
  );
};

export default CycleTimePage;
