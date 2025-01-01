"use server";
import React from "react";
import { auth } from "@/auth";
import { GET_ALL_WORK_PLANS_BY_WORK_DAY_ID } from "@/lib/queries";
import { WorkPlanModel } from "@/features/types/work-plan";
import WorkPlanContainer from "@/features/v1/planner/components/work-plan-container";

type Props = {
  work_day_id: string;
  str_date: string;
};
const WorkPlansContainer = async ({ work_day_id, str_date }: Props) => {
  const session = await auth();
  const response = await fetch(
    GET_ALL_WORK_PLANS_BY_WORK_DAY_ID(work_day_id, str_date),
    {
      headers: { Authorization: `Bearer ${session?.user.token}` },
    },
  );

  if (response.status === 401) {
    return <p className={"font-bold"}>You are not logged in!</p>;
  }

  if (!response.ok) {
    return <p className={"font-bold"}>Error fetching work plans</p>;
  }

  const workPlans: WorkPlanModel[] = await response.json();

  return (
    <div className="h-[230px]  w-[270px] overflow-x-auto scroll-blue">
      {workPlans == null || workPlans.length <= 0 ? (
        <div>no plans </div>
      ) : (
        <div className="h-full full w-fit flex flex-row gap-8">
          {workPlans.map((plan) => (
            <div key={plan.id}>
              <WorkPlanContainer data={plan} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkPlansContainer;
