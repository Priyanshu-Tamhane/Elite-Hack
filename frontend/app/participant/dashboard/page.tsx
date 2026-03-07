"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  Users,
  Bell,
  MapPin,
  ExternalLink,
  QrCode,
  Download,
  Hotel,
  CreditCard,
  Check,
  ArrowRight,
  Clock,
  MessageSquare,
} from "lucide-react"

const stats = [
  { value: "02", label: "Active Events", icon: Calendar },
  { value: "04", label: "Teams Joined", icon: Users },
  { value: "12", label: "Notifications", icon: Bell },
]

const registeredEvents = [
  {
    id: "1",
    title: "Global Tech Hackathon 2024",
    image: "/placeholder.svg?height=200&width=400",
    date: "Oct 15 - Oct 17, 2024",
    location: "Grand Convention Center, NY",
    team: "ByteBusters",
    status: "upcoming",
  },
  {
    id: "2",
    title: "Sustainable Design Summit",
    image: "/placeholder.svg?height=200&width=400",
    date: "Nov 02, 2024",
    location: "Green Hall, San Francisco",
    team: "Eco-Warriors",
    status: "upcoming",
  },
]

const teamActivity = [
  {
    id: 1,
    team: "ByteBusters (Main)",
    avatar: "/placeholder.svg?height=32&width=32",
    activity: "3 new messages in #general",
  },
  {
    id: 2,
    team: "ByteBusters (Secondary)",
    avatar: "/placeholder.svg?height=32&width=32",
    activity: "3 new messages in #general",
  },
]

const payments = [
  { id: 1, title: "Hackathon Entry", date: "Sept 12, 2024", amount: "$149.00", status: "Success" },
  { id: 2, title: "Accommodation Add-on", date: "Sept 12, 2024", amount: "$75.00", status: "Success" },
]

const announcements = [
  { id: 1, text: "Room allocation for Hackathon confirmed: Room 402", time: "2h ago" },
  { id: 2, text: "Payment successful for Summit registration", time: "5h ago" },
  { id: 3, text: "New announcement in Global Tech Hackathon", time: "1d ago" },
]

export default function ParticipantDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <Badge variant="outline" className="mb-2">Participant Dashboard</Badge>
          <h1 className="text-3xl font-bold">Welcome back, Alex!</h1>
          <p className="text-muted-foreground">
            You have 2 upcoming events this month. Your check-in pass for &apos;Global Tech Hackathon&apos; is ready.
          </p>
        </div>
        <div className="flex gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="w-24">
              <CardContent className="p-4 text-center">
                <stat.icon className="mx-auto h-5 w-5 text-muted-foreground" />
                <p className="mt-2 text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Registered Events */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <h2 className="text-xl font-semibold">My Registered Events</h2>
              </div>
              <Button variant="link" className="text-primary" asChild>
                <Link href="/participant/events">
                  Browse More
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {registeredEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <div className="relative aspect-video">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                    <Badge className="absolute right-3 top-3">
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{event.title}</h3>
                    <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>Team: {event.team}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <Link href={`/microsite/${event.id}`}>
                          <ExternalLink className="mr-1.5 h-4 w-4" />
                          Microsite
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <Link href="/participant/teams">
                          <Users className="mr-1.5 h-4 w-4" />
                          Team
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Team Activity */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Recent Team Activity</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                Stay updated with your hackathon squads and project groups.
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {teamActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 rounded-lg border p-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={activity.avatar} />
                    <AvatarFallback>BB</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{activity.team}</p>
                    <p className="text-sm text-muted-foreground">{activity.activity}</p>
                  </div>
                </div>
              ))}
              <Button variant="link" className="text-primary" asChild>
                <Link href="/participant/teams">Manage all teams</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Check-in */}
          <Card className="bg-primary text-primary-foreground">
            <CardHeader>
              <div className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                <CardTitle className="text-primary-foreground">Quick Check-in</CardTitle>
              </div>
              <p className="text-sm opacity-90">Global Tech Hackathon 2024</p>
            </CardHeader>
            <CardContent>
              <div className="mx-auto aspect-square w-32 rounded-lg bg-white p-2">
                <div className="h-full w-full rounded bg-muted" />
              </div>
              <div className="mt-4 text-center">
                <p className="text-xs opacity-80">ENTRY PASS ID</p>
                <p className="text-lg font-bold">EV-SPH-2024-9881</p>
              </div>
              <Button variant="secondary" className="mt-4 w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Pass
              </Button>
            </CardContent>
          </Card>

          {/* Stay Details */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Hotel className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Stay Details</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border p-3">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Hyatt Regency Suite</p>
                    <p className="text-sm text-muted-foreground">Room 402, North Wing</p>
                    <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      Check-in: Oct 14, 2:00 PM
                    </div>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="mt-3 w-full">
                View Booking Details
              </Button>
            </CardContent>
          </Card>

          {/* Recent Payments */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Recent Payments</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {payments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{payment.title}</p>
                    <p className="text-xs text-muted-foreground">{payment.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{payment.amount}</p>
                    <div className="flex items-center gap-1 text-xs text-emerald-500">
                      <Check className="h-3 w-3" />
                      {payment.status}
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="link" className="w-full text-primary" asChild>
                <Link href="/participant/payments">
                  Full Transaction History
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Announcements */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Announcements</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="border-l-2 border-primary pl-3">
                  <p className="text-sm">{announcement.text}</p>
                  <p className="text-xs text-muted-foreground">{announcement.time}</p>
                </div>
              ))}
              <Button variant="outline" className="w-full" asChild>
                <Link href="/participant/notifications">Notifications Center</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
