"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  LayoutDashboard,
  Users,
  Users2,
  Hotel,
  CreditCard,
  Bell,
  BarChart3,
  ExternalLink,
  Edit,
  Download,
  Calendar,
  MapPin,
  TrendingUp,
  Check,
  Plus,
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

const chartData = [
  { name: "Mon", registrations: 120 },
  { name: "Tue", registrations: 180 },
  { name: "Wed", registrations: 250 },
  { name: "Thu", registrations: 320 },
  { name: "Fri", registrations: 480 },
  { name: "Sat", registrations: 580 },
  { name: "Sun", registrations: 620 },
]

const recentRegistrations = [
  {
    id: 1,
    name: "Sarah Jenkins",
    email: "sarah.j@tech.com",
    type: "VIP",
    status: "Paid",
    time: "2m ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@innovate.org",
    type: "Regular",
    status: "Paid",
    time: "15m ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    email: "elena.r@global.io",
    type: "Speaker",
    status: "Comped",
    time: "1h ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    name: "David Smith",
    email: "d.smith@startup.co",
    type: "Regular",
    status: "Pending",
    time: "3h ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 5,
    name: "Jessica Wu",
    email: "jwu@design.net",
    type: "VIP",
    status: "Paid",
    time: "5h ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

const checklist = [
  { id: 1, task: "Approve pending speaker teams", done: true },
  { id: 2, task: "Finalize room block allocations", done: true },
  { id: 3, task: "Blast schedule update notification", done: false },
  { id: 4, task: "Export badge printing data", done: false },
  { id: 5, task: "Confirm Razorpay settlement account", done: true },
]

export default function EventManagementPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">Global Tech Innovators Summit 2024</h1>
            <Badge>Active</Badge>
          </div>
          <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Starts Oct 24, 2024
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              San Francisco Convention Center
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link href="/microsite/1" target="_blank">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Microsite
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/events/1/edit">
              <Edit className="mr-2 h-4 w-4" />
              Edit Details
            </Link>
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Reports
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview" className="gap-2">
            <LayoutDashboard className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="registrations" className="gap-2">
            <Users className="h-4 w-4" />
            Registrations
          </TabsTrigger>
          <TabsTrigger value="teams" className="gap-2">
            <Users2 className="h-4 w-4" />
            Teams
          </TabsTrigger>
          <TabsTrigger value="accommodation" className="gap-2">
            <Hotel className="h-4 w-4" />
            Accommodation
          </TabsTrigger>
          <TabsTrigger value="payments" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Payments
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="analytics" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Registrations</p>
                    <p className="text-3xl font-bold">1,248</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-emerald-500">
                      <TrendingUp className="h-3 w-3" />
                      +12% vs last week
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                    <Users className="h-6 w-6 text-accent-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Gross Revenue</p>
                    <p className="text-3xl font-bold">$45,290</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-emerald-500">
                      <TrendingUp className="h-3 w-3" />
                      +8.4% vs last week
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                    <CreditCard className="h-6 w-6 text-accent-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Teams</p>
                    <p className="text-3xl font-bold">142</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                      <TrendingUp className="h-3 w-3 rotate-180" />
                      -2.1% vs last week
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                    <Users2 className="h-6 w-6 text-accent-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Accommodation Booked</p>
                    <p className="text-3xl font-bold">88%</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-emerald-500">
                      <TrendingUp className="h-3 w-3" />
                      +5.0% vs last week
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                    <Hotel className="h-6 w-6 text-accent-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chart & Capacity Watch */}
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Registration Velocity</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Daily sign-up trends for the past 7 days
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="name" className="text-xs" tickLine={false} axisLine={false} />
                      <YAxis className="text-xs" tickLine={false} axisLine={false} />
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

            <Card>
              <CardHeader>
                <CardTitle>Capacity Watch</CardTitle>
                <p className="text-sm text-muted-foreground">Real-time slot availability</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Main Conference Seats</span>
                    <span className="font-medium">1248 / 1500</span>
                  </div>
                  <Progress value={83} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>VIP Tickets</span>
                    <span className="font-medium">185 / 200</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Accommodation Rooms</span>
                    <span className="font-medium">412 / 500</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Workshop Slots</span>
                    <span className="font-medium">290 / 300</span>
                  </div>
                  <Progress value={97} className="h-2 bg-red-100 [&>div]:bg-red-500" />
                </div>
                <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <p className="text-sm font-medium text-emerald-800">Ready for Launch</p>
                  </div>
                  <p className="mt-1 text-xs text-emerald-700">
                    All core inventory is set up. Payment gateway is connected and active.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Registrations & Checklist */}
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Registrations</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    The most recent sign-ups for your event
                  </p>
                </div>
                <Button variant="link" className="text-primary" asChild>
                  <Link href="/dashboard/events/1/registrations">
                    View All
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Attendee</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentRegistrations.map((reg) => (
                      <TableRow key={reg.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={reg.avatar} alt={reg.name} />
                              <AvatarFallback>
                                {reg.name.split(" ").map((n) => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{reg.name}</p>
                              <p className="text-xs text-muted-foreground">{reg.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{reg.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              reg.status === "Paid"
                                ? "default"
                                : reg.status === "Pending"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {reg.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{reg.time}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pre-Event Checklist</CardTitle>
                <p className="text-sm text-muted-foreground">Stay on track for Oct 24th</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {checklist.map((item) => (
                  <div key={item.id} className="flex items-start gap-3">
                    <Checkbox id={`task-${item.id}`} checked={item.done} />
                    <label
                      htmlFor={`task-${item.id}`}
                      className={`text-sm ${item.done ? "text-muted-foreground line-through" : ""}`}
                    >
                      {item.task}
                    </label>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Custom Task
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="registrations">
          <Card>
            <CardHeader>
              <CardTitle>All Registrations</CardTitle>
              <p className="text-sm text-muted-foreground">Manage participant registrations</p>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Registration management content goes here...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teams">
          <Card>
            <CardHeader>
              <CardTitle>Team Management</CardTitle>
              <p className="text-sm text-muted-foreground">View and manage event teams</p>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Team management content goes here...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accommodation">
          <Card>
            <CardHeader>
              <CardTitle>Accommodation</CardTitle>
              <p className="text-sm text-muted-foreground">Manage room allocations</p>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Accommodation content goes here...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payments</CardTitle>
              <p className="text-sm text-muted-foreground">Track payment transactions</p>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Payments content goes here...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <p className="text-sm text-muted-foreground">Send announcements to participants</p>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Notifications content goes here...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <p className="text-sm text-muted-foreground">Detailed event analytics</p>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Analytics content goes here...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
