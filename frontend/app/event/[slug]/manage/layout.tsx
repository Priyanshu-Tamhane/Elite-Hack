"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { ManagementSidebar } from "@/components/management/ManagementSidebar"
import { EventAssistant } from "@/components/ai/EventAssistant"

export default function EventManageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const params = useParams()
  const slug = params.slug as string
  const [category, setCategory] = useState<string>("")
  const [eventData, setEventData] = useState<any>(null)

  useEffect(() => {
    const loadCategory = async () => {
      try {
        const event = await api.getEventBySlug(slug)
        setCategory(event.category || "")
        setEventData(event)
        console.log('Event loaded for AI Assistant:', event.eventName)
      } catch (error) {
        console.error('Failed to load event:', error)
        setCategory("")
        // Still set a minimal eventData so chatbot appears
        setEventData({ slug, eventName: 'Event', category: 'event' })
      }
    }
    loadCategory()
  }, [slug])

  return (
    <div className="min-h-screen bg-muted/30">
      <ManagementSidebar slug={slug} category={category} />
      <div className="ml-56">
        <main className="p-6">
          {children}
        </main>
        <footer className="border-t bg-background px-6 py-4">
          <div className="flex flex-col items-center justify-between gap-2 text-sm text-muted-foreground sm:flex-row">
            <p>© 2024 EventSphere. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="/privacy" className="hover:text-foreground">Privacy Policy</a>
              <a href="/terms" className="hover:text-foreground">Terms of Service</a>
            </div>
          </div>
        </footer>
      </div>
      {eventData && <EventAssistant eventData={eventData} />}
    </div>
  )
}
