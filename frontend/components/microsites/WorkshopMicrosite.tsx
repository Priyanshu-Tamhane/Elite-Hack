"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users } from "lucide-react"

interface WorkshopMicrositeProps {
  event: any
  onRegister?: () => void
}

export default function WorkshopMicrosite({ event, onRegister }: WorkshopMicrositeProps) {
  const materials = (event?.materials || "None specified").split('\n')
  const sessions = event?.sessions || [{ title: "Intro", instructor: "TBD", time: "" }]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-b from-emerald-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-emerald-800">{event?.title}</h1>
            <p className="text-base md:text-lg text-muted-foreground mb-8">{event?.description}</p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-emerald-600 text-white shadow-lg hover:bg-emerald-700" onClick={onRegister}>
                <Link href={`/event/${event?.slug || ""}/register`}>Register Now</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-emerald-200 text-emerald-700">
                <Link href={`#sessions`}>View Sessions</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="text-center">
                <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="font-semibold">Date</p>
                <p className="text-sm text-muted-foreground">{event?.startDate || "TBD"}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="text-center">
                <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="font-semibold">Time</p>
                <p className="text-sm text-muted-foreground">{event?.startTime || "TBD"}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="text-center">
                <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="font-semibold">Seats</p>
                <p className="text-sm text-muted-foreground">{event?.maxParticipants ?? "—"}</p>
              </CardContent>
            </Card>
          </div>

          {/* Sessions */}
          <div id="sessions">
            <h2 className="text-2xl font-bold mb-4">Sessions & Instructors</h2>
            <div className="space-y-4">
              {sessions.map((s: any, idx: number) => (
                <Card key={idx}>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{s.title}</h3>
                        <p className="text-sm text-muted-foreground">Instructor: {s.instructor}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">{s.time || ""}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Materials */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-3">Materials</h2>
            <div className="text-muted-foreground">
              {materials.map((m: string, i: number) => (
                <div key={i} className="mb-1">• {m}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-muted/20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h3 className="text-xl font-semibold mb-3">Want to Attend?</h3>
          <p className="text-muted-foreground mb-4">Register now — seats are limited for this hands-on workshop.</p>
          <Button asChild>
            <Link href={`/event/${event?.slug || ""}/register`}>Register</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
