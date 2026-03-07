"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { StepProgress } from "@/components/step-progress"
import { useEventCreation } from "@/lib/event-creation-context"
import {
  ArrowRight,
  ArrowLeft,
  Grid3X3,
  CreditCard,
  Shield,
  Info,
  Copy,
  Percent,
} from "lucide-react"

const stepsBasic = [
  { label: "EVENT DETAILS", href: "/dashboard/events/create/details" },
  { label: "INVENTORY", href: "/dashboard/events/create/inventory" },
  { label: "PAYMENTS", href: "/dashboard/events/create/payments" },
  { label: "REVIEW", href: "/dashboard/events/create/publish" },
]

const stepsCorporate = [
  { label: "EVENT DETAILS", href: "/dashboard/events/create/details" },
  { label: "CORPORATE DETAILS", href: "/dashboard/events/create/corporate" },
  { label: "INVENTORY", href: "/dashboard/events/create/inventory" },
  { label: "PAYMENTS", href: "/dashboard/events/create/payments" },
  { label: "REVIEW", href: "/dashboard/events/create/publish" },
]

export default function CreateEventPaymentsPage() {
  const router = useRouter()
  const { eventData } = useEventCreation()
  const category = eventData.category || ""
  
  // Determine if corporate event
  const isCorporateEvent = ['corporate event', 'conference', 'workshop'].includes(category.toLowerCase())
  const steps = isCorporateEvent ? stepsCorporate : stepsBasic
  const currentStepIndex = isCorporateEvent ? 3 : 2
  
  const [eventType, setEventType] = useState<"free" | "paid">("paid")
  const [paymentGateway, setPaymentGateway] = useState("razorpay")
  const [keyId, setKeyId] = useState("rzp_live_...")
  const [keySecret, setKeySecret] = useState("")
  const [enableWebhooks, setEnableWebhooks] = useState(false)
  const [currency, setCurrency] = useState("usd")
  const [taxPercent, setTaxPercent] = useState("0")

  const handleNext = () => {
    router.push("/dashboard/events/create/publish")
  }

  const handleBack = () => {
    router.push("/dashboard/events/create/inventory")
  }

  const copyWebhookUrl = () => {
    navigator.clipboard.writeText("https://api.eventsphere.io/webhooks/payment/razorpay")
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Setup Event Payments</h1>
        <p className="text-muted-foreground">
          Configure how you&apos;ll receive payments and handle ticket pricing.
        </p>
      </div>

      {/* Progress */}
      <StepProgress steps={steps} currentStep={currentStepIndex} />

      {/* Form */}
      <div className="space-y-6">
        {/* Event Type Selection */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full border text-sm">
                1
              </div>
              <CardTitle>Select Event Type</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div
                className={`relative cursor-pointer rounded-lg border-2 p-4 transition-colors ${
                  eventType === "free"
                    ? "border-primary bg-accent"
                    : "border-border hover:border-muted-foreground"
                }`}
                onClick={() => setEventType("free")}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <Grid3X3 className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-semibold">Free Event</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  No tickets will be sold. Ideal for community meetups, workshops, or internal company events.
                </p>
              </div>
              <div
                className={`relative cursor-pointer rounded-lg border-2 p-4 transition-colors ${
                  eventType === "paid"
                    ? "border-primary bg-accent"
                    : "border-border hover:border-muted-foreground"
                }`}
                onClick={() => setEventType("paid")}
              >
                {eventType === "paid" && (
                  <Badge className="absolute right-3 top-3">Active</Badge>
                )}
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <CreditCard className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-semibold">Paid Event</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Charge participants for tickets. Supports multiple currencies, taxes, and instant payouts.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Gateway Integration */}
        {eventType === "paid" && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full border text-sm">
                  2
                </div>
                <CardTitle>Payment Gateway Integration</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs value={paymentGateway} onValueChange={setPaymentGateway}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="razorpay">Razorpay</TabsTrigger>
                  <TabsTrigger value="stripe" className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded bg-[#635bff]" />
                    Stripe
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="key-id">KEY ID</Label>
                    <Input
                      id="key-id"
                      value={keyId}
                      onChange={(e) => setKeyId(e.target.value)}
                      placeholder="rzp_live_..."
                    />
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Info className="h-3 w-3" />
                      Found in your Razorpay Dashboard {'>'} Settings
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="key-secret">KEY SECRET</Label>
                    <Input
                      id="key-secret"
                      type="password"
                      value={keySecret}
                      onChange={(e) => setKeySecret(e.target.value)}
                      placeholder="••••••••••••••••"
                    />
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="webhooks"
                      checked={enableWebhooks}
                      onCheckedChange={(checked) => setEnableWebhooks(checked as boolean)}
                    />
                    <div className="space-y-1">
                      <Label htmlFor="webhooks" className="font-medium">
                        Enable Webhooks for Real-time Updates
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Automatically confirm registrations when payment succeeds.
                      </p>
                    </div>
                  </div>
                  {enableWebhooks && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 rounded-lg border bg-muted p-3">
                        <code className="flex-1 text-xs">
                          https://api.eventsphere.io/webhooks/payment/razorpay
                        </code>
                        <Button variant="outline" size="sm" onClick={copyWebhookUrl}>
                          Copy
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Copy this URL to your gateway&apos;s webhook settings.
                      </p>
                    </div>
                  )}
                </div>
                <div className="rounded-lg border bg-muted/50 p-4">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold">Secure Integration</h4>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    We use industry-standard encryption to store your keys. Your secret key is never exposed to the public microsite.
                  </p>
                  <div className="mt-4 flex gap-2">
                    <Badge variant="outline">PCI DSS COMPLIANT</Badge>
                    <Badge variant="outline">AES-256 ENCRYPTED</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Currency & Tax Rules */}
        {eventType === "paid" && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full border text-sm">
                  3
                </div>
                <CardTitle>Currency & Tax Rules</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>BASE CURRENCY</Label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">$ USD</SelectItem>
                      <SelectItem value="eur">€ EUR</SelectItem>
                      <SelectItem value="gbp">£ GBP</SelectItem>
                      <SelectItem value="inr">₹ INR</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Primary currency for all ticket sales.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>APPLICABLE TAX (%)</Label>
                  <div className="relative">
                    <Input
                      type="number"
                      value={taxPercent}
                      onChange={(e) => setTaxPercent(e.target.value)}
                      className="pr-10"
                    />
                    <Percent className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Enter percentage (e.g., 18 for GST, 10 for VAT).
                  </p>
                </div>
              </div>
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-amber-600" />
                  <h4 className="font-medium text-amber-800">Convenience Fee Note</h4>
                </div>
                <p className="mt-1 text-sm text-amber-700">
                  EventSphere charges a flat 2.5% platform fee on all paid transactions. You can choose to absorb this fee or pass it on to the participant in the final step.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between border-t pt-6">
        <Button variant="ghost" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Inventory
        </Button>
        <div className="flex gap-3">
          <Button variant="outline">Save Draft</Button>
          <Button onClick={handleNext}>
            Save & Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
