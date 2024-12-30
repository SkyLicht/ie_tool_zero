import React from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { cn } from "@/lib/utils";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <section className="w-full h-full ">
      <MaxWidthWrapper className={cn("h-screen  min-h-screen max-h-screen  ")}>
        <section className="w-full h-full flex flex-1 py-2 ">
          {children}
        </section>
      </MaxWidthWrapper>
    </section>
  );
};

export default Layout;
