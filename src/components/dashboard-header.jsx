'use client'
import React from 'react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


function ModeToggle() {
    const { setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


export function DashboardHeader() {
    //   const pathname = usePathname()

    //   const segments = pathname
    //     .replace(/^\/dashboard\/?/, '')
    //     .split('/')
    //     .filter(Boolean)

    //   const breadcrumbs = [
    //     { label: 'Dashboard', href: '/dashboard' },
    //     ...segments.map((segment, i) => {
    //       const href = '/dashboard/' + segments.slice(0, i + 1).join('/')
    //       return { label: capitalize(segment), href }
    //     }),
    //   ]

    return (
       <header className="flex h-16 shrink-0 items-center gap-2 px-4 transition-all sticky top-0 z-50 bg-white dark:bg-[#171717] text-black dark:text-white shadow-md">
            <SidebarTrigger className="-ml-1" />
            {/* <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((crumb, i) => (
            <React.Fragment key={crumb.href}>
              <BreadcrumbItem>
                {i !== breadcrumbs.length - 1 ? (
                  <BreadcrumbLink asChild>
                    <Link href={crumb.href}>{crumb.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {i !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb> */}
            <div className="ml-auto">
                <ModeToggle />
            </div>
        </header>
    )
}

// function capitalize(str) {
//   return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ')
// }
