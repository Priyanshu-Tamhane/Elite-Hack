"use client"

import { DefaultMicrosite } from "@/components/microsites/DefaultMicrosite"

export default function DefaultDemoPage() {
  // Sample default event data
  const sampleEvent = {
    eventName: "Community Meetup",
    description: "A casual gathering for local developers, designers, and tech enthusiasts. Share ideas, network, and learn from each other in a relaxed environment.",
    startDate: "April 20, 2024",
    endDate: "April 20, 2024",
    startTime: "6:00 PM",
    venue: "Tech Hub Downtown",
    slug: "community-meetup",
    maxParticipants: 75,
    registeredCount: 42,
    category: "meetup",
    bannerUrl: "https://via.placeholder.com/1200x400/6366f1/white?text=Community+Meetup"
  }

  return <DefaultMicrosite event={sampleEvent} />
}