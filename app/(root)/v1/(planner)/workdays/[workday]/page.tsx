import React from "react";

import { getWorkDaysByDate } from "@/features/request/work-day";
import { catchErrorTyped, customPackagedError } from "@/lib/licht-request";
import WorkDaysContainer from "@/features/v1/planner/components/WorkDaysContainer";
import { getServerSideProps } from "@/lib/service-side";
import { getPlatformsInService } from "@/features/request/request-platform";

const WorkDayPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ workday: string }>;
  searchParams: Promise<{ selected_day: string }>;
}) => {
  const workday = (await params).workday;
  const selected_day = (await searchParams).selected_day;
  const session = await getServerSideProps();

  const [error_platform, platforms] = await catchErrorTyped(
    getPlatformsInService(session.user.token),
    [...customPackagedError, Error],
  );

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
      {selected_day ? (
        <WorkDaysContainer data={work_days || []} platforms={platforms || []} />
      ) : (
        <div>Select a day</div>
      )}
    </div>
  );
};

export default WorkDayPage;
