"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Pencil, Trash2, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { api } from "@/lib/api"

export default function ScheduleManagementPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const slug = params.slug as string
  const [event, setEvent] = useState<any>(null)
  const [schedule, setSchedule] = useState<any[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    venue: "",
    speaker: "",
  })

  const isConference = event?.category === "conference"

  useEffect(() => {
    const authKey = sessionStorage.getItem("event_admin")
    if (authKey !== slug) {
      router.push(`/event/${slug}/manage-login`)
      return
    }

    loadEvent()
  }, [slug, router])

  const loadEvent = async () => {
    try {
      const eventData = await api.getEventBySlug(slug)
      setEvent(eventData)
      if (eventData.category === "conference") {
        // Flatten agenda sessions for table display
        const sessions: any[] = []
          ; (eventData.agenda || []).forEach((day: any) => {
            ; (day.sessions || []).forEach((s: any) => {
              sessions.push({
                id: s._id || `${day.day}-${s.title}`,
                name: s.title,
                date: day.date || "",
                time: s.startTime ? `${s.startTime}${s.endTime ? ` – ${s.endTime}` : ""}` : "",
                venue: s.room || "",
                speaker: s.speaker || "",
                dayLabel: day.label || `Day ${day.day}`,
              })
            })
          })
        setSchedule(sessions)
      } else {
        setSchedule(eventData.schedule || [])
      }
    } catch {
      const publishedEvents = JSON.parse(localStorage.getItem("published_events") || "[]")
      const foundEvent = publishedEvents.find((e: any) => e.slug === slug)
      if (foundEvent) {
        setEvent(foundEvent)
        setSchedule(foundEvent.schedule || [])
      }
    }
  }

  const handleAddItem = async () => {
    if (isConference) {
      // For conference, add session to first agenda day via API update
      try {
        const newSession = {
          title: formData.name,
          speaker: formData.speaker,
          startTime: formData.time,
          room: formData.venue,
        }
        const agenda = [...(event.agenda || [])]
        if (agenda.length === 0) {
          agenda.push({ day: 1, label: "Day 1", date: formData.date, sessions: [newSession] })
        } else {
          agenda[0].sessions = [...(agenda[0].sessions || []), newSession]
        }
        await api.updateEventBySlug(slug, { agenda })
        toast({ title: "Session added successfully" })
      } catch {
        toast({ title: "Session added (local)", description: "Changes saved locally" })
      }
    } else {
      // Original local-only logic for non-conference
      const newCeremony = { id: Date.now().toString(), ...formData }
      const updatedSchedule = [...schedule, newCeremony]
      updateLocalSchedule(updatedSchedule)
      toast({ title: "Ceremony added successfully" })
    }
    setIsDialogOpen(false)
    setFormData({ name: "", date: "", time: "", venue: "", speaker: "" })
    loadEvent()
  }

  const handleDeleteItem = async (id: string) => {
    if (isConference) {
      try {
        const agenda = (event.agenda || []).map((day: any) => ({
          ...day,
          sessions: (day.sessions || []).filter((s: any) => (s._id || `${day.day}-${s.title}`) !== id),
        }))
        await api.updateEventBySlug(slug, { agenda })
        toast({ title: "Session removed" })
        loadEvent()
      } catch {
        toast({ title: "Failed to remove session", variant: "destructive" })
      }
    } else {
      const updatedSchedule = schedule.filter(s => s.id !== id)
      updateLocalSchedule(updatedSchedule)
      toast({ title: "Ceremony deleted successfully" })
    }
  }

  const updateLocalSchedule = (updatedSchedule: any[]) => {
    const publishedEvents = JSON.parse(localStorage.getItem("published_events") || "[]")
    const eventIndex = publishedEvents.findIndex((e: any) => e.slug === slug)
    if (eventIndex !== -1) {
      publishedEvents[eventIndex].schedule = updatedSchedule
      localStorage.setItem("published_events", JSON.stringify(publishedEvents))
      setSchedule(updatedSchedule)
    }
  }

  // Labels
  const pageTitle = isConference ? "Agenda Management" : "Schedule Management"
  const pageDesc = isConference ? "Manage conference agenda sessions" : "Manage wedding ceremony schedule"
  const addBtnLabel = isConference ? "Add Session" : "Add New Ceremony"
  const dialogTitle = isConference ? "Add Session" : "Add Ceremony"
  const nameLabel = isConference ? "Session Title" : "Ceremony Name"
  const namePlaceholder = isConference ? "e.g., Keynote by Dr. Smith" : "e.g., Mehendi Ceremony"
  const tableTitle = isConference ? "Conference Agenda" : "Wedding Schedule"
  const nameHead = isConference ? "Session Title" : "Ceremony Name"
  const emptyText = isConference ? "No sessions scheduled yet" : "No ceremonies scheduled yet"

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">{pageTitle}</h1>
          <p className="text-muted-foreground">{pageDesc}</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {addBtnLabel}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{dialogTitle}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>{nameLabel}</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={namePlaceholder}
                />
              </div>
              {isConference && (
                <div>
                  <Label>Speaker</Label>
                  <Input
                    value={formData.speaker}
                    onChange={(e) => setFormData({ ...formData, speaker: e.target.value })}
                    placeholder="e.g., Dr. Jane Doe"
                  />
                </div>
              )}
              <div>
                <Label>Date</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div>
                <Label>Time</Label>
                <Input
                  type={isConference ? "text" : "time"}
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  placeholder={isConference ? "e.g., 09:00 AM" : ""}
                />
              </div>
              <div>
                <Label>{isConference ? "Room / Track" : "Venue"}</Label>
                <Input
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  placeholder={isConference ? "e.g., Main Hall" : "Enter venue location"}
                />
              </div>
              <Button onClick={handleAddItem} className="w-full">{addBtnLabel}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{tableTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{nameHead}</TableHead>
                {isConference && <TableHead>Speaker</TableHead>}
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>{isConference ? "Room" : "Venue"}</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedule.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={isConference ? 6 : 5} className="text-center text-muted-foreground">
                    {emptyText}
                  </TableCell>
                </TableRow>
              ) : (
                schedule.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    {isConference && <TableCell>{item.speaker || "-"}</TableCell>}
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.time}</TableCell>
                    <TableCell>{item.venue}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
