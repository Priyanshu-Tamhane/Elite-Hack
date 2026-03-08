"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { api } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
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

export default function EventsPage() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    try {
      const data = await api.getEvents()
      setEvents(data)
    } catch (error: any) {
      console.error('Failed to load events:', error)
      if (error.message.includes('token') || error.message.includes('auth')) {
        toast({
          title: "Not Logged In",
          description: "Please log in to view your events.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await api.deleteEvent(id)
      toast({ title: "Success", description: "Event deleted" })
      loadEvents()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({ title: "Copied!", description: "Link copied to clipboard" })
  }

  if (loading) return <div>Loading...</div>
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
        {events.length === 0 ? (
          <p className="col-span-2 text-center text-muted-foreground">No events found. Create your first event!</p>
        ) : (
          events.map((event: any) => (
          <Card key={event._id} className="overflow-hidden">
            <div className="relative aspect-video">
              {(event.bannerImage || event.bannerUrl) ? (
                <img
                  src={event.bannerImage || event.bannerUrl}
                  alt={event.eventName}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <Calendar className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
              <Badge
                className="absolute right-3 top-3"
                variant={
                  event.status === "published"
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
                    href={`/dashboard/events/${event._id}`}
                    className="font-semibold hover:text-primary hover:underline"
                  >
                    {event.eventName}
                  </Link>
                  <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(event.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span className="line-clamp-1">{event.venue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>
                        {event.registeredCount || 0} / {event.maxParticipants || 'Unlimited'} registrations
                      </span>
                    </div>
                    {(event.managementPassword || event.adminPassword) && (
                      <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-yellow-800">Management Password:</span>
                          <button
                            onClick={() => copyToClipboard(event.managementPassword || event.adminPassword)}
                            className="text-xs text-yellow-600 hover:text-yellow-800 underline"
                          >
                            Copy
                          </button>
                        </div>
                        <code className="text-sm font-mono font-bold text-yellow-900">
                          {event.managementPassword || event.adminPassword}
                        </code>
                      </div>
                    )}
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
                      <Link href={`/event/${event.slug}`} target="_blank">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Microsite
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/event/${event.slug}/manage`} target="_blank">
                        <Edit className="mr-2 h-4 w-4" />
                        Manage Event
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => copyToClipboard(`${window.location.origin}/event/${event.slug}`)}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Link
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(event._id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-4 flex items-center justify-between border-t pt-4">
                <span className="text-sm text-muted-foreground">
                  Category: <span className="font-medium text-foreground">{event.category}</span>
                </span>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/event/${event.slug}/manage`} target="_blank">
                    Manage
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          ))
        )}
      </div>
    </div>
  )
}
