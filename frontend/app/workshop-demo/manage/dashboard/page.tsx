"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, DollarSign, Eye, LogOut } from "lucide-react"
import { StatsCard } from "@/components/stats-card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export default function WorkshopManageDashboard() {
  const router = useRouter()
  const { toast } = useToast()
  const [registrations, setRegistrations] = useState<any[]>([])
  const [eventName, setEventName] = useState("Workshop Demo Event")
  const [confirmedCount, setConfirmedCount] = useState(0)
  const [declinedCount, setDeclinedCount] = useState(0)
  const [pendingCount, setPendingCount] = useState(0)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push(`/workshop-demo/manage/login`)
      return
    }

    const allRegs = JSON.parse(localStorage.getItem("event_registrations") || "[]")
    const regs = allRegs.filter((r: any) => (r.eventCategory || r.category || '').toLowerCase().includes("workshop"))
    setRegistrations(regs)

    setConfirmedCount(regs.filter((r: any) => r.status === 'confirmed').length)
    setDeclinedCount(regs.filter((r: any) => r.status === 'declined').length)
    setPendingCount(regs.filter((r: any) => !r.status || r.status === 'pending').length)

    try {
      const published = JSON.parse(localStorage.getItem('published_events') || '[]')
      const w = published.find((e: any) => (e.category || '').toLowerCase().includes('workshop')) || published.find((e: any) => e.slug === 'workshop-demo')
      if (w) setEventName(w.eventName || 'Workshop Demo Event')
    } catch (e) { }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem(`workshop_manage_auth`)
    localStorage.removeItem('token')
    toast({ title: "Logged out", description: "You have been logged out" })
    router.push(`/workshop-demo/manage/login`)
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-800">Workshop Dashboard</h1>
          <p className="text-muted-foreground">Manage registrations, sessions, and settings for your workshop</p>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild className="hidden sm:inline-flex">
            <Link href="/workshop-demo" target="_blank">View Microsite</Link>
          </Button>
          <Button variant="outline" onClick={handleLogout} className="text-emerald-700 border-emerald-700 hover:bg-emerald-50"><LogOut className="mr-2 h-5 w-5" /> Logout</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Registrations" value={registrations.length} icon={Users} />
        <StatsCard title="Confirmed" value={confirmedCount} icon={Calendar} />
        <StatsCard title="Pending" value={pendingCount} icon={Eye} />
        <StatsCard title="Declined" value={declinedCount} icon={DollarSign} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid gap-3 md:grid-cols-3">
            <Button className="w-full bg-emerald-600 text-white hover:bg-emerald-700">View Microsite</Button>
            <Button variant="outline" className="w-full">View Registrations</Button>
            <Button variant="outline" className="w-full">Export Data</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Registrations</CardTitle>
        </CardHeader>
        <CardContent>
          {registrations.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No registrations yet</p>
          ) : (
            <div className="space-y-3">
              {registrations.slice(0, 6).map((reg, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <p className="font-medium">{reg.name}</p>
                    <p className="text-sm text-muted-foreground">{reg.phone || reg.email}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{reg.ticketType || (reg.guestsCount ? `${reg.guestsCount} guests` : 'Participant')}</p>
                      <p className="text-xs text-muted-foreground">{new Date(reg.registeredAt).toLocaleDateString()}</p>
                    </div>
                    <Badge variant={reg.status === 'confirmed' ? 'default' : reg.status === 'declined' ? 'destructive' : 'secondary'}>{reg.status || 'Pending'}</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
