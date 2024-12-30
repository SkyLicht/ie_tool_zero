import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <section
      className={cn(
        "mx-auto w-full max-w-screen-sm md:max-w-screen-lg  xl:max-w-screen-2xl 2xl:max-w-full lg:px-2.5",
        className,
      )}
    >
      {children}
    </section>
  );
};

export default MaxWidthWrapper;
