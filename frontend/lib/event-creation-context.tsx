"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

interface TicketType {
  type: string
  price?: number
  currency: string
  paperSubmission: boolean
  benefits: string[]
  color?: string
}

interface AgendaSession {
  title: string
  speaker?: string
  startTime?: string
  endTime?: string
  room?: string
}

interface AgendaDay {
  day: number
  label: string
  date?: string
  sessions: AgendaSession[]
}

interface Resource {
  label: string
  url: string
  fileType?: string
}

interface EventCreationData {
  // Base
  category?: string
  eventName?: string
  description?: string
  startDate?: string
  endDate?: string
  startTime?: string
  venue?: string
  bannerUrl?: string
  // Conference info
  conferenceInfo?: {
    tagline?: string
    eventMode?: string
    logo?: string
  }
  // Registration settings (conference)
  registrationSettings?: {
    registrationType?: string
    deadline?: string
    tickets?: TicketType[]
  }
  // Agenda (conference)
  agenda?: AgendaDay[]
  // Resources (conference)
  resources?: Resource[]
  // Inventory (all types)
  inventory?: {
    totalCapacity?: number
    maxTeamSize?: number
    minTeamSize?: number
    waitlistCapacity?: number
    workshopCapacity?: { mainStage?: number; breakout?: number; mentorship?: number }
    accommodationSlots?: { twinRooms?: number; suites?: number; bunkBeds?: number }
  }
  // Payments
  paymentSettings?: {
    eventType?: string
    paymentGateway?: string
    keyId?: string
    keySecret?: string
    currency?: string
    taxPercent?: number
    enableWebhooks?: boolean
  }
}

interface EventCreationContextType {
  eventData: EventCreationData
  updateEventData: (data: Partial<EventCreationData>) => void
  resetEventData: () => void
}

const EventCreationContext = createContext<EventCreationContextType | undefined>(undefined)

export function EventCreationProvider({ children }: { children: ReactNode }) {
  const [eventData, setEventData] = useState<EventCreationData>({})

  const updateEventData = (data: Partial<EventCreationData>) => {
    setEventData(prev => ({ ...prev, ...data }))
  }

  const resetEventData = () => setEventData({})

  return (
    <EventCreationContext.Provider value={{ eventData, updateEventData, resetEventData }}>
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
