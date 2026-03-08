"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users, CheckCircle } from "lucide-react"

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
      <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-3 text-slate-900">{event?.title}</h1>
            <p className="text-base md:text-lg text-slate-600 mb-8">{event?.description}</p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-emerald-600 text-white shadow-md hover:bg-emerald-700" onClick={onRegister}>
                <Link href={`/event/${event?.slug || ""}/register`}>Register Now</Link>
              </Button>
              <Button variant="ghost" size="lg" className="border border-slate-200 text-slate-700">
                <Link href={`#sessions`}>View Sessions</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Summary / Info cards */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="rounded-xl bg-white p-6 shadow-sm border">
              <div className="flex items-center gap-4">
                <div className="bg-white/80 rounded-full p-3 border">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700">Date</p>
                  <p className="mt-1 text-sm text-slate-500">{event?.startDate || "TBD"}</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm border">
              <div className="flex items-center gap-4">
                <div className="bg-white/80 rounded-full p-3 border">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700">Time</p>
                  <p className="mt-1 text-sm text-slate-500">{event?.startTime || "TBD"}</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm border">
              <div className="flex items-center gap-4">
                <div className="bg-white/80 rounded-full p-3 border">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700">Seats</p>
                  <p className="mt-1 text-sm text-slate-500">{event?.maxParticipants ?? "—"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sessions / Agenda */}
          <div id="sessions">
            <h2 className="text-3xl font-bold mb-4 text-slate-900">Sessions & Instructors</h2>
            <div className="space-y-4">
              {sessions.map((s: any, idx: number) => (
                <div key={idx} className="rounded-xl border bg-white p-4 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-start">
                      <div className="rounded-full bg-blue-50 p-3">
                        <Clock className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{s.title}</h3>
                      <p className="text-sm text-slate-500">Instructor: {s.instructor}</p>
                    </div>
                  </div>
                  <div className="text-sm text-slate-500">{s.time || ""}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Materials */}
          <div className="mt-10">
            <h2 className="text-3xl font-bold mb-3 text-slate-900">Materials</h2>
            <div className="grid gap-3">
              {materials.map((m: string, i: number) => (
                <div key={i} className="flex items-start gap-3 rounded-lg border p-4 bg-white">
                  <div className="mt-1 text-green-600"><CheckCircle className="h-5 w-5" /></div>
                  <div className="text-slate-600">{m || "—"}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h3 className="text-2xl font-semibold mb-2 text-slate-900">Want to Attend?</h3>
          <p className="text-slate-600 mb-6">Register now — seats are limited for this hands-on workshop.</p>
          <Button size="lg" className="bg-emerald-600 text-white shadow-md hover:bg-emerald-700">
            <Link href={`/event/${event?.slug || ""}/register`}>Register</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
