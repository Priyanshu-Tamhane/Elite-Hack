"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

interface EventCreationData {
  category?: string
  eventName?: string
  description?: string
  startDate?: string
  endDate?: string
  startTime?: string
  venue?: string
}

interface EventCreationContextType {
  eventData: EventCreationData
  updateEventData: (data: Partial<EventCreationData>) => void
}

const EventCreationContext = createContext<EventCreationContextType | undefined>(undefined)

export function EventCreationProvider({ children }: { children: ReactNode }) {
  const [eventData, setEventData] = useState<EventCreationData>({})

  const updateEventData = (data: Partial<EventCreationData>) => {
    setEventData(prev => ({ ...prev, ...data }))
  }

  return (
    <EventCreationContext.Provider value={{ eventData, updateEventData }}>
      {children}
    </EventCreationContext.Provider>
  )
}

export function useEventCreation() {
  const context = useContext(EventCreationContext)
  if (context === undefined) {
    throw new Error('useEventCreation must be used within an EventCreationProvider')
  }
  return context
}
