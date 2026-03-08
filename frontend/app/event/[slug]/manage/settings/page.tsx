"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { api } from "@/lib/api"

export default function EventSettingsPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const slug = params.slug as string
  const [event, setEvent] = useState<any>(null)
  const [formData, setFormData] = useState({
    eventName: "",
    startDate: "",
    venue: "",
    contactPerson: "",
    phone: "",
    email: ""
  })

  const isConference = event?.category === "conference"
  const isWedding = event?.category === "wedding"

  useEffect(() => {
    const authKey = sessionStorage.getItem("event_admin")
    if (authKey !== slug) {
      router.push(`/event/${slug}/manage-login`)
      return
    }

    const loadEvent = async () => {
      try {
        const data = await api.getEventBySlug(slug)
        setEvent(data)
        setFormData({
          eventName: data.eventName || "",
          startDate: data.startDate || "",
          venue: data.venue || "",
          contactPerson: data.contact?.name || data.contactPerson || "",
          phone: data.contact?.phone || data.phone || "",
          email: data.contact?.email || data.email || "",
        })
      } catch {
        const publishedEvents = JSON.parse(localStorage.getItem("published_events") || "[]")
        const found = publishedEvents.find((e: any) => e.slug === slug)
        if (found) {
          setEvent(found)
          setFormData({
            eventName: found.eventName || "",
            startDate: found.startDate || "",
            venue: found.venue || "",
            contactPerson: found.contactPerson || "",
            phone: found.phone || "",
            email: found.email || "",
          })
        }
      }
    }
    loadEvent()
  }, [slug, router])

  const handleSave = async () => {
    try {
      await api.updateEventBySlug(slug, {
        eventName: formData.eventName,
        startDate: formData.startDate,
        venue: formData.venue,
        contact: {
          name: formData.contactPerson,
          phone: formData.phone,
          email: formData.email,
        },
      })
      toast({ title: "Settings saved successfully" })
    } catch {
      // Fallback: save to localStorage
      const publishedEvents = JSON.parse(localStorage.getItem("published_events") || "[]")
      const eventIndex = publishedEvents.findIndex((e: any) => e.slug === slug)
      if (eventIndex !== -1) {
        publishedEvents[eventIndex] = { ...publishedEvents[eventIndex], ...formData }
        localStorage.setItem("published_events", JSON.stringify(publishedEvents))
      }
      toast({ title: "Settings saved locally" })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Event Settings</h1>
        <p className="text-muted-foreground">Update event configuration</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Event Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Event Name</Label>
              <Input
                value={formData.eventName}
                onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                placeholder="Enter event name"
              />
            </div>
            <div>
              <Label>{isWedding ? "Wedding Date" : isConference ? "Conference Date" : "Event Date"}</Label>
              <Input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
            </div>
          </div>
          <div>
            <Label>Venue</Label>
            <Input
              value={formData.venue}
              onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
              placeholder="Enter venue location"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Contact Person</Label>
            <Input
              value={formData.contactPerson}
              onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
              placeholder="Enter contact person name"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Phone</Label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email address"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="w-full">
        <Save className="mr-2 h-4 w-4" />
        Save Settings
      </Button>
    </div>
  )
}
