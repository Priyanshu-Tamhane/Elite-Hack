"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Calendar, MapPin, Clock, Users, ChevronRight, ExternalLink, 
  CheckCircle, Globe, Target, Award, Mail, Phone, ArrowRight
} from "lucide-react"

const schedule = [
  { time: "09:00 AM", type: "Keynote", title: "Opening Keynote: The AI Decade", speaker: "Dr. Robert Vance", avatar: "/placeholder.svg?height=32&width=32" },
  { time: "10:30 AM", type: "Panel", title: "Scaling Startups in 2024", speaker: "Elena Rodriguez", avatar: "/placeholder.svg?height=32&width=32" },
  { time: "12:00 PM", type: "Social", title: "Networking Lunch & Expo", speaker: null, avatar: null },
  { time: "02:00 PM", type: "Workshop", title: "Blockchain Beyond Crypto", speaker: "James Wu", avatar: "/placeholder.svg?height=32&width=32" },
  { time: "04:00 PM", type: "Keynote", title: "Closing Remarks & Wrap Up", speaker: null, avatar: null },
]

const hotels = [
  {
    name: "Grand Hyatt Regency",
    image: "/placeholder.svg?height=150&width=250",
    distance: "0.2 miles from Venue",
    walkTime: "5 min walk",
    roomType: "Standard Room",
    price: "$249 / night",
    recommended: true,
  },
  {
    name: "The Marriott Executive",
    image: "/placeholder.svg?height=150&width=250",
    distance: "0.8 miles from Venue",
    shuttle: "Shuttle Available",
    roomType: "Deluxe Suite",
    price: "$199 / night",
    recommended: false,
  },
]

const highlights = [
  "/placeholder.svg?height=200&width=300",
  "/placeholder.svg?height=200&width=300",
  "/placeholder.svg?height=200&width=300",
  "/placeholder.svg?height=200&width=300",
]

export default function EventMicrositePage() {
  const [email, setEmail] = useState("")
  const [selectedDay, setSelectedDay] = useState("day1")

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Globe className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl text-primary">EventSphere</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Features</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Solutions</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Pricing</Link>
            </nav>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">Log in</Link>
              <Button asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary h-[500px]" />
        <div 
          className="absolute inset-0 h-[500px] opacity-30"
          style={{
            backgroundImage: "url('/placeholder.svg?height=500&width=1200')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative container mx-auto px-4 pt-16 pb-32">
          <div className="max-w-2xl">
            <Badge variant="secondary" className="mb-4 bg-background/20 text-primary-foreground border-0">
              Tech Conference
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Global Tech Summit 2024
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Join 5,000+ innovators, developers, and visionaries for three days of breakthrough insights and networking.
            </p>
            
            {/* Countdown */}
            <div className="flex gap-4 mb-8">
              {[
                { value: "12", label: "Days" },
                { value: "08", label: "Hours" },
                { value: "45", label: "Minutes" },
                { value: "19", label: "Seconds" },
              ].map((item, index) => (
                <div key={index} className="bg-background/20 backdrop-blur rounded-lg px-4 py-3 text-center min-w-16">
                  <div className="text-2xl font-bold text-primary-foreground">{item.value}</div>
                  <div className="text-xs text-primary-foreground/70">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/events/global-tech-summit/register">
                  Register Now
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Create Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Users, label: "AVAILABLE SLOTS", value: "412 / 1200" },
            { icon: Clock, label: "EARLY BIRD ENDS", value: "4 Days Left" },
            { icon: Award, label: "FEATURED SPEAKERS", value: "24 Industry Leaders" },
            { icon: Target, label: "WORKSHOP TRACKS", value: "12 Deep Dives" },
          ].map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 rounded-full bg-accent">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                  <p className="font-semibold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* About Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Redefining the Future of Technology</h2>
            <p className="text-muted-foreground mb-4">
              The Global Tech Summit is more than just a conference; it's a launchpad for the next generation of digital solutions. Over three immersive days, we bring together the brightest minds in AI, Blockchain, and Sustainable Tech.
            </p>
            <p className="text-muted-foreground mb-6">
              Experience hands-on workshops, keynote sessions from Silicon Valley legends, and networking mixers designed to foster genuine collaboration. Whether you're a solo developer or part of a growing startup, EventSphere ensures your journey is seamless.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                "Certificates for All",
                "24/7 Hacker Support",
                "VIP Networking",
                "Job Fair Access",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img 
              src="/placeholder.svg?height=400&width=500" 
              alt="Event" 
              className="rounded-lg w-full"
            />
            <div className="absolute bottom-4 right-4 bg-background rounded-lg p-3 shadow-lg flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">Sarah Chen</p>
                <p className="text-xs text-muted-foreground">Day 2 Workshop</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Badge variant="outline" className="mb-2">Schedule</Badge>
              <h2 className="text-3xl font-bold">Main Stage Itinerary</h2>
            </div>
            <div className="flex gap-2">
              {["Day 1: Nov 12", "Day 2: Nov 13", "Day 3: Nov 14"].map((day, index) => (
                <Button
                  key={index}
                  variant={index === 0 ? "default" : "outline"}
                  size="sm"
                >
                  {day}
                </Button>
              ))}
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              {schedule.map((item, index) => (
                <div key={index} className="flex items-center gap-6 p-4 border-b last:border-0">
                  <div className="text-sm text-muted-foreground w-20">{item.time}</div>
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${
                      item.type === "Keynote" ? "bg-primary" : 
                      item.type === "Panel" ? "bg-blue-500" :
                      item.type === "Workshop" ? "bg-green-500" : "bg-orange-500"
                    }`} />
                    <Badge variant="outline" className="text-xs">{item.type}</Badge>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.title}</p>
                    {item.speaker && (
                      <div className="flex items-center gap-2 mt-1">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={item.avatar || ""} />
                          <AvatarFallback className="text-[10px]">{item.speaker[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">{item.speaker}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Logistics Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Logistics & Stay</h2>
          <p className="text-muted-foreground">We've partnered with local hotels to provide discounted rates for attendees.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {hotels.map((hotel, index) => (
            <Card key={index}>
              <img src={hotel.image} alt={hotel.name} className="w-full h-36 object-cover" />
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold">{hotel.name}</h3>
                  {hotel.recommended && <Badge className="bg-primary">Recommended</Badge>}
                </div>
                <p className="text-sm text-muted-foreground mb-1">{hotel.distance} {hotel.walkTime ? `• ${hotel.walkTime}` : ""}</p>
                {hotel.shuttle && <p className="text-sm text-muted-foreground mb-2">{hotel.shuttle}</p>}
                <div className="flex items-center justify-between pt-2 border-t mt-2">
                  <span className="text-sm text-muted-foreground">{hotel.roomType}</span>
                  <span className="font-bold">{hotel.price}</span>
                </div>
                <Button variant="outline" className="w-full mt-3">
                  {hotel.recommended ? "Book with Event Discount" : "Check Availability"}
                </Button>
              </CardContent>
            </Card>
          ))}
          
          {/* Venue Map Card */}
          <Card className="bg-accent">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Venue Map</h3>
              <p className="text-sm text-muted-foreground mb-4">
                The summit is held at the Moscone Center West, Hall D.
              </p>
              <div className="h-32 bg-muted rounded-lg flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-muted-foreground" />
              </div>
              <Button variant="outline" className="w-full">
                <ExternalLink className="h-4 w-4 mr-2" />
                Open in Maps
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Highlights Gallery */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Past Event Highlights</h2>
            <p className="text-muted-foreground">Peek into the energy and community of EventSphere microsites.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {highlights.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Highlight ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Need Assistance?</h2>
            <p className="text-muted-foreground mb-6">Our event support team is available 24/7 to help you.</p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span>support@eventsphere.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span>+1 (888) EVENT-HQ</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <span>www.techsummit.io</span>
              </div>
            </div>
          </div>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Quick RSVP</h3>
              <p className="text-sm text-muted-foreground mb-4">Enter your email to receive registration details.</p>
              <div className="flex gap-2">
                <Input
                  placeholder="Your work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                />
                <Button>RSVP</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">By RSVPing, you agree to our privacy policy.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <Globe className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-lg">EventSphere</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The all-in-one ecosystem for smart event management. Scalable from intimate weddings to global tech conferences.
              </p>
            </div>
            {[
              { title: "PRODUCT", links: ["Features", "Pricing", "Event Types", "SaaS Solutions"] },
              { title: "RESOURCES", links: ["Documentation", "API Reference", "Guides", "Support"] },
              { title: "COMPANY", links: ["About Us", "Careers", "Blog", "Contact"] },
            ].map((column, index) => (
              <div key={index}>
                <h4 className="font-semibold text-sm mb-4">{column.title}</h4>
                <ul className="space-y-2">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>2024 EventSphere Inc. Empowering organizers worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
