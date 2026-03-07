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
    venue: ""
  })

  useEffect(() => {
    const authKey = sessionStorage.getItem("event_admin")
    if (authKey !== slug) {
      router.push(`/event/${slug}/manage-login`)
      return
    }

    loadEvent()
  }, [slug, router])

  const loadEvent = () => {
    const publishedEvents = JSON.parse(localStorage.getItem("published_events") || "[]")
    const foundEvent = publishedEvents.find((e: any) => e.slug === slug)
    if (foundEvent) {
      setEvent(foundEvent)
      setSchedule(foundEvent.schedule || [])
    }
  }

  const handleAddCeremony = () => {
    const newCeremony = {
      id: Date.now().toString(),
      ...formData
    }

    const updatedSchedule = [...schedule, newCeremony]
    updateEventSchedule(updatedSchedule)
    
    toast({ title: "Ceremony added successfully" })
    setIsDialogOpen(false)
    setFormData({ name: "", date: "", time: "", venue: "" })
  }

  const handleDeleteCeremony = (id: string) => {
    const updatedSchedule = schedule.filter(s => s.id !== id)
    updateEventSchedule(updatedSchedule)
    toast({ title: "Ceremony deleted successfully" })
  }

  const updateEventSchedule = (updatedSchedule: any[]) => {
    const publishedEvents = JSON.parse(localStorage.getItem("published_events") || "[]")
    const eventIndex = publishedEvents.findIndex((e: any) => e.slug === slug)
    
    if (eventIndex !== -1) {
      publishedEvents[eventIndex].schedule = updatedSchedule
      localStorage.setItem("published_events", JSON.stringify(publishedEvents))
      setSchedule(updatedSchedule)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Schedule Management</h1>
          <p className="text-muted-foreground">Manage wedding ceremony schedule</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Ceremony
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Ceremony</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Ceremony Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Mehendi Ceremony"
                />
              </div>
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
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>
              <div>
                <Label>Venue</Label>
                <Input
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  placeholder="Enter venue location"
                />
              </div>
              <Button onClick={handleAddCeremony} className="w-full">Add Ceremony</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Wedding Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ceremony Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Venue</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedule.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No ceremonies scheduled yet
                  </TableCell>
                </TableRow>
              ) : (
                schedule.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
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
                          onClick={() => handleDeleteCeremony(item.id)}
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
