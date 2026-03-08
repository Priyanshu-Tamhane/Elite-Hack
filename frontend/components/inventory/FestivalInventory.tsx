"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Ticket, MapPin, Calendar, Music, Building2, Heart, Share2, Palette, Plus, Trash2 } from "lucide-react"

interface FestivalInventoryProps {
  onDataChange: (data: any) => void
}

export function FestivalInventory({ onDataChange }: FestivalInventoryProps) {
  const [capacity, setCapacity] = useState("5000")
  const [waitlist, setWaitlist] = useState("200")
  const [tickets, setTickets] = useState([{ id: 1, name: "General Pass", price: "299", quantity: "2000", description: "" }])
  const [stages, setStages] = useState([{ id: 1, name: "Main Stage", location: "Central Ground", capacity: "2000" }])
  const [subEvents, setSubEvents] = useState([{ id: 1, name: "", category: "Music", description: "", date: "", time: "", stage: "", maxParticipants: "", prizePool: "" }])
  const [artists, setArtists] = useState([{ id: 1, name: "", type: "Live DJ", date: "", time: "", stage: "" }])
  const [sponsors, setSponsors] = useState([{ id: 1, name: "", category: "Title Sponsor", logoUrl: "", websiteUrl: "" }])
  const [facilities, setFacilities] = useState({ parking: true, foodStalls: true, medicalBooth: true, securityDesk: true, helpDeskContact: "" })
  const [socialLinks, setSocialLinks] = useState({ instagram: "", youtube: "", facebook: "", twitter: "" })
  const [theme, setTheme] = useState({ style: "Cultural Festival", primaryColor: "#FF5722", fontStyle: "Modern Sans" })

  useEffect(() => {
    onDataChange({
      capacity: Number(capacity),
      waitlist: Number(waitlist),
      tickets: tickets.map(t => ({ name: t.name, price: Number(t.price), quantity: Number(t.quantity), description: t.description })),
      stages: stages.map(s => ({ name: s.name, location: s.location, capacity: Number(s.capacity) })),
      sub_events: subEvents.map(e => ({ name: e.name, category: e.category, description: e.description, date: e.date, time: e.time, stage: e.stage, maxParticipants: Number(e.maxParticipants), prizePool: e.prizePool })),
      artists: artists.map(a => ({ name: a.name, type: a.type, date: a.date, time: a.time, stage: a.stage })),
      sponsors: sponsors.map(s => ({ name: s.name, category: s.category, logoUrl: s.logoUrl, websiteUrl: s.websiteUrl })),
      facilities,
      social_links: socialLinks,
      theme,
    })
  }, [capacity, waitlist, tickets, stages, subEvents, artists, sponsors, facilities, socialLinks, theme])

  return (
    <div className="space-y-6">
      {/* Capacity */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <CardTitle>Festival Attendee Capacity</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Total Festival Capacity</Label>
              <Input type="number" value={capacity} onChange={e => setCapacity(e.target.value)} placeholder="5000" />
            </div>
            <div className="space-y-2">
              <Label>Waitlist Capacity</Label>
              <Input type="number" value={waitlist} onChange={e => setWaitlist(e.target.value)} placeholder="200" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tickets */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Ticket className="h-5 w-5 text-primary" />
              <CardTitle>Festival Ticket Types</CardTitle>
            </div>
            <Button variant="outline" size="sm" onClick={() => setTickets([...tickets, { id: Date.now(), name: "", price: "", quantity: "", description: "" }])}>
              <Plus className="mr-2 h-4 w-4" /> Add Ticket
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {tickets.map((ticket, i) => (
            <div key={ticket.id} className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm">Ticket {i + 1}</span>
                {tickets.length > 1 && (
                  <Button variant="ghost" size="sm" onClick={() => setTickets(tickets.filter(t => t.id !== ticket.id))}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <Input placeholder="Ticket Name" value={ticket.name} onChange={e => setTickets(tickets.map(t => t.id === ticket.id ? { ...t, name: e.target.value } : t))} />
                <Input type="number" placeholder="Price (₹)" value={ticket.price} onChange={e => setTickets(tickets.map(t => t.id === ticket.id ? { ...t, price: e.target.value } : t))} />
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <Input type="number" placeholder="Quantity" value={ticket.quantity} onChange={e => setTickets(tickets.map(t => t.id === ticket.id ? { ...t, quantity: e.target.value } : t))} />
                <Input placeholder="Description" value={ticket.description} onChange={e => setTickets(tickets.map(t => t.id === ticket.id ? { ...t, description: e.target.value } : t))} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Stages */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <CardTitle>Festival Stages</CardTitle>
            </div>
            <Button variant="outline" size="sm" onClick={() => setStages([...stages, { id: Date.now(), name: "", location: "", capacity: "" }])}>
              <Plus className="mr-2 h-4 w-4" /> Add Stage
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {stages.map((stage, i) => (
            <div key={stage.id} className="flex gap-3 items-start rounded-lg border p-3">
              <div className="flex-1 grid grid-cols-3 gap-3">
                <Input placeholder="Stage Name" value={stage.name} onChange={e => setStages(stages.map(s => s.id === stage.id ? { ...s, name: e.target.value } : s))} />
                <Input placeholder="Location" value={stage.location} onChange={e => setStages(stages.map(s => s.id === stage.id ? { ...s, location: e.target.value } : s))} />
                <Input type="number" placeholder="Capacity" value={stage.capacity} onChange={e => setStages(stages.map(s => s.id === stage.id ? { ...s, capacity: e.target.value } : s))} />
              </div>
              {stages.length > 1 && (
                <Button variant="ghost" size="icon" onClick={() => setStages(stages.filter(s => s.id !== stage.id))}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Sub Events */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <CardTitle>Festival Sub-Events</CardTitle>
            </div>
            <Button variant="outline" size="sm" onClick={() => setSubEvents([...subEvents, { id: Date.now(), name: "", category: "Music", description: "", date: "", time: "", stage: "", maxParticipants: "", prizePool: "" }])}>
              <Plus className="mr-2 h-4 w-4" /> Add Event
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {subEvents.map((event, i) => (
            <div key={event.id} className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm">Event {i + 1}</span>
                {subEvents.length > 1 && (
                  <Button variant="ghost" size="sm" onClick={() => setSubEvents(subEvents.filter(e => e.id !== event.id))}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <Input placeholder="Event Name" value={event.name} onChange={e => setSubEvents(subEvents.map(ev => ev.id === event.id ? { ...ev, name: e.target.value } : ev))} />
                <Select value={event.category} onValueChange={v => setSubEvents(subEvents.map(ev => ev.id === event.id ? { ...ev, category: v } : ev))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Music", "Dance", "Art", "Comedy", "Gaming", "Photography", "Fashion"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <Textarea placeholder="Description" value={event.description} onChange={e => setSubEvents(subEvents.map(ev => ev.id === event.id ? { ...ev, description: e.target.value } : ev))} />
              <div className="grid gap-3 md:grid-cols-4">
                <Input type="date" value={event.date} onChange={e => setSubEvents(subEvents.map(ev => ev.id === event.id ? { ...ev, date: e.target.value } : ev))} />
                <Input type="time" value={event.time} onChange={e => setSubEvents(subEvents.map(ev => ev.id === event.id ? { ...ev, time: e.target.value } : ev))} />
                <Input placeholder="Stage" value={event.stage} onChange={e => setSubEvents(subEvents.map(ev => ev.id === event.id ? { ...ev, stage: e.target.value } : ev))} />
                <Input type="number" placeholder="Max Participants" value={event.maxParticipants} onChange={e => setSubEvents(subEvents.map(ev => ev.id === event.id ? { ...ev, maxParticipants: e.target.value } : ev))} />
              </div>
              <Input placeholder="Prize Pool (₹)" value={event.prizePool} onChange={e => setSubEvents(subEvents.map(ev => ev.id === event.id ? { ...ev, prizePool: e.target.value } : ev))} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Artists */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Music className="h-5 w-5 text-primary" />
              <CardTitle>Artists / Performers</CardTitle>
            </div>
            <Button variant="outline" size="sm" onClick={() => setArtists([...artists, { id: Date.now(), name: "", type: "Live DJ", date: "", time: "", stage: "" }])}>
              <Plus className="mr-2 h-4 w-4" /> Add Artist
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {artists.map((artist, i) => (
            <div key={artist.id} className="flex gap-3 items-start rounded-lg border p-3">
              <div className="flex-1 grid grid-cols-5 gap-3">
                <Input placeholder="Artist Name" value={artist.name} onChange={e => setArtists(artists.map(a => a.id === artist.id ? { ...a, name: e.target.value } : a))} />
                <Select value={artist.type} onValueChange={v => setArtists(artists.map(a => a.id === artist.id ? { ...a, type: v } : a))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Live DJ", "Band", "Stand-up Comedy", "Dance Performance", "Celebrity Guest"].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Input type="date" value={artist.date} onChange={e => setArtists(artists.map(a => a.id === artist.id ? { ...a, date: e.target.value } : a))} />
                <Input type="time" value={artist.time} onChange={e => setArtists(artists.map(a => a.id === artist.id ? { ...a, time: e.target.value } : a))} />
                <Input placeholder="Stage" value={artist.stage} onChange={e => setArtists(artists.map(a => a.id === artist.id ? { ...a, stage: e.target.value } : a))} />
              </div>
              {artists.length > 1 && (
                <Button variant="ghost" size="icon" onClick={() => setArtists(artists.filter(a => a.id !== artist.id))}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Sponsors */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              <CardTitle>Sponsor Management</CardTitle>
            </div>
            <Button variant="outline" size="sm" onClick={() => setSponsors([...sponsors, { id: Date.now(), name: "", category: "Gold Sponsor", logoUrl: "", websiteUrl: "" }])}>
              <Plus className="mr-2 h-4 w-4" /> Add Sponsor
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {sponsors.map((sponsor, i) => (
            <div key={sponsor.id} className="flex gap-3 items-start rounded-lg border p-3">
              <div className="flex-1 grid grid-cols-4 gap-3">
                <Input placeholder="Sponsor Name" value={sponsor.name} onChange={e => setSponsors(sponsors.map(s => s.id === sponsor.id ? { ...s, name: e.target.value } : s))} />
                <Select value={sponsor.category} onValueChange={v => setSponsors(sponsors.map(s => s.id === sponsor.id ? { ...s, category: v } : s))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Title Sponsor", "Powered By", "Gold Sponsor", "Silver Sponsor", "Media Partner"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Input placeholder="Logo URL" value={sponsor.logoUrl} onChange={e => setSponsors(sponsors.map(s => s.id === sponsor.id ? { ...s, logoUrl: e.target.value } : s))} />
                <Input placeholder="Website URL" value={sponsor.websiteUrl} onChange={e => setSponsors(sponsors.map(s => s.id === sponsor.id ? { ...s, websiteUrl: e.target.value } : s))} />
              </div>
              {sponsors.length > 1 && (
                <Button variant="ghost" size="icon" onClick={() => setSponsors(sponsors.filter(s => s.id !== sponsor.id))}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Facilities */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            <CardTitle>Festival Facilities</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { key: "parking", label: "Parking Available" },
              { key: "foodStalls", label: "Food Stalls Available" },
              { key: "medicalBooth", label: "Medical Booth" },
              { key: "securityDesk", label: "Security Desk" },
            ].map(({ key, label }) => (
              <div key={key} className="flex items-center justify-between rounded-lg border p-3">
                <Label>{label}</Label>
                <Switch checked={(facilities as any)[key]} onCheckedChange={v => setFacilities({ ...facilities, [key]: v })} />
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <Label>Help Desk Contact</Label>
            <Input placeholder="+91 00000 00000" value={facilities.helpDeskContact} onChange={e => setFacilities({ ...facilities, helpDeskContact: e.target.value })} />
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-primary" />
            <CardTitle>Social Media Links</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { key: "instagram", label: "Instagram URL", placeholder: "instagram.com/yourfest" },
              { key: "youtube", label: "YouTube URL", placeholder: "youtube.com/yourfest" },
              { key: "facebook", label: "Facebook URL", placeholder: "facebook.com/yourfest" },
              { key: "twitter", label: "Twitter URL", placeholder: "twitter.com/yourfest" },
            ].map(({ key, label, placeholder }) => (
              <div key={key} className="space-y-2">
                <Label>{label}</Label>
                <Input placeholder={placeholder} value={(socialLinks as any)[key]} onChange={e => setSocialLinks({ ...socialLinks, [key]: e.target.value })} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Theme */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-primary" />
            <CardTitle>Festival Theme Settings</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Festival Theme Style</Label>
              <Select value={theme.style} onValueChange={v => setTheme({ ...theme, style: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Music Festival", "Cultural Festival", "Tech Festival", "College Fest"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Primary Color</Label>
              <Input type="color" value={theme.primaryColor} onChange={e => setTheme({ ...theme, primaryColor: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Font Style</Label>
              <Select value={theme.fontStyle} onValueChange={v => setTheme({ ...theme, fontStyle: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Modern Sans", "Classic Serif", "Bold Display", "Minimal"].map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
