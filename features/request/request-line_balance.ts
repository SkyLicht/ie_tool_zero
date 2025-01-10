import { responseHandler, ServerUnreachableError } from "@/lib/licht-request";
import {
  LineBalanceQuery,
  LineBalanceShirtQuery,
  RecordQuery,
  TakeModel,
} from "@/features/types/line-balance";
import { LineBalanceRequestQuery } from "@/lib/queries";

export const getLineBalancesByWeek = async ({
  token,
  str_date,
  week,
}: {
  token: string;
  str_date?: string;
  week?: number;
}): Promise<LineBalanceShirtQuery[]> => {
  "use server";

  const url = week
    ? LineBalanceRequestQuery().SERVER.GET_LINE_BALANCES_BY_WEEK_2(week)
    : LineBalanceRequestQuery().SERVER.GET_LINE_BALANCES_BY_WEEK(
        str_date || "",
      );

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  }).catch((error) => {
    throw new ServerUnreachableError("An unexpected error occurred", error);
  });

  const data = await responseHandler(response, url);

  return data || [];
};

export const getLineBalanceById = async (
  token: string,
  id: string,
): Promise<LineBalanceQuery | null> => {
  "use server";

  const url = LineBalanceRequestQuery().SERVER.GET_LINE_BALANCE_BY_ID(id);

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    next: { tags: ["line-balance-by-id"] },
    // cache: "force-cache",
  }).catch((error) => {
    throw new ServerUnreachableError("An unexpected error occurred", error);
  });

  const data = await responseHandler(response, url);

  return data || null;
};

export const getTakesByLineBalanceId = async (
  token: string,
  id: string,
): Promise<TakeModel[] | null> => {
  "use server";
  const url = LineBalanceRequestQuery().SERVER.GET_TAKES_BY_LINE_BALANCE_ID(id);

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    next: { tags: ["takes"] },
    cache: "force-cache",
  }).catch((error) => {
    throw new ServerUnreachableError("An unexpected error occurred", error);
  });

  const data = await responseHandler(response, url);
  // `responseHandler` returned the parsed JSON object directly

  return data || null;
};

export const getCycleTimesByTakeId = async (
  token: string,
  id: string,
): Promise<RecordQuery[] | null> => {
  "use server";
  const url = LineBalanceRequestQuery().SERVER.GET_CYCLE_TIMES_BY_TASK_ID(id);

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    next: { tags: ["cycle-times"] },
  }).catch((error) => {
    throw new ServerUnreachableError("An unexpected error occurred", error);
  });

  const data = await responseHandler(response, url);
  // `responseHandler` returned the parsed JSON object directly

  return data || null;
};
