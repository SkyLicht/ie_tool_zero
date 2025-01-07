"use server";
import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import { LineBalanceRequestQuery } from "@/lib/queries";
import { getCurrentLocalDate } from "@/lib/date-utils";

export const createLineBalance = async (
  state: any,
  line_id: string,
  str_date?: string | null,
) => {
  // Check if the user is signed in
  const session = await auth();

  if (!session)
    return {
      error: "Not signed in",
      status: "ERROR",
    };

  try {
    // Create Line Balance

    const response = await fetch(
      LineBalanceRequestQuery().SERVER.CREATE_LINE_BALANCE(
        str_date || getCurrentLocalDate(),
        line_id,
      ),
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.user.token}`,
          "Content-Type": "application/json",
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

// Fake API call and delay for 1 second
//await new Promise((resolve) => setTimeout(resolve, 3000));
