"use server";
import { auth } from "@/auth";
import { LineManagerRequest } from "@/lib/queries";
import { parseServerActionResponse } from "@/lib/utils";
import { revalidateTag } from "next/cache";

export const createTake = async (state: any, line_balance_id: string) => {
  const session = await auth();
  if (!session) {
    return {
      error: "Not signed in",
      status: "ERROR",
    };
  }

  try {
    const response = await fetch(
      LineManagerRequest().SERVER.CREATE_TASK(line_balance_id),
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      },
    );
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
  } catch (error) {
    return {
      error: error,
      status: "ERROR",
    };
  }
};
