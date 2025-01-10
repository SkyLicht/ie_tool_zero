import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  ChevronUp,
  Home,
  Inbox,
  LogInIcon,
  LogOutIcon,
  TimerIcon,
  User2,
  WorkflowIcon,
} from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { auth, signIn, signOut } from "@/auth";
import React from "react";
// import Link from "next/link";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Manager",
    url: "/v1/manager_layout",
    icon: Inbox,
  },
  {
    title: "Line Balance",
    url: "/v1/cycle_times",
    icon: TimerIcon,
  },
  {
    title: "Planner",
    url: "/v1/workdays",
    icon: WorkflowIcon,
  },
  // {
  //   title: "Calendar",
  //   url: "#",
  //   icon: Calendar,
  // },
  // {
  //   title: "Search",
  //   url: "#",
  //   icon: Search,
  // },
  // {
  //   title: "Settings",
  //   url: "#",
  //   icon: Settings,
  // },
];

export const AppSidebar = async () => {
  const session = await auth();
  // const {
  //   state,
  //   open,
  //   setOpen,
  //   openMobile,
  //   setOpenMobile,
  //   isMobile,
  //   toggleSidebar,
  // } = useSidebar();

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent className="overflow-x-hidden">
        <SidebarGroup />
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        {session && session?.user ? (
          <Footer username={session.user.name} />
        ) : (
          <LogIn />
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

const Footer = ({ username }: { username: string }) => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton>
              <User2 /> {username}
              <ChevronUp className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            className="w-[--radix-popper-anchor-width]"
          >
            <DropdownMenuItem>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">
                  <span className="max-sm:hidden">Logout</span>
                  <LogOutIcon className="size-6 sm:hidden text-red-500" />
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

const LogIn = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <form
          action={async () => {
            "use server";

            await signIn();
          }}
        >
          <button type="submit">
            <LogInIcon />
          </button>
        </form>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

// <Link href={`/user/${session?.user.id}`}>
//   <Avatar className="size-10">
//     <AvatarImage
//         src={session?.user?.image || ""}
//         alt={session?.user?.name || ""}
//     />
//     <AvatarFallback>AV</AvatarFallback>
//   </Avatar>
// </Link>
