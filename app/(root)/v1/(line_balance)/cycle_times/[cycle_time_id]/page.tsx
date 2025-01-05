"use server";
import React from "react";
import { catchErrorTyped, customPackagedError } from "@/lib/licht-request";
import { getLineBalanceById } from "@/features/request/request-line_balance";
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

  console.log("CycleTimePage", cycle_time_id, selected_take);

  const session = await auth();
  if (!session) {
    return <p className={"font-bold"}>You are not logged in!</p>;
  }

  const [error, line_balance] = await catchErrorTyped(
    getLineBalanceById(session?.user?.token, cycle_time_id),
    [...customPackagedError, Error],
  );

  if (error) {
    return (
      <p className={"font-bold"}>An unexpected error occurred {error.name}</p>
    );
  }

  if (!line_balance) {
    return <p className={"font-bold"}>No data found</p>;
  }

  return (
    <div className="content_full flex flex-col gap-2 ">
      <ViewTakes line_balance_id={cycle_time_id} token={session.user.token} />
      <ViewCycleTimes
        selected_take={selected_take}
        token={session.user.token}
      />
    </div>
  );
};

export default CycleTimePage;
