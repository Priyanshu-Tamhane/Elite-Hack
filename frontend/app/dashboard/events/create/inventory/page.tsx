"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { StepProgress } from "@/components/step-progress"
import { useEventCreation } from "@/lib/event-creation-context"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  Users, Hotel, Presentation, ArrowRight, ArrowLeft, Plus, Trash2,
  Info, Ticket, Trophy, DollarSign, Calendar, Clock, Building2,
  Star, Medal, Cpu, Globe, Wifi, Zap, UserCircle,
} from "lucide-react"

const steps = [
  { label: "Event Details", href: "/dashboard/events/create/details" },
  { label: "Inventory Setup", href: "/dashboard/events/create/inventory" },
  { label: "Payment Settings", href: "/dashboard/events/create/payments" },
  { label: "Publish Event", href: "/dashboard/events/create/publish" },
]

const initialTicketTiers = [
  { id: 1, name: "Early Bird", price: 49, inventory: 100, sold: 0, status: "Active" },
  { id: 2, name: "General Admission", price: 99, inventory: 500, sold: 0, status: "Active" },
  { id: 3, name: "VIP Pass", price: 249, inventory: 50, sold: 0, status: "Active" },
]

const accommodationTypes = [
  { name: "Standard Twin Room", description: "2 Guests per room", value: 40 },
  { name: "Single Suite", description: "Private room", value: 10 },
  { name: "Bunk Beds (Hostel Style)", description: "Shared space", value: 100 },
]

const defaultSponsors = [
  { name: "", tier: "Gold", website: "", description: "" },
]

const HACKATHON_STORAGE_KEY = "hackathon_inventory_draft"

export default function CreateEventInventoryPage() {
  const router = useRouter()
  const { eventData, updateEventData } = useEventCreation()
  const category = (eventData.category || "").toLowerCase()
  const isHackathon = category === "hackathon"

  // ── General fields ──
  const [totalCapacity, setTotalCapacity] = useState("500")
  const [maxTeamSize, setMaxTeamSize] = useState("4")
  const [minTeamSize, setMinTeamSize] = useState("2")
  const [waitlistCapacity, setWaitlistCapacity] = useState("50")
  const [ticketTiers, setTicketTiers] = useState(initialTicketTiers)
  const [workshopCapacity, setWorkshopCapacity] = useState({
    mainStage: "250", breakout: "45", mentorship: "15",
  })

  // ── Hackathon: Prizes ──
  const [prizes, setPrizes] = useState({
    first: { amount: "5000", perks: "VC Meetings, Internship Offers, Premium Swag" },
    second: { amount: "3000", perks: "Cloud Credits worth $500, Certificates" },
    third: { amount: "1000", perks: "Certificates, Sponsor Goodies" },
    special: [
      { title: "Best UI/UX Design", amount: "500" },
      { title: "Most Innovative Idea", amount: "500" },
      { title: "Best Use of AI", amount: "500" },
    ],
  })

  // ── Hackathon: Sponsors ──
  const [sponsors, setSponsors] = useState(defaultSponsors)

  // ── Hackathon: Schedule ──
  const [schedule, setSchedule] = useState<any[]>([])

  // ── Hackathon: Tracks ──
  const [tracks, setTracks] = useState<any[]>([])

  // ── Hackathon: Organisers ──
  const [organizers, setOrganizers] = useState<any[]>([])

  // ── Load / save hackathon draft ──
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

  // ── Category visibility ──
  const showTeamSettings = ['hackathon', 'workshop'].includes(category)
  const showTicketManagement = !['hackathon', 'wedding', 'corporate event', 'festival'].includes(category)
  const showWorkshopCapacity = ['conference', 'workshop', 'corporate event'].includes(category)
  const showAccommodation = ['hackathon', 'conference', 'wedding', 'corporate event', 'festival'].includes(category)

  // ── Sponsor helpers ──
  const addSponsor = () => setSponsors([...sponsors, { name: "", tier: "Bronze", website: "", description: "" }])
  const removeSponsor = (i: number) => setSponsors(sponsors.filter((_, idx) => idx !== i))
  const updateSponsor = (i: number, field: string, val: string) => {
    const next = [...sponsors]; (next[i] as any)[field] = val; setSponsors(next)
  }

  // ── Schedule helpers ──
  const addScheduleItem = () => setSchedule([...schedule, { day: "Day 1", time: "09:00", type: "Hacking", title: "", description: "" }])
  const removeScheduleItem = (i: number) => setSchedule(schedule.filter((_, idx) => idx !== i))
  const updateScheduleItem = (i: number, field: string, val: string) => {
    const next = [...schedule]; (next[i] as any)[field] = val; setSchedule(next)
  }

  // ── Special prizes helpers ──
  const addSpecialPrize = () => setPrizes({ ...prizes, special: [...prizes.special, { title: "", amount: "" }] })
  const removeSpecialPrize = (i: number) => setPrizes({ ...prizes, special: prizes.special.filter((_, idx) => idx !== i) })
  const updateSpecialPrize = (i: number, field: string, val: string) => {
    const next = [...prizes.special]; (next[i] as any)[field] = val; setPrizes({ ...prizes, special: next })
  }

  // ── Tracks helpers ──
  const addTrack = () => setTracks([...tracks, { title: "", description: "" }])
  const removeTrack = (i: number) => setTracks(tracks.filter((_, idx) => idx !== i))
  const updateTrack = (i: number, field: string, val: string) => {
    const next = [...tracks]; (next[i] as any)[field] = val; setTracks(next)
  }

  // ── Organizer helpers ──
  const addOrganizer = () => setOrganizers([...organizers, { name: "", role: "", company: "", email: "", twitter: "", linkedin: "" }])
  const removeOrganizer = (i: number) => setOrganizers(organizers.filter((_, idx) => idx !== i))
  const updateOrganizer = (i: number, field: string, val: string) => {
    const next = [...organizers]; (next[i] as any)[field] = val; setOrganizers(next)
  }

  const handleNext = () => {
    if (isHackathon) {
      // Validate all required hackathon fields
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
    }
    saveHackathonDraft()
    router.push("/dashboard/events/create/payments")
  }

  const handleBack = () => router.push("/dashboard/events/create/details")

  const tierColor: Record<string, string> = {
    Gold: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    Silver: "bg-gray-100 text-gray-700 dark:bg-gray-700/40 dark:text-gray-300",
    Bronze: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    Platinum: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  }

  const scheduleTypes = ["Opening", "Workshop", "Hacking", "Mentoring", "Checkpoint", "Submission", "Judging", "Closing", "Break", "Social", "Other"]
  const scheduleDays = ["Day 1", "Day 2", "Day 3", "Day 4"]
  const sponsorTiers = ["Platinum", "Gold", "Silver", "Bronze", "Community"]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          {isHackathon ? "Hackathon Setup — Inventory & Details" : "Create New Event"}
        </h1>
        <p className="text-muted-foreground">
          {isHackathon
            ? "Configure prizes, sponsors, schedule, tracks, and capacity for your hackathon."
            : "Define your capacities, ticketing strategy, and logistics."}
        </p>
      </div>

      <StepProgress steps={steps} currentStep={1} />

      <div className="space-y-6">

        {/* ════ HACKATHON SECTIONS (only when category = hackathon) ════ */}
        {isHackathon && (
          <>
            {/* ── Hackathon Tracks ── */}
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
                <p className="text-sm text-muted-foreground">
                  Define the problem domains participants can choose from.
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                {tracks.map((track, i) => (
                  <div key={i} className="flex gap-3 items-start rounded-lg border p-3">
                    <div className="flex-1 grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">Track Name</Label>
                        <Input
                          placeholder="e.g. AI / ML"
                          value={track.title}
                          onChange={e => updateTrack(i, "title", e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">Description</Label>
                        <Input
                          placeholder="Short description of this track"
                          value={track.description}
                          onChange={e => updateTrack(i, "description", e.target.value)}
                        />
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="mt-5 shrink-0" onClick={() => removeTrack(i)}>
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* ── Organisers ── */}
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
                <p className="text-sm text-muted-foreground">
                  Add the team members behind this hackathon. These will be displayed on the event microsite.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {organizers.map((org, i) => (
                  <div key={i} className="rounded-lg border p-4 space-y-3">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">Full Name *</Label>
                        <Input
                          placeholder="e.g. Arjun Sharma"
                          value={org.name}
                          onChange={e => updateOrganizer(i, "name", e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">Role / Title</Label>
                        <Input
                          placeholder="e.g. Lead Organizer"
                          value={org.role}
                          onChange={e => updateOrganizer(i, "role", e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">Company / College</Label>
                        <Input
                          placeholder="e.g. TechSphere Inc."
                          value={org.company}
                          onChange={e => updateOrganizer(i, "company", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 items-end">
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">Email</Label>
                        <Input
                          type="email"
                          placeholder="arjun@example.com"
                          value={org.email}
                          onChange={e => updateOrganizer(i, "email", e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">Twitter Handle</Label>
                        <Input
                          placeholder="@handle"
                          value={org.twitter}
                          onChange={e => updateOrganizer(i, "twitter", e.target.value)}
                        />
                      </div>
                      <div className="flex gap-2 items-end">
                        <div className="flex-1 space-y-1">
                          <Label className="text-xs text-muted-foreground">LinkedIn URL</Label>
                          <Input
                            placeholder="linkedin.com/in/handle"
                            value={org.linkedin}
                            onChange={e => updateOrganizer(i, "linkedin", e.target.value)}
                          />
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeOrganizer(i)} className="shrink-0">
                          <Trash2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {organizers.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4 border border-dashed rounded-lg">
                    No organizers added yet. Click &quot;Add Organizer&quot; to get started.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* ── Prize Pool ── */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <CardTitle>Prize Pool</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground">
                  Set the prize amounts and perks for winners.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Main prizes */}
                <div className="grid gap-4 md:grid-cols-3">
                  {(["first", "second", "third"] as const).map((place, idx) => {
                    const labels = ["🥇 1st Place", "🥈 2nd Place", "🥉 3rd Place"]
                    const colors = [
                      "border-yellow-400/40 bg-yellow-50/50 dark:bg-yellow-900/10",
                      "border-gray-300/40 bg-gray-50/50 dark:bg-gray-800/20",
                      "border-orange-400/40 bg-orange-50/50 dark:bg-orange-900/10",
                    ]
                    return (
                      <div key={place} className={`rounded-xl border-2 p-4 space-y-3 ${colors[idx]}`}>
                        <p className="font-bold text-base">{labels[idx]}</p>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground flex items-center gap-1">
                            <DollarSign className="h-3 w-3" /> Prize Amount (USD)
                          </Label>
                          <div className="flex items-center border rounded-lg overflow-hidden">
                            <span className="px-2 text-muted-foreground text-sm bg-muted border-r">$</span>
                            <Input
                              type="number"
                              value={prizes[place].amount}
                              onChange={e => setPrizes({ ...prizes, [place]: { ...prizes[place], amount: e.target.value } })}
                              className="border-0 focus-visible:ring-0"
                              placeholder="0"
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground flex items-center gap-1">
                            <Star className="h-3 w-3" /> Additional Perks
                          </Label>
                          <Textarea
                            placeholder="e.g. Internship offers, cloud credits, swag..."
                            value={prizes[place].perks}
                            onChange={e => setPrizes({ ...prizes, [place]: { ...prizes[place], perks: e.target.value } })}
                            className="min-h-[70px] text-sm resize-none"
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Special prizes */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Medal className="h-4 w-4 text-primary" />
                      <Label>Special Category Prizes</Label>
                      <Badge variant="outline" className="text-xs">Optional</Badge>
                    </div>
                    <Button variant="outline" size="sm" onClick={addSpecialPrize}>
                      <Plus className="mr-2 h-3 w-3" /> Add Special Prize
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {prizes.special.map((sp, i) => (
                      <div key={i} className="flex gap-3 items-center rounded-lg border p-3">
                        <div className="flex-1">
                          <Input
                            placeholder="e.g. Best UI/UX Design"
                            value={sp.title}
                            onChange={e => updateSpecialPrize(i, "title", e.target.value)}
                          />
                        </div>
                        <div className="flex items-center border rounded-lg overflow-hidden w-36">
                          <span className="px-2 text-muted-foreground text-sm bg-muted border-r">$</span>
                          <Input
                            type="number"
                            placeholder="500"
                            value={sp.amount}
                            onChange={e => updateSpecialPrize(i, "amount", e.target.value)}
                            className="border-0 focus-visible:ring-0 w-24"
                          />
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeSpecialPrize(i)}>
                          <Trash2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </div>
                    ))}
                    {prizes.special.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-3 border border-dashed rounded-lg">
                        No special prizes yet. Click &quot;Add Special Prize&quot; to create one.
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ── Sponsors ── */}
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
                <p className="text-sm text-muted-foreground">
                  Add companies and organizations supporting your hackathon.
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                {sponsors.map((sponsor, i) => (
                  <div key={i} className="rounded-lg border p-4 space-y-3">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">Company Name *</Label>
                        <Input
                          placeholder="e.g. TechCorp Inc."
                          value={sponsor.name}
                          onChange={e => updateSponsor(i, "name", e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">Sponsorship Tier</Label>
                        <select
                          value={sponsor.tier}
                          onChange={e => updateSponsor(i, "tier", e.target.value)}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                          {sponsorTiers.map(t => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">Website URL</Label>
                        <Input
                          placeholder="https://techcorp.com"
                          value={sponsor.website}
                          onChange={e => updateSponsor(i, "website", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 items-end">
                      <div className="flex-1 space-y-1">
                        <Label className="text-xs text-muted-foreground">Brief Description (shown on microsite)</Label>
                        <Input
                          placeholder="What does this company do? e.g. Cloud infrastructure provider"
                          value={sponsor.description}
                          onChange={e => updateSponsor(i, "description", e.target.value)}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        {sponsor.tier && (
                          <Badge className={tierColor[sponsor.tier] || ""}>
                            {sponsor.tier}
                          </Badge>
                        )}
                        <Button variant="ghost" size="icon" onClick={() => removeSponsor(i)}>
                          <Trash2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {sponsors.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4 border border-dashed rounded-lg">
                    No sponsors added yet. Click &quot;Add Sponsor&quot; to get started.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* ── Event Schedule ── */}
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
                <p className="text-sm text-muted-foreground">
                  Build your hackathon timeline. This will be shown on the event microsite.
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                {schedule.map((item, i) => (
                  <div key={i} className="rounded-lg border p-3 space-y-3">
                    <div className="grid grid-cols-4 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">Day</Label>
                        <select
                          value={item.day}
                          onChange={e => updateScheduleItem(i, "day", e.target.value)}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                          {scheduleDays.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">Time</Label>
                        <Input
                          type="time"
                          value={item.time}
                          onChange={e => updateScheduleItem(i, "time", e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">Event Type</Label>
                        <select
                          value={item.type}
                          onChange={e => updateScheduleItem(i, "type", e.target.value)}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                          {scheduleTypes.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">Title *</Label>
                        <Input
                          placeholder="e.g. Hacking Begins!"
                          value={item.title}
                          onChange={e => updateScheduleItem(i, "title", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 items-end">
                      <div className="flex-1 space-y-1">
                        <Label className="text-xs text-muted-foreground">Description</Label>
                        <Input
                          placeholder="Brief details about this schedule item"
                          value={item.description}
                          onChange={e => updateScheduleItem(i, "description", e.target.value)}
                        />
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeScheduleItem(i)}>
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                ))}
                <p className="text-xs text-muted-foreground italic">
                  Items will be automatically sorted by day and time on the microsite.
                </p>
              </CardContent>
            </Card>
          </>
        )}

        {/* ════ GENERAL SECTIONS ════ */}

        {/* Global Capacity & Team Rules */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <CardTitle>Global Capacity & Team Rules</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">
              Set the overall physical limits and collaboration rules.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="capacity" className="flex items-center gap-1">
                  {isHackathon ? "Max Participants" : "Total Attendee Capacity"}
                  <Info className="h-3 w-3 text-muted-foreground" />
                </Label>
                <Input
                  id="capacity"
                  type="number"
                  value={totalCapacity}
                  onChange={(e) => setTotalCapacity(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Maximum number of total registrations allowed.
                </p>
              </div>
              {showTeamSettings && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="max-team">Maximum Team Size</Label>
                    <Input
                      id="max-team"
                      type="number"
                      value={maxTeamSize}
                      onChange={(e) => setMaxTeamSize(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="min-team">Minimum Team Size</Label>
                    <Input
                      id="min-team"
                      type="number"
                      value={minTeamSize}
                      onChange={(e) => setMinTeamSize(e.target.value)}
                    />
                  </div>
                </>
              )}
              <div className="space-y-2">
                <Label htmlFor="waitlist">Waitlist Capacity</Label>
                <Input
                  id="waitlist"
                  type="number"
                  value={waitlistCapacity}
                  onChange={(e) => setWaitlistCapacity(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ticket Management — non-hackathon only */}
        {showTicketManagement && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Ticket className="h-5 w-5 text-primary" />
                    <CardTitle>Ticket Type Management</CardTitle>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Configure pricing tiers and availability windows.
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="mr-2 h-4 w-4" /> Add Tier
                </Button>
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
                  {ticketTiers.map((tier) => (
                    <TableRow key={tier.id}>
                      <TableCell className="font-medium">{tier.name}</TableCell>
                      <TableCell>${tier.price}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={(tier.sold / tier.inventory) * 100} className="h-2 w-16" />
                          <span className="text-sm text-muted-foreground">{tier.sold} / {tier.inventory}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{tier.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => setTicketTiers(ticketTiers.filter(t => t.id !== tier.id))}>
                          <Trash2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <p className="mt-4 text-xs italic text-muted-foreground">
                Note: Prices are inclusive of EventSphere processing fees.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Accommodation & Workshop */}
        <div className="grid gap-6 md:grid-cols-2">
          {showAccommodation && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Hotel className="h-5 w-5 text-primary" />
                  <CardTitle>Accommodation Slots</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground">
                  Allocate room counts for residential participants.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {accommodationTypes.map((type) => (
                  <div key={type.name} className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <p className="font-medium">{type.name}</p>
                      <p className="text-xs text-muted-foreground">{type.description}</p>
                    </div>
                    <Input type="number" defaultValue={type.value} className="w-20 text-center" />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {showWorkshopCapacity && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Presentation className="h-5 w-5 text-primary" />
                  <CardTitle>Workshop Capacity</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground">
                  Individual limits for secondary event tracks.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Main Stage Workshop</Label>
                  <Input type="number" value={workshopCapacity.mainStage}
                    onChange={(e) => setWorkshopCapacity({ ...workshopCapacity, mainStage: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Technical Breakout Sessions</Label>
                  <Input type="number" value={workshopCapacity.breakout}
                    onChange={(e) => setWorkshopCapacity({ ...workshopCapacity, breakout: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Mentorship Slots (1:1)</Label>
                  <Input type="number" value={workshopCapacity.mentorship}
                    onChange={(e) => setWorkshopCapacity({ ...workshopCapacity, mentorship: e.target.value })} />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between border-t pt-6">
        <Button variant="ghost" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Details
        </Button>
        <div className="flex gap-3">
          <Button variant="outline" onClick={saveHackathonDraft}>Save as Draft</Button>
          <Button onClick={handleNext}>
            Continue to Payments
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
