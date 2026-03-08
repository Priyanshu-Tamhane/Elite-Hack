"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Clock, MapPin, Users, CheckCircle, Sparkles, Award, Target, BookOpen } from "lucide-react"

interface WorkshopMicrositeProps {
  event: any
}

export default function WorkshopMicrosite({ event }: WorkshopMicrositeProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/events/${event.slug}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        setSubmitted(true)
      }
    } catch (error) {
      console.error('Registration failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl" />
        
        {event.bannerImage || event.bannerUrl ? (
          <div className="absolute inset-0 z-0">
            <img src={event.bannerImage || event.bannerUrl} alt="Banner" className="w-full h-full object-cover opacity-10" />
          </div>
        ) : null}

        <div className="container mx-auto max-w-7xl px-4 py-20 relative z-10">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              <Sparkles className="h-4 w-4" />
              <span>Professional Workshop</span>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-12 space-y-4">
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              {event.eventName}
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { icon: Calendar, label: "Date", value: new Date(event.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), color: "from-blue-500 to-cyan-500" },
              { icon: Clock, label: "Time", value: event.startTime || 'TBD', color: "from-purple-500 to-pink-500" },
              { icon: MapPin, label: "Venue", value: event.venue, color: "from-orange-500 to-red-500" },
              { icon: Users, label: "Seats", value: event.maxParticipants || 'Unlimited', color: "from-green-500 to-emerald-500" }
            ].map((item, idx) => (
              <div key={idx} className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/50 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{item.label}</p>
                <p className="font-bold text-slate-900 text-lg">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Target className="h-4 w-4" />
              <span>Learning Outcomes</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">What You'll Learn</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Gain practical skills and knowledge from industry experts</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, title: "Hands-on Experience", desc: "Learn by doing with real-world projects and exercises" },
              { icon: Award, title: "Expert Guidance", desc: "Get mentored by industry professionals with years of experience" },
              { icon: Sparkles, title: "Certificate", desc: "Receive a certificate of completion to showcase your skills" }
            ].map((item, idx) => (
              <div key={idx} className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-4">
                  <item.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-200">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-3 text-slate-900">You're All Set! 🎉</h3>
                <p className="text-lg text-slate-600 mb-2">Registration confirmed for <span className="font-semibold text-indigo-600">{event.eventName}</span></p>
                <p className="text-slate-500">Check your email at <span className="font-medium">{formData.email}</span> for details</p>
              </div>
            ) : (
              <>
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    <Sparkles className="h-4 w-4" />
                    <span>Limited Seats Available</span>
                  </div>
                  <h2 className="text-4xl font-bold mb-3 text-slate-900">Secure Your Spot</h2>
                  <p className="text-slate-600 text-lg">Join us for an incredible learning experience</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-slate-700 font-semibold mb-2">Full Name *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="h-12 text-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-slate-700 font-semibold mb-2">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="h-12 text-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-slate-700 font-semibold mb-2">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 234 567 8900"
                      className="h-12 text-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-14 text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300" 
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : '🚀 Register Now - It\'s Free!'}
                  </Button>
                  <p className="text-center text-sm text-slate-500">
                    By registering, you agree to receive event updates via email
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      {event.schedule && event.schedule.length > 0 && (
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Clock className="h-4 w-4" />
                <span>Event Timeline</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Workshop Schedule</h2>
              <p className="text-lg text-slate-600">Here's what we have planned for you</p>
            </div>
            <div className="space-y-4">
              {event.schedule.map((item: any, idx: number) => (
                <div key={idx} className="group bg-gradient-to-r from-white to-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Clock className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-xl text-slate-900">{item.title}</h3>
                        <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{item.time}</span>
                      </div>
                      {item.description && (
                        <p className="text-slate-600 leading-relaxed">{item.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {event.contact && (
        <section className="py-20 px-4 bg-gradient-to-br from-indigo-600 to-purple-600">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center text-white">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Have Questions?</h3>
              <p className="text-xl text-indigo-100 mb-8">We're here to help! Reach out anytime</p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                {event.contact.email && (
                  <a href={`mailto:${event.contact.email}`} className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-indigo-50 transition-colors shadow-lg hover:shadow-xl">
                    📧 {event.contact.email}
                  </a>
                )}
                {event.contact.phone && (
                  <a href={`tel:${event.contact.phone}`} className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-indigo-50 transition-colors shadow-lg hover:shadow-xl">
                    📞 {event.contact.phone}
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-sm">© 2025 EventSphere. Powered by innovation.</p>
        </div>
      </footer>
    </div>
  )
}
