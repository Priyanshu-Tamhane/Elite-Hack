"use client"

import CorporateMicrosite from "@/components/microsites/CorporateMicrosite"

export default function CorporateDemoPage() {
  // Enhanced sample corporate event data with more comprehensive information
  const sampleEvent = {
    title: "TechCorp Global Innovation Summit 2024",
    description: "Join 500+ industry leaders, innovators, and visionaries at the premier technology conference of the year. Experience world-class keynotes, interactive workshops, and unparalleled networking opportunities that will shape the future of digital transformation.",
    date: "2024-12-15",
    location: "Moscone Center, San Francisco, CA",
    bannerUrl: "",
    category: "Corporate Event",
    maxParticipants: 500,
    registeredCount: 347,
    organizer: {
      name: "Jennifer Martinez",
      company: "TechCorp Inc.",
      logo: "https://via.placeholder.com/200x80/1e40af/white?text=TechCorp"
    },
    corporateDetails: {
      companyMission: "To empower businesses worldwide with cutting-edge technology solutions that drive innovation, accelerate digital transformation, and create sustainable competitive advantages in the global marketplace.",
      eventObjectives: [
        "Connect C-level executives with emerging technology leaders and innovators",
        "Showcase breakthrough technologies and their real-world business applications",
        "Facilitate strategic partnerships and collaboration opportunities",
        "Provide deep insights into emerging trends shaping the industry landscape",
        "Demonstrate practical solutions for digital transformation challenges",
        "Create a platform for thought leadership and industry discourse"
      ],
      targetAudience: "C-level executives, CTOs, CIOs, technology directors, startup founders, venture capitalists, industry analysts, and innovation leaders from Fortune 500 companies and emerging tech enterprises",
      dressCode: "Business professional attire is required. Suits, business formal wear, or executive business casual. Name badges with photo ID will be provided at registration. No jeans, sneakers, or casual wear permitted.",
      parkingInfo: "Complimentary valet parking available at all main entrances. Self-parking available in the underground garage with validation at registration. Public transportation accessible via BART Powell Street station and multiple Muni lines.",
      contactPerson: "Dr. Sarah Chen",
      contactEmail: "summit@techcorp.com"
    },
    branding: {
      primaryColor: "#1e40af",
      secondaryColor: "#3b82f6",
      logoUrl: "https://via.placeholder.com/200x80/1e40af/white?text=TechCorp"
    }
  }

  const handleRegister = () => {
    alert("🎉 Demo Registration!\n\nThank you for your interest in TechCorp Global Innovation Summit 2024!\n\nIn a real implementation, this would redirect to the registration form with payment processing.")
  }

  return <CorporateMicrosite event={sampleEvent} onRegister={handleRegister} />
}