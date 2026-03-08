"use client"

import { useEffect, useState, lazy, Suspense } from "react"
import { useParams } from "next/navigation"
import { HackathonMicrosite } from "@/components/microsites/HackathonMicrosite"
import { WeddingMicrosite } from "@/components/microsites/WeddingMicrosite"
import { DefaultMicrosite } from "@/components/microsites/DefaultMicrosite"
import { FestivalMicrosite } from "@/components/microsites/FestivalMicrosite"
import WorkshopMicrosite from "@/components/microsites/WorkshopMicrosite"
import CorporateMicrosite from "@/components/microsites/CorporateMicrosite"
import { api } from "@/lib/api"

// Lazy-load the conference microsite for better performance
const ConferenceMicrosite = lazy(() =>
  import("@/components/microsites/ConferenceMicrosite").then(m => ({ default: m.ConferenceMicrosite }))
)

function LoadingScreen() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#080812", color: "#94a3b8", flexDirection: "column", gap: "1rem" }}>
      <div style={{ width: 40, height: 40, border: "3px solid rgba(99,102,241,0.2)", borderTopColor: "#6366f1", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <p style={{ fontSize: "0.9rem", letterSpacing: "0.05em" }}>Loading event...</p>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}

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

  if (loading) return <LoadingScreen />

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
          <p className="text-muted-foreground">The event you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    )
  }

  const category = event.category?.toLowerCase()
  console.log('Event category:', event.category, '| Normalized:', category)

  if (category === "hackathon") return <HackathonMicrosite event={event} />
  if (category === "wedding") return <WeddingMicrosite event={event} />
  if (category === "festival") return <FestivalMicrosite event={event} />
  if (category === "workshop") return <WorkshopMicrosite event={event} />
  if (category === "corporate event") return <CorporateMicrosite event={event} />
  if (category === "conference") {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <ConferenceMicrosite event={event} />
      </Suspense>
    )
  }

  // Default microsite for: other, etc.
  return <DefaultMicrosite event={event} />
}

