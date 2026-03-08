"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { api } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import {
  ExternalLink,
  Edit,
  Download,
  Calendar,
  MapPin,
  Users,
  ArrowLeft,
} from "lucide-react"

export default function EventManagementPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [event, setEvent] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadEvent()
  }, [])

  const loadEvent = async () => {
    try {
      const data = await api.getEvent(params.id as string)
      setEvent(data)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  if (!event) return <div className="flex items-center justify-center min-h-screen">Event not found</div>

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Button variant="ghost" onClick={() => router.back()} className="w-fit">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Button>
        
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">{event.eventName}</h1>
              <Badge>{event.status}</Badge>
            </div>
            <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(event.startDate).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {event.venue}
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link href={`/event/${event.slug}`} target="_blank">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Microsite
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/event/${event.slug}/manage`} target="_blank">
                <Edit className="mr-2 h-4 w-4" />
                Manage Event
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Registrations</p>
                <p className="text-3xl font-bold">{event.registeredCount || 0}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                <Users className="h-6 w-6 text-accent-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Max Capacity</p>
                <p className="text-3xl font-bold">{event.maxParticipants || 'Unlimited'}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                <Users className="h-6 w-6 text-accent-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="text-2xl font-bold">{event.category}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Event Details */}
      <Card>
        <CardHeader>
          <CardTitle>Event Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Description</p>
            <p className="mt-1">{event.description}</p>
          </div>
          
          {event.managementPassword && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm font-semibold text-yellow-800">Management Password</p>
              <code className="text-lg font-mono font-bold text-yellow-900">{event.managementPassword}</code>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Registrations */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Registrations</CardTitle>
        </CardHeader>
        <CardContent>
          {event.participants && event.participants.length > 0 ? (
            <div className="space-y-3">
              {event.participants.slice(0, 10).map((participant: any, idx: number) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">{participant.name}</p>
                    <p className="text-sm text-muted-foreground">{participant.email}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(participant.registeredAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">No registrations yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
