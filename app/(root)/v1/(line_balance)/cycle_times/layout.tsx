import React from "react";
import MaxMobileWidthWrapper from "@/components/ui/MobileMaxWidthWrapper";

const CycleTimeWrapper = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <MaxMobileWidthWrapper>
      <section className="w-full h-full flex flex-1 p-2">{children}</section>
    </MaxMobileWidthWrapper>
  );
};

export default CycleTimeWrapper;
