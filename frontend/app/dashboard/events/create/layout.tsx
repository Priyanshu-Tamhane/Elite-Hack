"use client"

import { EventCreationProvider } from '@/lib/event-creation-context'

export default function CreateEventLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <EventCreationProvider>
      <div className="mx-auto max-w-4xl">
        {children}
      </div>
    </EventCreationProvider>
  )
}
