"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, CheckCircle, XCircle, Clock, Hotel, ExternalLink, Image, UserPlus, Bell, Ticket, Calendar } from "lucide-react"
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

  const isConference = event.category === "conference"
  const isWedding = event.category === "wedding"

  const confirmedCount = registrations.filter(r => r.status === "confirmed").length
  const declinedCount = registrations.filter(r => r.status === "declined").length
  const pendingCount = registrations.filter(r => !r.status || r.status === "pending").length
  const accommodationCount = registrations.filter(r => r.accommodationRequested).length

  // Conference-specific stats
  const ticketTypes = event.registrationSettings?.tickets || []
  const agendaSessions = (event.agenda || []).reduce((a: number, d: any) => a + (d.sessions?.length || 0), 0)

  // Dynamic labels
  const dashboardTitle = isConference ? "Conference Management Dashboard"
    : isWedding ? "Wedding Management Dashboard"
      : "Event Management Dashboard"

  const peopleLabel = isConference ? "Total Registrations" : isWedding ? "Total Guests Invited" : "Total Participants"
  const confirmedLabel = isConference ? "Confirmed" : "RSVP Confirmed"
  const declinedLabel = isConference ? "Cancelled" : "RSVP Declined"
  const pendingLabel = "Pending Responses"
  const recentLabel = isConference ? "Recent Registrations" : isWedding ? "Recent RSVPs" : "Recent Registrations"
  const recentEmpty = isConference ? "No registrations yet" : isWedding ? "No RSVPs yet" : "No registrations yet"
  const peopleColumnLabel = isConference ? "Ticket Type" : "Guest(s)"
  const addPersonLabel = isConference ? "Add Attendee" : isWedding ? "Add Guest" : "Add Participant"
  const addPersonIcon = UserPlus

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">{event.eventName}</h1>
          <p className="text-muted-foreground">{dashboardTitle}</p>
        </div>
      </div>

      <div className={`grid gap-4 md:grid-cols-2 ${isConference ? "lg:grid-cols-4" : "lg:grid-cols-5"}`}>
        <StatsCard
          title={peopleLabel}
          value={registrations.length.toString()}
          icon={Users}
        />
        <StatsCard
          title={confirmedLabel}
          value={confirmedCount.toString()}
          icon={CheckCircle}
        />
        <StatsCard
          title={declinedLabel}
          value={declinedCount.toString()}
          icon={XCircle}
        />
        <StatsCard
          title={pendingLabel}
          value={pendingCount.toString()}
          icon={Clock}
        />
        {!isConference && (
          <StatsCard
            title="Accommodation Requests"
            value={accommodationCount.toString()}
            icon={Hotel}
          />
        )}
      </div>

      {/* Conference-specific: Ticket Types & Agenda summary */}
      {isConference && ticketTypes.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ticket className="h-5 w-5 text-muted-foreground" />
                Ticket Types ({ticketTypes.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {ticketTypes.map((t: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{t.type}</p>
                      {t.paperSubmission && <Badge variant="outline" className="mt-1 text-xs">Paper Submission</Badge>}
                    </div>
                    <div className="text-right">
                      {event.registrationSettings?.registrationType === "paid" && t.price != null ? (
                        <p className="font-bold">{t.currency || "USD"} {t.price}</p>
                      ) : (
                        <Badge variant="secondary">Free</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                Agenda Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-2xl font-bold">{agendaSessions} Sessions</p>
                <p className="text-sm text-muted-foreground">across {(event.agenda || []).length} day(s)</p>
                {(event.agenda || []).map((day: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between p-2 border rounded-lg">
                    <span className="text-sm font-medium">{day.label || `Day ${day.day}`}</span>
                    <Badge variant="outline">{day.sessions?.length || 0} sessions</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{recentLabel}</CardTitle>
            <p className="text-sm text-muted-foreground">Latest responses</p>
          </CardHeader>
          <CardContent>
            {registrations.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">{recentEmpty}</p>
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
                        <p className="text-sm font-medium">
                          {isConference ? (reg.ticketType || "General") : `${reg.guestsCount || 1} ${peopleColumnLabel}`}
                        </p>
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
            {!isConference && (
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href={`/event/${slug}/manage/gallery`}>
                  <Image className="mr-2 h-4 w-4" />
                  Manage Gallery
                </Link>
              </Button>
            )}
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href={`/event/${slug}/manage/guests`}>
                <UserPlus className="mr-2 h-4 w-4" />
                {addPersonLabel}
              </Link>
            </Button>
            {isConference && (
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href={`/event/${slug}/manage/schedule`}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Manage Agenda
                </Link>
              </Button>
            )}
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
