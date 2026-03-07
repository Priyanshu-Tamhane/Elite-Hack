"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Calendar, CreditCard, Users, MapPin, MessageSquare, Check } from "lucide-react"

const notifications = [
  {
    id: 1,
    type: "room",
    title: "Room allocation for Hackathon confirmed: Room 402",
    time: "2h ago",
    read: false,
  },
  {
    id: 2,
    type: "payment",
    title: "Payment successful for Summit registration",
    time: "5h ago",
    read: false,
  },
  {
    id: 3,
    type: "announcement",
    title: "New announcement in Global Tech Hackathon",
    time: "1d ago",
    read: true,
  },
  {
    id: 4,
    type: "team",
    title: "Marcus Thorne accepted your team invitation",
    time: "2d ago",
    read: true,
  },
  {
    id: 5,
    type: "event",
    title: "Reminder: Global Tech Hackathon starts in 3 days",
    time: "3d ago",
    read: true,
  },
]

const getIcon = (type: string) => {
  switch (type) {
    case "room":
      return <MapPin className="h-5 w-5" />
    case "payment":
      return <CreditCard className="h-5 w-5" />
    case "announcement":
      return <MessageSquare className="h-5 w-5" />
    case "team":
      return <Users className="h-5 w-5" />
    case "event":
      return <Calendar className="h-5 w-5" />
    default:
      return <Bell className="h-5 w-5" />
  }
}

export default function ParticipantNotificationsPage() {
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground mt-1">
            Stay updated with your events and team activities
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm">
            <Check className="h-4 w-4 mr-2" />
            Mark all as read
          </Button>
        )}
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors ${
                  !notification.read ? "bg-accent/50" : ""
                }`}
              >
                <div className={`p-2 rounded-full ${!notification.read ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${!notification.read ? "font-medium" : ""}`}>
                    {notification.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                </div>
                {!notification.read && (
                  <Badge variant="default" className="shrink-0">New</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="text-center mt-6">
        <Button variant="outline">Load older notifications</Button>
      </div>
    </div>
  )
}
