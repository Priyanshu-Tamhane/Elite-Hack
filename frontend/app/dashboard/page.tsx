"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  TrendingUp,
  UserCheck,
  Send,
  Clock,
  BarChart2,
  Trophy,
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

const chartData = [
  { name: "01 May", registrations: 40 },
  { name: "05 May", registrations: 65 },
  { name: "10 May", registrations: 85 },
  { name: "15 May", registrations: 120 },
  { name: "20 May", registrations: 180 },
  { name: "25 May", registrations: 240 },
  { name: "30 May", registrations: 320 },
]

export default function OrganizerDashboard() {
  const { user } = useAuth()
  const [events, setEvents] = useState([])
  const [stats, setStats] = useState({ total: 0, registrations: 0, slots: 0 })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const data = await api.getEvents()
      setEvents(data)
      const total = data.length
      const registrations = data.reduce((sum: number, e: any) => sum + (e.registeredCount || 0), 0)
      const slots = data.reduce((sum: number, e: any) => sum + (e.maxParticipants || 0), 0) - registrations
      setStats({ total, registrations, slots })
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
          value="$0"
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
            <Button variant="link" className="text-primary" asChild>
              <Link href="/dashboard/analytics">
                View Reports
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
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

        {/* Quick Actions & Platform Tips */}
        <div className="space-y-6">
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
                  View Live Microsites
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/dashboard/payments">
                  <FileText className="mr-2 h-4 w-4" />
                  Financial Reports
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-muted/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Platform Tips</CardTitle>
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Did you know? Events with custom team sizes see 40% higher engagement. Try adjusting team limits in Step 2.
              </p>
              <Button variant="link" className="mt-2 h-auto p-0 text-primary" asChild>
                <Link href="/dashboard/events/create/inventory">
                  Adjust Inventory Limits
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Hackathon Management Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Trophy className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Hackathon Management</h2>
            <p className="text-sm text-muted-foreground">Manage every aspect of your hackathon in one place</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {/* Registrations */}
          <Card className="group hover:shadow-md hover:border-primary/40 transition-all duration-200">
            <CardContent className="flex flex-col gap-3 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                <UserCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Registrations</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">View and manage all participant registrations</p>
              </div>
              <Button size="sm" variant="outline" className="mt-auto w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" asChild>
                <Link href="/dashboard/hackathon/registrations">
                  Manage
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Team Management */}
          <Card className="group hover:shadow-md hover:border-primary/40 transition-all duration-200">
            <CardContent className="flex flex-col gap-3 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Team Management</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">Oversee teams, members, and group activity</p>
              </div>
              <Button size="sm" variant="outline" className="mt-auto w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" asChild>
                <Link href="/dashboard/hackathon/teams">
                  Manage
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Submissions */}
          <Card className="group hover:shadow-md hover:border-primary/40 transition-all duration-200">
            <CardContent className="flex flex-col gap-3 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400">
                <Send className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Submissions</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">Review and evaluate hackathon project submissions</p>
              </div>
              <Button size="sm" variant="outline" className="mt-auto w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" asChild>
                <Link href="/dashboard/hackathon/submissions">
                  Manage
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Schedule */}
          <Card className="group hover:shadow-md hover:border-primary/40 transition-all duration-200">
            <CardContent className="flex flex-col gap-3 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Schedule</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">Plan timelines, sessions, and event milestones</p>
              </div>
              <Button size="sm" variant="outline" className="mt-auto w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" asChild>
                <Link href="/dashboard/hackathon/schedule">
                  Manage
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Analytics */}
          <Card className="group hover:shadow-md hover:border-primary/40 transition-all duration-200">
            <CardContent className="flex flex-col gap-3 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400">
                <BarChart2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Analytics</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">Track performance, trends, and key metrics</p>
              </div>
              <Button size="sm" variant="outline" className="mt-auto w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" asChild>
                <Link href="/dashboard/hackathon/analytics">
                  Manage
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
