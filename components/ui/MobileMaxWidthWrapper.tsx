import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const MaxMobileWidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <section
      className={cn(
        "mx-auto w-full max-w-screen-sm border h-screen  max-h-screen min-h-screen",
        className,
      )}
    >
      {children}
    </section>
  );
};

export default MaxMobileWidthWrapper;
