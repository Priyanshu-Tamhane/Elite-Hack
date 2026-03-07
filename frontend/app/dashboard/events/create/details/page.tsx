"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { StepProgress } from "@/components/step-progress"
import { useToast } from "@/hooks/use-toast"
import { useEventCreation } from "@/lib/event-creation-context"
import {
  Type,
  Tag,
  Calendar,
  Clock,
  MapPin,
  Upload,
  ArrowRight,
  Bold,
  Italic,
  List,
  ListOrdered,
} from "lucide-react"

const steps = [
  { label: "Event Details", href: "/dashboard/events/create/details" },
  { label: "Inventory", href: "/dashboard/events/create/inventory" },
  { label: "Payments", href: "/dashboard/events/create/payments" },
  { label: "Publish", href: "/dashboard/events/create/publish" },
]

const categories = [
  "Hackathon",
  "Conference",
  "Workshop",
  "Wedding",
  "Corporate Event",
  "Festival",
  "Other",
]

const STORAGE_KEY = "event_draft_details"

export default function CreateEventDetailsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { eventData, updateEventData } = useEventCreation()
  const [isLoaded, setIsLoaded] = useState(false)
  const [eventName, setEventName] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [venue, setVenue] = useState("")
  const [bannerImage, setBannerImage] = useState<string | null>(null)

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      try {
        const data = JSON.parse(savedData)
        setEventName(data.eventName || "")
        setCategory(data.category || "")
        setDescription(data.description || "")
        setStartDate(data.startDate || "")
        setEndDate(data.endDate || "")
        setStartTime(data.startTime || "")
        setVenue(data.venue || "")
        setBannerImage(data.bannerImage || null)
      } catch (error) {
        console.error("Failed to load saved data", error)
      }
    }
    setIsLoaded(true)
  }, [])

  // Auto-save data whenever form changes (only after initial load)
  useEffect(() => {
    if (!isLoaded) return
    
    const formData = {
      eventName,
      category,
      description,
      startDate,
      endDate,
      startTime,
      venue,
      bannerImage,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
  }, [isLoaded, eventName, category, description, startDate, endDate, startTime, venue, bannerImage])

  const handleSaveDraft = () => {
    const formData = {
      eventName,
      category,
      description,
      startDate,
      endDate,
      startTime,
      venue,
      bannerImage,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
    toast({
      title: "Draft Saved",
      description: "Your event details have been saved successfully.",
    })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 5MB.",
          variant: "destructive",
        })
        return
      }
      
      const reader = new FileReader()
      reader.onloadend = () => {
        setBannerImage(reader.result as string)
        toast({
          title: "Image uploaded",
          description: "Banner image has been uploaded successfully.",
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleNext = () => {
    const formData = {
      eventName,
      category,
      description,
      startDate,
      endDate,
      startTime,
      venue,
      bannerImage,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
    updateEventData({ eventName, category, description, startDate, endDate, startTime, venue, bannerImage })
    router.push("/dashboard/events/create/inventory")
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Create New Event</h1>
        <p className="text-muted-foreground">
          Launch your next big event in minutes. Let&apos;s start with the basic details.
        </p>
      </div>

      {/* Progress */}
      <StepProgress steps={steps} currentStep={0} />

      {/* Form */}
      <div className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-primary" />
              <CardTitle>Basic Information</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">
              Give your event a clear identity.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  Event Name
                </Label>
                <Input
                  id="name"
                  placeholder="e.g. Global Tech Hackathon 2024"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Category
                </Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat.toLowerCase()}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="description" className="flex items-center gap-2">
                  <List className="h-4 w-4" />
                  Event Description
                </Label>
                <span className="text-xs text-muted-foreground">RICH EDITOR</span>
              </div>
              <div className="rounded-lg border">
                <div className="flex items-center gap-1 border-b p-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Italic className="h-4 w-4" />
                  </Button>
                  <div className="mx-1 h-4 w-px bg-border" />
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <List className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ListOrdered className="h-4 w-4" />
                  </Button>
                </div>
                <Textarea
                  id="description"
                  placeholder="Write a compelling story for your attendees..."
                  className="min-h-[120px] border-0 focus-visible:ring-0"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timing & Location */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-primary" />
              <CardTitle>Timing & Location</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">
              When and where will the magic happen?
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="start-date" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Start Date
                </Label>
                <Input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  End Date
                </Label>
                <Input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="start-time" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Start Time
                </Label>
                <Input
                  id="start-time"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="venue" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Venue / Location Name
              </Label>
              <Input
                id="venue"
                placeholder="Search for a venue or enter physical address"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Tip: Use a clear name like &quot;Marriott Grand Ballroom&quot; or &quot;San Francisco Convention Center&quot;
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Visual Identity */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-primary" />
              <CardTitle>Visual Identity</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">
              Upload visuals that make your event stand out.
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Event Banner Image
              </Label>
              {bannerImage ? (
                <div className="relative">
                  <img
                    src={bannerImage}
                    alt="Event banner"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => setBannerImage(null)}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8">
                  <Upload className="h-10 w-10 text-muted-foreground" />
                  <p className="mt-4 text-sm font-medium">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground">
                    Recommended size: 1200 x 600px (JPG, PNG, max 5MB)
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="banner-upload"
                  />
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => document.getElementById('banner-upload')?.click()}
                    type="button"
                  >
                    Browse Files
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between border-t pt-6">
        <Button variant="ghost" asChild>
          <Link href="/dashboard/events">Cancel and Return</Link>
        </Button>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleSaveDraft}>Save Draft</Button>
          <Button onClick={handleNext}>
            Next: Inventory Setup
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
