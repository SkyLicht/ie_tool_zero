"use server";
import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import { CREATE_LAYOUT } from "@/lib/queries";

export const actionCreateLayout = async (state: any, form: FormData) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { line_id } = Object.fromEntries(Array.from(form));

  try {
    // Create layout

    const response = await fetch(CREATE_LAYOUT(String(line_id)), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.user.token}`,
      },
    });

    if (!response.ok) {
      return parseServerActionResponse({
        error: response.statusText,
        status: "ERROR",
      });
    }

    return parseServerActionResponse({
      data: await response.json(),
      status: "SUCCESS",
    });
  } catch (error) {
    return parseServerActionResponse({
      error: error,
      status: "ERROR",
    });
  }
};
