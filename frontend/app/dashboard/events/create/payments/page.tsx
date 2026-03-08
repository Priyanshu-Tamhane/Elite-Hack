"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { StepProgress } from "@/components/step-progress"
import { useEventCreation } from "@/lib/event-creation-context"
import {
  ArrowRight, ArrowLeft, Grid3X3, CreditCard,
  Shield, Info, Copy, Percent, CheckCircle,
} from "lucide-react"

const steps = [
  { label: "Event Details", href: "/dashboard/events/create/details" },
  { label: "Inventory Setup", href: "/dashboard/events/create/inventory" },
  { label: "Payment Settings", href: "/dashboard/events/create/payments" },
  { label: "Publish Event", href: "/dashboard/events/create/publish" },
]

export default function CreateEventPaymentsPage() {
  const router = useRouter()
  const { eventData, updateEventData } = useEventCreation()

  // Read category + registrationType from localStorage as fallback
  const [category, setCategory] = useState("")
  const [detailsRegType, setDetailsRegType] = useState("free") // from step 1

  useEffect(() => {
    const raw = localStorage.getItem("event_draft_details")
    if (raw) {
      try {
        const d = JSON.parse(raw)
        setCategory(d.category || eventData.category || "")
        setDetailsRegType(d.registrationType || "free")
      } catch { }
    } else {
      setCategory(eventData.category || "")
    }

    // Restore saved payment settings
    const savedPay = localStorage.getItem("event_draft_payments")
    if (savedPay) {
      try {
        const p = JSON.parse(savedPay)
        if (p.eventType) setEventType(p.eventType)
        if (p.paymentGateway) setPaymentGateway(p.paymentGateway)
        if (p.keyId) setKeyId(p.keyId)
        if (p.currency) setCurrency(p.currency)
        if (p.taxPercent !== undefined) setTaxPercent(String(p.taxPercent))
        if (p.enableWebhooks !== undefined) setEnableWebhooks(p.enableWebhooks)
      } catch { }
    }
  }, [])

  const isConference = category === "conference"

  // Derive initial eventType: for conference, use what was set in step 1
  const [eventType, setEventType] = useState<"free" | "paid">("paid")
  const [paymentGateway, setPaymentGateway] = useState("razorpay")
  const [keyId, setKeyId] = useState("")
  const [keySecret, setKeySecret] = useState("")
  const [enableWebhooks, setEnableWebhooks] = useState(false)
  const [currency, setCurrency] = useState("USD")
  const [taxPercent, setTaxPercent] = useState("0")

  // After detailsRegType loads, sync eventType for conference
  useEffect(() => {
    if (isConference) {
      setEventType(detailsRegType as "free" | "paid")
    }
  }, [isConference, detailsRegType])

  const copyWebhookUrl = () => {
    navigator.clipboard.writeText("https://api.eventsphere.io/webhooks/payment/" + paymentGateway)
  }

  const handleNext = () => {
    const paymentSettings = {
      eventType,
      paymentGateway: eventType === "paid" ? paymentGateway : undefined,
      keyId: eventType === "paid" ? keyId : undefined,
      currency,
      taxPercent: Number(taxPercent),
      enableWebhooks,
    }
    localStorage.setItem("event_draft_payments", JSON.stringify(paymentSettings))

    // Also update registrationType in registrationSettings for conference
    if (isConference) {
      updateEventData({
        paymentSettings,
        registrationSettings: {
          ...eventData.registrationSettings,
          registrationType: eventType,
        },
      })
    } else {
      updateEventData({ paymentSettings })
    }

    router.push("/dashboard/events/create/publish")
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Payment Settings</h1>
        <p className="text-muted-foreground">
          Configure how you&apos;ll receive payments and handle ticket pricing.
        </p>
      </div>

      <StepProgress steps={steps} currentStep={2} />

      <div className="space-y-6">

        {/* ── Conference: show context from step 1 ── */}
        {isConference && (
          <Card className="border-primary/30">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">1</div>
                <CardTitle>Registration Type</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                This was set in Step 1. Change it here if needed — it will be reflected on the microsite.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div
                  className={`relative cursor-pointer rounded-lg border-2 p-4 transition-colors ${eventType === "free" ? "border-primary bg-accent" : "border-border hover:border-muted-foreground"}`}
                  onClick={() => setEventType("free")}
                >
                  {eventType === "free" && <CheckCircle className="absolute right-3 top-3 h-5 w-5 text-primary" />}
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted"><Grid3X3 className="h-5 w-5" /></div>
                  <h3 className="mt-3 font-semibold">Free Conference</h3>
                  <p className="mt-1 text-sm text-muted-foreground">No payment required. Attendees register for free.</p>
                </div>
                <div
                  className={`relative cursor-pointer rounded-lg border-2 p-4 transition-colors ${eventType === "paid" ? "border-primary bg-accent" : "border-border hover:border-muted-foreground"}`}
                  onClick={() => setEventType("paid")}
                >
                  {eventType === "paid" && <CheckCircle className="absolute right-3 top-3 h-5 w-5 text-primary" />}
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted"><CreditCard className="h-5 w-5" /></div>
                  <h3 className="mt-3 font-semibold">Paid Conference</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Charge attendees for conference passes based on ticket pricing you defined.</p>
                </div>
              </div>
              {isConference && eventType === "paid" && (
                <p className="mt-3 text-xs text-muted-foreground flex items-center gap-1">
                  <Info className="h-3 w-3" />
                  Ticket prices you configured in the Inventory step will appear on the conference microsite.
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* ── Non-conference: generic event type selector ── */}
        {!isConference && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full border text-sm">1</div>
                <CardTitle>Select Event Type</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div
                  className={`relative cursor-pointer rounded-lg border-2 p-4 transition-colors ${eventType === "free" ? "border-primary bg-accent" : "border-border hover:border-muted-foreground"}`}
                  onClick={() => setEventType("free")}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted"><Grid3X3 className="h-5 w-5" /></div>
                  <h3 className="mt-3 font-semibold">Free Event</h3>
                  <p className="mt-1 text-sm text-muted-foreground">No tickets sold. Ideal for community meetups, workshops, or internal events.</p>
                </div>
                <div
                  className={`relative cursor-pointer rounded-lg border-2 p-4 transition-colors ${eventType === "paid" ? "border-primary bg-accent" : "border-border hover:border-muted-foreground"}`}
                  onClick={() => setEventType("paid")}
                >
                  {eventType === "paid" && <Badge className="absolute right-3 top-3">Active</Badge>}
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted"><CreditCard className="h-5 w-5" /></div>
                  <h3 className="mt-3 font-semibold">Paid Event</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Charge participants for tickets. Supports multiple currencies, taxes, and instant payouts.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ── Payment Gateway (only for paid) ── */}
        {eventType === "paid" && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full border text-sm">2</div>
                <CardTitle>Payment Gateway Integration</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs value={paymentGateway} onValueChange={setPaymentGateway}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="razorpay">Razorpay</TabsTrigger>
                  <TabsTrigger value="stripe" className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded bg-[#635bff]" /> Stripe
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="key-id">
                      {paymentGateway === "razorpay" ? "KEY ID" : "PUBLISHABLE KEY"}
                    </Label>
                    <Input
                      id="key-id"
                      value={keyId}
                      onChange={e => setKeyId(e.target.value)}
                      placeholder={paymentGateway === "razorpay" ? "rzp_live_..." : "pk_live_..."}
                    />
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Info className="h-3 w-3" />
                      Found in your {paymentGateway === "razorpay" ? "Razorpay" : "Stripe"} Dashboard → Settings
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="key-secret">
                      {paymentGateway === "razorpay" ? "KEY SECRET" : "SECRET KEY"}
                    </Label>
                    <Input
                      id="key-secret"
                      type="password"
                      value={keySecret}
                      onChange={e => setKeySecret(e.target.value)}
                      placeholder="••••••••••••••••"
                    />
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="webhooks"
                      checked={enableWebhooks}
                      onCheckedChange={checked => setEnableWebhooks(checked as boolean)}
                    />
                    <div className="space-y-1">
                      <Label htmlFor="webhooks" className="font-medium">Enable Webhooks for Real-time Updates</Label>
                      <p className="text-xs text-muted-foreground">Automatically confirm registrations when payment succeeds.</p>
                    </div>
                  </div>
                  {enableWebhooks && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 rounded-lg border bg-muted p-3">
                        <code className="flex-1 text-xs">
                          https://api.eventsphere.io/webhooks/payment/{paymentGateway}
                        </code>
                        <Button variant="outline" size="sm" onClick={copyWebhookUrl}>
                          <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">Copy this URL to your gateway&apos;s webhook settings.</p>
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
                  <div className="mt-4 flex gap-2 flex-wrap">
                    <Badge variant="outline">PCI DSS COMPLIANT</Badge>
                    <Badge variant="outline">AES-256 ENCRYPTED</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ── Currency & Tax (only for paid) ── */}
        {eventType === "paid" && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full border text-sm">3</div>
                <CardTitle>Currency &amp; Tax Rules</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>BASE CURRENCY</Label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">$ USD</SelectItem>
                      <SelectItem value="EUR">€ EUR</SelectItem>
                      <SelectItem value="GBP">£ GBP</SelectItem>
                      <SelectItem value="INR">₹ INR</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Primary currency for all ticket sales.</p>
                </div>
                <div className="space-y-2">
                  <Label>APPLICABLE TAX (%)</Label>
                  <div className="relative">
                    <Input
                      type="number" value={taxPercent}
                      onChange={e => setTaxPercent(e.target.value)}
                      className="pr-10"
                    />
                    <Percent className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground">Enter percentage (e.g., 18 for GST, 10 for VAT).</p>
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

        {/* Free event confirmation */}
        {eventType === "free" && (
          <Card className="border-green-200 bg-green-50/50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <h3 className="font-semibold">Free Event — No Payment Setup Required</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Attendees can register at no cost. You can proceed directly to the publish step.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t pt-6">
        <Button variant="ghost" onClick={() => router.push("/dashboard/events/create/inventory")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Inventory
        </Button>
        <div className="flex gap-3">
          <Button variant="outline">Save Draft</Button>
          <Button onClick={handleNext}>
            Save &amp; Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
