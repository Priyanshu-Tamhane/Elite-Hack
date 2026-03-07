"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Users, Search, Filter, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

const events = [
  {
    id: "hackathon-2024",
    title: "Global Tech Hackathon 2024",
    category: "Hackathon",
    image: "/placeholder.svg?height=200&width=400",
    date: "Oct 15 - Oct 17, 2024",
    location: "Grand Convention Center, NY",
    slots: "412 / 1200",
    deadline: "4 Days Left",
    price: "$49",
    featured: true,
  },
  {
    id: "design-summit",
    title: "Sustainable Design Summit",
    category: "Conference",
    image: "/placeholder.svg?height=200&width=400",
    date: "Nov 02, 2024",
    location: "Green Hall, San Francisco",
    slots: "850 / 1000",
    deadline: "2 Weeks Left",
    price: "$99",
    featured: false,
  },
  {
    id: "ai-convergence",
    title: "AI Convergence 2024",
    category: "Conference",
    image: "/placeholder.svg?height=200&width=400",
    date: "Nov 20 - Nov 22, 2024",
    location: "Tech Center, Seattle",
    slots: "520 / 800",
    deadline: "1 Month Left",
    price: "$149",
    featured: true,
  },
  {
    id: "blockchain-workshop",
    title: "Blockchain Beyond Crypto",
    category: "Workshop",
    image: "/placeholder.svg?height=200&width=400",
    date: "Dec 05, 2024",
    location: "Innovation Hub, Austin",
    slots: "80 / 100",
    deadline: "3 Weeks Left",
    price: "$79",
    featured: false,
  },
  {
    id: "startup-weekend",
    title: "Startup Weekend NYC",
    category: "Hackathon",
    image: "/placeholder.svg?height=200&width=400",
    date: "Dec 15 - Dec 17, 2024",
    location: "WeWork Times Square, NY",
    slots: "150 / 200",
    deadline: "1 Month Left",
    price: "Free",
    featured: false,
  },
  {
    id: "ux-masterclass",
    title: "UX Research Masterclass",
    category: "Workshop",
    image: "/placeholder.svg?height=200&width=400",
    date: "Jan 10, 2025",
    location: "Design Studio, LA",
    slots: "45 / 50",
    deadline: "2 Months Left",
    price: "$199",
    featured: true,
  },
]

export default function ExploreEventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || event.category.toLowerCase() === categoryFilter.toLowerCase()
    return matchesSearch && matchesCategory
  })

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Explore Events</h1>
        <p className="text-muted-foreground mt-1">
          Discover upcoming hackathons, conferences, and workshops
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events by name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="hackathon">Hackathons</SelectItem>
            <SelectItem value="conference">Conferences</SelectItem>
            <SelectItem value="workshop">Workshops</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-40 object-cover"
              />
              <div className="absolute top-3 left-3">
                <Badge variant="secondary" className="bg-background/90">
                  {event.category}
                </Badge>
              </div>
              {event.featured && (
                <div className="absolute top-3 right-3">
                  <Badge className="bg-primary">Featured</Badge>
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-3 line-clamp-1">{event.title}</h3>
              <div className="space-y-2 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span className="line-clamp-1">{event.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{event.slots} slots</span>
                  </div>
                  <div className="flex items-center gap-1 text-primary">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">{event.deadline}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t">
                <span className="font-bold text-lg">{event.price}</span>
                <Button size="sm" asChild>
                  <Link href={`/events/${event.id}`}>
                    View Details
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No events found matching your criteria.</p>
          <Button variant="link" onClick={() => { setSearchQuery(""); setCategoryFilter("all") }}>
            Clear filters
          </Button>
        </div>
      )}
    </div>
  )
}
