import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import React from "react";
import { cn } from "@/lib/utils";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className={cn("max-w-screen")}>
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        {children}
      </SidebarProvider>
    </main>
  );
}
