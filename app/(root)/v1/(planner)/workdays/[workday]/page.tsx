import React from "react";
import { GET_ALL_WORKDAYS_BY_DATE } from "@/lib/queries";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { WorkDay } from "@/types/planner";
import WorkDaysContainer from "@/features/v1/planner/components/WorkDaysContainer";

const WorkDayPage = async ({
  params,
}: {
  params: Promise<{ workday: string }>;
}) => {
  const workday = (await params).workday;
  const session = await auth();
  if (!session) redirect("/");

  const work_days = await fetch(GET_ALL_WORKDAYS_BY_DATE(workday), {
    headers: { Authorization: `Bearer ${session?.user.token}` },
  })
    .then((response) => {
      if (!response.ok) {
        console.log(response.status);
      }
      return response.json();
    })
    .then((data) => data as WorkDay[])
    .catch((error) => {
      console.log("Error fetching work days:", error);
      // Return a default WorkPlan or handle gracefully
      return null; // Replace with a default WorkPlan object if needed
    });

  return (
    <div className="w-full h-full pt-2 ">
      <WorkDaysContainer data={work_days || []} />
    </div>
  );
};

export default WorkDayPage;

//workday: Promise<{ query?: string }>
