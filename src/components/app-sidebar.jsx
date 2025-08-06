"use client";

import React, { useContext } from "react";
import {
  Bot,
  Settings2,
  SquareTerminal,
  User,
} from "lucide-react";
import { ManageAccounts } from "@mui/icons-material";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { AuthContext } from "@/context/authContext";

// Project Links (Always visible)
const navProjects = [
  {
    name: "Overview",
    url: "/dashboard/overview",
    icon: SquareTerminal,
  },
];

// Sidebar Nav Items (Some require permissions)
const navMain = [
  {
    title: "Products",
    icon: Bot,
    permissions: ["create-product", "read-product"],
    items: [
      { title: "Add Products", url: "/dashboard/addProducts", permission: "create-product" },
      { title: "List", url: "/dashboard/product", permission: "read-product" },
    ],
  },
  {
    title: "Roles",
    icon: ManageAccounts,
    permissions: ["create-role", "read-role"],
    items: [
      { title: "Create Role", url: "/dashboard/createRole", permission: "create-role" },
      { title: "List", url: "/dashboard/updateRole", permission: "read-role" },
    ],
  },
  {
    title: "User Management",
    icon: User,
    permissions: ["create-user", "read-user"],
    items: [
      { title: "Create User", url: "/dashboard/createUser", permission: "create-user" },
      { title: "List", url: "/dashboard/updateUser", permission: "read-user" },
    ],
  },
  {
    title: "Settings",
    icon: Settings2,
    items: [
      { title: "General", url: "#" },
      { title: "Team", url: "#" },
      { title: "Billing", url: "#" },
      { title: "Limits", url: "#" },
    ],
  },
];

function hasPermission(user, permission) {
  if (!permission) return true;
  return user?.role?.permissions?.includes(permission);
}

export function AppSidebar(props) {
  const { user } = useContext(AuthContext);

  const filteredNavMain = navMain
    .map((section) => {
      if (!section.items) return section;

      const visibleItems = section.items.filter((item) =>
        hasPermission(user, item.permission)
      );

      if (visibleItems.length === 0) return null;

      return {
        ...section,
        items: visibleItems,
      };
    })
    .filter(Boolean); 

  return (
    <Sidebar collapsible="icon" {...props} className="scrollbar-hide">
      <SidebarHeader />
      <SidebarContent className="scrollbar-hide">
        <NavProjects projects={navProjects} />
        <NavMain items={filteredNavMain} />
      </SidebarContent>
      <SidebarFooter className="scrollbar-hide">
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
