import React from "react";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { getWorkDaysByDate } from "@/features/request/work-day";
import { catchErrorTyped, customPackagedError } from "@/lib/licht-request";
import WorkDaysContainer from "@/features/v1/planner/components/WorkDaysContainer";

const WorkDayPage = async ({
  params,
}: {
  params: Promise<{ workday: string }>;
}) => {
  const workday = (await params).workday;
  const session = await auth();
  if (!session) redirect("/");

  const [error, work_days] = await catchErrorTyped(
    getWorkDaysByDate(session.user.token, workday),
    [...customPackagedError, Error],
  );

  if (error) {
    return (
      <p className={"font-bold"}>An unexpected error occurred {error.name}</p>
    );
  }

  return (
    <div className="w-full h-full overflow-y-auto overflow-x-auto scroll-blue ">
      <WorkDaysContainer data={work_days || []} />
    </div>
  );
};

export default WorkDayPage;
