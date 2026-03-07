import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Users, Trophy } from "lucide-react"

interface HackathonMicrositeProps {
  event: any
}

export function HackathonMicrosite({ event }: HackathonMicrositeProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-accent to-primary/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4">{event.eventName}</h1>
            <p className="text-xl text-muted-foreground mb-8">{event.description}</p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href={`/event/${event.slug}/register`}>Register Now</Link>
              </Button>
              <Button size="lg" variant="outline">View Schedule</Button>
            </div>
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
                <p className="text-sm text-muted-foreground">{event.startDate}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="font-semibold">Venue</p>
                <p className="text-sm text-muted-foreground">{event.venue}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="font-semibold">Team Size</p>
                <p className="text-sm text-muted-foreground">2-4 members</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">About the Hackathon</h2>
            <p className="text-muted-foreground leading-relaxed">{event.description}</p>
          </div>
        </div>
      </section>

      {/* Prizes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Trophy className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h2 className="text-3xl font-bold mb-6">Prizes & Rewards</h2>
            <p className="text-muted-foreground">Amazing prizes await the winners!</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Participate?</h2>
          <p className="mb-8">Join us and showcase your skills!</p>
          <Button size="lg" variant="secondary" asChild>
            <Link href={`/event/${event.slug}/register`}>Register Your Team</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
