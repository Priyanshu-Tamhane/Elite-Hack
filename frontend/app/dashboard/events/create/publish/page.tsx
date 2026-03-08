"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StepProgress } from "@/components/step-progress"
import { CheckCircle, ExternalLink, Copy, Rocket, Lock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useEventCreation } from "@/lib/event-creation-context"
import { api } from "@/lib/api"

const stepsBasic = [
  { label: "Event Details", href: "/dashboard/events/create/details" },
  { label: "Inventory", href: "/dashboard/events/create/inventory" },
  { label: "Payments", href: "/dashboard/events/create/payments" },
  { label: "Publish", href: "/dashboard/events/create/publish" },
]

const stepsCorporate = [
  { label: "Event Details", href: "/dashboard/events/create/details" },
  { label: "Corporate Details", href: "/dashboard/events/create/corporate" },
  { label: "Inventory", href: "/dashboard/events/create/inventory" },
  { label: "Payments", href: "/dashboard/events/create/payments" },
  { label: "Publish", href: "/dashboard/events/create/publish" },
]

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

function generatePassword(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let password = ''
  for (let i = 0; i < 10; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password
}

export default function PublishEventPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { eventData } = useEventCreation()
  const category = eventData?.category || ""
  
  const isCorporateEvent = ['corporate event', 'conference', 'workshop'].includes((category || "").toLowerCase())
  const steps = isCorporateEvent ? stepsCorporate : stepsBasic
  const currentStepIndex = isCorporateEvent ? 4 : 3

  const [isPublished, setIsPublished] = useState(false)
  const [eventSlug, setEventSlug] = useState("")
  const [eventName, setEventName] = useState("")
  const [publicUrl, setPublicUrl] = useState("")
  const [manageUrl, setManageUrl] = useState("")
  const [managementPassword, setManagementPassword] = useState("")
  const [isPublishing, setIsPublishing] = useState(false)

  useEffect(() => {
    const savedData = localStorage.getItem("event_draft_details")
    if (savedData) {
      try {
        const data = JSON.parse(savedData)
        const slug = generateSlug(data.eventName || "my-event")
        setEventSlug(slug)
        setEventName(data.eventName || "My Event")

        const category = (data.category || "").toLowerCase()
        const isCorporate = ["corporate event", "conference", "workshop"].includes(category)

        if (isCorporate) {
          setPublicUrl(`${window.location.origin}/corporate-demo`)
          setManageUrl(`${window.location.origin}/corporate-demo/manage`)
        } else {
          setPublicUrl(`${window.location.origin}/event/${slug}`)
          setManageUrl(`${window.location.origin}/event/${slug}/manage`)
        }
      } catch (error) {
        console.error("Failed to load event data", error)
      }
    }
  }, [])

  const handlePublish = async () => {
    const savedData = localStorage.getItem("event_draft_details")
    const inventoryData = localStorage.getItem("event_draft_inventory")
    
    if (!savedData) return

    setIsPublishing(true)
    try {
      const data = JSON.parse(savedData)
      const inventory = inventoryData ? JSON.parse(inventoryData) : {}

      const slug = generateSlug(data.eventName || "my-event")
      const password = generatePassword()

      const publishedEvent = {
        ...data,
        slug,
        adminPassword: password,
        publishedAt: new Date().toISOString(),
        status: "published",
        inventory: inventory || {}
      }

      const publishedEvents = JSON.parse(localStorage.getItem("published_events") || "[]")
      publishedEvents.push(publishedEvent)
      localStorage.setItem("published_events", JSON.stringify(publishedEvents))

      localStorage.removeItem("event_draft_details")
      localStorage.removeItem("event_draft_inventory")

      try {
        const eventDataForApi: any = {
          title: data.eventName,
          description: data.description,
          date: data.startDate ? new Date(data.startDate) : undefined,
          location: data.venue,
          category: data.category,
          bannerUrl: data.bannerUrl,
          maxParticipants: inventory.maxParticipants || 100,
          status: "published",
          adminPassword: password,
          corporateDetails: {
            companyMission: data.companyMission,
            eventObjectives: data.eventObjectives
              ? (Array.isArray(data.eventObjectives)
                  ? data.eventObjectives
                  : data.eventObjectives.split('\n').filter((s: string) => s.trim()))
              : [],
            targetAudience: data.targetAudience,
            dressCode: data.dressCode,
            parkingInfo: data.parkingInfo,
            contactPerson: data.contactPerson,
            contactEmail: data.contactEmail
          },
          branding: {
            primaryColor: data.primaryColor || "#2563eb",
            secondaryColor: data.secondaryColor || "#64748b",
            logoUrl: data.logoUrl,
            bannerUrl: data.bannerUrl
          }
        }

        const createdEvent = await api.createEvent(eventDataForApi)

        const updatedEvents = JSON.parse(localStorage.getItem("published_events") || "[]")
        const eventIndex = updatedEvents.findIndex((e: any) => e.slug === slug)
        if (eventIndex !== -1) {
          updatedEvents[eventIndex].id = createdEvent._id
          localStorage.setItem("published_events", JSON.stringify(updatedEvents))
        }
      } catch (apiError) {
        console.warn("Backend API failed, event saved locally:", apiError)
      }

      setManagementPassword(password)
      setIsPublished(true)
      toast({
        title: "Event Published!",
        description: "Your event microsite is now live.",
      })
    } catch (error) {
      console.error("Error publishing event:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to publish event. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsPublishing(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: "Link copied to clipboard.",
    })
  }

  if (isPublished) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Event Published Successfully!</h1>
          <p className="text-muted-foreground">Your event microsite is now live and ready to share.</p>
        </div>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <h3 className="font-semibold text-lg">{eventName}</h3>
                <p className="text-sm text-muted-foreground">is now live!</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Management Password
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">Use this password to access the management panel</p>
            <div className="p-3 bg-white rounded-lg font-mono text-lg font-bold text-center">{managementPassword}</div>
            <Button variant="outline" className="w-full" onClick={() => copyToClipboard(managementPassword)}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Password
            </Button>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5" />
                Public Microsite
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-muted rounded-lg break-all text-sm">{publicUrl}</div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => copyToClipboard(publicUrl)}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Link
                </Button>
                <Button asChild className="flex-1">
                  <Link href={`/event/${eventSlug}`} target="_blank">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Site
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-5 w-5" />
                Management Panel
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-muted rounded-lg break-all text-sm">{manageUrl}</div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => copyToClipboard(manageUrl)}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Link
                </Button>
                <Button asChild className="flex-1">
                  <Link href={`/event/${eventSlug}/manage`}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Manage Event
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between border-t pt-6">
          <Button variant="outline" asChild>
            <Link href="/dashboard/events">View All Events</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/events/create/details">Create Another Event</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Publish Your Event</h1>
        <p className="text-muted-foreground">Review and publish your event to generate the microsite.</p>
      </div>

      <StepProgress steps={steps} currentStep={currentStepIndex} />

      <Card>
        <CardHeader>
          <CardTitle>Event Preview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Event Name</p>
            <p className="font-semibold">{eventName}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Microsite URL</p>
            <p className="text-sm font-mono bg-muted p-2 rounded">{publicUrl}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What happens when you publish?</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <span>Your event microsite will be generated instantly</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <span>Participants can register/RSVP through the microsite</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <span>You'll get a management panel to track everything</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <span>You can share the link immediately</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="flex justify-between border-t pt-6">
        <Button variant="ghost" asChild>
          <Link href="/dashboard/events/create/payments">Back to Payments</Link>
        </Button>
        <Button onClick={handlePublish} size="lg" disabled={isPublishing}>
          <Rocket className="mr-2 h-5 w-5" />
          {isPublishing ? "Publishing..." : "Publish Event"}
        </Button>
      </div>
    </div>
  )
}
