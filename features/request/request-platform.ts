import { GET_ALL_PLATFORMS } from "@/lib/queries";
import { responseHandler, ServerUnreachableError } from "@/lib/licht-request";
import { Platform } from "@/features/types/platform";

export const getPlatformsInService = async (
  token: string,
): Promise<Platform[]> => {
  "use server";
  const url = GET_ALL_PLATFORMS().SERVER.GET_ALL_PLATFORMS_IN_SERVICE;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "force-cache",
  }).catch((error) => {
    throw new ServerUnreachableError("An unexpected error occurred", error);
  });
  const data = await responseHandler(response, url);
  return data || [];
};
