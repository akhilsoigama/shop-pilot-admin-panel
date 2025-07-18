"use client"

import * as React from "react"
import {
  Bot,
  Frame,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "",
  },
  navMain: [
    {
      title: "Products",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Add Products",
          url: "/dashboard/addProducts",
        },
        {
          title: "List",
          url: "/dashboard/product",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Overview",
      url: "/dashboard/overview",
      icon: SquareTerminal,
    },
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar collapsible="icon" {...props} className='scrollbar-hide'>
      <SidebarHeader>
      </SidebarHeader>
      <SidebarContent className='scrollbar-hide'>
        <NavProjects projects={data.projects} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className='scrollbar-hide'>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
