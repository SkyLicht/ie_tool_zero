import {
  responseHandler,
  ServerUnreachableError,
  LoggedInError,
} from "@/lib/licht-request";
import { StationsRequestQuery } from "@/lib/queries";
import { auth } from "@/auth";
import { StationShortQuery } from "@/features/types/stations-model";

export const getStationsByLayoutId = async (
  layout_id: string,
): Promise<StationShortQuery[]> => {
  "use server";
  const session = await auth();

  if (!session) {
    throw new LoggedInError("You are not logged in!");
  }
  const url =
    StationsRequestQuery().SERVER.GET_STATIONS_BY_LINE_BALANCE_ID(layout_id);
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${session.user.token}` },
    next: { tags: ["stations"], revalidate: 3600 },
    cache: "force-cache",
  }).catch((error) => {
    throw new ServerUnreachableError("An unexpected error occurred", error);
  });
  const data = await responseHandler(response, url);
  return data || [];
};
