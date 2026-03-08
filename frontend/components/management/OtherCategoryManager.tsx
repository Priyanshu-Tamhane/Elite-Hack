"use client"

import { useState, useEffect } from "react"
import { api } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Plus, Edit, Trash2, Download, Eye, Users, Ticket as TicketIcon, DollarSign, Calendar, Mic } from "lucide-react"

interface OtherCategoryManagerProps {
  slug: string
  event: any
}

export function OtherCategoryManager({ slug, event }: OtherCategoryManagerProps) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [registrations, setRegistrations] = useState<any[]>([])
  const [speakers, setSpeakers] = useState<any[]>([])
  const [tickets, setTickets] = useState<any[]>([])
  const [sponsors, setSponsors] = useState<any[]>([])
  const [faqs, setFaqs] = useState<any[]>([])
  const [schedule, setSchedule] = useState<any[]>([])
  const [gallery, setGallery] = useState<any[]>([])

  useEffect(() => {
    loadData()
  }, [slug])

  const loadData = async () => {
    try {
      const eventData = await api.getEventBySlug(slug)
      setSpeakers(eventData.speakers || [])
      setTickets(eventData.tickets || [])
      setSponsors(eventData.sponsors || [])
      setFaqs(eventData.faqs || [])
      setSchedule(eventData.schedule || [])
      setGallery(eventData.gallery || [])
      
      const regs = await api.getRegistrations(slug)
      setRegistrations(regs || [])
    } catch (error) {
      console.error("Failed to load data", error)
    }
  }

  const updateEvent = async (data: any) => {
    try {
      await api.updateEventBySlug(slug, data)
      toast({ title: "Updated successfully" })
      loadData()
    } catch (error) {
      toast({ title: "Update failed", variant: "destructive" })
    }
  }

  // Dashboard Stats
  const totalRevenue = tickets.reduce((sum, t) => sum + (t.sold || 0) * parseFloat(t.price?.replace(/[^0-9.]/g, "") || "0"), 0)
  const totalSold = tickets.reduce((sum, t) => sum + (t.sold || 0), 0)

  return (
    <div className="space-y-6">
      {/* Dashboard */}
      {activeTab === "dashboard" && (
        <>
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Event overview and analytics</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{registrations.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Tickets Sold</CardTitle>
                <TicketIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalSold}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Speakers</CardTitle>
                <Mic className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{speakers.length}</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Ticket Type</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {registrations.slice(0, 5).map((reg, i) => (
                    <TableRow key={i}>
                      <TableCell>{reg.name}</TableCell>
                      <TableCell>{reg.email}</TableCell>
                      <TableCell>{reg.ticketType || "General"}</TableCell>
                      <TableCell>{new Date(reg.createdAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                  {registrations.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground">
                        No registrations yet
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button onClick={() => window.open(`/event/${slug}`, "_blank")}>
              <Eye className="h-4 w-4 mr-2" />
              View Microsite
            </Button>
            <Button variant="outline" onClick={() => setActiveTab("speakers")}>
              <Plus className="h-4 w-4 mr-2" />
              Add Speaker
            </Button>
            <Button variant="outline" onClick={() => setActiveTab("schedule")}>
              <Calendar className="h-4 w-4 mr-2" />
              Update Schedule
            </Button>
            <Button variant="outline" onClick={() => setActiveTab("notifications")}>
              <Plus className="h-4 w-4 mr-2" />
              Send Notification
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
