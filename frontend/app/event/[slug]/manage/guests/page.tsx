"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { UserPlus, Pencil, Trash2, Search, CheckCircle, XCircle, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { api } from "@/lib/api"

export default function GuestListPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const slug = params.slug as string
  const [event, setEvent] = useState<any>(null)
  const [guests, setGuests] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    guestsCount: 1,
    accommodationRequested: false,
  })

  const isConference = event?.category === "conference"
  const isWedding = event?.category === "wedding"

  useEffect(() => {
    const authKey = sessionStorage.getItem("event_admin")
    if (authKey !== slug) {
      router.push(`/event/${slug}/manage/login`)
      return
    }

    loadData()
  }, [slug, router])

  const loadData = async () => {
    try {
      const eventData = await api.getEventBySlug(slug)
      setEvent(eventData)
      const regs = await api.getRegistrations(slug)
      setGuests(regs)
    } catch (error) {
      console.error("Failed to load data", error)
      // Fallback to localStorage
      const allRegistrations = JSON.parse(localStorage.getItem("event_registrations") || "[]")
      const eventGuests = allRegistrations.filter((r: any) => r.eventSlug === slug)
      setGuests(eventGuests)
    }
  }

  const handleAddGuest = async () => {
    try {
      await api.createRegistration(slug, {
        ...formData,
        registeredAt: new Date().toISOString(),
        status: "pending",
      })
      toast({ title: `${isConference ? "Attendee" : isWedding ? "Guest" : "Participant"} added successfully` })
      setIsAddDialogOpen(false)
      setFormData({ name: "", phone: "", email: "", guestsCount: 1, accommodationRequested: false })
      loadData()
    } catch {
      // Fallback to localStorage
      const newGuest = {
        ...formData,
        eventSlug: slug,
        registeredAt: new Date().toISOString(),
        status: "pending",
        id: Date.now().toString(),
      }
      const allRegistrations = JSON.parse(localStorage.getItem("event_registrations") || "[]")
      allRegistrations.push(newGuest)
      localStorage.setItem("event_registrations", JSON.stringify(allRegistrations))
      toast({ title: `${isConference ? "Attendee" : "Guest"} added successfully` })
      setIsAddDialogOpen(false)
      setFormData({ name: "", phone: "", email: "", guestsCount: 1, accommodationRequested: false })
      loadData()
    }
  }

  const handleDeleteGuest = async (guestId: string) => {
    try {
      await api.deleteRegistration(slug, guestId)
      toast({ title: `${isConference ? "Attendee" : "Guest"} removed successfully` })
      loadData()
    } catch {
      const allRegistrations = JSON.parse(localStorage.getItem("event_registrations") || "[]")
      const updated = allRegistrations.filter((r: any) => r.id !== guestId && r._id !== guestId)
      localStorage.setItem("event_registrations", JSON.stringify(updated))
      toast({ title: `${isConference ? "Attendee" : "Guest"} removed successfully` })
      loadData()
    }
  }

  const handleStatusChange = async (guestId: string, status: string) => {
    try {
      await api.updateRegistrationStatus(slug, guestId, status)
      toast({ title: `Status updated to ${status}` })
      loadData()
    } catch {
      toast({ title: "Failed to update status", variant: "destructive" })
    }
  }

  const filteredGuests = guests.filter(g =>
    g.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.phone?.includes(searchTerm) ||
    g.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Dynamic labels
  const pageTitle = isConference ? "Attendee Management" : isWedding ? "Guest List Management" : "Participant Management"
  const pageDesc = isConference ? "Manage all conference attendees" : isWedding ? "Manage all wedding guests" : "Manage all event participants"
  const addBtnLabel = isConference ? "Add Attendee" : isWedding ? "Add Guest Manually" : "Add Participant"
  const dialogTitle = isConference ? "Add New Attendee" : isWedding ? "Add New Guest" : "Add New Participant"
  const nameLabel = isConference ? "Attendee Name" : isWedding ? "Guest Name" : "Participant Name"
  const countLabel = isConference ? "Number of Passes" : "Number of Guests"
  const tableTitle = isConference ? `All Attendees (${filteredGuests.length})` : `All Guests (${filteredGuests.length})`
  const nameHead = isConference ? "Attendee Name" : "Guest Name"
  const emptyText = isConference ? "No attendees found" : "No guests found"

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">{pageTitle}</h1>
          <p className="text-muted-foreground">{pageDesc}</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              {addBtnLabel}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{dialogTitle}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>{nameLabel}</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={`Enter ${isConference ? "attendee" : "guest"} name`}
                />
              </div>
              <div>
                <Label>Phone Number</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter email"
                />
              </div>
              {!isConference && (
                <div>
                  <Label>{countLabel}</Label>
                  <Input
                    type="number"
                    min="1"
                    value={formData.guestsCount}
                    onChange={(e) => setFormData({ ...formData, guestsCount: parseInt(e.target.value) })}
                  />
                </div>
              )}
              <Button onClick={handleAddGuest} className="w-full">{addBtnLabel}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{tableTitle}</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={`Search ${isConference ? "attendees" : "guests"}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{nameHead}</TableHead>
                <TableHead>{isConference ? "Email / Phone" : "Phone Number"}</TableHead>
                {!isConference && <TableHead>Number of Guests</TableHead>}
                <TableHead>{isConference ? "Registration Status" : "RSVP Status"}</TableHead>
                {!isConference && <TableHead>Accommodation</TableHead>}
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGuests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={isConference ? 4 : 6} className="text-center text-muted-foreground">
                    {emptyText}
                  </TableCell>
                </TableRow>
              ) : (
                filteredGuests.map((guest) => (
                  <TableRow key={guest._id || guest.id}>
                    <TableCell className="font-medium">{guest.name}</TableCell>
                    <TableCell>{isConference ? (guest.email || guest.phone) : (guest.phone || guest.email)}</TableCell>
                    {!isConference && <TableCell>{guest.guestsCount || 1}</TableCell>}
                    <TableCell>
                      <Badge variant={guest.status === "confirmed" ? "default" : guest.status === "declined" ? "destructive" : "secondary"}>
                        {guest.status || "Pending"}
                      </Badge>
                    </TableCell>
                    {!isConference && (
                      <TableCell>
                        {guest.accommodationRequested ? (
                          <Badge variant="outline">Requested</Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                    )}
                    <TableCell>
                      <div className="flex gap-1">
                        {guest.status !== "confirmed" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={() => handleStatusChange(guest._id || guest.id, "confirmed")}
                            title="Confirm"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        {guest.status !== "declined" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleStatusChange(guest._id || guest.id, "declined")}
                            title="Decline"
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        )}
                        {guest.status !== "pending" && guest.status && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
                            onClick={() => handleStatusChange(guest._id || guest.id, "pending")}
                            title="Set Pending"
                          >
                            <Clock className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteGuest(guest._id || guest.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
