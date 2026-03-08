"use client"

import { HackathonMicrosite } from "@/components/microsites/HackathonMicrosite"

export default function HackathonDemoPage() {
  // Sample hackathon event data
  const sampleEvent = {
    eventName: "CodeFest 2024",
    description: "48-hour coding marathon where developers, designers, and innovators build amazing projects. Compete for prizes, network with industry experts, and showcase your skills!",
    startDate: "March 15-17, 2024",
    venue: "Silicon Valley Tech Hub",
    slug: "codefest-2024",
    maxParticipants: 200,
    registeredCount: 156,
    category: "hackathon",
    bannerUrl: "",
    prizes: [
      { place: "1st", amount: "$10,000", description: "Grand Prize" },
      { place: "2nd", amount: "$5,000", description: "Runner Up" },
      { place: "3rd", amount: "$2,500", description: "Third Place" }
    ],
    sponsors: ["Google", "Microsoft", "Amazon", "Meta"]
  }

  return <HackathonMicrosite event={sampleEvent} />
}