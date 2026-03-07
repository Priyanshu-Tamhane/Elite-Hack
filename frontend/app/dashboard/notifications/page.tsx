"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Plus,
  MessageSquare,
  MapPin,
  AlertCircle,
  Clock,
  Utensils,
  Trash2,
  Archive,
  MoreVertical,
  Send,
  Paperclip,
  Calendar,
  Check,
} from "lucide-react"

const notifications = [
  {
    id: 1,
    event: "GLOBAL TECH HACKATHON",
    icon: MessageSquare,
    title: "Hackathon Final Presentation Schedule",
    preview: "The final schedule for the presentations has been finalized. Please check your assigned time...",
    author: "Sarah Chen",
    avatar: "/placeholder.svg?height=32&width=32",
    time: "10 mins ago",
    tag: "broadcast",
    tagColor: "bg-primary text-primary-foreground",
  },
  {
    id: 2,
    event: "FUTURE LEADERS SUMMIT",
    icon: MapPin,
    title: "Room Allocation: Grand Hyatt Suite 402",
    preview: "Your accommodation has been confirmed for the duration of the conference. Please see check-in details...",
    author: "Mark Wilson",
    avatar: "/placeholder.svg?height=32&width=32",
    time: "2 hours ago",
    tag: "allocation",
    tagColor: "bg-muted text-muted-foreground",
  },
  {
    id: 3,
    event: "GLOBAL TECH HACKATHON",
    icon: AlertCircle,
    title: "Security Alert: Badge Required",
    preview: "Please note that security will be conducting mandatory badge checks at all entrances from tomorrow...",
    author: "Safety Team",
    avatar: "/placeholder.svg?height=32&width=32",
    time: "5 hours ago",
    tag: "alert",
    tagColor: "bg-destructive text-destructive-foreground",
  },
  {
    id: 4,
    event: "AI CONVERGENCE 2024",
    icon: Clock,
    title: "New Speaker Added to Main Stage",
    preview: "We are thrilled to announce that Dr. Jane Doe will be joining our keynote panel on AI Ethics...",
    author: "Emily Blunt",
    avatar: "/placeholder.svg?height=32&width=32",
    time: "1 day ago",
    tag: "update",
    tagColor: "bg-muted text-muted-foreground",
  },
  {
    id: 5,
    event: "GLOBAL TECH HACKATHON",
    icon: Utensils,
    title: "Lunch Menu Update (Vegan Options)",
    preview: "Based on feedback, we have expanded our vegan and gluten-free lunch options for Day 2...",
    author: "Sarah Chen",
    avatar: "/placeholder.svg?height=32&width=32",
    time: "1 day ago",
    tag: "broadcast",
    tagColor: "bg-primary text-primary-foreground",
  },
]

const selectedNotification = {
  id: 1,
  event: "Global Tech Hackathon",
  title: "Hackathon Final Presentation Schedule",
  author: {
    name: "Sarah Chen",
    role: "Event Lead",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  recipients: ["All Participants", "Judges"],
  content: `Attention all teams! The final schedule for the presentations has been finalized. Please ensure your slide decks are uploaded by 9:00 PM tonight. Each team will have exactly 5 minutes to present followed by 2 minutes of Q&A.

Location: Main Auditorium.
Time: Starts 9:00 AM tomorrow.`,
  stats: {
    reach: "1.2k",
    openRate: "98%",
    engagements: "242",
  },
}

export default function NotificationsCenterPage() {
  const [selectedId, setSelectedId] = useState(1)

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
            <Input placeholder="Search messages..." className="w-64 pl-10" />
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Broadcast
          </Button>
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
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="sent">Sent</TabsTrigger>
                <TabsTrigger value="drafts">Drafts</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all" className="flex-1 overflow-auto m-0 p-0">
              <div className="divide-y">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`cursor-pointer p-4 transition-colors hover:bg-muted/50 ${
                      selectedId === notification.id ? "bg-accent" : ""
                    }`}
                    onClick={() => setSelectedId(notification.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                        <notification.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-medium text-primary">
                            {notification.event}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {notification.time}
                          </span>
                        </div>
                        <h3 className="mt-1 font-medium line-clamp-1">{notification.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                          {notification.preview}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-5 w-5">
                              <AvatarImage src={notification.avatar} />
                              <AvatarFallback>
                                {notification.author[0]}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-muted-foreground">
                              {notification.author}
                            </span>
                          </div>
                          <Badge variant="secondary" className={notification.tagColor}>
                            {notification.tag}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="unread" className="flex-1 overflow-auto m-0 p-4">
              <p className="text-muted-foreground">No unread messages</p>
            </TabsContent>
            <TabsContent value="sent" className="flex-1 overflow-auto m-0 p-4">
              <p className="text-muted-foreground">Sent messages will appear here</p>
            </TabsContent>
            <TabsContent value="drafts" className="flex-1 overflow-auto m-0 p-4">
              <p className="text-muted-foreground">No drafts</p>
            </TabsContent>
          </Tabs>
          <div className="border-t p-3 text-center">
            <Button variant="ghost" size="sm">Load older messages</Button>
          </div>
        </Card>

        {/* Message Detail */}
        <Card className="h-[calc(100vh-220px)] flex flex-col">
          <CardHeader className="flex-none border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge>{selectedNotification.event}</Badge>
                <span className="text-xs text-muted-foreground">10 mins ago</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Archive className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardTitle className="mt-2">{selectedNotification.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={selectedNotification.author.avatar} />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedNotification.author.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedNotification.author.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">RECIPIENTS</span>
                {selectedNotification.recipients.map((r) => (
                  <Badge key={r} variant="outline">{r}</Badge>
                ))}
              </div>
            </div>

            <div className="mt-6 whitespace-pre-wrap text-sm">
              {selectedNotification.content}
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="rounded-lg border p-4 text-center">
                <p className="text-2xl font-bold text-primary">{selectedNotification.stats.reach}</p>
                <p className="text-xs text-muted-foreground">REACH</p>
              </div>
              <div className="rounded-lg border p-4 text-center">
                <p className="text-2xl font-bold">{selectedNotification.stats.openRate}</p>
                <p className="text-xs text-muted-foreground">OPEN RATE</p>
              </div>
              <div className="rounded-lg border p-4 text-center">
                <p className="text-2xl font-bold">{selectedNotification.stats.engagements}</p>
                <p className="text-xs text-muted-foreground">ENGAGEMENTS</p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Button variant="outline">
                <Check className="mr-2 h-4 w-4" />
                Mark as Resolved
              </Button>
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Add to Calendar
              </Button>
              <Button variant="link" className="ml-auto text-primary">
                View Event Dashboard
              </Button>
            </div>
          </CardContent>
          <div className="flex-none border-t p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>
              <Input placeholder="Type a follow-up message..." className="flex-1" />
              <Button variant="ghost" size="icon">
                <Send className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Paperclip className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
