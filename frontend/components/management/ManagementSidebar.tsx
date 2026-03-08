"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    Users,
    CheckSquare,
    Hotel,
    Calendar,
    Image,
    Bell,
    Settings,
    LogOut,
    Ticket,
    FileText,
} from "lucide-react"

interface ManagementSidebarProps {
    slug: string
    category: string
}

// Conference-specific nav items
const conferenceNav = (slug: string) => [
    { href: `/event/${slug}/manage/dashboard`, label: "Dashboard", icon: LayoutDashboard },
    { href: `/event/${slug}/manage/guests`, label: "Attendees", icon: Users },
    { href: `/event/${slug}/manage/rsvp`, label: "Registrations", icon: Ticket },
    { href: `/event/${slug}/manage/schedule`, label: "Agenda Management", icon: Calendar },
    { href: `/event/${slug}/manage/gallery`, label: "Gallery Management", icon: Image },
    { href: `/event/${slug}/manage/notifications`, label: "Notifications", icon: Bell },
    { href: `/event/${slug}/manage/settings`, label: "Event Settings", icon: Settings },
]

// Wedding-specific nav items (original)
const weddingNav = (slug: string) => [
    { href: `/event/${slug}/manage/dashboard`, label: "Dashboard", icon: LayoutDashboard },
    { href: `/event/${slug}/manage/guests`, label: "Guest List", icon: Users },
    { href: `/event/${slug}/manage/rsvp`, label: "RSVP Management", icon: CheckSquare },
    { href: `/event/${slug}/manage/accommodation`, label: "Accommodation", icon: Hotel },
    { href: `/event/${slug}/manage/schedule`, label: "Schedule Management", icon: Calendar },
    { href: `/event/${slug}/manage/gallery`, label: "Gallery Management", icon: Image },
    { href: `/event/${slug}/manage/notifications`, label: "Notifications", icon: Bell },
    { href: `/event/${slug}/manage/settings`, label: "Event Settings", icon: Settings },
]

// Default / hackathon nav
const defaultNav = (slug: string) => [
    { href: `/event/${slug}/manage/dashboard`, label: "Dashboard", icon: LayoutDashboard },
    { href: `/event/${slug}/manage/guests`, label: "Participants", icon: Users },
    { href: `/event/${slug}/manage/rsvp`, label: "Registrations", icon: Ticket },
    { href: `/event/${slug}/manage/accommodation`, label: "Accommodation", icon: Hotel },
    { href: `/event/${slug}/manage/schedule`, label: "Schedule Management", icon: Calendar },
    { href: `/event/${slug}/manage/gallery`, label: "Gallery Management", icon: Image },
    { href: `/event/${slug}/manage/notifications`, label: "Notifications", icon: Bell },
    { href: `/event/${slug}/manage/settings`, label: "Event Settings", icon: Settings },
]

function getSidebarTitle(category: string) {
    switch (category) {
        case "conference": return "Conference Management"
        case "wedding": return "Wedding Management"
        case "hackathon": return "Hackathon Management"
        case "workshop": return "Workshop Management"
        case "corporate event": return "Corporate Management"
        case "festival": return "Festival Management"
        default: return "Event Management"
    }
}

export function ManagementSidebar({ slug, category }: ManagementSidebarProps) {
    const pathname = usePathname()

    const navItems = category === "conference"
        ? conferenceNav(slug)
        : category === "wedding"
            ? weddingNav(slug)
            : defaultNav(slug)

    const handleLogout = () => {
        sessionStorage.removeItem("event_admin")
        window.location.href = `/event/${slug}/manage/login`
    }

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-56 border-r bg-background">
            <div className="flex h-full flex-col justify-between py-4">
                <div>
                    <div className="px-6 py-4 border-b">
                        <h2 className="text-lg font-semibold">{getSidebarTitle(category)}</h2>
                        <p className="text-xs text-muted-foreground mt-1">Event Control Panel</p>
                    </div>
                    <nav className="space-y-1 px-3 mt-4">
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
                </div>
                <div className="space-y-1 px-3">
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                    >
                        <LogOut className="h-5 w-5" />
                        Logout
                    </button>
                </div>
            </div>
        </aside>
    )
}
