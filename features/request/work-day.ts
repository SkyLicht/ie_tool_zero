import { WorkDayModel } from "@/features/types/work-day";
import { HTTP_401_Error, ServerUnreachableError } from "@/lib/licht-request";
import { GET_ALL_WORKDAYS_BY_DATE } from "@/lib/queries";

export const getWorkDaysByDate = async (
  token: string,
  work_date: string,
): Promise<WorkDayModel[]> => {
  "use server";

  const response = await fetch(GET_ALL_WORKDAYS_BY_DATE(work_date), {
    headers: { Authorization: `Bearer ${token}` },
  }).catch((error) => {
    throw new ServerUnreachableError("An unexpected error occurred", error);
  });

  if (!response.ok) {
    throw new ServerUnreachableError("An unexpected error occurred");
  }

  if (response.status === 401) {
    throw new HTTP_401_Error("You are not logged in!");
  }

  if (response.status !== 200) {
    throw new Error("Error fetching lines");
  }

  const data = await response.json();

  if (!data) {
    return [];
  }

  return data as WorkDayModel[];
};
