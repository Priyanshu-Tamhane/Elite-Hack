"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const slug = params.slug as string
  const [event, setEvent] = useState<any>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const publishedEvents = JSON.parse(localStorage.getItem("published_events") || "[]")
    const foundEvent = publishedEvents.find((e: any) => e.slug === slug)
    if (foundEvent) {
      setEvent(foundEvent)
    }
  }, [slug])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const registration = {
      eventSlug: slug,
      name,
      email,
      phone,
      registeredAt: new Date().toISOString()
    }

    // Save registration
    const registrations = JSON.parse(localStorage.getItem("event_registrations") || "[]")
    registrations.push(registration)
    localStorage.setItem("event_registrations", JSON.stringify(registrations))

    setIsSubmitted(true)
    toast({
      title: "Registration Successful!",
      description: "You've been registered for the event.",
    })
  }

  if (!event) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-600" />
            <h2 className="text-2xl font-bold mb-2">Registration Successful!</h2>
            <p className="text-muted-foreground mb-6">
              You've been registered for {event.eventName}. Check your email for confirmation.
            </p>
            <Button asChild>
              <Link href={`/event/${slug}`}>Back to Event</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Button variant="ghost" asChild className="mb-6">
          <Link href={`/event/${slug}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Event
          </Link>
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Register for {event.eventName}</CardTitle>
            <p className="text-muted-foreground">Fill in your details to register</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Complete Registration
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
