"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Bell, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { api } from "@/lib/api"

export default function NotificationsPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const slug = params.slug as string
  const [event, setEvent] = useState<any>(null)
  const [notifications, setNotifications] = useState<any[]>([])
  const [formData, setFormData] = useState({
    title: "",
    message: ""
  })

  const isConference = event?.category === "conference"

  useEffect(() => {
    const authKey = sessionStorage.getItem("event_admin")
    if (authKey !== slug) {
      router.push(`/event/${slug}/manage/login`)
      return
    }

    const loadData = async () => {
      try {
        const eventData = await api.getEventBySlug(slug)
        setEvent(eventData)
        const notifs = await api.getNotifications(slug)
        setNotifications(notifs)
      } catch {
        const saved = JSON.parse(localStorage.getItem(`notifications_${slug}`) || "[]")
        setNotifications(saved)
      }
    }
    loadData()
  }, [slug, router])

  const handleSendNotification = () => {
    if (!formData.title || !formData.message) {
      toast({ title: "Please fill all fields", variant: "destructive" })
      return
    }

    const newNotification = {
      ...formData,
      sentAt: new Date().toISOString(),
      id: Date.now().toString()
    }

    const updated = [newNotification, ...notifications]
    setNotifications(updated)
    localStorage.setItem(`notifications_${slug}`, JSON.stringify(updated))

    toast({ title: "Notification sent successfully" })
    setFormData({ title: "", message: "" })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Notifications</h1>
        <p className="text-muted-foreground">Send updates to all {isConference ? "attendees" : "guests"}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Send New Notification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Ceremony Timing Update"
            />
          </div>
          <div>
            <Label>Message</Label>
            <Textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Enter your message here..."
              rows={5}
            />
          </div>
          <Button onClick={handleSendNotification} className="w-full">
            <Send className="mr-2 h-4 w-4" />
            Send Notification
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification History</CardTitle>
        </CardHeader>
        <CardContent>
          {notifications.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No notifications sent yet</p>
          ) : (
            <div className="space-y-3">
              {notifications.map((notif) => (
                <div key={notif.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <h3 className="font-semibold">{notif.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">{notif.message}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(notif.sentAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
