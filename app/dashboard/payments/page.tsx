"use client"

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
import { StatsCard } from "@/components/stats-card"
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

const transactions = [
  {
    id: "TXN-88291",
    payer: { name: "Sarah Jenkins", email: "", avatar: "/placeholder.svg?height=32&width=32" },
    date: "Oct 24, 2024",
    category: "VIP Ticket",
    method: "VISA •••• 4242",
    amount: "$299.00",
    status: "Completed",
  },
  {
    id: "TXN-88292",
    payer: { name: "Michael Chen", email: "", avatar: "/placeholder.svg?height=32&width=32" },
    date: "Oct 24, 2024",
    category: "General Admission",
    method: "BANK TRANSFER",
    amount: "$149.50",
    status: "Pending",
  },
  {
    id: "TXN-88293",
    payer: { name: "Emma Thompson", email: "", avatar: "/placeholder.svg?height=32&width=32" },
    date: "Oct 23, 2024",
    category: "Accommodation",
    method: "MASTERCARD •••• 8812",
    amount: "$1200.00",
    status: "Completed",
  },
  {
    id: "TXN-88294",
    payer: { name: "Robert Wilson", email: "", avatar: "/placeholder.svg?height=32&width=32" },
    date: "Oct 22, 2024",
    category: "Workshop",
    method: "PAYPAL",
    amount: "$85.00",
    status: "Refunded",
  },
  {
    id: "TXN-88295",
    payer: { name: "Olivia Garcia", email: "", avatar: "/placeholder.svg?height=32&width=32" },
    date: "Oct 22, 2024",
    category: "Exhibitor Pass",
    method: "VISA •••• 1109",
    amount: "$350.00",
    status: "Completed",
  },
]

export default function PaymentsHistoryPage() {
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
          <Select defaultValue="30">
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 Days</SelectItem>
              <SelectItem value="30">Last 30 Days</SelectItem>
              <SelectItem value="90">Last 90 Days</SelectItem>
              <SelectItem value="365">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1 text-xs text-emerald-500">
                  <TrendingUp className="h-3 w-3" />
                  14.2%
                </div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">$42,560.00</p>
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
                <div className="flex items-center gap-1 text-xs text-emerald-500">
                  <TrendingUp className="h-3 w-3" />
                  5.1%
                </div>
                <p className="text-sm text-muted-foreground">Pending Payouts</p>
                <p className="text-2xl font-bold">$3,120.50</p>
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
                <div className="flex items-center gap-1 text-xs text-red-500">
                  <TrendingDown className="h-3 w-3" />
                  2.3%
                </div>
                <p className="text-sm text-muted-foreground">Total Refunds</p>
                <p className="text-2xl font-bold">$845.00</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                <RefreshCcw className="h-6 w-6 text-accent-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1 text-xs text-emerald-500">
                  <TrendingUp className="h-3 w-3" />
                  0.5%
                </div>
                <p className="text-sm text-muted-foreground">Active Coupons</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                <CreditCard className="h-6 w-6 text-accent-foreground" />
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
              <Input placeholder="Search by payer or ID..." className="pl-10" />
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <div className="flex items-center rounded-lg border">
                <Button variant="ghost" size="sm" className="rounded-r-none">All</Button>
                <Button variant="ghost" size="sm" className="rounded-none border-x">Success</Button>
                <Button variant="ghost" size="sm" className="rounded-none border-r">Pending</Button>
                <Button variant="ghost" size="sm" className="rounded-l-none">Refunded</Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Payer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell className="font-mono text-sm">{txn.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={txn.payer.avatar} />
                        <AvatarFallback>
                          {txn.payer.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{txn.payer.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{txn.date}</TableCell>
                  <TableCell>
                    <div>
                      <p>{txn.category}</p>
                      <p className="text-xs text-muted-foreground">{txn.method}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{txn.amount}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        txn.status === "Completed"
                          ? "default"
                          : txn.status === "Pending"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {txn.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={txn.status === "Refunded"}
                    >
                      Refund
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing 5 of 248 transactions
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reconciliation Notice */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex items-center gap-3 p-4">
          <Info className="h-5 w-5 text-primary" />
          <div>
            <p className="font-medium">Payment Reconciliation</p>
            <p className="text-sm text-muted-foreground">
              Payments are automatically reconciled every 24 hours. Last sync: October 24, 2024 at 2:00 AM UTC.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
