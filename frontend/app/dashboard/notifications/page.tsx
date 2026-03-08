"use client"

import { useState, useEffect } from "react"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Search,
  Plus,
  MessageSquare,
  Trash2,
  Send,
} from "lucide-react"

interface Notification {
  _id: string
  eventId: { _id: string; eventName: string; slug: string }
  title: string
  message: string
  type: string
  recipients: string[]
  status: string
  reach: number
  openRate: number
  engagements: number
  createdAt: string
}

interface Event {
  _id: string
  eventName: string
}

export default function NotificationsCenterPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    eventId: "",
    title: "",
    message: "",
    type: "broadcast",
    recipients: ["All Participants"]
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [notificationsData, eventsData] = await Promise.all([
        api.getNotifications(),
        api.getEvents()
      ])
      setNotifications(notificationsData)
      setEvents(eventsData)
      if (notificationsData.length > 0) {
        setSelectedId(notificationsData[0]._id)
      }
    } catch (error) {
      console.error('Failed to load notifications:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async () => {
    try {
      await api.createNotification(formData)
      setIsDialogOpen(false)
      setFormData({ eventId: "", title: "", message: "", type: "broadcast", recipients: ["All Participants"] })
      loadData()
    } catch (error) {
      console.error('Failed to create notification:', error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await api.deleteNotification(id)
      loadData()
    } catch (error) {
      console.error('Failed to delete notification:', error)
    }
  }

  const filteredNotifications = notifications.filter(n =>
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.message.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const selectedNotification = notifications.find(n => n._id === selectedId)

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'broadcast': return 'bg-primary text-primary-foreground'
      case 'alert': return 'bg-destructive text-destructive-foreground'
      case 'update': return 'bg-muted text-muted-foreground'
      case 'allocation': return 'bg-muted text-muted-foreground'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Notifications Center</h1>
          <Badge variant="outline">Organizer Access</Badge>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search messages..." 
              className="w-64 pl-10" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Broadcast
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Notification</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Event</Label>
                  <Select value={formData.eventId} onValueChange={(v) => setFormData({...formData, eventId: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Event" />
                    </SelectTrigger>
                    <SelectContent>
                      {events.map(event => (
                        <SelectItem key={event._id} value={event._id}>{event.eventName}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Type</Label>
                  <Select value={formData.type} onValueChange={(v) => setFormData({...formData, type: v})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="broadcast">Broadcast</SelectItem>
                      <SelectItem value="alert">Alert</SelectItem>
                      <SelectItem value="update">Update</SelectItem>
                      <SelectItem value="allocation">Allocation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Title</Label>
                  <Input 
                    value={formData.title} 
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Notification title"
                  />
                </div>
                <div>
                  <Label>Message</Label>
                  <Textarea 
                    value={formData.message} 
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Notification message"
                    rows={4}
                  />
                </div>
                <Button onClick={handleCreate} className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Send Notification
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Content */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Message List */}
        <Card className="h-[calc(100vh-220px)] overflow-hidden">
          <Tabs defaultValue="all" className="h-full flex flex-col">
            <div className="border-b px-4 py-2">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="sent">Sent</TabsTrigger>
                <TabsTrigger value="drafts">Drafts</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all" className="flex-1 overflow-auto m-0 p-0">
              {filteredNotifications.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  No notifications found
                </div>
              ) : (
                <div className="divide-y">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification._id}
                      className={`cursor-pointer p-4 transition-colors hover:bg-muted/50 ${
                        selectedId === notification._id ? "bg-accent" : ""
                      }`}
                      onClick={() => setSelectedId(notification._id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                          <MessageSquare className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-medium text-primary">
                              {notification.eventId?.eventName || 'N/A'}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(notification.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <h3 className="mt-1 font-medium line-clamp-1">{notification.title}</h3>
                          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                            {notification.message}
                          </p>
                          <div className="mt-2 flex items-center justify-between">
                            <Badge variant="secondary" className={getTypeColor(notification.type)}>
                              {notification.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
            <TabsContent value="sent" className="flex-1 overflow-auto m-0 p-0">
              <div className="divide-y">
                {filteredNotifications.filter(n => n.status === 'sent').map((notification) => (
                  <div
                    key={notification._id}
                    className={`cursor-pointer p-4 transition-colors hover:bg-muted/50 ${
                      selectedId === notification._id ? "bg-accent" : ""
                    }`}
                    onClick={() => setSelectedId(notification._id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                        <MessageSquare className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium line-clamp-1">{notification.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{notification.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="drafts" className="flex-1 overflow-auto m-0 p-4">
              <p className="text-muted-foreground">No drafts</p>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Message Detail */}
        <Card className="h-[calc(100vh-220px)] flex flex-col">
          {selectedNotification ? (
            <>
              <CardHeader className="flex-none border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge>{selectedNotification.eventId?.eventName || 'N/A'}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(selectedNotification.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(selectedNotification._id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="mt-2">{selectedNotification.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-auto p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">RECIPIENTS</span>
                    {selectedNotification.recipients?.map((r, i) => (
                      <Badge key={i} variant="outline">{r}</Badge>
                    ))}
                  </div>
                </div>

                <div className="whitespace-pre-wrap text-sm">
                  {selectedNotification.message}
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4">
                  <div className="rounded-lg border p-4 text-center">
                    <p className="text-2xl font-bold text-primary">{selectedNotification.reach}</p>
                    <p className="text-xs text-muted-foreground">REACH</p>
                  </div>
                  <div className="rounded-lg border p-4 text-center">
                    <p className="text-2xl font-bold">{selectedNotification.openRate}%</p>
                    <p className="text-xs text-muted-foreground">OPEN RATE</p>
                  </div>
                  <div className="rounded-lg border p-4 text-center">
                    <p className="text-2xl font-bold">{selectedNotification.engagements}</p>
                    <p className="text-xs text-muted-foreground">ENGAGEMENTS</p>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Select a notification to view details
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
