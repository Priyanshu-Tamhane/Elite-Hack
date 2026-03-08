"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { StepProgress } from "@/components/step-progress"
import { useToast } from "@/hooks/use-toast"
import { useEventCreation } from "@/lib/event-creation-context"
import {
  Type, Tag, Calendar, Clock, MapPin, Upload, ArrowRight,
  Bold, Italic, List, ListOrdered, Plus, Trash2, Mic, Monitor, FileText, FolderOpen,
} from "lucide-react"

const steps = [
  { label: "Event Details", href: "/dashboard/events/create/details" },
  { label: "Inventory", href: "/dashboard/events/create/inventory" },
  { label: "Payments", href: "/dashboard/events/create/payments" },
  { label: "Publish", href: "/dashboard/events/create/publish" },
]

const categories = ["Hackathon", "Conference", "Workshop", "Wedding", "Corporate Event", "Festival", "Other"]

const STORAGE_KEY = "event_draft_details"

type Session = { title: string; speaker: string; startTime: string; endTime: string; room: string }
type AgendaDay = { label: string; date: string; sessions: Session[] }

const emptySession = (): Session => ({ title: "", speaker: "", startTime: "", endTime: "", room: "" })
const emptyDay = (): AgendaDay => ({ label: "", date: "", sessions: [emptySession()] })

type Resource = { label: string; url: string; fileType: string }
const emptyResource = (): Resource => ({ label: "", url: "", fileType: "pdf" })

export default function CreateEventDetailsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { updateEventData } = useEventCreation()
  const [isLoaded, setIsLoaded] = useState(false)

  // Base fields
  const [eventName, setEventName] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [venue, setVenue] = useState("")
  const [bannerUrl, setBannerUrl] = useState("")

  // Corporate Fields
  const [companyMission, setCompanyMission] = useState("")
  const [eventObjectives, setEventObjectives] = useState("")
  const [targetAudience, setTargetAudience] = useState("")
  const [dressCode, setDressCode] = useState("")
  const [parkingInfo, setParkingInfo] = useState("")
  const [contactPerson, setContactPerson] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [primaryColor, setPrimaryColor] = useState("#2563eb")
  const [secondaryColor, setSecondaryColor] = useState("#64748b")

  // Conference-specific fields
  const [tagline, setTagline] = useState("")
  const [eventMode, setEventMode] = useState("")
  const [logoUrl, setLogoUrl] = useState("")
  const [registrationType, setRegistrationType] = useState("free")
  const [registrationDeadline, setRegistrationDeadline] = useState("")
  const [agenda, setAgenda] = useState<AgendaDay[]>([emptyDay()])
  const [resources, setResources] = useState<Resource[]>([])

  const isConference = category === "conference"

  // Load on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const d = JSON.parse(saved)
        setEventName(d.eventName || "")
        setCategory(d.category || "")
        setDescription(d.description || "")
        setStartDate(d.startDate || "")
        setEndDate(d.endDate || "")
        setStartTime(d.startTime || "")
        setVenue(d.venue || "")
        setBannerUrl(d.bannerUrl || "")
        setTagline(d.tagline || "")
        setEventMode(d.eventMode || "")
        setLogoUrl(d.logoUrl || "")
        setRegistrationType(d.registrationType || "free")
        setRegistrationDeadline(d.registrationDeadline || "")
        if (d.agenda?.length) setAgenda(d.agenda)
        if (d.resources?.length) setResources(d.resources)
        setCompanyMission(d.companyMission || "")
        setEventObjectives(d.eventObjectives || "")
        setTargetAudience(d.targetAudience || "")
        setDressCode(d.dressCode || "")
        setParkingInfo(d.parkingInfo || "")
        setContactPerson(d.contactPerson || "")
        setContactEmail(d.contactEmail || "")
        setPrimaryColor(d.primaryColor || "#2563eb")
        setSecondaryColor(d.secondaryColor || "#64748b")
      } catch { }
    }
    setIsLoaded(true)
  }, [])

  // Auto-save
  useEffect(() => {
    if (!isLoaded) return
    const data = {
      eventName, category, description, startDate, endDate, startTime, venue, bannerUrl,
      tagline, eventMode, logoUrl, registrationType, registrationDeadline, agenda, resources,
      companyMission, eventObjectives, targetAudience, dressCode, parkingInfo, contactPerson, contactEmail, primaryColor, secondaryColor,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [isLoaded, eventName, category, description, startDate, endDate, startTime, venue, bannerUrl,
    tagline, eventMode, logoUrl, registrationType, registrationDeadline, agenda, resources,
    companyMission, eventObjectives, targetAudience, dressCode, parkingInfo, contactPerson, contactEmail, primaryColor, secondaryColor])

  // Agenda helpers
  const updateSession = (dayIdx: number, sIdx: number, field: keyof Session, value: string) =>
    setAgenda(prev => prev.map((d, di) => di !== dayIdx ? d : {
      ...d, sessions: d.sessions.map((s, si) => si !== sIdx ? s : { ...s, [field]: value })
    }))

  const addSession = (dayIdx: number) =>
    setAgenda(prev => prev.map((d, di) => di !== dayIdx ? d : { ...d, sessions: [...d.sessions, emptySession()] }))

  const removeSession = (dayIdx: number, sIdx: number) =>
    setAgenda(prev => prev.map((d, di) => di !== dayIdx ? d : { ...d, sessions: d.sessions.filter((_, si) => si !== sIdx) }))

  const addDay = () => setAgenda(prev => [...prev, emptyDay()])
  const removeDay = (dayIdx: number) => setAgenda(prev => prev.filter((_, di) => di !== dayIdx))
  const updateDay = (dayIdx: number, field: keyof Omit<AgendaDay, "sessions">, value: string) =>
    setAgenda(prev => prev.map((d, di) => di !== dayIdx ? d : { ...d, [field]: value }))

  const handleSaveDraft = () => {
    toast({ title: "Draft Saved", description: "Your event details have been saved successfully." })
  }

  const validateImageUrl = (url: string) => {
    if (!url) return true
    try { new URL(url); return true } catch { return false }
  }

  const handleNext = () => {
    // Validation
    if (!eventName.trim()) {
      toast({ title: "Error", description: "Event name is required", variant: "destructive" })
      return
    }
    if (!category) {
      toast({ title: "Error", description: "Please select a category", variant: "destructive" })
      return
    }
    if (!description.trim()) {
      toast({ title: "Error", description: "Event description is required", variant: "destructive" })
      return
    }
    if (!startDate) {
      toast({ title: "Error", description: "Start date is required", variant: "destructive" })
      return
    }
    if (!venue.trim()) {
      toast({ title: "Error", description: "Venue is required", variant: "destructive" })
      return
    }

    const base = { eventName, category, description, startDate, endDate, startTime, venue, bannerUrl }
    const confExtras = isConference ? {
      conferenceInfo: { tagline, eventMode, logo: logoUrl },
      registrationSettings: {
        registrationType,
        deadline: registrationDeadline,
        tickets: [],
      },
      agenda: agenda.map((d, i) => ({
        day: i + 1,
        label: d.label || `Day ${i + 1}`,
        date: d.date,
        sessions: d.sessions,
      })),
      resources: resources.filter(r => r.label && r.url),
    } : {}
    const allData = { ...base, tagline, eventMode, logoUrl, registrationType, registrationDeadline, agenda, resources }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allData))
    updateEventData({ ...base, ...confExtras })
    router.push("/dashboard/events/create/inventory")
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Create New Event</h1>
        <p className="text-muted-foreground">
          Launch your next big event in minutes. Let&apos;s start with the basic details.
        </p>
      </div>

      {/* Progress */}
      <StepProgress steps={steps} currentStep={0} />

      <div className="space-y-6">
        {/* ── Basic Information ── */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-primary" />
              <CardTitle>Basic Information</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">Give your event a clear identity.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <Type className="h-4 w-4" /> Event Name
                </Label>
                <Input
                  id="name"
                  placeholder="e.g. Global Tech Hackathon 2024"
                  value={eventName}
                  onChange={e => setEventName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="flex items-center gap-2">
                  <Tag className="h-4 w-4" /> Category
                </Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="description" className="flex items-center gap-2">
                  <List className="h-4 w-4" /> Event Description
                </Label>
                <span className="text-xs text-muted-foreground">RICH EDITOR</span>
              </div>
              <div className="rounded-lg border">
                <div className="flex items-center gap-1 border-b p-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Bold className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Italic className="h-4 w-4" /></Button>
                  <div className="mx-1 h-4 w-px bg-border" />
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><List className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><ListOrdered className="h-4 w-4" /></Button>
                </div>
                <Textarea
                  id="description"
                  placeholder="Write a compelling story for your attendees..."
                  className="min-h-[120px] border-0 focus-visible:ring-0"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── Conference Details (conditional) ── */}
        {isConference && (
          <Card className="border-primary/30">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-primary" />
                <CardTitle>Conference Details</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">Additional details shown on the conference microsite.</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tagline">
                  Tagline <span className="text-muted-foreground text-xs">(short one-line description)</span>
                </Label>
                <Input
                  id="tagline"
                  placeholder="e.g. Shaping the future of artificial intelligence"
                  value={tagline}
                  onChange={e => setTagline(e.target.value)}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="eventMode" className="flex items-center gap-2">
                    <Monitor className="h-4 w-4" /> Event Mode
                  </Label>
                  <Select value={eventMode} onValueChange={setEventMode}>
                    <SelectTrigger><SelectValue placeholder="Select event mode" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="In-Person">In-Person</SelectItem>
                      <SelectItem value="Virtual">Virtual</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logoUrl" className="flex items-center gap-2">
                    <Upload className="h-4 w-4" /> Conference Logo URL
                  </Label>
                  <Input
                    id="logoUrl"
                    type="url"
                    placeholder="https://..."
                    value={logoUrl}
                    onChange={e => setLogoUrl(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ── Timing & Location ── */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-primary" />
              <CardTitle>Timing &amp; Location</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">When and where will the magic happen?</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="start-date" className="flex items-center gap-2"><Calendar className="h-4 w-4" /> Start Date</Label>
                <Input id="start-date" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date" className="flex items-center gap-2"><Calendar className="h-4 w-4" /> End Date</Label>
                <Input id="end-date" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="start-time" className="flex items-center gap-2"><Clock className="h-4 w-4" /> Start Time</Label>
                <Input id="start-time" type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="venue" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Venue / Location Name
                {isConference && eventMode === "Virtual" && (
                  <span className="text-xs text-muted-foreground font-normal">(optional for virtual)</span>
                )}
              </Label>
              <Input
                id="venue"
                placeholder={isConference && eventMode === "Virtual" ? "Online / Zoom / YouTube Live" : "e.g. Marriott Grand Ballroom"}
                value={venue}
                onChange={e => setVenue(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Tip: Use a clear name like &quot;Marriott Grand Ballroom&quot; or &quot;San Francisco Convention Center&quot;
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ── Conference Registration Settings (conditional) ── */}
        {isConference && (
          <Card className="border-primary/30">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-primary" />
                <CardTitle>Registration Settings</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">Control how attendees register for your conference.</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Registration Type</Label>
                  <Select value={registrationType} onValueChange={setRegistrationType}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="regDeadline">Registration Deadline</Label>
                  <Input
                    id="regDeadline"
                    type="date"
                    value={registrationDeadline}
                    onChange={e => setRegistrationDeadline(e.target.value)}
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                💡 Add ticket types (General, Researcher, VIP, etc.) after creating the event from the event management panel.
              </p>
            </CardContent>
          </Card>
        )}

        {/* ── Conference Agenda Builder (conditional) ── */}
        {isConference && (
          <Card className="border-primary/30">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-primary" />
                <CardTitle>Agenda / Schedule</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                Build your multi-day conference schedule. You can add or edit sessions later.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {agenda.map((day, dayIdx) => (
                <div key={dayIdx} className="rounded-lg border p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm">Day {dayIdx + 1}</h4>
                    {agenda.length > 1 && (
                      <Button
                        variant="ghost" size="sm"
                        onClick={() => removeDay(dayIdx)}
                        className="h-7 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5 mr-1" /> Remove Day
                      </Button>
                    )}
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-1">
                      <Label className="text-xs">Day Label</Label>
                      <Input
                        placeholder="e.g. Day 1 – Opening"
                        value={day.label}
                        onChange={e => updateDay(dayIdx, "label", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Date</Label>
                      <Input type="date" value={day.date} onChange={e => updateDay(dayIdx, "date", e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-xs font-semibold flex items-center gap-1">
                      <Mic className="h-3.5 w-3.5" /> Sessions
                    </Label>
                    {day.sessions.map((session, sIdx) => (
                      <div key={sIdx} className="rounded border p-3 space-y-2 bg-muted/30">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Session {sIdx + 1}</span>
                          {day.sessions.length > 1 && (
                            <button
                              onClick={() => removeSession(dayIdx, sIdx)}
                              className="text-destructive hover:opacity-80 text-xs flex items-center gap-1"
                            >
                              <Trash2 className="h-3 w-3" /> Remove
                            </button>
                          )}
                        </div>
                        <div className="grid gap-2 md:grid-cols-2">
                          <div className="space-y-1">
                            <Label className="text-xs">Title *</Label>
                            <Input
                              placeholder="Session title"
                              value={session.title}
                              onChange={e => updateSession(dayIdx, sIdx, "title", e.target.value)}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">Speaker</Label>
                            <Input
                              placeholder="Speaker name"
                              value={session.speaker}
                              onChange={e => updateSession(dayIdx, sIdx, "speaker", e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="grid gap-2 md:grid-cols-3">
                          <div className="space-y-1">
                            <Label className="text-xs">Start Time</Label>
                            <Input type="time" value={session.startTime} onChange={e => updateSession(dayIdx, sIdx, "startTime", e.target.value)} />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">End Time</Label>
                            <Input type="time" value={session.endTime} onChange={e => updateSession(dayIdx, sIdx, "endTime", e.target.value)} />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">Room / Hall</Label>
                            <Input
                              placeholder="Hall A"
                              value={session.room}
                              onChange={e => updateSession(dayIdx, sIdx, "room", e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={() => addSession(dayIdx)} className="w-full">
                      <Plus className="h-3.5 w-3.5 mr-1" /> Add Session
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" onClick={addDay} className="w-full">
                <Plus className="h-4 w-4 mr-2" /> Add Another Day
              </Button>
            </CardContent>
          </Card>
        )}

        {/* ── Conference Resources ── */}
        {isConference && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-primary" />
                <CardTitle>Conference Resources</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">Add downloadable documents for your attendees (brochure, schedule, guidelines, etc.).</p>
            </CardHeader>
            <CardContent>
              {resources.length === 0 ? (
                <div className="text-center py-8 border border-dashed rounded-lg text-muted-foreground">
                  <FolderOpen className="h-10 w-10 mx-auto mb-2 opacity-40" />
                  <p className="text-sm">No resources added yet.</p>
                  <Button variant="outline" size="sm" className="mt-3" onClick={() => setResources([emptyResource()])}>
                    <Plus className="h-4 w-4 mr-2" /> Add Resource
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {resources.map((res, idx) => (
                    <div key={idx} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold flex items-center gap-2">
                          <FileText className="h-4 w-4 text-primary" />
                          Resource {idx + 1}
                        </span>
                        <Button variant="ghost" size="sm" onClick={() => setResources(prev => prev.filter((_, i) => i !== idx))}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs">Label</Label>
                          <Input
                            placeholder="e.g. Conference Brochure"
                            value={res.label}
                            onChange={e => setResources(prev => prev.map((r, i) => i !== idx ? r : { ...r, label: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">File URL</Label>
                          <Input
                            type="url"
                            placeholder="https://example.com/file.pdf"
                            value={res.url}
                            onChange={e => setResources(prev => prev.map((r, i) => i !== idx ? r : { ...r, url: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">File Type</Label>
                          <Select value={res.fileType} onValueChange={val => setResources(prev => prev.map((r, i) => i !== idx ? r : { ...r, fileType: val }))}>
                            <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pdf">PDF</SelectItem>
                              <SelectItem value="docx">DOCX</SelectItem>
                              <SelectItem value="doc">DOC</SelectItem>
                              <SelectItem value="pptx">PPTX</SelectItem>
                              <SelectItem value="xlsx">XLSX</SelectItem>
                              <SelectItem value="zip">ZIP</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => setResources(prev => [...prev, emptyResource()])}>
                    <Plus className="h-4 w-4 mr-2" /> Add Another Resource
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* ── Visual Identity ── */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-primary" />
              <CardTitle>Visual Identity</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">Upload visuals that make your event stand out.</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="banner-url" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" /> Event Banner Image URL
                </Label>
                <Input
                  id="banner-url"
                  type="url"
                  placeholder="https://i.postimg.cc/your-image-url"
                  value={bannerUrl}
                  onChange={e => setBannerUrl(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Upload your image to{" "}
                  <a href="https://postimages.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    postimages.org
                  </a>{" "}
                  and paste the direct image URL here. Recommended size: 1200 x 600px
                </p>
              </div>
              {bannerUrl && validateImageUrl(bannerUrl) && (
                <div className="relative">
                  <img
                    src={bannerUrl}
                    alt="Event banner preview"
                    className="w-full h-64 object-cover rounded-lg"
                    onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none" }}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between border-t pt-6">
        <Button variant="ghost" asChild>
          <Link href="/dashboard/events">Cancel and Return</Link>
        </Button>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleSaveDraft}>Save Draft</Button>
          <Button onClick={handleNext}>
            Next Step
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
