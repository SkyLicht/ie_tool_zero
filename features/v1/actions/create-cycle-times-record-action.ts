"use server";
import { auth } from "@/auth";

export const createCycleTimesRecordAction = async (
  state: any,
  str_date: string,
  line_id: string,
) => {
  console.log("createCycleTimesRecordAction", state, str_date, line_id);
  const session = await auth();

  if (!session)
    return {
      error: "Not signed in",
      status: "ERROR",
    };

  try {
    // Create cycle times record

    // Fake API call and delay for 1 second
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return {
      data: "Cycle times record created successfully",
      status: "SUCCESS",
    };
  } catch (error) {
    return {
      error: error,
      status: "ERROR",
    };
  }
};
