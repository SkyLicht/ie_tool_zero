"use server";
import React from "react";
import ActionLinesForm from "@/features/v1/components/forms/ActionLinesForm";
import { auth } from "@/auth";
import { getLinesGroupedByFactoryV2 } from "@/features/request/request-line";
import ViewLineBalance from "@/features/v1/line_balance/components/view-line-balance";
import { catchErrorTyped, customPackagedError } from "@/lib/licht-request";

const CycleTimePage = async () => {
  const session = await auth();

  if (!session) {
    return <p className={"font-bold"}>You are not logged in!</p>;
  }

  const [error, lines] = await catchErrorTyped(
    getLinesGroupedByFactoryV2(session?.user.token),
    [...customPackagedError, Error],
  );

  if (error) {
    return (
      <p className={"font-bold"}>An unexpected error occurred {error.name}</p>
    );
  }

  return (
    <div className="w-full h-full flex flex-col  gap-2 ">
      <div className="w-full flex flex-row gap-4 items-center justify-between ">
        <h3 className="card_title">Line Balances</h3>
        <ActionLinesForm data={lines || []} />
      </div>
      <ViewLineBalance token={session.user.token} />
    </div>
  );
};

export default CycleTimePage;
