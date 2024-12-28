import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import React from "react";
import { cn } from "@/lib/utils";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main
      className={cn(
        "mx-auto w-full max-w-screen-sm md:max-w-screen-lg  xl:max-w-screen-2xl 2xl:max-w-full ",
      )}
    >
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <main className=" w-full h-screen  p-2">{children}</main>
      </SidebarProvider>
    </main>
  );
}
