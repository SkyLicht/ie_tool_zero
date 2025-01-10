import React from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { cn } from "@/lib/utils";

const LineBalanceLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <MaxWidthWrapper className={cn("h-screen  min-h-screen max-h-screen ")}>
      <main className="h-full w-full  flex flex-1 justify-center  p-2 ">
        <section className="h-full w-full flex flex-col gap-4 max-w-screen-xl items-center">
          {children}
        </section>
      </main>
    </MaxWidthWrapper>
  );
};

export default LineBalanceLayout;
