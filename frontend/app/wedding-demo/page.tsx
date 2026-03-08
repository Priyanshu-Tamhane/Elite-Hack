"use client"

import { WeddingMicrosite } from "@/components/microsites/WeddingMicrosite"

export default function WeddingDemoPage() {
  // Sample wedding event data
  const sampleEvent = {
    eventName: "Sarah & Michael's Wedding",
    description: "Join us in celebrating the beginning of our beautiful journey together. We can't wait to share this special day with our family and friends!",
    startDate: "June 15, 2024",
    startTime: "4:00 PM",
    venue: "Rose Garden Estate, Napa Valley",
    slug: "sarah-michael-wedding",
    maxParticipants: 150,
    registeredCount: 89,
    category: "wedding",
    bannerUrl: "",
    couple: {
      bride: "Sarah Johnson",
      groom: "Michael Chen"
    },
    weddingDetails: {
      ceremony: "4:00 PM - Rose Garden Pavilion",
      reception: "6:00 PM - Grand Ballroom",
      dressCode: "Cocktail Attire",
      parking: "Valet parking available"
    }
  }

  return <WeddingMicrosite event={sampleEvent} />
}