"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Plus,
  Search,
  Calendar,
  MapPin,
  Users,
  MoreVertical,
  ExternalLink,
  Edit,
  Copy,
  Trash2,
} from "lucide-react"

const events = [
  {
    id: "1",
    title: "Global Tech Innovators Summit 2024",
    image: "/placeholder.svg?height=200&width=400",
    date: "Oct 24, 2024",
    location: "San Francisco Convention Center",
    registrations: 1248,
    capacity: 1500,
    status: "active",
    revenue: "$45,290",
  },
  {
    id: "2",
    title: "Developer Hackathon 2024",
    image: "/placeholder.svg?height=200&width=400",
    date: "Nov 15-17, 2024",
    location: "Innovation Hub, SF",
    registrations: 342,
    capacity: 500,
    status: "active",
    revenue: "$12,800",
  },
  {
    id: "3",
    title: "AI & Machine Learning Conference",
    image: "/placeholder.svg?height=200&width=400",
    date: "Dec 5, 2024",
    location: "Tech Center, NY",
    registrations: 0,
    capacity: 800,
    status: "draft",
    revenue: "$0",
  },
  {
    id: "4",
    title: "Startup Pitch Night",
    image: "/placeholder.svg?height=200&width=400",
    date: "Sep 20, 2024",
    location: "Venture Hall, LA",
    registrations: 450,
    capacity: 450,
    status: "completed",
    revenue: "$8,500",
  },
]

export default function EventsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Events</h1>
          <p className="text-muted-foreground">
            Manage and monitor all your events in one place.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/events/create/details">
            <Plus className="mr-2 h-4 w-4" />
            Create Event
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search events..." className="pl-10" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="newest">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="registrations">Most Registrations</SelectItem>
            <SelectItem value="revenue">Highest Revenue</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Events Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <div className="relative aspect-video">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
              />
              <Badge
                className="absolute right-3 top-3"
                variant={
                  event.status === "active"
                    ? "default"
                    : event.status === "draft"
                    ? "secondary"
                    : "outline"
                }
              >
                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
              </Badge>
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Link
                    href={`/dashboard/events/${event.id}`}
                    className="font-semibold hover:text-primary hover:underline"
                  >
                    {event.title}
                  </Link>
                  <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>
                        {event.registrations} / {event.capacity} registrations
                      </span>
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/events/${event.id}`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Event
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/microsite/${event.id}`} target="_blank">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Microsite
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="mr-2 h-4 w-4" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-4 flex items-center justify-between border-t pt-4">
                <span className="text-sm text-muted-foreground">
                  Revenue: <span className="font-medium text-foreground">{event.revenue}</span>
                </span>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/events/${event.id}`}>
                    Manage
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
