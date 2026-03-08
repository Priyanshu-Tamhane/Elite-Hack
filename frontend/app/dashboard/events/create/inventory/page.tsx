"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { StepProgress } from "@/components/step-progress"
import { useEventCreation } from "@/lib/event-creation-context"
import { WeddingInventory } from "@/components/inventory/WeddingInventory"
import CorporateInventory from "@/components/inventory/CorporateInventory"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  Users,
  Hotel,
  Presentation,
  ArrowRight,
  ArrowLeft,
  Plus,
  Trash2,
  Info,
  Ticket,
  Trophy,
  DollarSign,
  Calendar,
  Clock,
  Building2,
  Star,
  Medal,
  Zap,
  UserCircle,
} from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

const stepsBasic = [
  { label: "Event Details", href: "/dashboard/events/create/details" },
  { label: "Inventory Setup", href: "/dashboard/events/create/inventory" },
  { label: "Payment Settings", href: "/dashboard/events/create/payments" },
  { label: "Publish Event", href: "/dashboard/events/create/publish" },
]

const stepsCorporate = [
  { label: "Event Details", href: "/dashboard/events/create/details" },
  { label: "Corporate Details", href: "/dashboard/events/create/corporate" },
  { label: "Inventory Setup", href: "/dashboard/events/create/inventory" },
  { label: "Payment Settings", href: "/dashboard/events/create/payments" },
  { label: "Publish Event", href: "/dashboard/events/create/publish" },
]

/* ─── Conference Ticket Builder ─────────────────────────────── */
type ConfTicket = {
  id: number
  type: string
  price: number | ""
  currency: string
  paperSubmission: boolean
  benefits: string[]
  color: string
}

const TICKET_COLORS = ["indigo", "cyan", "purple", "green"]
const COLOR_LABELS: Record<string, string> = {
  indigo: "Indigo", cyan: "Cyan", purple: "Purple", green: "Green",
}

function ConferenceInventory({
  registrationType,
  onDataChange,
}: {
  registrationType: string
  onDataChange: (data: any) => void
}) {
  const isFree = registrationType === "free"

  const [tickets, setTickets] = useState<ConfTicket[]>([
    { id: 1, type: "General Admission", price: isFree ? "" : 99, currency: "USD", paperSubmission: false, benefits: ["Full conference access", "Lunch included"], color: "indigo" },
  ])
  const [totalCapacity, setTotalCapacity] = useState("500")
  const [waitlist, setWaitlist] = useState("50")

  useEffect(() => {
    onDataChange({
      totalCapacity: Number(totalCapacity) || 0,
      waitlistCapacity: Number(waitlist) || 0,
      tickets: tickets.map(t => ({
        type: t.type,
        price: isFree ? undefined : (t.price === "" ? undefined : Number(t.price)),
        currency: t.currency,
        paperSubmission: t.paperSubmission,
        benefits: t.benefits.filter(Boolean),
        color: t.color,
      })),
    })
  }, [tickets, totalCapacity, waitlist, isFree])

  const addTicket = () => {
    const id = Date.now()
    setTickets(prev => [...prev, {
      id, type: "New Pass", price: isFree ? "" : 0,
      currency: "USD", paperSubmission: false, benefits: [], color: TICKET_COLORS[prev.length % 4],
    }])
  }

  const updateTicket = (id: number, field: keyof ConfTicket, value: any) =>
    setTickets(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t))

  const removeTicket = (id: number) =>
    setTickets(prev => prev.filter(t => t.id !== id))

  const updateBenefits = (id: number, raw: string) =>
    updateTicket(id, "benefits", raw.split("\n"))

  return (
    <div className="space-y-6">
      {/* Capacity */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <CardTitle>Attendee Capacity</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">Set the maximum number of attendees for your conference.</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="conf-capacity" className="flex items-center gap-1">
                Total Attendee Capacity <Info className="h-3 w-3 text-muted-foreground" />
              </Label>
              <Input id="conf-capacity" type="number" min="1" value={totalCapacity}
                onChange={e => setTotalCapacity(e.target.value)} placeholder="e.g. 500" />
              <p className="text-xs text-muted-foreground">The maximum total registrations allowed across all ticket types.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="conf-waitlist">Waitlist Capacity</Label>
              <Input id="conf-waitlist" type="number" min="0" value={waitlist}
                onChange={e => setWaitlist(e.target.value)} placeholder="e.g. 50" />
              <p className="text-xs text-muted-foreground">Extra slots kept for the waitlist queue.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ticket Types */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Ticket className="h-5 w-5 text-primary" />
                <CardTitle>Conference Ticket Types</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {isFree
                  ? "Define the ticket categories for your free conference (e.g. General, Researcher)."
                  : "Configure different pricing tiers for your conference passes."}
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={addTicket}>
              <Plus className="mr-2 h-4 w-4" /> Add Ticket
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {tickets.map((ticket, idx) => (
            <div key={ticket.id} className="rounded-lg border p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${ticket.color === "indigo" ? "bg-indigo-500" :
                    ticket.color === "cyan" ? "bg-cyan-500" :
                      ticket.color === "purple" ? "bg-purple-500" : "bg-green-500"}`} />
                  <span className="font-semibold text-sm">Ticket {idx + 1}</span>
                </div>
                {tickets.length > 1 && (
                  <Button variant="ghost" size="sm" onClick={() => removeTicket(ticket.id)}
                    className="h-7 text-destructive hover:text-destructive">
                    <Trash2 className="h-3.5 w-3.5 mr-1" /> Remove
                  </Button>
                )}
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-1">
                  <Label className="text-xs">Ticket Name / Type *</Label>
                  <Input
                    placeholder="e.g. General Admission, Researcher, VIP"
                    value={ticket.type}
                    onChange={e => updateTicket(ticket.id, "type", e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Accent Color (on microsite)</Label>
                  <Select value={ticket.color} onValueChange={v => updateTicket(ticket.id, "color", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {TICKET_COLORS.map(c => (
                        <SelectItem key={c} value={c}>{COLOR_LABELS[c]}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {!isFree && (
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="space-y-1">
                    <Label className="text-xs">Price</Label>
                    <Input
                      type="number" min="0"
                      placeholder="e.g. 99"
                      value={ticket.price}
                      onChange={e => updateTicket(ticket.id, "price", e.target.value === "" ? "" : Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Currency</Label>
                    <Select value={ticket.currency} onValueChange={v => updateTicket(ticket.id, "currency", v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="INR">INR (₹)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-1">
                  <Label className="text-xs">Benefits (one per line)</Label>
                  <textarea
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[80px] focus:outline-none focus:ring-1 focus:ring-ring"
                    placeholder={"Full conference access\nLunch included\nNetworking sessions"}
                    value={ticket.benefits.join("\n")}
                    onChange={e => updateBenefits(ticket.id, e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Includes Paper Submission?</Label>
                  <div className="flex items-center gap-3 pt-2">
                    <Button
                      variant={ticket.paperSubmission ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateTicket(ticket.id, "paperSubmission", true)}
                    >Yes</Button>
                    <Button
                      variant={!ticket.paperSubmission ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateTicket(ticket.id, "paperSubmission", false)}
                    >No</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Show a &ldquo;Includes Paper Submission&rdquo; badge on the microsite.</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

/* ─── Hackathon / Generic Ticket Table ──────────────────────── */
const initialTicketTiers = [
  { id: 1, name: "Early Bird", price: 49, inventory: 100, sold: 0, status: "Active" },
  { id: 2, name: "General Admission", price: 99, inventory: 500, sold: 0, status: "Active" },
  { id: 3, name: "VIP Pass", price: 249, inventory: 50, sold: 0, status: "Active" },
]

const accommodationTypes = [
  { id: "twin", name: "Standard Twin Room", description: "2 Guests per room", defaultValue: 40 },
  { id: "suite", name: "Single Suite", description: "Private room", defaultValue: 10 },
  { id: "bunk", name: "Bunk Beds (Hostel Style)", description: "Shared space", defaultValue: 100 },
]

const HACKATHON_STORAGE_KEY = "hackathon_inventory_draft"

export default function CreateEventInventoryPage() {
  const router = useRouter()
  const { eventData, updateEventData } = useEventCreation()
  
  // Read category from localStorage as fallback
  const [category, setCategory] = useState("")
  const [registrationType, setRegistrationType] = useState("free")
  
  useEffect(() => {
    const raw = localStorage.getItem("event_draft_details")
    if (raw) {
      try {
        const d = JSON.parse(raw)
        setCategory(d.category || eventData.category || "")
        setRegistrationType(d.registrationType || eventData.registrationSettings?.registrationType || "free")
      } catch { }
    } else {
      setCategory(eventData.category || "")
    }
  }, [])
  
  const isHackathon = category.toLowerCase() === "hackathon"
  const isConference = category.toLowerCase() === "conference"
  const isWedding = category.toLowerCase() === "wedding"
  const isCorporateEvent = ['corporate event', 'conference', 'workshop'].includes(category.toLowerCase())
  
  const steps = isCorporateEvent ? stepsCorporate : stepsBasic
  const currentStepIndex = isCorporateEvent ? 2 : 1
  const [totalCapacity, setTotalCapacity] = useState("1000")
  const [maxTeamSize, setMaxTeamSize] = useState("4")
  const [minTeamSize, setMinTeamSize] = useState("1")
  const [waitlistCapacity, setWaitlistCapacity] = useState("50")
  const [ticketTiers, setTicketTiers] = useState(initialTicketTiers)
  const [workshopCapacity, setWorkshopCapacity] = useState({ mainStage: "250", breakout: "45", mentorship: "15" })
  const [accommodationSlots, setAccommodationSlots] = useState<Record<string, number>>({ twin: 40, suite: 10, bunk: 100 })
  const [weddingData, setWeddingData] = useState<any>({})
  const [conferenceInventoryData, setConferenceInventoryData] = useState<any>({})
  const [corporateInventoryData, setCorporateInventoryData] = useState<any>({})

  // Hackathon state
  const [prizes, setPrizes] = useState({
    first: { amount: "", perks: "" },
    second: { amount: "", perks: "" },
    third: { amount: "", perks: "" },
    special: [] as { title: string; amount: string }[],
  })
  const [sponsors, setSponsors] = useState([{ name: "", tier: "Gold", website: "", description: "" }])
  const [schedule, setSchedule] = useState<any[]>([])
  const [tracks, setTracks] = useState<any[]>([])
  const [organizers, setOrganizers] = useState<any[]>([])

  // Load hackathon draft
  useEffect(() => {
    if (!isHackathon) return
    const saved = localStorage.getItem(HACKATHON_STORAGE_KEY)
    if (saved) {
      try {
        const d = JSON.parse(saved)
        if (d.prizes) setPrizes(d.prizes)
        if (d.sponsors) setSponsors(d.sponsors)
        if (d.schedule) setSchedule(d.schedule)
        if (d.tracks) setTracks(d.tracks)
        if (d.organizers) setOrganizers(d.organizers)
        if (d.totalCapacity) setTotalCapacity(d.totalCapacity)
        if (d.maxTeamSize) setMaxTeamSize(d.maxTeamSize)
        if (d.minTeamSize) setMinTeamSize(d.minTeamSize)
      } catch (_) {}
    }
  }, [isHackathon])

  const saveHackathonDraft = () => {
    if (!isHackathon) return
    localStorage.setItem(HACKATHON_STORAGE_KEY, JSON.stringify({ prizes, sponsors, schedule, tracks, organizers, totalCapacity, maxTeamSize, minTeamSize }))
  }

  // Category-based visibility
  const showTeamSettings = ['hackathon', 'workshop'].includes(category.toLowerCase())
  const showTicketManagement = !['hackathon', 'wedding', 'corporate event', 'conference', 'festival'].includes(category.toLowerCase())
  const showWorkshopCapacity = ['conference', 'workshop', 'corporate event'].includes(category.toLowerCase())
  const showAccommodation = ['hackathon', 'conference', 'corporate event', 'festival'].includes(category.toLowerCase())

  const removeTier = (id: number) => setTicketTiers(prev => prev.filter(t => t.id !== id))

  // Helper functions
  const addSponsor = () => setSponsors([...sponsors, { name: "", tier: "Bronze", website: "", description: "" }])
  const removeSponsor = (i: number) => setSponsors(sponsors.filter((_, idx) => idx !== i))
  const updateSponsor = (i: number, field: string, val: string) => {
    const next = [...sponsors]; (next[i] as any)[field] = val; setSponsors(next)
  }

  const addScheduleItem = () => setSchedule([...schedule, { day: "Day 1", time: "09:00", type: "Hacking", title: "", description: "" }])
  const removeScheduleItem = (i: number) => setSchedule(schedule.filter((_, idx) => idx !== i))
  const updateScheduleItem = (i: number, field: string, val: string) => {
    const next = [...schedule]; (next[i] as any)[field] = val; setSchedule(next)
  }

  const addSpecialPrize = () => setPrizes({ ...prizes, special: [...prizes.special, { title: "", amount: "" }] })
  const removeSpecialPrize = (i: number) => setPrizes({ ...prizes, special: prizes.special.filter((_, idx) => idx !== i) })
  const updateSpecialPrize = (i: number, field: string, val: string) => {
    const next = [...prizes.special]; (next[i] as any)[field] = val; setPrizes({ ...prizes, special: next })
  }

  const addTrack = () => setTracks([...tracks, { title: "", description: "" }])
  const removeTrack = (i: number) => setTracks(tracks.filter((_, idx) => idx !== i))
  const updateTrack = (i: number, field: string, val: string) => {
    const next = [...tracks]; (next[i] as any)[field] = val; setTracks(next)
  }

  const addOrganizer = () => setOrganizers([...organizers, { name: "", role: "", company: "", email: "", twitter: "", linkedin: "" }])
  const removeOrganizer = (i: number) => setOrganizers(organizers.filter((_, idx) => idx !== i))
  const updateOrganizer = (i: number, field: string, val: string) => {
    const next = [...organizers]; (next[i] as any)[field] = val; setOrganizers(next)
  }

  const handleNext = () => {
    if (isHackathon) {
      const hasValidTracks = tracks.length > 0 && tracks.every(t => t.title.trim() && t.description.trim())
      const hasValidOrganizers = organizers.length > 0 && organizers.some(o => o.name.trim())
      const hasValidPrizes = prizes.first.amount && prizes.second.amount && prizes.third.amount
      const hasValidSponsors = sponsors.length > 0 && sponsors.every(s => s.name.trim())
      const hasValidSchedule = schedule.length > 0 && schedule.every(s => s.title.trim())

      if (!hasValidTracks) {
        alert("Please add at least one track with title and description.")
        return
      }
      if (!hasValidOrganizers) {
        alert("Please add at least one organizer with a name.")
        return
      }
      if (!hasValidPrizes) {
        alert("Please fill in prize amounts for 1st, 2nd, and 3rd place.")
        return
      }
      if (!hasValidSponsors) {
        alert("Please add at least one sponsor with a company name.")
        return
      }
      if (!hasValidSchedule) {
        alert("Please add at least one schedule item with a title.")
        return
      }
      saveHackathonDraft()
    }

    let inventoryPayload: any = {}

    if (isConference) {
      inventoryPayload = conferenceInventoryData
      updateEventData({
        registrationSettings: {
          ...eventData.registrationSettings,
          tickets: conferenceInventoryData.tickets || [],
        },
        inventory: {
          totalCapacity: conferenceInventoryData.totalCapacity,
          waitlistCapacity: conferenceInventoryData.waitlistCapacity,
        },
      })
    } else if (isWedding) {
      inventoryPayload = weddingData
    } else if (category.toLowerCase() === 'corporate event') {
      inventoryPayload = corporateInventoryData
      updateEventData({ inventory: inventoryPayload })
    } else {
      inventoryPayload = {
        totalCapacity: Number(totalCapacity),
        maxTeamSize: Number(maxTeamSize),
        minTeamSize: Number(minTeamSize),
        waitlistCapacity: Number(waitlistCapacity),
        workshopCapacity: {
          mainStage: Number(workshopCapacity.mainStage),
          breakout: Number(workshopCapacity.breakout),
          mentorship: Number(workshopCapacity.mentorship),
        },
        accommodationSlots,
        ticketTiers,
      }
      updateEventData({ inventory: inventoryPayload })
    }

    localStorage.setItem('event_draft_inventory', JSON.stringify(inventoryPayload))
    router.push("/dashboard/events/create/payments")
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Inventory Setup</h1>
        <p className="text-muted-foreground">
          {isConference
            ? "Define your ticket types and attendee capacity for the conference."
            : "Define capacities, ticketing strategy, and logistics."}
        </p>
      </div>

      <StepProgress steps={stepsBasic} currentStep={1} />

      <div className="space-y-6">
        {/* Hackathon sections */}
        {isHackathon && (
          <>
            {/* Tracks */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    <CardTitle>Hackathon Tracks</CardTitle>
                  </div>
                  <Button variant="outline" size="sm" onClick={addTrack}>
                    <Plus className="mr-2 h-4 w-4" /> Add Track
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {tracks.map((track, i) => (
                  <div key={i} className="flex gap-3 items-start rounded-lg border p-3">
                    <div className="flex-1 grid grid-cols-2 gap-3">
                      <Input placeholder="Track Name" value={track.title} onChange={e => updateTrack(i, "title", e.target.value)} />
                      <Input placeholder="Description" value={track.description} onChange={e => updateTrack(i, "description", e.target.value)} />
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeTrack(i)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Organizers */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UserCircle className="h-5 w-5 text-primary" />
                    <CardTitle>Organizers</CardTitle>
                  </div>
                  <Button variant="outline" size="sm" onClick={addOrganizer}>
                    <Plus className="mr-2 h-4 w-4" /> Add Organizer
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {organizers.map((org, i) => (
                  <div key={i} className="rounded-lg border p-4 space-y-3">
                    <div className="grid grid-cols-3 gap-3">
                      <Input placeholder="Full Name" value={org.name} onChange={e => updateOrganizer(i, "name", e.target.value)} />
                      <Input placeholder="Role" value={org.role} onChange={e => updateOrganizer(i, "role", e.target.value)} />
                      <Input placeholder="Company" value={org.company} onChange={e => updateOrganizer(i, "company", e.target.value)} />
                    </div>
                    <div className="grid grid-cols-3 gap-3 items-end">
                      <Input type="email" placeholder="Email" value={org.email} onChange={e => updateOrganizer(i, "email", e.target.value)} />
                      <Input placeholder="Twitter" value={org.twitter} onChange={e => updateOrganizer(i, "twitter", e.target.value)} />
                      <div className="flex gap-2">
                        <Input placeholder="LinkedIn" value={org.linkedin} onChange={e => updateOrganizer(i, "linkedin", e.target.value)} className="flex-1" />
                        <Button variant="ghost" size="icon" onClick={() => removeOrganizer(i)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Prize Pool */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <CardTitle>Prize Pool</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  {(["first", "second", "third"] as const).map((place) => (
                    <div key={place} className="rounded-xl border-2 p-4 space-y-3">
                      <p className="font-bold">{place === "first" ? "🥇 1st" : place === "second" ? "🥈 2nd" : "🥉 3rd"} Place</p>
                      <div className="flex items-center border rounded-lg overflow-hidden">
                        <span className="px-2 text-sm bg-muted border-r">$</span>
                        <Input type="number" value={prizes[place].amount} onChange={e => setPrizes({ ...prizes, [place]: { ...prizes[place], amount: e.target.value } })} className="border-0" placeholder="0" />
                      </div>
                      <Textarea placeholder="Perks" value={prizes[place].perks} onChange={e => setPrizes({ ...prizes, [place]: { ...prizes[place], perks: e.target.value } })} className="min-h-[70px]" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label>Special Prizes</Label>
                    <Button variant="outline" size="sm" onClick={addSpecialPrize}>
                      <Plus className="mr-2 h-3 w-3" /> Add
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {prizes.special.map((sp, i) => (
                      <div key={i} className="flex gap-3 items-center">
                        <Input placeholder="Prize Title" value={sp.title} onChange={e => updateSpecialPrize(i, "title", e.target.value)} className="flex-1" />
                        <div className="flex items-center border rounded-lg overflow-hidden w-36">
                          <span className="px-2 text-sm bg-muted border-r">$</span>
                          <Input type="number" placeholder="500" value={sp.amount} onChange={e => updateSpecialPrize(i, "amount", e.target.value)} className="border-0 w-24" />
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeSpecialPrize(i)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sponsors */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    <CardTitle>Sponsors</CardTitle>
                  </div>
                  <Button variant="outline" size="sm" onClick={addSponsor}>
                    <Plus className="mr-2 h-4 w-4" /> Add Sponsor
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {sponsors.map((sponsor, i) => (
                  <div key={i} className="rounded-lg border p-4 space-y-3">
                    <div className="grid grid-cols-3 gap-3">
                      <Input placeholder="Company Name" value={sponsor.name} onChange={e => updateSponsor(i, "name", e.target.value)} />
                      <select value={sponsor.tier} onChange={e => updateSponsor(i, "tier", e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        {["Platinum", "Gold", "Silver", "Bronze", "Community"].map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <Input placeholder="Website URL" value={sponsor.website} onChange={e => updateSponsor(i, "website", e.target.value)} />
                    </div>
                    <div className="flex gap-3 items-end">
                      <Input placeholder="Description" value={sponsor.description} onChange={e => updateSponsor(i, "description", e.target.value)} className="flex-1" />
                      <Button variant="ghost" size="icon" onClick={() => removeSponsor(i)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Schedule */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <CardTitle>Event Schedule</CardTitle>
                  </div>
                  <Button variant="outline" size="sm" onClick={addScheduleItem}>
                    <Plus className="mr-2 h-4 w-4" /> Add Item
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {schedule.map((item, i) => (
                  <div key={i} className="rounded-lg border p-3 space-y-3">
                    <div className="grid grid-cols-4 gap-3">
                      <select value={item.day} onChange={e => updateScheduleItem(i, "day", e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        {["Day 1", "Day 2", "Day 3", "Day 4"].map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                      <Input type="time" value={item.time} onChange={e => updateScheduleItem(i, "time", e.target.value)} />
                      <select value={item.type} onChange={e => updateScheduleItem(i, "type", e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        {["Opening", "Workshop", "Hacking", "Mentoring", "Checkpoint", "Submission", "Judging", "Closing", "Break"].map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <Input placeholder="Title" value={item.title} onChange={e => updateScheduleItem(i, "title", e.target.value)} />
                    </div>
                    <div className="flex gap-3 items-end">
                      <Input placeholder="Description" value={item.description} onChange={e => updateScheduleItem(i, "description", e.target.value)} className="flex-1" />
                      <Button variant="ghost" size="icon" onClick={() => removeScheduleItem(i)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </>
        )}

        {/* ── Conference ── */}
        {isConference && (
          <ConferenceInventory
            registrationType={registrationType}
            onDataChange={setConferenceInventoryData}
          />
        )}

        {/* Corporate Inventory */}
        {category.toLowerCase() === 'corporate event' && (
          <CorporateInventory onDataChange={setCorporateInventoryData} />
        )}

        {/* ── Wedding ── */}
        {isWedding && (
          <>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" /><CardTitle>Guest Capacity</CardTitle></div>
                <p className="text-sm text-muted-foreground">Set the overall guest capacity for your wedding.</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="w-capacity">Total Guest Capacity</Label>
                    <Input id="w-capacity" type="number" value={totalCapacity} onChange={e => setTotalCapacity(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="w-waitlist">Waitlist Capacity</Label>
                    <Input id="w-waitlist" type="number" value={waitlistCapacity} onChange={e => setWaitlistCapacity(e.target.value)} />
                  </div>
                </div>
              </CardContent>
            </Card>
            <WeddingInventory onDataChange={setWeddingData} />
          </>
        )}

        {/* ── Generic (Hackathon / Workshop / etc.) ── */}
        {!isConference && !isWedding && !isHackathon && (
          <>
            {/* Global Capacity */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" /><CardTitle>Global Capacity {showTeamSettings ? "& Team Rules" : ""}</CardTitle></div>
                <p className="text-sm text-muted-foreground">Set overall limits and collaboration rules for your event.</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="capacity" className="flex items-center gap-1">
                      Total Attendee Capacity <Info className="h-3 w-3 text-muted-foreground" />
                    </Label>
                    <Input id="capacity" type="number" value={totalCapacity} onChange={e => setTotalCapacity(e.target.value)} />
                    <p className="text-xs text-muted-foreground">Maximum total registrations allowed.</p>
                  </div>
                  {showTeamSettings && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="max-team">Maximum Team Size</Label>
                        <Input id="max-team" type="number" value={maxTeamSize} onChange={e => setMaxTeamSize(e.target.value)} />
                        <p className="text-xs text-muted-foreground">Applicable for team-based events.</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="min-team">Minimum Team Size</Label>
                        <Input id="min-team" type="number" value={minTeamSize} onChange={e => setMinTeamSize(e.target.value)} />
                      </div>
                    </>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="waitlist">Waitlist Capacity</Label>
                    <Input id="waitlist" type="number" value={waitlistCapacity} onChange={e => setWaitlistCapacity(e.target.value)} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ticket Tiers (not for hackathon/wedding) */}
            {showTicketManagement && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2"><Ticket className="h-5 w-5 text-primary" /><CardTitle>Ticket Type Management</CardTitle></div>
                      <p className="text-sm text-muted-foreground mt-1">Configure different pricing tiers and availability windows.</p>
                    </div>
                    <Button variant="outline" size="sm"><Plus className="mr-2 h-4 w-4" />Add Tier</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tier Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Inventory</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ticketTiers.map(tier => (
                        <TableRow key={tier.id}>
                          <TableCell className="font-medium">{tier.name}</TableCell>
                          <TableCell>${tier.price}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={(tier.sold / tier.inventory) * 100} className="h-2 w-16" />
                              <span className="text-sm text-muted-foreground">{tier.sold} / {tier.inventory}</span>
                            </div>
                          </TableCell>
                          <TableCell><Badge variant="secondary">{tier.status}</Badge></TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon" onClick={() => removeTier(tier.id)}>
                              <Trash2 className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <p className="mt-4 text-xs italic text-muted-foreground">Note: Prices are inclusive of EventSphere processing fees.</p>
                </CardContent>
              </Card>
            )}

            {/* Accommodation & Workshop */}
            <div className="grid gap-6 md:grid-cols-2">
              {showAccommodation && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2"><Hotel className="h-5 w-5 text-primary" /><CardTitle>Accommodation Slots</CardTitle></div>
                    <p className="text-sm text-muted-foreground">Allocate room counts for residential events.</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {accommodationTypes.map(type => (
                      <div key={type.id} className="flex items-center justify-between rounded-lg border p-3">
                        <div>
                          <p className="font-medium">{type.name}</p>
                          <p className="text-xs text-muted-foreground">{type.description}</p>
                        </div>
                        <Input
                          type="number"
                          value={accommodationSlots[type.id] ?? type.defaultValue}
                          onChange={e => setAccommodationSlots(prev => ({ ...prev, [type.id]: Number(e.target.value) }))}
                          className="w-20 text-center"
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {showWorkshopCapacity && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2"><Presentation className="h-5 w-5 text-primary" /><CardTitle>Workshop Capacity</CardTitle></div>
                    <p className="text-sm text-muted-foreground">Individual limits for secondary event tracks.</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Main Stage Workshop</Label>
                      <Input type="number" value={workshopCapacity.mainStage} onChange={e => setWorkshopCapacity(p => ({ ...p, mainStage: e.target.value }))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Technical Breakout Sessions</Label>
                      <Input type="number" value={workshopCapacity.breakout} onChange={e => setWorkshopCapacity(p => ({ ...p, breakout: e.target.value }))} />
                    </div>
                    <div className="space-y-2">
                      <Label>Mentorship Slots (1:1)</Label>
                      <Input type="number" value={workshopCapacity.mentorship} onChange={e => setWorkshopCapacity(p => ({ ...p, mentorship: e.target.value }))} />
                    </div>
                    <Button variant="outline" className="w-full"><Plus className="mr-2 h-4 w-4" />Add Session Limit</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t pt-6">
        <Button variant="ghost" onClick={() => router.push("/dashboard/events/create/details")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Details
        </Button>
        <div className="flex gap-3">
          <Button variant="outline">Save as Draft</Button>
          <Button onClick={handleNext}>
            Continue to Payments <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
