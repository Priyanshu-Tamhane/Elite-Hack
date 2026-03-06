import { Navbar } from "@/components/navbar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function ParticipantLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar isLoggedIn={true} userRole="participant" userName="Alex Rivera" />
      <div className="flex">
        <DashboardSidebar userRole="participant" />
        <div className="flex-1 flex flex-col min-h-[calc(100vh-4rem)]">
          <main className="flex-1">
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
