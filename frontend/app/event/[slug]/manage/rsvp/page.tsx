"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download } from "lucide-react"

export default function RSVPManagementPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const [rsvps, setRsvps] = useState<any[]>([])
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    const authKey = sessionStorage.getItem("event_admin")
    if (authKey !== slug) {
      router.push(`/event/${slug}/manage/login`)
      return
    }

    const allRegistrations = JSON.parse(localStorage.getItem("event_registrations") || "[]")
    const eventRsvps = allRegistrations.filter((r: any) => r.eventSlug === slug)
    setRsvps(eventRsvps)
  }, [slug, router])

  const filteredRsvps = rsvps.filter(r => {
    if (filter === "all") return true
    if (filter === "confirmed") return r.status === "confirmed"
    if (filter === "declined") return r.status === "declined"
    if (filter === "pending") return !r.status || r.status === "pending"
    return true
  })

  const handleExportCSV = () => {
    const headers = ["Guest Name", "Phone", "Guests Count", "Meal Preference", "RSVP Status", "Date Submitted"]
    const rows = filteredRsvps.map(r => [
      r.name,
      r.phone || r.email,
      r.guestsCount || 1,
      r.mealPreference || "-",
      r.status || "Pending",
      new Date(r.registeredAt).toLocaleDateString()
    ])

    const csv = [headers, ...rows].map(row => row.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `rsvp-${slug}-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
  }

  const confirmedCount = rsvps.filter(r => r.status === "confirmed").length
  const declinedCount = rsvps.filter(r => r.status === "declined").length
  const pendingCount = rsvps.filter(r => !r.status || r.status === "pending").length

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">RSVP Management</h1>
          <p className="text-muted-foreground">Track and manage guest responses</p>
        </div>
        <Button onClick={handleExportCSV}>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{confirmedCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Declined</CardTitle>
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
          <CardTitle>RSVP Responses</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={filter} onValueChange={setFilter}>
            <TabsList>
              <TabsTrigger value="all">All ({rsvps.length})</TabsTrigger>
              <TabsTrigger value="confirmed">Confirmed ({confirmedCount})</TabsTrigger>
              <TabsTrigger value="declined">Declined ({declinedCount})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
            </TabsList>
            <TabsContent value={filter} className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Guest Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Guests Count</TableHead>
                    <TableHead>Meal Preference</TableHead>
                    <TableHead>RSVP Status</TableHead>
                    <TableHead>Date Submitted</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRsvps.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground">
                        No RSVPs found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRsvps.map((rsvp, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{rsvp.name}</TableCell>
                        <TableCell>{rsvp.phone || rsvp.email}</TableCell>
                        <TableCell>{rsvp.guestsCount || 1}</TableCell>
                        <TableCell>{rsvp.mealPreference || "-"}</TableCell>
                        <TableCell>
                          <Badge variant={rsvp.status === "confirmed" ? "default" : rsvp.status === "declined" ? "destructive" : "secondary"}>
                            {rsvp.status || "Pending"}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(rsvp.registeredAt).toLocaleDateString()}</TableCell>
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
