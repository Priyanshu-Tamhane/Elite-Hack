"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Calendar,
  PlusCircle,
  Hotel,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  Globe,
  Users,
} from "lucide-react"

interface SidebarProps {
  userRole?: "organizer" | "participant"
}

const organizerNavItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/events", label: "My Events", icon: Calendar },
  { href: "/dashboard/events/create/details", label: "Create Event", icon: PlusCircle },
  { href: "/dashboard/accommodation", label: "Accommodation", icon: Hotel },
  { href: "/dashboard/payments", label: "Payments", icon: CreditCard },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
]

const participantNavItems = [
  { href: "/participant/dashboard", label: "My Dashboard", icon: LayoutDashboard },
  { href: "/participant/events", label: "Explore Events", icon: Globe },
  { href: "/participant/team", label: "Team Space", icon: Users },
  { href: "/participant/notifications", label: "Notifications", icon: Bell },
]

export function DashboardSidebar({ userRole = "organizer" }: SidebarProps) {
  const pathname = usePathname()
  const navItems = userRole === "organizer" ? organizerNavItems : participantNavItems

  return (
    <aside className="fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-56 border-r bg-background">
      <div className="flex h-full flex-col justify-between py-4">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="space-y-1 px-3">
          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Link>
        </div>
      </div>
    </aside>
  )
}
