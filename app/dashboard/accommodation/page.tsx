"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Plus,
  Filter,
  Users,
  Hotel,
  AlertCircle,
  Check,
  ChevronDown,
  Sparkles,
} from "lucide-react"

const stats = [
  { label: "Total Capacity", value: "240", change: "+12 from last update", icon: Users },
  { label: "Current Occupancy", value: "186", subtext: "77.5% total fill rate", icon: Hotel },
  { label: "Available Slots", value: "54", subtext: "Across 18 empty rooms", icon: Check },
  { label: "Unassigned Guests", value: "32", subtext: "Requires immediate attention", icon: AlertCircle, alert: true },
]

const rooms = [
  { id: "401", name: "Suite 401", type: "Single Room", slots: 1, occupancy: 1, max: 1, status: "Full" },
  { id: "202", name: "Standard 202", type: "Double Room", slots: 2, occupancy: 1, max: 2, status: "Partially Full" },
  { id: "A", name: "Dorm Block A", type: "Dormitory Room", slots: 8, occupancy: 5, max: 8, status: "Partially Full" },
  { id: "205", name: "Standard 205", type: "Double Room", slots: 2, occupancy: 0, max: 2, status: "Available" },
  { id: "405", name: "Suite 405", type: "Single Room", slots: 1, occupancy: 0, max: 1, status: "Available" },
  { id: "B", name: "Dorm Block B", type: "Dormitory Room", slots: 8, occupancy: 8, max: 8, status: "Full" },
]

const waitlistGuests = [
  { name: "Sarah Chen", role: "Participant", avatar: "/placeholder.svg?height=32&width=32" },
  { name: "James Wilson", role: "Speaker", avatar: "/placeholder.svg?height=32&width=32" },
  { name: "Elena Rodriguez", role: "Participant", avatar: "/placeholder.svg?height=32&width=32" },
  { name: "David Kim", role: "Volunteer", avatar: "/placeholder.svg?height=32&width=32" },
  { name: "Amara Okafor", role: "Participant", avatar: "/placeholder.svg?height=32&width=32" },
]

export default function AccommodationPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Accommodation</h1>
          <p className="text-muted-foreground">
            Manage room inventory and guest allocations for TechSummit 2024.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Room
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className={`text-xs ${stat.alert ? "text-destructive" : "text-muted-foreground"}`}>
                    {stat.subtext || stat.change}
                  </p>
                </div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.alert ? "bg-destructive/10" : "bg-accent"}`}>
                  <stat.icon className={`h-5 w-5 ${stat.alert ? "text-destructive" : "text-accent-foreground"}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Room Grid */}
        <div className="lg:col-span-3 space-y-4">
          {/* Filters */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All Rooms</TabsTrigger>
                <TabsTrigger value="suites">Suites</TabsTrigger>
                <TabsTrigger value="standards">Standards</TabsTrigger>
                <TabsTrigger value="dormitories">Dormitories</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="relative flex-1 max-w-xs ml-auto">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search room numbers..." className="pl-10" />
            </div>
          </div>

          {/* Room Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <Card key={room.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Hotel className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">{room.name}</span>
                    </div>
                    <Badge
                      variant={
                        room.status === "Full"
                          ? "destructive"
                          : room.status === "Available"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {room.status}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {room.type} • {room.slots} Slots
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Occupancy</span>
                      <span>{room.occupancy} / {room.max}</span>
                    </div>
                    <Progress
                      value={(room.occupancy / room.max) * 100}
                      className={`h-2 ${room.occupancy === room.max ? "[&>div]:bg-destructive" : ""}`}
                    />
                  </div>
                  <div className="mt-4 space-y-2">
                    <Button variant="ghost" size="sm" className="w-full justify-between">
                      View Assigned Guests ({room.occupancy})
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                    {room.occupancy < room.max && (
                      <Button variant="outline" size="sm" className="w-full">
                        <Users className="mr-2 h-4 w-4" />
                        Quick Assign
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Unassigned Guests Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Unassigned Guests</CardTitle>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">Awaiting room allocation</p>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search guests..." className="pl-10" />
              </div>
              <div className="mt-4 space-y-3">
                {waitlistGuests.map((guest) => (
                  <div
                    key={guest.name}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={guest.avatar} />
                        <AvatarFallback>
                          {guest.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{guest.name}</p>
                        <p className="text-xs text-muted-foreground">{guest.role}</p>
                      </div>
                    </div>
                    <Badge variant="outline">Waitlist</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-accent/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Auto-assign availability</span>
                <span className="text-sm font-medium">18% Rooms</span>
              </div>
              <Button className="mt-4 w-full">
                <Sparkles className="mr-2 h-4 w-4" />
                Run Auto-Allocator
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
