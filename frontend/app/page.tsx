"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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

const SparkleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="white" />
    <path d="M19 16L19.75 18.25L22 19L19.75 19.75L19 22L18.25 19.75L16 19L18.25 18.25L19 16Z" fill="white" opacity="0.7" />
  </svg>
)

const SparkleIconPurple = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="#7C3AED" />
    <path d="M19 16L19.75 18.25L22 19L19.75 19.75L19 22L18.25 19.75L16 19L18.25 18.25L19 16Z" fill="#7C3AED" opacity="0.7" />
  </svg>
)

const CheckCircleIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#D1FAE5" />
    <path d="M7 12.5L10.5 16L17 9" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", backgroundColor: "#F8F9FA", minHeight: "100vh" }}>
      {/* Navbar */}
      <nav style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 48px",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #F0F0F0",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            width: "40px",
            height: "40px",
            backgroundColor: "#7C3AED",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              style={{ width: "24px", height: "24px", color: "white" }}
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span style={{ fontWeight: "700", fontSize: "20px", color: "#111827", letterSpacing: "-0.3px" }}>
            EventSphere
          </span>
        </div>

        {/* Nav Links */}
        <div style={{ display: "flex", gap: "36px", alignItems: "center" }}>
          <button
            onClick={() => scrollToSection('features')}
            style={{
              background: "none",
              border: "none",
              textDecoration: "none",
              color: "#374151",
              fontSize: "15px",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            Explore Events
          </button>
          <Link
            href="/signup"
            style={{
              textDecoration: "none",
              color: "#374151",
              fontSize: "15px",
              fontWeight: "500",
            }}
          >
            Create Event
          </Link>
          <button
            onClick={() => scrollToSection('how-it-works')}
            style={{
              background: "none",
              border: "none",
              textDecoration: "none",
              color: "#374151",
              fontSize: "15px",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            How it Works
          </button>
        </div>

        {/* Auth Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Link href="/login" style={{ textDecoration: "none", color: "#111827", fontSize: "15px", fontWeight: "600" }}>
            Login
          </Link>
          <Link href="/signup">
            <button style={{
              backgroundColor: "#7C3AED",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "10px 20px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
            }}>
              Get Started
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "64px 48px 48px 48px",
        maxWidth: "1280px",
        margin: "0 auto",
        gap: "40px",
      }}>
        {/* Left Content */}
        <div style={{ flex: "1", maxWidth: "560px" }}>
          {/* Badge */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "#EDE9FE",
            color: "#5B21B6",
            borderRadius: "20px",
            padding: "6px 14px",
            fontSize: "13px",
            fontWeight: "500",
            marginBottom: "28px",
          }}>
            <SparkleIconPurple />
            Smart Event Ecosystem Platform
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: "56px",
            fontWeight: "800",
            lineHeight: "1.1",
            color: "#111827",
            margin: "0 0 24px 0",
            letterSpacing: "-1px",
          }}>
            Transform Events<br />
            into{" "}
            <span style={{ color: "#7C3AED" }}>Digital</span>
            <br />
            <span style={{ color: "#7C3AED" }}>Ecosystems</span>
          </h1>

          {/* Subtext */}
          <p style={{
            fontSize: "17px",
            color: "#6B7280",
            lineHeight: "1.7",
            marginBottom: "36px",
            maxWidth: "480px",
          }}>
            Manage conferences, hackathons, weddings, and workshops with structured inventory management. Every event gets its own microsite automatically.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <Link href="/signup">
              <button style={{
                backgroundColor: "#7C3AED",
                color: "white",
                border: "none",
                borderRadius: "10px",
                padding: "14px 28px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}>
                Create Your Event
                <span style={{ fontSize: "18px" }}>→</span>
              </button>
            </Link>
            <button
              onClick={() => scrollToSection('features')}
              style={{
                backgroundColor: "white",
                color: "#111827",
                border: "1.5px solid #E5E7EB",
                borderRadius: "10px",
                padding: "14px 28px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
              }}>
              Explore Events
            </button>
          </div>
        </div>

        {/* Right: Hero Image */}
        <div style={{ flex: "1", position: "relative", maxWidth: "580px" }}>
          {/* Main image container */}
          <div style={{
            borderRadius: "20px",
            overflow: "hidden",
            width: "100%",
            height: "360px",
            position: "relative",
          }}>
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&q=80"
              alt="Team working together"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          {/* Floating badge */}
          <div style={{
            position: "absolute",
            bottom: "-20px",
            left: "-20px",
            backgroundColor: "white",
            borderRadius: "14px",
            padding: "14px 18px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
            minWidth: "200px",
          }}>
            <CheckCircleIcon />
            <div>
              <div style={{ fontWeight: "700", fontSize: "15px", color: "#111827" }}>Auto Microsite</div>
              <div style={{ fontSize: "13px", color: "#9CA3AF" }}>Generated instantly</div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px" }}>
        <hr style={{ border: "none", borderTop: "1px solid #E5E7EB" }} />
      </div>

      {/* Stats */}
      <section style={{
        display: "flex",
        gap: "64px",
        padding: "36px 48px",
        maxWidth: "1280px",
        margin: "0 auto",
      }}>
        {[
          { value: "10K+", label: "Events Created" },
          { value: "500K+", label: "Participants" },
          { value: "98%", label: "Satisfaction" },
        ].map((stat) => (
          <div key={stat.label}>
            <div style={{ fontSize: "30px", fontWeight: "800", color: "#111827" }}>{stat.value}</div>
            <div style={{ fontSize: "14px", color: "#6B7280", marginTop: "2px" }}>{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
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
      <section id="how-it-works" className="py-20">
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
