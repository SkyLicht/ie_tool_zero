import { LineManagerRequest } from "@/lib/queries";
import {
  HTTP_401_Error,
  HTTP_404_Error,
  responseHandler,
  ServerUnreachableError,
} from "@/lib/licht-request";
import {
  LineBalanceQuery,
  RecordQuery,
  TakeModel,
} from "@/features/types/line-balance";

type LineBalances = {
  id: string;
  str_date: string;
  week: number;
  layout: {
    id: string;
    line_id: string;
    factory_id: string;
    line_name: string;
    factory_name: "string";
    is_active: boolean;
    version: number;
    created_at: string;
    updated_at: string;
    stations: [
      {
        id: string;
        operation_id: string;
        index: number;
        label: string;
      },
      {
        id: string;
        operation_id: string;
        index: number;
        label: string;
      },
      {
        id: string;
        operation_id: string;
        index: number;
        label: string;
      },
    ];
  };
  created_at: "2025-01-01 19:35:33.410811";
  updated_at: "2025-01-01 19:35:33.410833";
};

export const getLineBalancesByWeek = async (
  token: string,
  str_date: string,
): Promise<LineBalances[]> => {
  "use server";

  const url = LineManagerRequest().SERVER.GET_LINE_BALANCES_BY_WEEK(str_date);

  const response = await fetch(url, {
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

  if (response.status === 404) {
    throw new HTTP_404_Error(`Not Found: ${response.statusText}   ${url}`);
  }

  if (response.status === 422) {
    throw new Error("Unprocessable Entity");
  }

  if (response.status !== 200) {
    throw new Error("Error fetching line balances");
  }

  const data = await response.json();

  if (!data) {
    return [];
  }

  return data;
};

export const getLineBalanceById = async (
  token: string,
  id: string,
): Promise<LineBalanceQuery | null> => {
  "use server";

  const url = LineManagerRequest().SERVER.GET_LINE_BALANCE_BY_ID(id);

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    next: { tags: ["line-balance-by-id"] },
    cache: "force-cache",
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
  const url = LineManagerRequest().SERVER.GET_TAKES_BY_LINE_BALANCE_ID(id);

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
  const url = LineManagerRequest().SERVER.GET_CYCLE_TIMES_BY_TASK_ID(id);

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
