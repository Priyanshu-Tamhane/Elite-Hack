"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StatsCard } from "@/components/stats-card"
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

const recentActivity = [
  {
    id: 1,
    user: "Sarah Johnson",
    action: "registered for",
    event: "Global Tech Summit 2024",
    time: "2 minutes ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    user: "Michael Chen",
    action: "purchased a VIP ticket for",
    event: "City Jazz Festival",
    time: "15 minutes ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    user: "Emma Wilson",
    action: "requested accommodation for",
    event: "Developer Hackathon",
    time: "1 hour ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    user: "David Miller",
    action: "joined team 'CodeWarriors' in",
    event: "Developer Hackathon",
    time: "3 hours ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export default function OrganizerDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Organizer Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, Alex. Here&apos;s what&apos;s happening with your events today.
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
          value="12"
          icon={Calendar}
          trend={{ value: "+2 this month", direction: "up" }}
        />
        <StatsCard
          title="Registrations"
          value="2,840"
          icon={Users}
          trend={{ value: "+18% vs last week", direction: "up" }}
        />
        <StatsCard
          title="Revenue"
          value="$45,210"
          icon={DollarSign}
          trend={{ value: "+$8k since Monday", direction: "up" }}
        />
        <StatsCard
          title="Available Slots"
          value="452"
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

      {/* Recent Activity */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Activity</CardTitle>
            <p className="text-sm text-muted-foreground">
              Live updates from your event ecosystem
            </p>
          </div>
          <p className="text-sm text-muted-foreground">Last updated: 1m ago</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={activity.avatar} alt={activity.user} />
                    <AvatarFallback>
                      {activity.user.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>{" "}
                      {activity.action}{" "}
                      <Link
                        href="/dashboard/events/1"
                        className="font-medium text-primary hover:underline"
                      >
                        {activity.event}
                      </Link>
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </div>
          <Button variant="ghost" className="mt-4 w-full" asChild>
            <Link href="/dashboard/activity">
              Load More Activity
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
