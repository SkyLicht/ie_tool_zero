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
  SidebarMenuSub,
  SidebarMenuSubItem,
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
  LucideProps,
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
type MenuItem = {
  id: string;
  title: string;
  url: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
};

type Application = {
  id: string;
  label: string;
  menus: MenuItem[];
};

const APPLICATIONS: Application[] = [
  {
    id: "164800f3-677a-45c5-b5c1-b898f71f6be2",
    label: "Line Balance",
    menus: [
      {
        id: "0a0c60cf-c72a-4a2b-a605-c1cf6b345c40",
        title: "Line Balance",
        url: "/v1/cycle_times",
        icon: TimerIcon,
      },
      {
        id: "c45ce633-48f8-4513-95cf-5d357a409460",
        title: "Cycle Time",
        url: "/v1/cycle_times",
        icon: TimerIcon,
      },
    ],
  },
  {
    id: "79b515e6-6da3-4aee-b263-d71667bc8c71",
    label: "Planner",
    menus: [
      {
        id: "9a64bd78-e79f-4887-91d6-868a6324e4cf",
        title: "Line Balance",
        url: "/v1/cycle_times",
        icon: TimerIcon,
      },
      {
        id: "f17e3040-3bb0-4e46-86a2-287d4e81521f",
        title: "Cycle Time",
        url: "/v1/cycle_times",
        icon: TimerIcon,
      },
    ],
  },
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
    <Sidebar variant="sidebar" collapsible="offcanvas">
      <SidebarHeader></SidebarHeader>
      <SidebarContent className="overflow-x-hidden">
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          {/*<SidebarMenu>*/}
          {/*  {items.map((item) => (*/}
          {/*    <SidebarMenuItem key={item.title}>*/}
          {/*      <SidebarMenuButton asChild>*/}
          {/*        <a href={item.url}>*/}
          {/*          <item.icon />*/}
          {/*          <span>{item.title}</span>*/}
          {/*        </a>*/}
          {/*      </SidebarMenuButton>*/}
          {/*    </SidebarMenuItem>*/}
          {/*  ))}*/}
          {/*</SidebarMenu>*/}

          {APPLICATIONS.map((item, index) => (
            <SidebarMenu key={item.id}>
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton> {item.label} </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.menus.map((menu) => (
                        <SidebarMenuItem key={menu.title}>
                          <SidebarMenuButton asChild>
                            <a href={menu.url}>
                              <menu.icon />
                              <span>{menu.title}</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          ))}
        </SidebarGroupContent>
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
