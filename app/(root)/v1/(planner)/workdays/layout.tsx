import React from "react";
import DaySelectorContainer from "@/components/date/DaySelectorContainer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { cn } from "@/lib/utils";

const PlannerLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <MaxWidthWrapper className={cn("h-screen  min-h-screen max-h-screen ")}>
      <main className="h-full w-full  flex flex-1 justify-center  p-2 ">
        <section className="h-full w-full flex flex-col gap-4 max-w-screen-xl items-center">
          <div className=" w-full flex flex-row justify-center items-center">
            <DaySelectorContainer />
          </div>
          {children}
        </section>
      </main>
    </MaxWidthWrapper>
  );
};

export default PlannerLayout;
