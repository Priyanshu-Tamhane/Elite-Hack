"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, Trophy, TrendingUp, Award, BarChart3, Download, LogOut, Eye, DollarSign } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { api } from "@/lib/api"

interface HackathonManagementProps {
  slug: string
}

export function HackathonManagement({ slug }: HackathonManagementProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [event, setEvent] = useState<any>(null)
  const [registrations, setRegistrations] = useState<any[]>([])

  useEffect(() => {
    const authKey = `event_manage_auth_${slug}`
    const isAuthenticated = localStorage.getItem(authKey)
    
    if (isAuthenticated !== "true") {
      router.push(`/event/${slug}/manage/login`)
      return
    }

    const loadEvent = async () => {
      try {
        const eventData = await api.getEventBySlug(slug)
        setEvent(eventData)
        setRegistrations(eventData.participants || [])
      } catch (error) {
        const publishedEvents = JSON.parse(localStorage.getItem("published_events") || "[]")
        const foundEvent = publishedEvents.find((e: any) => e.slug === slug)
        if (foundEvent) setEvent(foundEvent)
        
        const allRegistrations = JSON.parse(localStorage.getItem("event_registrations") || "[]")
        const eventRegistrations = allRegistrations.filter((r: any) => r.eventSlug === slug)
        setRegistrations(eventRegistrations)
      }
    }
    
    loadEvent()
  }, [slug, router])

  const handleLogout = () => {
    const authKey = `event_manage_auth_${slug}`
    localStorage.removeItem(authKey)
    toast({ title: "Logged out", description: "You have been logged out from event management" })
    router.push(`/event/${slug}/manage/login`)
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <p className="text-white">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-white" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{event.eventName}</h1>
                <p className="text-sm text-gray-500">Management Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Banner */}
      {event.bannerImage && (
        <div className="relative h-48 overflow-hidden">
          <img src={event.bannerImage} alt={event.eventName} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-8 py-8">
        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card className="border-gray-200 bg-white hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Total Registrations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{registrations.length}</div>
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                Live count
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-gray-200 bg-white hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Page Views
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">-</div>
              <p className="text-xs text-gray-500 mt-1">Coming soon</p>
            </CardContent>
          </Card>
          
          <Card className="border-gray-200 bg-white hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">$0</div>
              <p className="text-xs text-gray-500 mt-1">Total earnings</p>
            </CardContent>
          </Card>
          
          <Card className="border-gray-200 bg-white hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>
              <p className="text-xs text-gray-500 mt-2">Event is live</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Registrations */}
          <Card className="border-gray-200 bg-white lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                Recent Registrations
              </CardTitle>
            </CardHeader>
            <CardContent>
              {registrations.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No registrations yet</p>
              ) : (
                <div className="space-y-3">
                  {registrations.slice(0, 5).map((reg, idx) => (
                    <div key={idx} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors">
                      <div>
                        <p className="font-semibold text-gray-900">{reg.name}</p>
                        <p className="text-sm text-gray-500">{reg.email}</p>
                      </div>
                      <p className="text-xs text-gray-400">
                        {new Date(reg.registeredAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-600" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-purple-600 hover:bg-purple-700 text-white" asChild>
                <Link href={`/event/${slug}`} target="_blank">
                  <Eye className="h-4 w-4 mr-2" />
                  View Microsite
                </Link>
              </Button>
              <Button className="w-full justify-start bg-white hover:bg-gray-50 text-gray-700 border border-gray-300">
                <Users className="h-4 w-4 mr-2" />
                View All Teams
              </Button>
              <Button className="w-full justify-start bg-white hover:bg-gray-50 text-gray-700 border border-gray-300">
                <Award className="h-4 w-4 mr-2" />
                Manage Prizes
              </Button>
              <Button className="w-full justify-start bg-white hover:bg-gray-50 text-gray-700 border border-gray-300">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Event Details */}
        <Card className="border-gray-200 bg-white mt-6">
          <CardHeader>
            <CardTitle className="text-gray-900">Event Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Start Date</p>
                <p className="text-gray-900 font-semibold">{event.startDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">End Date</p>
                <p className="text-gray-900 font-semibold">{event.endDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Venue</p>
                <p className="text-gray-900 font-semibold">{event.venue}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
