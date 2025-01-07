"use server";
import { auth } from "@/auth";
import { LineBalanceRequestQuery } from "@/lib/queries";
import { parseServerActionResponse } from "@/lib/utils";
import { revalidateTag } from "next/cache";
import { serverActionResponse } from "@/lib/licht-actions";

export const deleteTake = async <T>(
  state: any,
  take_id: string,
): Promise<serverActionResponse<T>> => {
  const session = await auth();
  if (!session) {
    return {
      error: "Not signed in",
      status: "ERROR",
    };
  }

  try {
    const response = await fetch(
      LineBalanceRequestQuery().SERVER.DELETE_TAKE(take_id),
      {
        method: "DELETE",
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
  } catch (error: any) {
    console.log(error);
    return {
      error: error.message,
      status: "ERROR",
    };
  }
};
