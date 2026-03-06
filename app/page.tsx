import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Globe,
  Shield,
  Users,
  BarChart3,
  Clock,
  Hotel,
  ArrowRight,
  CheckCircle2,
} from "lucide-react"

const features = [
  {
    icon: Globe,
    title: "Instant Microsites",
    description: "Automatically generate professional, SEO-optimized landing pages for every event. No coding required.",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Native Razorpay and Stripe integrations with automated invoicing and refund management.",
  },
  {
    icon: Users,
    title: "Team Management",
    description: "Allow participants to form teams, invite members, and collaborate within your event ecosystem.",
  },
  {
    icon: Hotel,
    title: "Inventory Tracking",
    description: "Granular control over ticket slots, workshop seats, and room allocations with real-time updates.",
  },
  {
    icon: Clock,
    title: "Dynamic Timelines",
    description: "Keep everyone synchronized with auto-updating schedules and instant push notifications.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Deep dive into registration trends, revenue forecasts, and participant demographics.",
  },
]

const eventCategories = [
  {
    title: "Hackathons",
    image: "/placeholder.svg?height=200&width=300",
    description: "The ultimate platform for managing complex hackathon logistics.",
  },
  {
    title: "Conferences",
    image: "/placeholder.svg?height=200&width=300",
    description: "The premium platform for managing large-scale conference events.",
  },
  {
    title: "Weddings",
    image: "/placeholder.svg?height=200&width=300",
    description: "The ultimate platform for managing elegant wedding celebrations.",
  },
  {
    title: "Workshops",
    image: "/placeholder.svg?height=200&width=300",
    description: "The ultimate platform for managing interactive workshop sessions.",
  },
]

const steps = [
  { step: 1, title: "Create Event", description: "Define your name, venue, and brand style in minutes." },
  { step: 2, title: "Setup Logistics", description: "Configure ticket types, rooms, and team rules." },
  { step: 3, title: "Go Live", description: "Launch your microsite and start accepting registrations." },
  { step: 4, title: "Manage & Grow", description: "Use the dashboard to track every detail and attendee." },
]

const stats = [
  { value: "5M+", label: "TICKETS SOLD" },
  { value: "12k+", label: "ORGANIZERS" },
  { value: "150+", label: "COUNTRIES" },
  { value: "99.9%", label: "UPTIME" },
]

const trustedCompanies = ["TECHCORP", "GLOBALFEST", "UNICON", "WEDCO", "ACADEMIA"]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-accent/50 to-background pb-20 pt-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              Version 2.0 is now live for global events
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Turn Events into Smart{" "}
              <span className="text-primary">Digital Ecosystems</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              From intimate hackathons to global conferences, manage registrations, payments, and accommodation in one unified space.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Create Event
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/events">Explore Events</Link>
              </Button>
            </div>
          </div>
          <div className="relative mx-auto mt-16 max-w-4xl">
            <div className="overflow-hidden rounded-xl border bg-background shadow-2xl">
              <Image
                src="/placeholder.svg?height=500&width=900"
                alt="EventSphere Dashboard Preview"
                width={900}
                height={500}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold">Everything you need to scale</h2>
            <p className="mt-4 text-muted-foreground">
              One platform for organizers, microsites for participants, and flawless logistics for everyone.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="border-0 bg-muted/50">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                    <feature.icon className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <h3 className="mt-4 font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Event Categories */}
      <section className="border-t bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <Badge variant="secondary">Versatility</Badge>
              <h2 className="mt-2 text-3xl font-bold">Built for every occasion</h2>
            </div>
            <Button variant="link" className="text-primary" asChild>
              <Link href="/categories">
                View all categories
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {eventCategories.map((category) => (
              <Card key={category.title} className="overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold">{category.title}</h3>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="mt-4 text-muted-foreground">
              Get your event up and running in four simple steps.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  {item.step}
                </div>
                <h3 className="mt-4 font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold">{stat.value}</p>
                <p className="mt-1 text-sm opacity-80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm font-medium text-muted-foreground">
            TRUSTED BY INDUSTRY LEADERS
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {trustedCompanies.map((company) => (
              <span key={company} className="text-lg font-semibold text-muted-foreground/70">
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary/10 via-accent to-primary/10 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold">
              Ready to turn your event into an ecosystem?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Join thousands of organizers who trust EventSphere to simplify their logistics and delight their participants.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/signup">Get Started for Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Talk to Sales</Link>
              </Button>
            </div>
            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                No credit card required
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                14-day free trial
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Dedicated support
              </span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
