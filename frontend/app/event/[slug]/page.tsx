"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { HackathonMicrosite } from "@/components/microsites/HackathonMicrosite"
import { WeddingMicrosite } from "@/components/microsites/WeddingMicrosite"
import { DefaultMicrosite } from "@/components/microsites/DefaultMicrosite"

export default function EventMicrositePage() {
  const params = useParams()
  const slug = params.slug as string
  const [event, setEvent] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load event from localStorage
    const publishedEvents = JSON.parse(localStorage.getItem("published_events") || "[]")
    const foundEvent = publishedEvents.find((e: any) => e.slug === slug)
    
    if (foundEvent) {
      setEvent(foundEvent)
    }
    setLoading(false)
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

  // Render appropriate microsite based on category
  if (event.category === "hackathon") {
    return <HackathonMicrosite event={event} />
  }

  if (event.category === "wedding") {
    return <WeddingMicrosite event={event} />
  }

  // Default microsite for other categories
  return <DefaultMicrosite event={event} />
}
