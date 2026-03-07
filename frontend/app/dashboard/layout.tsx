"use client"

import { Navbar } from "@/components/navbar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { useAuth } from "@/lib/auth-context"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAuth()
  
  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar isLoggedIn={true} userRole={user?.role || "organizer"} userName={user?.name || "User"} />
      <div className="flex">
        <DashboardSidebar userRole={user?.role || "organizer"} />
        <div className="flex-1 flex flex-col min-h-[calc(100vh-4rem)] ml-56">
          <main className="flex-1 p-6">
            {children}
          </main>
          <footer className="border-t bg-background px-6 py-4">
            <div className="flex flex-col items-center justify-between gap-2 text-sm text-muted-foreground sm:flex-row">
              <p>© 2024 EventSphere. All rights reserved.</p>
              <div className="flex gap-4">
                <a href="/privacy" className="hover:text-foreground">Privacy Policy</a>
                <a href="/terms" className="hover:text-foreground">Terms of Service</a>
                <a href="/status" className="hover:text-foreground">System Status</a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
