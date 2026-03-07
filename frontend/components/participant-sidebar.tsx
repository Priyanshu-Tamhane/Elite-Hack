"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  LayoutDashboard, 
  Globe, 
  Users, 
  Bell, 
  Settings, 
  LogOut,
  Layers
} from "lucide-react"

const navItems = [
  { href: "/participant/dashboard", label: "My Dashboard", icon: LayoutDashboard },
  { href: "/participant/explore", label: "Explore Events", icon: Globe },
  { href: "/participant/team", label: "Team Space", icon: Users },
  { href: "/participant/notifications", label: "Notifications", icon: Bell },
]

export function ParticipantSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-60 border-r bg-sidebar min-h-[calc(100vh-64px)] flex flex-col">
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3",
                pathname === item.href && "bg-sidebar-accent text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t space-y-1">
        <Link href="/settings">
          <Button variant="ghost" className="w-full justify-start gap-3">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </Link>
        <Link href="/login">
          <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:text-destructive">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </Link>
      </div>
    </aside>
  )
}
