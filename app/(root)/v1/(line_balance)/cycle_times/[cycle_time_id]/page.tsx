"use server";
import React from "react";
import { auth } from "@/auth";
import ViewTakes from "@/features/v1/line_balance/components/line_balance/view-takes";
import ViewCycleTimes from "@/features/v1/line_balance/components/line_balance/view-cycle-times";

const CycleTimePage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ cycle_time_id: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { cycle_time_id } = await params;
  const selected_take = (await searchParams).selected_take;
  const index = (await searchParams).index;

  const session = await auth();
  if (!session) {
    return <p className={"font-bold"}>You are not logged in!</p>;
  }

  return (
    <div className="content_full flex flex-col gap-2 ">
      <ViewTakes
        line_balance_id={cycle_time_id}
        token={session.user.token}
        selected_take={selected_take}
      />
      <ViewCycleTimes
        index={index}
        selected_take={selected_take}
        token={session.user.token}
      />
    </div>
  );
};

export default CycleTimePage;
