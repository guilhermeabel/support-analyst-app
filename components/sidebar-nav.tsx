"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, List, User, Book, Settings, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: Home,
    description: "Overview and metrics",
  },
  {
    name: "Open Tickets",
    href: "/tickets",
    icon: List,
    description: "All incoming tickets by group",
  },
  {
    name: "My Tickets",
    href: "/my-tickets",
    icon: User,
    description: "Your assigned tickets",
  },
  {
    name: "Knowledge Base",
    href: "/knowledge-base",
    icon: Book,
    description: "Company docs and resources",
  },
]

export function SidebarNav() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">Support Hub</h1>
            <p className="text-xs text-muted-foreground">Analyst Dashboard</p>
          </div>
        )}
        <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(!isCollapsed)} className="h-8 w-8 p-0">
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className={cn("flex-1 space-y-2", isCollapsed ? "p-2" : "p-4")}>
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActive ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm" : "text-sidebar-foreground",
                isCollapsed && "justify-center",
              )}
            >
              <item.icon className={cn("flex-shrink-0", isCollapsed ? "h-5 w-5" : "h-4 w-4")} />
              {!isCollapsed && (
                <div className="flex flex-col">
                  <span>{item.name}</span>
                  <span className="text-xs text-muted-foreground group-hover:text-sidebar-accent-foreground/80">
                    {item.description}
                  </span>
                </div>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto p-4 border-t border-sidebar-border">
        {isCollapsed ? (
          <Link
            href="/settings"
            className={cn(
              "flex justify-center rounded-lg p-2 text-sm font-medium transition-colors",
              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              pathname === "/settings"
                ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                : "text-sidebar-foreground",
            )}
          >
            <Settings className="h-5 w-5" />
          </Link>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                <span className="text-xs font-medium text-accent-foreground">JD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground">John Doe</p>
                <p className="text-xs text-muted-foreground truncate">Support Analyst</p>
              </div>
            </div>
            <Link
              href="/settings"
              className={cn(
                "rounded-lg p-2 text-sm font-medium transition-colors",
                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                pathname === "/settings"
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                  : "text-sidebar-foreground",
              )}
            >
              <Settings className="h-5 w-5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
