"use server";
import { auth } from "@/auth";
import { LineBalanceRequestQuery } from "@/lib/queries";
import { parseServerActionResponse } from "@/lib/utils";
import { revalidateTag } from "next/cache";

export const createTake = async (
  state: any,
  line_balance_id: string,
  stations_id: string[],
) => {
  const session = await auth();
  if (!session) {
    return {
      error: "Not signed in",
      status: "ERROR",
    };
  }

  try {
    const response = await fetch(
      LineBalanceRequestQuery().SERVER.CREATE_TASK_WITH_STATIONS,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          line_balance_id: line_balance_id,
          stations_id: stations_id,
        }),
      },
    ).catch((error) => {
      throw new Error("Server Unreachable Error", error);
    });

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

    revalidateTag("takes");

    return parseServerActionResponse({
      data: await response.json(),
      status: "SUCCESS",
    });
  } catch {
    return {
      error: "An unexpected error occurred",
      status: "ERROR",
    };
  }
};
