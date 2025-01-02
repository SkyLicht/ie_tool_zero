"use server";

import React from "react";
import { FactoryLinesModel } from "@/features/types/factory-model";
import { auth } from "@/auth";
import { GET_ALL_LAYOUTS } from "@/lib/queries";
import { LayoutModel } from "@/features/types/layout-model";
import LayoutsView from "@/features/v1/manager/components/manager_layout/layouts-view";
import CreateLayoutForm from "@/features/v1/manager/components/forms/create-layout-form";

const LayoutsContainer = async ({
  factories,
}: {
  factories: FactoryLinesModel[];
}) => {
  const session = await auth();

  if (!session) {
    return <p className={"font-bold"}>You are not logged in!</p>;
  }

  const response = await fetch(GET_ALL_LAYOUTS, {
    headers: { Authorization: `Bearer ${session?.user.token}` },
  });

  if (!response.ok) {
    return (
      <p className={"font-bold"}>
        Error fetching layouts! {response.statusText}
      </p>
    );
  }
  const layouts: LayoutModel[] = await response.json();

  return (
    <section className="h-full w-fit  flex flex-col gap-2">
      <div className="w-full flex flex-row items-center justify-between ps-4">
        <h1 className="card_text_heading">Layouts</h1>
        {/*<CreateLayoutForm factories={factories} />*/}
      </div>
      <LayoutsView data={layouts} />
    </section>
  );
};

export default LayoutsContainer;
