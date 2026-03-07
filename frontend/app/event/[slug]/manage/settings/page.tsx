"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function EventSettingsPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const slug = params.slug as string
  const [formData, setFormData] = useState({
    eventName: "",
    startDate: "",
    venue: "",
    contactPerson: "",
    phone: "",
    email: ""
  })

  useEffect(() => {
    const authKey = sessionStorage.getItem("event_admin")
    if (authKey !== slug) {
      router.push(`/event/${slug}/manage/login`)
      return
    }

    const publishedEvents = JSON.parse(localStorage.getItem("published_events") || "[]")
    const event = publishedEvents.find((e: any) => e.slug === slug)
    
    if (event) {
      setFormData({
        eventName: event.eventName || "",
        startDate: event.startDate || "",
        venue: event.venue || "",
        contactPerson: event.contactPerson || "",
        phone: event.phone || "",
        email: event.email || ""
      })
    }
  }, [slug, router])

  const handleSave = () => {
    const publishedEvents = JSON.parse(localStorage.getItem("published_events") || "[]")
    const eventIndex = publishedEvents.findIndex((e: any) => e.slug === slug)
    
    if (eventIndex !== -1) {
      publishedEvents[eventIndex] = {
        ...publishedEvents[eventIndex],
        ...formData
      }
      localStorage.setItem("published_events", JSON.stringify(publishedEvents))
      toast({ title: "Settings saved successfully" })
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
              <Label>Wedding Date</Label>
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
