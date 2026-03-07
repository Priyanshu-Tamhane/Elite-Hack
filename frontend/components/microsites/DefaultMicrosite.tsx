import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Clock } from "lucide-react"

interface DefaultMicrositeProps {
  event: any
}

export function DefaultMicrosite({ event }: DefaultMicrositeProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 to-accent">
        {event.bannerImage && (
          <div className="absolute inset-0 opacity-20">
            <img src={event.bannerImage} alt={event.eventName} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4">{event.eventName}</h1>
            <p className="text-xl text-muted-foreground mb-8">{event.description}</p>
            <Button size="lg" asChild>
              <Link href={`/event/${event.slug}/register`}>Register Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Event Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6 text-center">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="font-semibold">Date</p>
                <p className="text-sm text-muted-foreground">{event.startDate} - {event.endDate}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="font-semibold">Time</p>
                <p className="text-sm text-muted-foreground">{event.startTime}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="font-semibold">Venue</p>
                <p className="text-sm text-muted-foreground">{event.venue}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">About This Event</h2>
            <p className="text-muted-foreground leading-relaxed">{event.description}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Us!</h2>
          <p className="mb-8">Register now to secure your spot</p>
          <Button size="lg" variant="secondary" asChild>
            <Link href={`/event/${event.slug}/register`}>Register Now</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
