import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Heart } from "lucide-react"

interface WeddingMicrositeProps {
  event: any
}

export function WeddingMicrosite({ event }: WeddingMicrositeProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-100 via-purple-50 to-pink-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Heart className="h-16 w-16 mx-auto mb-6 text-pink-500" />
            <h1 className="text-5xl font-bold mb-4">{event.eventName}</h1>
            <p className="text-xl text-muted-foreground mb-8">{event.description}</p>
            <Button size="lg" asChild>
              <Link href={`/event/${event.slug}/register`}>RSVP Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Event Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <Card>
              <CardContent className="pt-6 text-center">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-pink-500" />
                <p className="font-semibold">Wedding Date</p>
                <p className="text-sm text-muted-foreground">{event.startDate}</p>
                <p className="text-sm text-muted-foreground">{event.startTime}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <MapPin className="h-8 w-8 mx-auto mb-2 text-pink-500" />
                <p className="font-semibold">Venue</p>
                <p className="text-sm text-muted-foreground">{event.venue}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed">{event.description}</p>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Ceremony Schedule</h2>
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <p className="font-semibold">Wedding Ceremony</p>
                  <p className="text-sm text-muted-foreground">Join us for the main ceremony</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <p className="font-semibold">Reception</p>
                  <p className="text-sm text-muted-foreground">Celebrate with dinner and dancing</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-purple-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Will You Join Us?</h2>
          <p className="mb-8">Please RSVP by {event.startDate}</p>
          <Button size="lg" variant="secondary" asChild>
            <Link href={`/event/${event.slug}/register`}>RSVP Now</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
