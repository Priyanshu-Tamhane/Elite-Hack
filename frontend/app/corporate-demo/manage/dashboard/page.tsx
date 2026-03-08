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

export default function CorporateManageDashboard() {
  const router = useRouter()
  const { toast } = useToast()
  const [registrations, setRegistrations] = useState<any[]>([])
  const [eventName, setEventName] = useState("Corporate Demo Event")
  const [confirmedCount, setConfirmedCount] = useState(0)
  const [declinedCount, setDeclinedCount] = useState(0)
  const [pendingCount, setPendingCount] = useState(0)

  useEffect(() => {
    // auth check
    const token = localStorage.getItem('token')
    if (!token) {
      router.push(`/corporate-demo/manage/login`)
      return
    }

    // load registrations from storage
    const allRegs = JSON.parse(localStorage.getItem("event_registrations") || "[]")
    const regs = allRegs.filter((r: any) => (r.eventCategory || r.category || '').toLowerCase().includes("corporate"))
    setRegistrations(regs)

    // derive counts
    setConfirmedCount(regs.filter((r: any) => r.status === 'confirmed').length)
    setDeclinedCount(regs.filter((r: any) => r.status === 'declined').length)
    setPendingCount(regs.filter((r: any) => !r.status || r.status === 'pending').length)

    // try to load a published corporate event name
    try {
      const published = JSON.parse(localStorage.getItem('published_events') || '[]')
      const corp = published.find((e: any) => (e.category || '').toLowerCase().includes('corporate')) || published.find((e: any) => e.slug === 'corporate-demo')
      if (corp) setEventName(corp.eventName || 'Corporate Demo Event')
    } catch (e) { }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem(`corporate_manage_auth`)
    localStorage.removeItem('token')
    toast({ title: "Logged out", description: "You have been logged out" })
    router.push(`/corporate-demo/manage/login`)
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-blue-700">Corporate Demo Dashboard</h1>
          <p className="text-gray-500">Central hub for corporate event management</p>
        </div>
        <Button
          variant="outline"
          onClick={handleLogout}
          className="text-blue-700 border-blue-700 hover:bg-blue-50"
        >
          <LogOut className="mr-2 h-5 w-5" /> Logout
        </Button>
      </div>

      {/* statistic cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Registrations" value={registrations.length} icon={Users} />
        <StatsCard title="Confirmed" value={confirmedCount} icon={Calendar} />
        <StatsCard title="Pending" value={pendingCount} icon={Eye} />
        <StatsCard title="Declined" value={declinedCount} icon={DollarSign} />
      </div>

      {/* actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button className="w-full justify-start" asChild>
            <Link href="/corporate-demo" target="_blank">View Demo Microsite</Link>
          </Button>
          <Button variant="outline" className="w-full justify-start">View Registrations</Button>
          <Button variant="outline" className="w-full justify-start">Export Data</Button>
          <Button variant="outline" className="w-full justify-start">Settings</Button>
        </CardContent>
      </Card>

      {/* recent regs */}
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
                    <Badge variant={reg.status === 'confirmed' ? 'default' : reg.status === 'declined' ? 'destructive' : 'secondary'}>
                      {reg.status || 'Pending'}
                    </Badge>
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