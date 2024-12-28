"use server";
import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import { CREATE_WORK_PLAN } from "@/lib/queries";
import { WeekInfo } from "@/lib/date-utils";

export const createWorkPlan = async (
  state: any,
  form: FormData,
  line_id: string,
  work_day_id: string,
  str_date: string,
) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { platform_id, planned_hours, target_oee, uph_i, head_count, ft, ict } =
    Object.fromEntries(Array.from(form));

  try {
    const workPlan = {
      work_day_id: work_day_id,
      platform_id: platform_id,
      line_id: line_id,
      planned_hours: planned_hours,
      target_oee: target_oee,
      uph_i: uph_i,
      start_hour: "0",
      end_hour: "23",
      date: new Date(str_date).getUTCDate(),
      str_date: str_date,
      week: WeekInfo.getWeekNumber(str_date),
      head_count: head_count,
      ft: ft,
      ict: ict,
    };

    const response = await fetch(CREATE_WORK_PLAN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.token}`,
      },
      body: JSON.stringify(workPlan),
    });

    const data = await response.json();

    if (!response.ok) {
      return parseServerActionResponse({
        error: response.statusText,
        status: "ERROR",
      });
    }

    return parseServerActionResponse({
      ...data,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.error("Error creating work plan", error);
    return parseServerActionResponse({
      error: error.message,
      status: "ERROR",
    });
  }
};
