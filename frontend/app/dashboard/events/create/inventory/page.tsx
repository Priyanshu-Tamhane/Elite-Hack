"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { StepProgress } from "@/components/step-progress"
import { useEventCreation } from "@/lib/event-creation-context"
import { WeddingInventory } from "@/components/inventory/WeddingInventory"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Users,
  Hotel,
  Presentation,
  ArrowRight,
  ArrowLeft,
  Plus,
  Trash2,
  Info,
  Ticket,
} from "lucide-react"

const steps = [
  { label: "Event Details", href: "/dashboard/events/create/details" },
  { label: "Inventory Setup", href: "/dashboard/events/create/inventory" },
  { label: "Payment Settings", href: "/dashboard/events/create/payments" },
  { label: "Publish Event", href: "/dashboard/events/create/publish" },
]

const initialTicketTiers = [
  { id: 1, name: "Early Bird", price: 49, inventory: 100, sold: 0, status: "Active" },
  { id: 2, name: "General Admission", price: 99, inventory: 500, sold: 0, status: "Active" },
  { id: 3, name: "VIP Pass", price: 249, inventory: 50, sold: 0, status: "Active" },
]

const accommodationTypes = [
  { name: "Standard Twin Room", description: "2 Guests per room", value: 40 },
  { name: "Single Suite", description: "Private room", value: 10 },
  { name: "Bunk Beds (Hostel Style)", description: "Shared space", value: 100 },
]

export default function CreateEventInventoryPage() {
  const router = useRouter()
  const { eventData } = useEventCreation()
  const category = eventData.category || ""
  
  const [totalCapacity, setTotalCapacity] = useState("1000")
  const [maxTeamSize, setMaxTeamSize] = useState("4")
  const [minTeamSize, setMinTeamSize] = useState("1")
  const [waitlistCapacity, setWaitlistCapacity] = useState("50")
  const [ticketTiers, setTicketTiers] = useState(initialTicketTiers)
  const [workshopCapacity, setWorkshopCapacity] = useState({
    mainStage: "250",
    breakout: "45",
    mentorship: "15",
  })
  const [weddingData, setWeddingData] = useState<any>({})

  // Category-based visibility
  const showTeamSettings = ['hackathon', 'workshop'].includes(category)
  const showTicketManagement = !['hackathon', 'wedding', 'corporate event', 'festival'].includes(category)
  const showWorkshopCapacity = ['conference', 'workshop', 'corporate event'].includes(category)
  const showAccommodation = ['hackathon', 'conference', 'corporate event', 'festival'].includes(category)
  const isWedding = category === 'wedding'

  const handleNext = () => {
    // Save inventory data to localStorage
    const inventoryData = isWedding ? weddingData : {
      totalCapacity,
      maxTeamSize,
      minTeamSize,
      waitlistCapacity,
      ticketTiers,
      workshopCapacity
    }
    localStorage.setItem('event_draft_inventory', JSON.stringify(inventoryData))
    router.push("/dashboard/events/create/payments")
  }

  const handleBack = () => {
    router.push("/dashboard/events/create/details")
  }

  const removeTier = (id: number) => {
    setTicketTiers(ticketTiers.filter((tier) => tier.id !== id))
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Create New Event</h1>
        <p className="text-muted-foreground">
          Define your capacities, ticketing strategy, and logistics.
        </p>
      </div>

      {/* Progress */}
      <StepProgress steps={steps} currentStep={1} />

      {/* Form */}
      <div className="space-y-6">
        {/* Wedding-specific inventory */}
        {isWedding ? (
          <>
            {/* Global Capacity for Wedding */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <CardTitle>Global Capacity</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground">
                  Set the overall guest capacity for your wedding
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Total Guest Capacity</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={totalCapacity}
                      onChange={(e) => setTotalCapacity(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="waitlist">Waitlist Capacity</Label>
                    <Input
                      id="waitlist"
                      type="number"
                      value={waitlistCapacity}
                      onChange={(e) => setWaitlistCapacity(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Wedding-specific sections */}
            <WeddingInventory onDataChange={setWeddingData} />
          </>
        ) : (
          <>
            {/* Default inventory for other categories */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <CardTitle>Global Capacity & Team Rules</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">
              Set the overall physical limits for your event venue and collaboration rules.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="capacity" className="flex items-center gap-1">
                  Total Attendee Capacity
                  <Info className="h-3 w-3 text-muted-foreground" />
                </Label>
                <Input
                  id="capacity"
                  type="number"
                  value={totalCapacity}
                  onChange={(e) => setTotalCapacity(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  The maximum number of total registrations allowed.
                </p>
              </div>
              {showTeamSettings && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="max-team">Maximum Team Size</Label>
                    <Input
                      id="max-team"
                      type="number"
                      value={maxTeamSize}
                      onChange={(e) => setMaxTeamSize(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Applicable for team-based events like hackathons.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="min-team">Minimum Team Size</Label>
                    <Input
                      id="min-team"
                      type="number"
                      value={minTeamSize}
                      onChange={(e) => setMinTeamSize(e.target.value)}
                    />
                  </div>
                </>
              )}
              <div className="space-y-2">
                <Label htmlFor="waitlist">Waitlist Capacity</Label>
                <Input
                  id="waitlist"
                  type="number"
                  value={waitlistCapacity}
                  onChange={(e) => setWaitlistCapacity(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ticket Type Management */}
        {showTicketManagement && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Ticket className="h-5 w-5 text-primary" />
                    <CardTitle>Ticket Type Management</CardTitle>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Configure different pricing tiers and availability windows.
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Tier
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tier Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Inventory</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ticketTiers.map((tier) => (
                    <TableRow key={tier.id}>
                      <TableCell className="font-medium">{tier.name}</TableCell>
                      <TableCell>${tier.price}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={(tier.sold / tier.inventory) * 100} className="h-2 w-16" />
                          <span className="text-sm text-muted-foreground">
                            {tier.sold} / {tier.inventory}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{tier.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeTier(tier.id)}
                        >
                          <Trash2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <p className="mt-4 text-xs italic text-muted-foreground">
                Note: Prices are inclusive of EventSphere processing fees.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Accommodation & Workshop */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Accommodation Slots */}
          {showAccommodation && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Hotel className="h-5 w-5 text-primary" />
                  <CardTitle>Accommodation Slots</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground">
                  Allocate room counts for residential events.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {accommodationTypes.map((type) => (
                  <div
                    key={type.name}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div>
                      <p className="font-medium">{type.name}</p>
                      <p className="text-xs text-muted-foreground">{type.description}</p>
                    </div>
                    <Input
                      type="number"
                      defaultValue={type.value}
                      className="w-20 text-center"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Workshop Capacity */}
          {showWorkshopCapacity && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Presentation className="h-5 w-5 text-primary" />
                  <CardTitle>Workshop Capacity</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground">
                  Individual limits for secondary event tracks.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Main Stage Workshop</Label>
                  <Input
                    type="number"
                    value={workshopCapacity.mainStage}
                    onChange={(e) =>
                      setWorkshopCapacity({ ...workshopCapacity, mainStage: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Technical Breakout Sessions</Label>
                  <Input
                    type="number"
                    value={workshopCapacity.breakout}
                    onChange={(e) =>
                      setWorkshopCapacity({ ...workshopCapacity, breakout: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Mentorship Slots (1:1)</Label>
                  <Input
                    type="number"
                    value={workshopCapacity.mentorship}
                    onChange={(e) =>
                      setWorkshopCapacity({ ...workshopCapacity, mentorship: e.target.value })
                    }
                  />
                </div>
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Session Limit
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
        </>
        )}
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between border-t pt-6">
        <Button variant="ghost" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Details
        </Button>
        <div className="flex gap-3">
          <Button variant="outline">Save as Draft</Button>
          <Button onClick={handleNext}>
            Continue to Payments
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
