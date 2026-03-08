"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, CheckCircle, XCircle, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { api } from "@/lib/api"

export default function RSVPManagementPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const slug = params.slug as string
  const [event, setEvent] = useState<any>(null)
  const [rsvps, setRsvps] = useState<any[]>([])
  const [filter, setFilter] = useState("all")

  const isConference = event?.category === "conference"
  const isWedding = event?.category === "wedding"

  useEffect(() => {
    const authKey = sessionStorage.getItem("event_admin")
    if (authKey !== slug) {
      router.push(`/event/${slug}/manage-login`)
      return
    }

    loadData()
  }, [slug, router])

  const loadData = async () => {
    try {
      const eventData = await api.getEventBySlug(slug)
      setEvent(eventData)
      const regs = await api.getRegistrations(slug)
      setRsvps(regs)
    } catch {
      const allRegistrations = JSON.parse(localStorage.getItem("event_registrations") || "[]")
      const eventRsvps = allRegistrations.filter((r: any) => r.eventSlug === slug)
      setRsvps(eventRsvps)
    }
  }

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await api.updateRegistrationStatus(slug, id, status)
      toast({ title: `Status updated to ${status}` })
      loadData()
    } catch {
      toast({ title: "Failed to update status", variant: "destructive" })
    }
  }

  const filteredRsvps = rsvps.filter(r => {
    if (filter === "all") return true
    if (filter === "confirmed") return r.status === "confirmed"
    if (filter === "declined") return r.status === "declined"
    if (filter === "pending") return !r.status || r.status === "pending"
    return true
  })

  const handleExportCSV = () => {
    const headers = isConference
      ? ["Attendee Name", "Email", "Phone", "Ticket Type", "Status", "Registered On"]
      : ["Guest Name", "Phone", "Guests Count", "Meal Preference", "RSVP Status", "Date Submitted"]
    const rows = filteredRsvps.map(r => isConference
      ? [r.name, r.email || "", r.phone || "", r.ticketType || "General", r.status || "Pending", new Date(r.registeredAt).toLocaleDateString()]
      : [r.name, r.phone || r.email, r.guestsCount || 1, r.mealPreference || "-", r.status || "Pending", new Date(r.registeredAt).toLocaleDateString()]
    )

    const csv = [headers, ...rows].map(row => row.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${isConference ? "registrations" : "rsvp"}-${slug}-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
  }

  const confirmedCount = rsvps.filter(r => r.status === "confirmed").length
  const declinedCount = rsvps.filter(r => r.status === "declined").length
  const pendingCount = rsvps.filter(r => !r.status || r.status === "pending").length

  // Labels
  const pageTitle = isConference ? "Registration Management" : "RSVP Management"
  const pageDesc = isConference ? "Track and manage conference registrations" : "Track and manage guest responses"
  const tableTitle = isConference ? "Registration Responses" : "RSVP Responses"
  const emptyText = isConference ? "No registrations found" : "No RSVPs found"
  const confirmedLabel = isConference ? "Confirmed" : "Confirmed"
  const declinedLabel = isConference ? "Cancelled" : "Declined"

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">{pageTitle}</h1>
          <p className="text-muted-foreground">{pageDesc}</p>
        </div>
        <Button onClick={handleExportCSV}>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">{confirmedLabel}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{confirmedCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">{declinedLabel}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{declinedCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{tableTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={filter} onValueChange={setFilter}>
            <TabsList>
              <TabsTrigger value="all">All ({rsvps.length})</TabsTrigger>
              <TabsTrigger value="confirmed">{confirmedLabel} ({confirmedCount})</TabsTrigger>
              <TabsTrigger value="declined">{declinedLabel} ({declinedCount})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
            </TabsList>
            <TabsContent value={filter} className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{isConference ? "Attendee Name" : "Guest Name"}</TableHead>
                    <TableHead>{isConference ? "Email" : "Phone"}</TableHead>
                    <TableHead>{isConference ? "Ticket Type" : "Guests Count"}</TableHead>
                    {!isConference && <TableHead>Meal Preference</TableHead>}
                    <TableHead>Status</TableHead>
                    <TableHead>{isConference ? "Registered On" : "Date Submitted"}</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRsvps.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={isConference ? 6 : 7} className="text-center text-muted-foreground">
                        {emptyText}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRsvps.map((rsvp, idx) => (
                      <TableRow key={rsvp._id || idx}>
                        <TableCell className="font-medium">{rsvp.name}</TableCell>
                        <TableCell>{isConference ? (rsvp.email || rsvp.phone) : (rsvp.phone || rsvp.email)}</TableCell>
                        <TableCell>{isConference ? (rsvp.ticketType || "General") : (rsvp.guestsCount || 1)}</TableCell>
                        {!isConference && <TableCell>{rsvp.mealPreference || "-"}</TableCell>}
                        <TableCell>
                          <Badge variant={rsvp.status === "confirmed" ? "default" : rsvp.status === "declined" ? "destructive" : "secondary"}>
                            {rsvp.status || "Pending"}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(rsvp.registeredAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {rsvp.status !== "confirmed" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                onClick={() => handleStatusChange(rsvp._id, "confirmed")}
                                title="Confirm"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                            {rsvp.status !== "declined" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => handleStatusChange(rsvp._id, "declined")}
                                title="Decline"
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            )}
                            {rsvp.status !== "pending" && rsvp.status && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
                                onClick={() => handleStatusChange(rsvp._id, "pending")}
                                title="Set Pending"
                              >
                                <Clock className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
