"use server";
import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import { LineBalanceRequestQuery } from "@/lib/queries";

export const updateCycleTime = async (state: any, formData: FormData) => {
  const session = await auth();

  if (!session) {
    return {
      error: "Not signed in",
      status: "ERROR",
    };
  }

  try {
    const cycles_str = formData.get("cycle_times") as string;

    if (!cycles_str) {
      return parseServerActionResponse({
        error: "Parse cycles str",
        error_massage: "",
        status: "ERROR",
      });
    }
    const cycles: number[] = JSON.parse(cycles_str);

    const response = await fetch(
      LineBalanceRequestQuery().SERVER.UPDATE_RECORD,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${session.user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          record_id: formData.get("record_id"),
          cycles: cycles,
        }),
      },
    ).catch((error) => {
      throw new Error("Server Unreachable Error", error);
    });

    console.log(response);

    if (!response.ok) {
      return parseServerActionResponse({
        error: response.statusText,
        error_massage: await response.json(),
        status: "ERROR",
      });
    }
    if (response.status !== 200) {
      return parseServerActionResponse({
        error: response.statusText,
        error_massage: await response.json(),
        status: "ERROR",
      });
    }

    return parseServerActionResponse({
      data: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);
    return {
      error: "An unexpected error occurred",
      status: "ERROR",
    };
  }
};
