"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { HackathonMicrosite } from "@/components/microsites/HackathonMicrosite"
import { WeddingMicrosite } from "@/components/microsites/WeddingMicrosite"
import { DefaultMicrosite } from "@/components/microsites/DefaultMicrosite"
import { api } from "@/lib/api"
import CorporateMicrosite from "@/components/microsites/CorporateMicrosite"

export default function EventMicrositePage() {
  const params = useParams()
  const slug = params.slug as string
  const [event, setEvent] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const data = await api.getEventBySlug(slug)
        setEvent(data)
      } catch (error) {
        console.error("Failed to load event", error)
      } finally {
        setLoading(false)
      }
    }
    loadEvent()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading event...</p>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
          <p className="text-muted-foreground">The event you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const handleRegister = () => {
    // Handle registration logic
    console.log("Registering for event:", event.eventName)
  }

  // Render appropriate microsite based on category
  if (event.category && (event.category.toLowerCase() === "corporate event" || event.category.toLowerCase() === "conference" || event.category.toLowerCase() === "workshop")) {
    // Prepare event object with proper structure for CorporateMicrosite
    const eventData = {
      title: event.eventName || "Event",
      description: event.description || "",
      date: event.startDate,
      location: event.venue || "",
      bannerUrl: event.bannerUrl,
      category: event.category,
      maxParticipants: event.maxParticipants || 100,
      registeredCount: event.registeredCount || 0,
      organizer: {
        name: event.organizerName || "Event Organizer",
        company: event.companyName,
        logo: event.companyLogo
      },
      corporateDetails: event.corporateDetails || {},
      branding: event.branding || {
        primaryColor: "#2563eb",
        secondaryColor: "#64748b"
      }
    }
    return <CorporateMicrosite event={eventData} onRegister={handleRegister} />
  }

  if (event.category === "hackathon") {
    return <HackathonMicrosite event={event} />
  }

  if (event.category === "wedding") {
    return <WeddingMicrosite event={event} />
  }

  return <DefaultMicrosite event={event} />
}
