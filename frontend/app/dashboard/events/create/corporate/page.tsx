"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StepProgress } from "@/components/step-progress"
import { useToast } from "@/hooks/use-toast"
import { useEventCreation } from "@/lib/event-creation-context"
import { ArrowLeft, ArrowRight, Building, Target, Users2, Briefcase } from "lucide-react"

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

const STORAGE_KEY = "event_draft_details"

export default function CreateCorporateDetailsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { eventData, updateEventData } = useEventCreation()
  const [isLoaded, setIsLoaded] = useState(false)
  
  const [companyMission, setCompanyMission] = useState("")
  const [eventObjectives, setEventObjectives] = useState("")
  const [targetAudience, setTargetAudience] = useState("")
  const [dressCode, setDressCode] = useState("")
  const [parkingInfo, setParkingInfo] = useState("")
  const [contactPerson, setContactPerson] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [primaryColor, setPrimaryColor] = useState("#2563eb")
  const [secondaryColor, setSecondaryColor] = useState("#64748b")
  const [logoUrl, setLogoUrl] = useState("")

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      try {
        const data = JSON.parse(savedData)
        setCompanyMission(data.companyMission || "")
        setEventObjectives(data.eventObjectives || "")
        setTargetAudience(data.targetAudience || "")
        setDressCode(data.dressCode || "")
        setParkingInfo(data.parkingInfo || "")
        setContactPerson(data.contactPerson || "")
        setContactEmail(data.contactEmail || "")
        setPrimaryColor(data.primaryColor || "#2563eb")
        setSecondaryColor(data.secondaryColor || "#64748b")
        setLogoUrl(data.logoUrl || "")
      } catch (error) {
        console.error("Failed to load saved data", error)
      }
    }
    setIsLoaded(true)
  }, [])

  // Auto-save data whenever form changes (only after initial load)
  useEffect(() => {
    if (!isLoaded) return
    
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      try {
        const data = JSON.parse(savedData)
        const formData = {
          ...data,
          companyMission,
          eventObjectives,
          targetAudience,
          dressCode,
          parkingInfo,
          contactPerson,
          contactEmail,
          primaryColor,
          secondaryColor,
          logoUrl,
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
      } catch (error) {
        console.error("Failed to save data", error)
      }
    }
  }, [isLoaded, companyMission, eventObjectives, targetAudience, dressCode, parkingInfo, contactPerson, contactEmail, primaryColor, secondaryColor, logoUrl])

  const handleSaveDraft = () => {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      try {
        const data = JSON.parse(savedData)
        const formData = {
          ...data,
          companyMission,
          eventObjectives,
          targetAudience,
          dressCode,
          parkingInfo,
          contactPerson,
          contactEmail,
          primaryColor,
          secondaryColor,
          logoUrl,
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
        toast({
          title: "Draft Saved",
          description: "Your corporate event details have been saved.",
        })
      } catch (error) {
        console.error("Failed to save draft", error)
      }
    }
  }

  const handlePrevious = () => {
    handleSaveDraft()
    router.push("/dashboard/events/create/details")
  }

  const handleNext = () => {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      try {
        const data = JSON.parse(savedData)
        const formData = {
          ...data,
          companyMission,
          eventObjectives,
          targetAudience,
          dressCode,
          parkingInfo,
          contactPerson,
          contactEmail,
          primaryColor,
          secondaryColor,
          logoUrl,
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
        updateEventData(formData)
        router.push("/dashboard/events/create/inventory")
      } catch (error) {
        console.error("Failed to proceed", error)
      }
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Corporate Event Details</h1>
        <p className="text-muted-foreground">
          Add professional details specific to your corporate event.
        </p>
      </div>

      {/* Progress */}
      <StepProgress steps={stepsCorporate} currentStep={1} />

      {/* Form */}
      <div className="space-y-6">
        {/* Company Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-blue-600" />
              <CardTitle>Company Information</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">
              Tell attendees about your organization.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company-mission">Company Mission</Label>
              <Textarea
                id="company-mission"
                placeholder="Brief description of your company's mission and values..."
                value={companyMission}
                onChange={(e) => setCompanyMission(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Event Objectives */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              <CardTitle>Event Objectives</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">
              What do you want attendees to achieve or learn?
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="event-objectives">Key Objectives</Label>
              <Textarea
                id="event-objectives"
                placeholder="List key objectives (one per line)&#10;Example:&#10;- Network with industry leaders&#10;- Learn about latest technologies&#10;- Build strategic partnerships"
                value={eventObjectives}
                onChange={(e) => setEventObjectives(e.target.value)}
                className="min-h-[120px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Audience & Logistics */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users2 className="h-5 w-5 text-blue-600" />
              <CardTitle>Audience & Logistics</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">
              Event-specific information for attendees.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="target-audience">Target Audience</Label>
                <Input
                  id="target-audience"
                  placeholder="e.g. Senior Management, IT Professionals"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dress-code">Dress Code</Label>
                <Input
                  id="dress-code"
                  placeholder="e.g. Business Formal, Business Casual"
                  value={dressCode}
                  onChange={(e) => setDressCode(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="parking-info">Parking Information</Label>
              <Textarea
                id="parking-info"
                placeholder="Provide parking details, validation codes, lot locations, etc."
                value={parkingInfo}
                onChange={(e) => setParkingInfo(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-600" />
              <CardTitle>Contact Information</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">
              How can attendees reach out with questions?
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contact-person">Contact Person</Label>
                <Input
                  id="contact-person"
                  placeholder="Event coordinator name"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="event@company.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Corporate Branding */}
        <Card className="border-2 border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="text-purple-900">Corporate Branding</CardTitle>
            <p className="text-sm text-purple-700">
              Customize your microsite colors and add your company logo.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="primary-color" className="text-purple-900">
                  Primary Color
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="primary-color"
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-12 h-10 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    placeholder="#2563eb"
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-purple-600">Used for buttons and headers</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="secondary-color" className="text-purple-900">
                  Secondary Color
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="secondary-color"
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="w-12 h-10 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    placeholder="#64748b"
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-purple-600">Used for accents and borders</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo-url" className="text-purple-900">
                Company Logo URL
              </Label>
              <Input
                id="logo-url"
                type="url"
                placeholder="https://example.com/logo.png"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
              />
              <p className="text-xs text-purple-600">
                Upload your logo to <a href="https://postimages.org/" target="_blank" rel="noopener noreferrer" className="text-purple-700 hover:underline font-semibold">postimages.org</a> and paste the URL
              </p>
              {logoUrl && (
                <div className="mt-3 p-2 bg-white rounded border">
                  <img
                    src={logoUrl}
                    alt="Logo preview"
                    className="h-12 w-auto"
                    onError={(e) => {
                      e.currentTarget.style.display = "none"
                    }}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between border-t pt-6">
        <Button variant="ghost" onClick={handlePrevious}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleSaveDraft}>
            Save Draft
          </Button>
          <Button onClick={handleNext}>
            Next: Inventory Setup
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
