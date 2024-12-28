"use server";
import React from "react";
import { auth } from "@/auth";
import { GET_ALL_WORK_PLANS_BY_WORK_DAY_ID } from "@/lib/queries";
import { WorkPlan } from "@/types/planner";

type Props = {
  work_day_id: string;
  str_date: string;
};
const WorkPlansContainer = async ({ work_day_id, str_date }: Props) => {
  const session = await auth();
  const workPlans = await fetch(
    GET_ALL_WORK_PLANS_BY_WORK_DAY_ID(work_day_id, str_date),
    {
      headers: { Authorization: `Bearer ${session?.user.token}` },
    },
  )
    .then((response) => {
      if (response.status !== 200) {
        console.log(response.status);
        console.log(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      return data as WorkPlan[];
    })
    .catch((error) => {
      console.error("Error fetching work plans:", error);
      // Return a default WorkPlan or handle gracefully
      return null; // Replace with a default WorkPlan object if needed
    });

  return (
    <div className="w-[250px] overflow-x-auto  p-2 bg-licht_secondary rounded-lg ">
      {workPlans == null || workPlans.length <= 0 ? (
        <div>no plans </div>
      ) : (
        <div className="w-fit flex flex-row gap-8">
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

const WorkPlanContainer = ({ data }: { data: WorkPlan }) => {
  return (
    <div className="flex w-[238px]  border px-2">
      <div className="flex flex-col gap-1">
        <div className="flex flex-row">
          <h3>{data.platform.platform}</h3>
        </div>
        <div className="flex flex-row gap-2">
          <h3>target oee</h3>
          <h3>{data.target_oee * 100}%</h3>
        </div>
        <div className="flex flex-row gap-2">
          <h3>Planned hrs</h3>
          <h3>{data.planned_hours}</h3>
        </div>
        <div className="flex flex-row gap-2">
          <h3>uph</h3>
          <h3>{data.uph_meta}</h3>
        </div>
        <div className="flex flex-row gap-2">
          <h3>commit</h3>
          <h3>{data.commit}</h3>
        </div>
      </div>
    </div>
  );
};
