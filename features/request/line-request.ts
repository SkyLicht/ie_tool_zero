import { FactoryLinesModel } from "@/features/types/factory-model";
import { GET_ALL_LINES } from "@/lib/queries";
import { RequestResponds } from "@/features/request/request-reponds";
import { HTTP_401_Error, ServerUnreachableError } from "@/lib/licht-request";

export const getLinesGroupedByFactory = async (
  token: string,
): Promise<RequestResponds<FactoryLinesModel[]>> => {
  "use server";

  // Check for the token
  if (!token) {
    return {
      error: {
        message: "You are not logged in!",
        code: 401,
      },
    };
  }

  const _respond: RequestResponds<FactoryLinesModel[]> = {};

  try {
    const response = await fetch(GET_ALL_LINES, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 401) {
      _respond.error = {
        message: "You are not logged in!",
        code: 401,
      };
    }

    if (response.status !== 200) {
      _respond.error = {
        message: "Error fetching lines",
        code: response.status,
      };
    }

    _respond.data = await response.json();
  } catch (error: any) {
    _respond.error = {
      message: error.message,
      code: 500,
    };
  }

  return _respond;
};

export const getLinesGroupedByFactoryV2 = async (
  token: string,
): Promise<FactoryLinesModel[]> => {
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

  return data as FactoryLinesModel[];
};
