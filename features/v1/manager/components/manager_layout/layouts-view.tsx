import React from "react";
import { LayoutModel } from "@/features/types/layout-model";
import Link from "next/link";

type Props = {
  data: LayoutModel[];
};
const LayoutsView = ({ data }: Props) => {
  return (
    <div className="h-fit grid grid-cols-6 gap-2  overflow-y-auto">
      {data.map((layout) => (
        <Link
          key={layout.id}
          className="border p-4 card-container h-[70px]"
          href={`/v1/manager_layout/${layout.id}`}
        >
          <div className="flex flex-row gap-3 card_title ">
            <h3>Layout</h3>
            <h3>{layout.factory}</h3>
            <h3>{layout.line_name}</h3>
          </div>
          <div className="flex flex-row gap-3 card_text ">
            <h3>stations</h3>
            <h3>{layout.stations.length}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default LayoutsView;
