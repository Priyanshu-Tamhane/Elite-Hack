"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatsCard } from "@/components/stats-card"
import { api } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import {
  Calendar,
  Users,
  DollarSign,
  Ticket,
  Plus,
  ExternalLink,
  FileText,
  ArrowRight,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

export default function OrganizerDashboard() {
  const { user } = useAuth()
  const [events, setEvents] = useState([])
  const [stats, setStats] = useState({ total: 0, registrations: 0, slots: 0, revenue: 0 })
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [eventsData, paymentStats] = await Promise.all([
        api.getEvents(),
        api.getPaymentStats().catch(() => ({ totalRevenue: 0 }))
      ])
      
      setEvents(eventsData)
      const total = eventsData.length
      const registrations = eventsData.reduce((sum: number, e: any) => sum + (e.registeredCount || 0), 0)
      const maxCapacity = eventsData.reduce((sum: number, e: any) => sum + (e.maxParticipants || 0), 0)
      const slots = maxCapacity > 0 ? maxCapacity - registrations : 0
      
      setStats({ total, registrations, slots, revenue: paymentStats.totalRevenue })
      
      // Generate chart data from events
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - (6 - i))
        return date
      })
      
      const chartDataGenerated = last7Days.map(date => {
        const dayRegistrations = eventsData.reduce((sum: number, event: any) => {
          const eventRegistrations = event.participants?.filter((p: any) => {
            const regDate = new Date(p.registeredAt)
            return regDate.toDateString() === date.toDateString()
          }).length || 0
          return sum + eventRegistrations
        }, 0)
        
        return {
          name: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          registrations: dayRegistrations
        }
      })
      
      setChartData(chartDataGenerated)
    } catch (error) {
      console.error(error)
    }
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Organizer Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name}. Here&apos;s what&apos;s happening with your events today.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link href="/dashboard/events">
              <Calendar className="mr-2 h-4 w-4" />
              Manage Events
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/events/create/details">
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Events"
          value={stats.total.toString()}
          icon={Calendar}
        />
        <StatsCard
          title="Registrations"
          value={stats.registrations.toString()}
          icon={Users}
        />
        <StatsCard
          title="Revenue"
          value={`₹${stats.revenue.toFixed(2)}`}
          icon={DollarSign}
        />
        <StatsCard
          title="Available Slots"
          value={stats.slots.toString()}
          icon={Ticket}
        />
      </div>

      {/* Chart & Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Registration Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Registration Growth</CardTitle>
              <p className="text-sm text-muted-foreground">
                Daily participant signups across all active events
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="name"
                    className="text-xs"
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    className="text-xs"
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="registrations"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <p className="text-sm text-muted-foreground">Common administrative tasks</p>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" asChild>
              <Link href="/dashboard/events/create/details">
                <Plus className="mr-2 h-4 w-4" />
                Create New Event
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/dashboard/events">
                <ExternalLink className="mr-2 h-4 w-4" />
                View All Events
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/dashboard/payments">
                <FileText className="mr-2 h-4 w-4" />
                Payment Records
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/dashboard/accommodation">
                <Users className="mr-2 h-4 w-4" />
                Accommodation
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/dashboard/notifications">
                <FileText className="mr-2 h-4 w-4" />
                Notifications
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
