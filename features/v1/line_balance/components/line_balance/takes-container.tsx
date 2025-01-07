"use server";

import React from "react";
import Link from "next/link";
import { catchErrorTyped, customPackagedError } from "@/lib/licht-request";
import { getTakesByLineBalanceId } from "@/features/request/request-line_balance";
import { cn } from "@/lib/utils";
type Props = {
  token: string;
  line_balance_id: string;
  selected_take: string | undefined;
};
const TakesContainer = async ({
  line_balance_id,
  token,
  selected_take,
}: Props) => {
  const [error, data] = await catchErrorTyped(
    getTakesByLineBalanceId(token, line_balance_id),
    [...customPackagedError, Error],
  );

  if (error) {
    return (
      <p className={"font-bold"}>
        An unexpected error occurred {error.message}
      </p>
    );
  }

  if (!data) {
    return <p className={"font-bold"}>No data found</p>;
  }

  return (
    <div className="w-full overflow-x-auto scroll-blue pb-2">
      <ul className="w-fit flex flex-row gap-2  ">
        {data.map((take, index) => (
          <Link
            href={`?selected_take=${take.id}&index=${take.index}`}
            key={take.id}
            className={cn(
              "h-[50px] w-[100px] flex_center tracking-wider select-none cursor-pointer  card_title ",
              take.id === selected_take ? " card-container" : "container",
            )}
          >
            <h3>Take {index + 1}</h3>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default TakesContainer;
