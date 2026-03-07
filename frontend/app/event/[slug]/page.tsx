"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { HackathonMicrosite } from "@/components/microsites/HackathonMicrosite"
import { WeddingMicrosite } from "@/components/microsites/WeddingMicrosite"
import { DefaultMicrosite } from "@/components/microsites/DefaultMicrosite"
import { api } from "@/lib/api"

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

  if (event.category === "hackathon") {
    return <HackathonMicrosite event={event} />
  }

  if (event.category === "wedding") {
    return <WeddingMicrosite event={event} />
  }

  return <DefaultMicrosite event={event} />
}
