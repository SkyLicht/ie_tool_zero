import { FactoryLinesModel } from "@/features/types/factory-model";
import { GET_ALL_LINES } from "@/lib/queries";
import { RequestResponds } from "@/features/request/request-reponds";
import { responseHandler, ServerUnreachableError } from "@/lib/licht-request";

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
  const url = GET_ALL_LINES;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "force-cache",
  }).catch((error) => {
    throw new ServerUnreachableError("An unexpected error occurred", error);
  });
  const data = await responseHandler(response, url);
  return data || [];
};
