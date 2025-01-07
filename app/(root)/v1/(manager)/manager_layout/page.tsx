"use server";
import React from "react";
import LayoutsContainer from "@/features/v1/manager/components/manager_layout/layouts-container";
import { auth } from "@/auth";
import { catchErrorTyped, customPackagedError } from "@/lib/licht-request";
import { getLinesGroupedByFactoryV2 } from "@/features/request/request-line";

const ManageLayoutPage = async () => {
  const session = await auth();

  if (!session) {
    return <p className={"font-bold"}>You are not logged in!</p>;
  }

  const [error, data] = await catchErrorTyped(
    getLinesGroupedByFactoryV2(session.user.token),
    [...customPackagedError, Error],
  );

  if (error) {
    return (
      <p className={"font-bold"}>An unexpected error occurred {error.name}</p>
    );
  }

  return (
    <section>
      <LayoutsContainer factories={data || []} />
    </section>
  );
};

export default ManageLayoutPage;
