"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, Calendar, Ticket, DollarSign, Music, MapPin, Building2, Image, Bell, Settings, Eye, Plus, Trash2, Edit, Download, LogOut, LayoutDashboard, Trophy } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { api } from "@/lib/api"

interface FestivalManagementProps {
  slug: string
}

export function FestivalManagement({ slug }: FestivalManagementProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [event, setEvent] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [registrations, setRegistrations] = useState<any[]>([])
  const [editingEvent, setEditingEvent] = useState<any>(null)
  const [editingArtist, setEditingArtist] = useState<any>(null)
  const [editingSponsor, setEditingSponsor] = useState<any>(null)

  useEffect(() => {
    const authKey = sessionStorage.getItem("event_admin")
    if (authKey !== slug) {
      router.push(`/event/${slug}/manage/login`)
      return
    }

    const loadEvent = async () => {
      try {
        const eventData = await api.getEventBySlug(slug)
        setEvent(eventData)
        const regs = await api.getRegistrations(slug)
        setRegistrations(regs)
      } catch (error) {
        toast({ title: "Error", description: "Failed to load event data", variant: "destructive" })
      }
    }
    
    loadEvent()
  }, [slug, router])

  const handleLogout = () => {
    sessionStorage.removeItem("event_admin")
    toast({ title: "Logged out", description: "You have been logged out" })
    router.push(`/event/${slug}/manage/login`)
  }

  const updateEvent = async (updates: any) => {
    try {
      await api.updateEventBySlug(slug, updates)
      setEvent({ ...event, ...updates })
      toast({ title: "Success", description: "Event updated successfully" })
    } catch (error) {
      toast({ title: "Error", description: "Failed to update event", variant: "destructive" })
    }
  }

  if (!event) {
    return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>
  }

  const festival = event.festival || {}
  const stats = {
    totalVisitors: registrations.length,
    ticketsSold: registrations.length,
    revenue: registrations.reduce((sum: number, r: any) => sum + (r.amount || 0), 0),
    subEvents: festival.sub_events?.length || 0,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-orange-600 rounded-lg flex items-center justify-center">
                <Music className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">{event.eventName}</h1>
                <p className="text-sm text-gray-500">Festival Management</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-screen sticky top-16">
          <nav className="p-4 space-y-1">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "events", label: "Festival Events", icon: Calendar },
              { id: "participants", label: "Participants", icon: Users },
              { id: "tickets", label: "Ticket Management", icon: Ticket },
              { id: "stages", label: "Stage Management", icon: MapPin },
              { id: "artists", label: "Artists / Performers", icon: Music },
              { id: "sponsors", label: "Sponsors", icon: Building2 },
              { id: "schedule", label: "Schedule", icon: Calendar },
              { id: "gallery", label: "Gallery", icon: Image },
              { id: "notifications", label: "Notifications", icon: Bell },
              { id: "settings", label: "Settings", icon: Settings },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeTab === item.id ? "bg-orange-50 text-orange-600" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Dashboard */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Total Visitors
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stats.totalVisitors}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                      <Trophy className="h-4 w-4" />
                      Sub-Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stats.subEvents}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                      <Ticket className="h-4 w-4" />
                      Tickets Sold
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stats.ticketsSold}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Revenue
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">₹{stats.revenue}</div>
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
                        <TableHead>Event</TableHead>
                        <TableHead>Ticket Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {registrations.slice(0, 5).map((reg, i) => (
                        <TableRow key={i}>
                          <TableCell>{reg.name}</TableCell>
                          <TableCell>{reg.eventName || "-"}</TableCell>
                          <TableCell>{reg.ticketType || "General"}</TableCell>
                          <TableCell><Badge>Confirmed</Badge></TableCell>
                          <TableCell>{new Date(reg.registeredAt).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-4">
                <Button className="w-full" asChild>
                  <Link href={`/event/${slug}`} target="_blank">
                    <Eye className="h-4 w-4 mr-2" />
                    View Microsite
                  </Link>
                </Button>
                <Button variant="outline" onClick={() => setActiveTab("events")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </Button>
                <Button variant="outline" onClick={() => setActiveTab("gallery")}>
                  <Image className="h-4 w-4 mr-2" />
                  Upload Gallery
                </Button>
                <Button variant="outline" onClick={() => setActiveTab("notifications")}>
                  <Bell className="h-4 w-4 mr-2" />
                  Send Announcement
                </Button>
              </div>
            </div>
          )}

          {/* Festival Events */}
          {activeTab === "events" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Festival Events</h2>
                <Button onClick={() => setEditingEvent({})}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </Button>
              </div>

              {editingEvent && (
                <Card>
                  <CardHeader>
                    <CardTitle>{editingEvent.name ? "Edit Event" : "Add New Event"}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Event Name</Label>
                        <Input value={editingEvent.name || ""} onChange={e => setEditingEvent({ ...editingEvent, name: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label>Category</Label>
                        <Input value={editingEvent.category || ""} onChange={e => setEditingEvent({ ...editingEvent, category: e.target.value })} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea value={editingEvent.description || ""} onChange={e => setEditingEvent({ ...editingEvent, description: e.target.value })} />
                    </div>
                    <div className="grid gap-4 md:grid-cols-4">
                      <div className="space-y-2">
                        <Label>Date</Label>
                        <Input type="date" value={editingEvent.date || ""} onChange={e => setEditingEvent({ ...editingEvent, date: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label>Time</Label>
                        <Input type="time" value={editingEvent.time || ""} onChange={e => setEditingEvent({ ...editingEvent, time: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label>Stage</Label>
                        <Input value={editingEvent.stage || ""} onChange={e => setEditingEvent({ ...editingEvent, stage: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label>Max Participants</Label>
                        <Input type="number" value={editingEvent.maxParticipants || ""} onChange={e => setEditingEvent({ ...editingEvent, maxParticipants: e.target.value })} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Prize Pool</Label>
                      <Input value={editingEvent.prizePool || ""} onChange={e => setEditingEvent({ ...editingEvent, prizePool: e.target.value })} />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => {
                        const subEvents = [...(festival.sub_events || []), editingEvent]
                        updateEvent({ festival: { ...festival, sub_events: subEvents } })
                        setEditingEvent(null)
                      }}>Save Event</Button>
                      <Button variant="outline" onClick={() => setEditingEvent(null)}>Cancel</Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid gap-4 md:grid-cols-3">
                {festival.sub_events?.map((ev: any, i: number) => (
                  <Card key={i}>
                    <CardHeader>
                      <CardTitle className="text-lg">{ev.name}</CardTitle>
                      <Badge>{ev.category}</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">{ev.description}</p>
                      <div className="space-y-2 text-sm">
                        <p><strong>Date:</strong> {ev.date}</p>
                        <p><strong>Time:</strong> {ev.time}</p>
                        <p><strong>Stage:</strong> {ev.stage}</p>
                        <p><strong>Prize:</strong> {ev.prizePool}</p>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline"><Edit className="h-3 w-3" /></Button>
                        <Button size="sm" variant="outline"><Trash2 className="h-3 w-3" /></Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Participants */}
          {activeTab === "participants" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Participants</h2>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
              <Card>
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Event</TableHead>
                        <TableHead>Ticket Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {registrations.map((reg, i) => (
                        <TableRow key={i}>
                          <TableCell>{reg.name}</TableCell>
                          <TableCell>{reg.email}</TableCell>
                          <TableCell>{reg.phone}</TableCell>
                          <TableCell>{reg.eventName || "-"}</TableCell>
                          <TableCell>{reg.ticketType || "General"}</TableCell>
                          <TableCell><Badge>Confirmed</Badge></TableCell>
                          <TableCell>
                            <Button size="sm" variant="ghost"><Eye className="h-3 w-3" /></Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Tickets */}
          {activeTab === "tickets" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Ticket Management</h2>
              <Card>
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ticket Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Total Quantity</TableHead>
                        <TableHead>Sold</TableHead>
                        <TableHead>Remaining</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {festival.tickets?.map((ticket: any, i: number) => (
                        <TableRow key={i}>
                          <TableCell>{ticket.name}</TableCell>
                          <TableCell>₹{ticket.price}</TableCell>
                          <TableCell>{ticket.quantity}</TableCell>
                          <TableCell>{ticket.sold || 0}</TableCell>
                          <TableCell>{ticket.quantity - (ticket.sold || 0)}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline"><Edit className="h-3 w-3" /></Button>
                              <Button size="sm" variant="outline"><Trash2 className="h-3 w-3" /></Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Stages */}
          {activeTab === "stages" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Stage Management</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {festival.stages?.map((stage: any, i: number) => (
                  <Card key={i}>
                    <CardHeader>
                      <CardTitle>{stage.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-2"><strong>Location:</strong> {stage.location}</p>
                      <p className="text-sm text-gray-600"><strong>Capacity:</strong> {stage.capacity}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Artists */}
          {activeTab === "artists" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Artists / Performers</h2>
                <Button onClick={() => setEditingArtist({})}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Artist
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {festival.artists?.map((artist: any, i: number) => (
                  <Card key={i}>
                    <CardHeader>
                      <CardTitle>{artist.name}</CardTitle>
                      <Badge>{artist.type}</Badge>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <p><strong>Date:</strong> {artist.date}</p>
                        <p><strong>Time:</strong> {artist.time}</p>
                        <p><strong>Stage:</strong> {artist.stage}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Sponsors */}
          {activeTab === "sponsors" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Sponsors</h2>
                <Button onClick={() => setEditingSponsor({})}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Sponsor
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-4">
                {festival.sponsors?.map((sponsor: any, i: number) => (
                  <Card key={i}>
                    <CardHeader>
                      <CardTitle className="text-sm">{sponsor.name}</CardTitle>
                      <Badge variant="outline">{sponsor.category}</Badge>
                    </CardHeader>
                    <CardContent>
                      {sponsor.logoUrl && <img src={sponsor.logoUrl} alt={sponsor.name} className="w-full h-20 object-contain" />}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Schedule */}
          {activeTab === "schedule" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Schedule Management</h2>
              <Card>
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Event Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Stage</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {festival.sub_events?.map((ev: any, i: number) => (
                        <TableRow key={i}>
                          <TableCell>{ev.name}</TableCell>
                          <TableCell>{ev.date}</TableCell>
                          <TableCell>{ev.time}</TableCell>
                          <TableCell>{ev.stage}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline"><Edit className="h-3 w-3" /></Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Gallery */}
          {activeTab === "gallery" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Gallery Management</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Upload Images</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Hero Image URL</Label>
                    <Input placeholder="https://..." />
                  </div>
                  <div className="space-y-2">
                    <Label>Gallery Image URL</Label>
                    <Input placeholder="https://..." />
                  </div>
                  <Button>Upload Image</Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Send Announcement</h2>
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input placeholder="Announcement title" />
                  </div>
                  <div className="space-y-2">
                    <Label>Message</Label>
                    <Textarea placeholder="Your message..." rows={5} />
                  </div>
                  <Button>Send Notification</Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Settings */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Festival Settings</h2>
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Festival Name</Label>
                      <Input value={event.eventName} onChange={e => updateEvent({ eventName: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Festival Date</Label>
                      <Input type="date" value={event.startDate} onChange={e => updateEvent({ startDate: e.target.value })} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input value={event.venue} onChange={e => updateEvent({ venue: e.target.value })} />
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label>Contact Person</Label>
                      <Input value={event.contact?.name || ""} />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input value={event.contact?.phone || ""} />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input value={event.contact?.email || ""} />
                    </div>
                  </div>
                  <Button>Save Settings</Button>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
