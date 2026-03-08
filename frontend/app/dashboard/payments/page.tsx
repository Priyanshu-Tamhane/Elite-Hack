"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Search,
  Download,
  Filter,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  RefreshCcw,
  CreditCard,
  Info,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface Payment {
  _id: string
  transactionId: string
  participantName: string
  participantEmail: string
  amount: number
  currency: string
  category: string
  paymentMethod?: string
  status: string
  createdAt: string
  eventId: { eventName: string; slug: string }
}

interface Event {
  _id: string
  eventName: string
  slug: string
}

export default function PaymentsHistoryPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [selectedEvent, setSelectedEvent] = useState<string>("all")
  const [stats, setStats] = useState({ totalRevenue: 0, pendingPayouts: 0, totalRefunds: 0 })
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [paymentsData, eventsData, statsData] = await Promise.all([
        api.getPayments(),
        api.getEvents(),
        api.getPaymentStats()
      ])
      setPayments(paymentsData)
      setEvents(eventsData)
      setStats(statsData)
    } catch (error) {
      console.error('Failed to load payments:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEventChange = async (eventId: string) => {
    setSelectedEvent(eventId)
    if (eventId === "all") {
      const paymentsData = await api.getPayments()
      setPayments(paymentsData)
    } else {
      const paymentsData = await api.getPaymentsByEvent(eventId)
      setPayments(paymentsData)
    }
  }

  const handleRefund = async (paymentId: string) => {
    try {
      await api.refundPayment(paymentId)
      loadData()
    } catch (error) {
      console.error('Refund failed:', error)
    }
  }

  const filteredPayments = payments.filter(p => {
    const matchesSearch = p.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.transactionId.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || p.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const eventStats = selectedEvent === "all" ? stats : {
    totalRevenue: filteredPayments.filter(p => p.status === 'Completed').reduce((sum, p) => sum + p.amount, 0),
    pendingPayouts: filteredPayments.filter(p => p.status === 'Pending').reduce((sum, p) => sum + p.amount, 0),
    totalRefunds: filteredPayments.filter(p => p.status === 'Refunded').reduce((sum, p) => sum + p.amount, 0)
  }

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Payments & Revenue</h1>
          <p className="text-muted-foreground">
            Track all transaction activity across your events and manage refunds.
          </p>
        </div>
        <div className="flex gap-3">
          <Select value={selectedEvent} onValueChange={handleEventChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Event" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              {events.map(event => (
                <SelectItem key={event._id} value={event._id}>{event.eventName}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">${eventStats.totalRevenue.toFixed(2)}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                <DollarSign className="h-6 w-6 text-accent-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Payouts</p>
                <p className="text-2xl font-bold">${eventStats.pendingPayouts.toFixed(2)}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                <Clock className="h-6 w-6 text-accent-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Refunds</p>
                <p className="text-2xl font-bold">${eventStats.totalRefunds.toFixed(2)}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                <RefreshCcw className="h-6 w-6 text-accent-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search by payer or ID..." 
                className="pl-10" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-lg border">
                <Button 
                  variant={statusFilter === "all" ? "default" : "ghost"} 
                  size="sm" 
                  className="rounded-r-none"
                  onClick={() => setStatusFilter("all")}
                >
                  All
                </Button>
                <Button 
                  variant={statusFilter === "completed" ? "default" : "ghost"} 
                  size="sm" 
                  className="rounded-none border-x"
                  onClick={() => setStatusFilter("completed")}
                >
                  Success
                </Button>
                <Button 
                  variant={statusFilter === "pending" ? "default" : "ghost"} 
                  size="sm" 
                  className="rounded-none border-r"
                  onClick={() => setStatusFilter("pending")}
                >
                  Pending
                </Button>
                <Button 
                  variant={statusFilter === "refunded" ? "default" : "ghost"} 
                  size="sm" 
                  className="rounded-l-none"
                  onClick={() => setStatusFilter("refunded")}
                >
                  Refunded
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredPayments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No payments found
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Payer</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment._id}>
                    <TableCell className="font-mono text-sm">{payment.transactionId}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {payment.participantName.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{payment.participantName}</p>
                          <p className="text-xs text-muted-foreground">{payment.participantEmail}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{payment.eventId?.eventName || 'N/A'}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p>{payment.category}</p>
                        {payment.paymentMethod && (
                          <p className="text-xs text-muted-foreground">{payment.paymentMethod}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      ${payment.amount.toFixed(2)} {payment.currency}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          payment.status === "Completed"
                            ? "default"
                            : payment.status === "Pending"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={payment.status === "Refunded"}
                        onClick={() => handleRefund(payment._id)}
                      >
                        Refund
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Reconciliation Notice */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex items-center gap-3 p-4">
          <Info className="h-5 w-5 text-primary" />
          <div>
            <p className="font-medium">Payment Reconciliation</p>
            <p className="text-sm text-muted-foreground">
              Payments are automatically reconciled every 24 hours. Last sync: {new Date().toLocaleString()}.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
