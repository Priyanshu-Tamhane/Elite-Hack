"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { StepProgress } from "@/components/step-progress"
import {
  ArrowLeft,
  Rocket,
  Globe,
  Calendar,
  MapPin,
  Clock,
  Users,
  Check,
  Share2,
  ExternalLink,
  Copy,
} from "lucide-react"

const steps = [
  { label: "Details", href: "/dashboard/events/create/details" },
  { label: "Inventory", href: "/dashboard/events/create/inventory" },
  { label: "Payment", href: "/dashboard/events/create/payments" },
  { label: "Publish", href: "/dashboard/events/create/publish" },
]

export default function CreateEventPublishPage() {
  const router = useRouter()
  const [customUrl, setCustomUrl] = useState("nexus-hackathon-2024")
  const [publicDiscovery, setPublicDiscovery] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)

  const handlePublish = () => {
    // Simulate publishing
    router.push("/dashboard/events/1")
  }

  const handleBack = () => {
    router.push("/dashboard/events/create/payments")
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 text-primary">
          <Rocket className="h-6 w-6" />
          <h1 className="text-3xl font-bold">Ready to Launch?</h1>
        </div>
        <p className="mt-2 text-muted-foreground">
          Review your microsite one last time. Once published, participants can start registering immediately.
        </p>
      </div>

      {/* Progress */}
      <StepProgress steps={steps} currentStep={3} />

      {/* Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Preview */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">LIVE PREVIEW MODE</span>
            </div>
          </div>
          <Card className="overflow-hidden">
            <div className="rounded-t-lg border-b bg-muted/50 p-2">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="flex-1 rounded-full bg-background px-3 py-1 text-xs text-muted-foreground">
                  eventsphere.io/e/{customUrl}
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=800"
                alt="Event Preview"
                width={800}
                height={400}
                className="w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <Badge className="mb-3 bg-primary">HACKATHON</Badge>
                <h2 className="text-2xl font-bold">Nexus Global Hackathon 2024</h2>
                <p className="mt-2 max-w-lg text-sm opacity-90">
                  Join 500+ builders for a 48-hour sprint to redefine the future of decentralized computing and AI integration.
                </p>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex items-center gap-3 rounded-lg border p-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">DATE</p>
                    <p className="font-medium">Oct 12-14, 2024</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border p-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">VENUE</p>
                    <p className="font-medium">Innovation Hub, SF</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border p-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">DEADLINE</p>
                    <p className="font-medium">Oct 01, 2024</p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold">About the Event</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Nexus Global Hackathon is the flagship event for EventSphere, bringing together developers, designers, and innovators. Participants will have access to exclusive workshops, mentorship from industry leaders, and a total prize pool of $50,000.
                </p>
              </div>
              <div className="mt-4 flex gap-4">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">REMAINING SLOTS</p>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="h-2 flex-1 rounded-full bg-muted">
                      <div className="h-full w-[83%] rounded-full bg-primary" />
                    </div>
                    <span className="text-sm font-medium">42/250 Left</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">TEAM FORMATION</p>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge variant="secondary">Enabled</Badge>
                    <span className="text-xs text-muted-foreground">Up to 4 members per team</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Previews */}
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Share2 className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Automatic Social Previews</p>
                  <p className="text-sm text-muted-foreground">
                    We&apos;ve generated high-quality OG images for Twitter and LinkedIn.
                  </p>
                </div>
              </div>
              <Button variant="outline">Manage Assets</Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Final Checklist */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <CardTitle>Final Checklist</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                Configure your live event endpoint.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Custom Event URL</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">eventsphere.io/e/</span>
                  <Input
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="ghost" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Short URLs increase click-through rates by 34%.
                </p>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="font-medium">Public Discovery</p>
                  <p className="text-xs text-muted-foreground">List on EventSphere Explore</p>
                </div>
                <Switch
                  checked={publicDiscovery}
                  onCheckedChange={setPublicDiscovery}
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-xs text-muted-foreground">Alert waitlisted users</p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
            </CardContent>
          </Card>

          {/* Pre-Launch Check */}
          <Card className="bg-emerald-50 border-emerald-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                  <Users className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-emerald-800">Pre-Launch Check</p>
                  <p className="text-sm text-emerald-700">
                    Your inventory is locked. Payments are set to &quot;Instant Transfer&quot; via Razorpay. Registration limit: 250.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Button className="w-full" size="lg" onClick={handlePublish}>
            <Rocket className="mr-2 h-4 w-4" />
            Publish Microsite
          </Button>
          <Button variant="outline" className="w-full" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Payments
          </Button>

          {/* Help */}
          <Card className="bg-muted/50">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground">
                Need help?{" "}
                <Link href="/support" className="text-primary hover:underline">
                  Talk to our launch specialists
                </Link>{" "}
                to optimize your event&apos;s reach.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
