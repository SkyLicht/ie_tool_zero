import { GET_ALL_LINES } from "@/lib/queries";
import { HTTP_401_Error, ServerUnreachableError } from "@/lib/licht-request";
import { WorkPlanModel } from "@/features/types/work-plan";

export const getWorkPlans = async (token: string): Promise<WorkPlanModel[]> => {
  "use server";

  const response = await fetch(GET_ALL_LINES, {
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

  return data as WorkPlanModel[];
};
