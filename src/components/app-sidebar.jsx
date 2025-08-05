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


// Define project links
const navProjects = [
  {
    name: "Overview",
    url: "/dashboard/overview",
    icon: SquareTerminal,
  },
];

// Define sidebar items with permissions
const navMain = [
  {
    title: "Products",
    url: "#",
    icon: Bot,
    permissions: ["create-product", "read-product"],
    items: [
      {
        title: "Add Products",
        url: "/dashboard/addProducts",
        permission: "create-product",
      },
      {
        title: "List",
        url: "/dashboard/product",
        permission: "read-product",
      },
    ],
  },
  {
    title: "Roles",
    url: "#",
    icon: ManageAccounts,
    permissions: ["create-role", "read-role"],
    items: [
      {
        title: "Create Role",
        url: "/dashboard/createRole",
        permission: "create-role",
      },
      {
        title: "List",
        url: "/dashboard/updateRole",
        permission: "read-role",
      },
    ],
  },
  {
    title: "User Management",
    url: "#",
    icon: User,
    permissions: ["create-user", "read-user"],
    items: [
      {
        title: "Create User",
        url: "/dashboard/createUser",
        permission: "create-user",
      },
      {
        title: "List",
        url: "/dashboard/updateUser",
        permission: "read-user",
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
];

// Utility to check permission
function hasPermission(user, permission) {
  if (!permission) return true; // No permission required
  return user?.role?.permissions?.includes(permission);
}

export function AppSidebar(props) {
  const { user } = useContext(AuthContext);

  // Filter navMain items based on user permissions
  const filteredNavMain = navMain
    .map((section) => {
      const visibleItems = (section.items || []).filter((item) =>
        hasPermission(user, item.permission)
      );

      if (visibleItems.length === 0) return null;

      return {
        ...section,
        items: visibleItems,
      };
    })
    .filter(Boolean); // Remove nulls

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
