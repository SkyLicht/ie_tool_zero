"use server";
import React from "react";
import LayoutsContainer from "@/features/v1/manager/components/manager_layout/layouts-container";
import { auth } from "@/auth";
import { GET_ALL_LINES } from "@/lib/queries";
import { FactoryLinesModel } from "@/features/types/factory-model";

const ManageLayoutPage = async () => {
  const session = await auth();

  if (!session) {
    return <p className={"font-bold"}>You are not logged in!</p>;
  }

  const response = await fetch(GET_ALL_LINES, {
    headers: { Authorization: `Bearer ${session?.user.token}` },
  });

  const factories: FactoryLinesModel[] = await response.json();

  return (
    <section>
      <LayoutsContainer factories={factories} />
    </section>
  );
};

export default ManageLayoutPage;
