"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, CheckCircle, XCircle, Clock, Hotel, ExternalLink, Image, UserPlus, Bell } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { StatsCard } from "@/components/stats-card"
import { Badge } from "@/components/ui/badge"
import { api } from "@/lib/api"

export default function EventManageDashboard() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const slug = params.slug as string
  const [event, setEvent] = useState<any>(null)
  const [registrations, setRegistrations] = useState<any[]>([])

  useEffect(() => {
    const authKey = sessionStorage.getItem("event_admin")
    
    if (authKey !== slug) {
      router.push(`/event/${slug}/manage/login`)
      return
    }

    loadData()
  }, [slug, router])

  const loadData = async () => {
    try {
      const eventData = await api.getEventBySlug(slug)
      setEvent(eventData)
      
      const regs = await api.getRegistrations(slug)
      setRegistrations(regs)
    } catch (error) {
      console.error("Failed to load data", error)
    }
  }

  if (!event) {
    return <div>Loading...</div>
  }

  const confirmedCount = registrations.filter(r => r.status === "confirmed").length
  const declinedCount = registrations.filter(r => r.status === "declined").length
  const pendingCount = registrations.filter(r => !r.status || r.status === "pending").length
  const accommodationCount = registrations.filter(r => r.accommodationRequested).length

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">{event.eventName}</h1>
          <p className="text-muted-foreground">Wedding Management Dashboard</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <StatsCard
          title="Total Guests Invited"
          value={registrations.length.toString()}
          icon={Users}
        />
        <StatsCard
          title="RSVP Confirmed"
          value={confirmedCount.toString()}
          icon={CheckCircle}
        />
        <StatsCard
          title="RSVP Declined"
          value={declinedCount.toString()}
          icon={XCircle}
        />
        <StatsCard
          title="Pending Responses"
          value={pendingCount.toString()}
          icon={Clock}
        />
        <StatsCard
          title="Accommodation Requests"
          value={accommodationCount.toString()}
          icon={Hotel}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent RSVPs</CardTitle>
            <p className="text-sm text-muted-foreground">Latest guest responses</p>
          </CardHeader>
          <CardContent>
            {registrations.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No RSVPs yet</p>
            ) : (
              <div className="space-y-3">
                {registrations.slice(0, 5).map((reg, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <p className="font-medium">{reg.name}</p>
                      <p className="text-sm text-muted-foreground">{reg.phone || reg.email}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{reg.guestsCount || 1} Guest(s)</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(reg.registeredAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={reg.status === "confirmed" ? "default" : reg.status === "declined" ? "destructive" : "secondary"}>
                        {reg.status || "Pending"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <p className="text-sm text-muted-foreground">Common tasks</p>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" asChild>
              <Link href={`/event/${slug}`} target="_blank">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Microsite
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href={`/event/${slug}/manage/gallery`}>
                <Image className="mr-2 h-4 w-4" />
                Manage Gallery
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href={`/event/${slug}/manage/guests`}>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Guest
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href={`/event/${slug}/manage/notifications`}>
                <Bell className="mr-2 h-4 w-4" />
                Send Notification
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
