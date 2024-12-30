"use server";
import React from "react";
import { auth } from "@/auth";
import {
  GET_ALL_OPERATIONS_AREAS,
  GET_ALL_WORK_PLANS_BY_WORK_DAY_ID,
} from "@/lib/queries";
import { AreaModel } from "@/features/types/area-model";
import LayoutContainer from "@/features/v1/manager/components/manager_layout/layout-container";
import { OperationModel } from "@/features/types/operation-model";
import { LayoutModel } from "@/features/types/layout-model";

const ManageLayoutPage = async ({
  params,
}: {
  params: Promise<{ layout_id: string }>;
}) => {
  const { layout_id } = await params;

  const session = await auth();

  if (!session) {
    return <p className={"font-bold"}>You are not logged in!</p>;
  }

  const response_operations = await fetch(GET_ALL_OPERATIONS_AREAS, {
    headers: { Authorization: `Bearer ${session?.user.token}` },
  });

  if (response_operations.status === 401) {
    return <p className={"font-bold"}>You are not logged in!</p>;
  }

  if (!response_operations.ok) {
    return <p className={"font-bold"}>Error fetching operations and areas</p>;
  }

  const operations_areas: {
    operations?: OperationModel[];
    areas?: AreaModel[];
  } = await response_operations.json();

  const layout_response = await fetch(
    GET_ALL_WORK_PLANS_BY_WORK_DAY_ID(layout_id),
    {
      headers: { Authorization: `Bearer ${session?.user.token}` },
    },
  );

  if (layout_response.status === 401) {
    return <p className={"font-bold"}>You are not logged in!</p>;
  }

  if (!layout_response.ok) {
    return <p className={"font-bold"}>Error fetching layout</p>;
  }

  const layout: LayoutModel = await layout_response.json();

  return (
    <LayoutContainer
      layout_id={layout_id}
      areas={operations_areas.areas || []}
      operations={operations_areas.operations || []}
      layout={layout}
    />
  );
};

export default ManageLayoutPage;
