import React from "react";
import DaySelectorContainer from "@/components/date/DaySelectorContainer";

const PlannerLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className="h-full w-full flex flex-col">
      <DaySelectorContainer />
      {children}
    </main>
  );
};

export default PlannerLayout;
