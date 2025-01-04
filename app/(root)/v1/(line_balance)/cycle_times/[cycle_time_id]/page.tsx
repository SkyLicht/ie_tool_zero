"use server";
import React from "react";
import { catchErrorTyped } from "@/lib/licht-request";
import { getLineBalanceById } from "@/features/request/request-line_balance";
import { auth } from "@/auth";
import ViewTakes from "@/features/v1/line_balance/components/line_balance/view-takes";

const CycleTimePage = async ({
  params,
}: {
  params: Promise<{ cycle_time_id: string }>;
}) => {
  const { cycle_time_id } = await params;
  const session = await auth();
  if (!session) {
    return <p className={"font-bold"}>You are not logged in!</p>;
  }

  const data = await catchErrorTyped(
    getLineBalanceById(session?.user?.token, cycle_time_id),
    [],
  );
  return (
    <div>
      {cycle_time_id}
      <ViewTakes />
    </div>
  );
};

export default CycleTimePage;
