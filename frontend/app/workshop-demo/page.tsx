"use client"

import WorkshopMicrosite from "@/components/microsites/WorkshopMicrosite"

export default function WorkshopDemoPage() {
  const sampleEvent = {
    title: "Hands-on React Workshop",
    description: "A practical workshop to build real-world React components and patterns.",
    startDate: "2026-04-10",
    startTime: "10:00 AM",
    location: "Tech Hub, San Francisco",
    bannerUrl: "",
    category: "Workshop",
    maxParticipants: 120,
    registeredCount: 32,
    slug: "workshop-demo",
    sessions: [
      { title: "Intro to React", instructor: "Alex Johnson", time: "10:00 AM" },
      { title: "State Management", instructor: "Priya Singh", time: "11:30 AM" },
      { title: "Testing & Tools", instructor: "Marta Lopez", time: "2:00 PM" },
    ],
    materials: "Laptop\nNode.js installed\nCode editor of your choice",
  }

  const handleRegister = () => {
    alert("Demo registration — in a real app this would go to the registration flow")
  }

  return <WorkshopMicrosite event={sampleEvent} onRegister={handleRegister} />
}
