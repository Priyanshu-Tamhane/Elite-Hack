"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { api } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import {
  Search,
  Users,
  Hotel,
  AlertCircle,
  Check,
  Calendar,
  MapPin,
} from "lucide-react"
import Link from "next/link"

export default function AccommodationPage() {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    try {
      const data = await api.getEvents()
      // Filter events that have accommodation data
      const eventsWithAccommodation = data.filter((event: any) => 
        event.accommodation || event.inventory?.twinRooms || event.inventory?.suites || event.inventory?.bunkBeds
      )
      setEvents(eventsWithAccommodation)
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

  const calculateStats = () => {
    let totalCapacity = 0
    let totalOccupied = 0
    let eventsWithAccommodation = 0

    events.forEach(event => {
      const twinRooms = event.accommodation?.twin_rooms || event.inventory?.twinRooms || 0
      const suites = event.accommodation?.suites || event.inventory?.suites || 0
      const bunkBeds = event.accommodation?.bunk_beds || event.inventory?.bunkBeds || 0
      
      const capacity = (twinRooms * 2) + suites + bunkBeds
      totalCapacity += capacity
      
      // Count participants who need accommodation
      const participantsNeedingAccommodation = event.participants?.filter((p: any) => 
        p.needsAccommodation || p.accommodation
      ).length || 0
      
      totalOccupied += participantsNeedingAccommodation
      
      if (capacity > 0) eventsWithAccommodation++
    })

    return {
      totalCapacity,
      totalOccupied,
      available: totalCapacity - totalOccupied,
      eventsWithAccommodation,
      occupancyRate: totalCapacity > 0 ? Math.round((totalOccupied / totalCapacity) * 100) : 0
    }
  }

  const stats = calculateStats()

  const filteredEvents = events.filter(event => 
    event.eventName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Accommodation Management</h1>
          <p className="text-muted-foreground">
            Manage room inventory and guest allocations across all events.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Capacity</p>
                <p className="text-3xl font-bold">{stats.totalCapacity}</p>
                <p className="text-xs text-muted-foreground">Across all events</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                <Hotel className="h-5 w-5 text-accent-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Occupancy</p>
                <p className="text-3xl font-bold">{stats.totalOccupied}</p>
                <p className="text-xs text-muted-foreground">{stats.occupancyRate}% fill rate</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                <Users className="h-5 w-5 text-accent-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available Slots</p>
                <p className="text-3xl font-bold">{stats.available}</p>
                <p className="text-xs text-muted-foreground">Ready for booking</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                <Check className="h-5 w-5 text-accent-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Events</p>
                <p className="text-3xl font-bold">{stats.eventsWithAccommodation}</p>
                <p className="text-xs text-muted-foreground">With accommodation</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                <AlertCircle className="h-5 w-5 text-accent-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input 
          placeholder="Search events..." 
          className="pl-10" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {filteredEvents.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Hotel className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Events with Accommodation</h3>
              <p className="text-muted-foreground">Events with accommodation setup will appear here.</p>
            </CardContent>
          </Card>
        ) : (
          filteredEvents.map((event) => {
            const twinRooms = event.accommodation?.twin_rooms || event.inventory?.twinRooms || 0
            const suites = event.accommodation?.suites || event.inventory?.suites || 0
            const bunkBeds = event.accommodation?.bunk_beds || event.inventory?.bunkBeds || 0
            const totalCapacity = (twinRooms * 2) + suites + bunkBeds
            
            const participantsNeedingAccommodation = event.participants?.filter((p: any) => 
              p.needsAccommodation || p.accommodation
            ) || []
            
            const occupancyRate = totalCapacity > 0 
              ? Math.round((participantsNeedingAccommodation.length / totalCapacity) * 100) 
              : 0

            return (
              <Card key={event._id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-xl">{event.eventName}</CardTitle>
                        <Badge>{event.category}</Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
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
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/event/${event.slug}/manage`} target="_blank">
                        Manage Event
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Room Inventory */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-sm">Room Inventory</h4>
                      <div className="space-y-3">
                        {twinRooms > 0 && (
                          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <div>
                              <p className="font-medium">Twin Rooms</p>
                              <p className="text-xs text-muted-foreground">2 guests per room</p>
                            </div>
                            <Badge variant="outline">{twinRooms} rooms</Badge>
                          </div>
                        )}
                        {suites > 0 && (
                          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <div>
                              <p className="font-medium">Suites</p>
                              <p className="text-xs text-muted-foreground">Single occupancy</p>
                            </div>
                            <Badge variant="outline">{suites} rooms</Badge>
                          </div>
                        )}
                        {bunkBeds > 0 && (
                          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <div>
                              <p className="font-medium">Bunk Beds</p>
                              <p className="text-xs text-muted-foreground">Hostel style</p>
                            </div>
                            <Badge variant="outline">{bunkBeds} beds</Badge>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Occupancy Stats */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-sm">Occupancy Status</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span>Total Capacity</span>
                            <span className="font-medium">{totalCapacity} guests</span>
                          </div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span>Booked</span>
                            <span className="font-medium">{participantsNeedingAccommodation.length} guests</span>
                          </div>
                          <Progress value={occupancyRate} className="h-2" />
                          <p className="text-xs text-muted-foreground mt-1">{occupancyRate}% occupied</p>
                        </div>
                        
                        {participantsNeedingAccommodation.length > 0 && (
                          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm font-medium text-blue-900">
                              {participantsNeedingAccommodation.length} participants need accommodation
                            </p>
                            <Button variant="link" size="sm" className="h-auto p-0 text-blue-600" asChild>
                              <Link href={`/event/${event.slug}/manage/accommodation`}>
                                View Details →
                              </Link>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
