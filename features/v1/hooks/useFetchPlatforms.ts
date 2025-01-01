import { useState, useEffect } from "react";
import { GET_ALL_PLATFORMS_IN_SERVICE } from "@/lib/queries";
import { getSession } from "next-auth/react";
interface Platform {
  id: string;
  platform: string;
}

export function useFetchPlatforms() {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const session = await getSession();
        if (!session?.user.token) {
          throw new Error("User is not authenticated");
        }
        const response = await fetch(GET_ALL_PLATFORMS_IN_SERVICE, {
          headers: { Authorization: `Bearer ${session?.user.token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to request platforms");
        }

        const data: Platform[] = await response.json();

        setPlatforms(data);
      } catch (err: unknown) {
        // Check if the error is an instance of Error; if not, fallback to a generic message
        console.log(err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { platforms, isLoading, error };
}
