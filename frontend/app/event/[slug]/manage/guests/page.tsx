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
import { UserPlus, Pencil, Trash2, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function GuestListPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const slug = params.slug as string
  const [guests, setGuests] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingGuest, setEditingGuest] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    guestsCount: 1,
    accommodationRequested: false,
  })

  useEffect(() => {
    const authKey = sessionStorage.getItem("event_admin")
    if (authKey !== slug) {
      router.push(`/event/${slug}/manage-login`)
      return
    }

    loadGuests()
  }, [slug, router])

  const loadGuests = () => {
    const allRegistrations = JSON.parse(localStorage.getItem("event_registrations") || "[]")
    const eventGuests = allRegistrations.filter((r: any) => r.eventSlug === slug)
    setGuests(eventGuests)
  }

  const handleAddGuest = () => {
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

    toast({ title: "Guest added successfully" })
    setIsAddDialogOpen(false)
    setFormData({ name: "", phone: "", email: "", guestsCount: 1, accommodationRequested: false })
    loadGuests()
  }

  const handleDeleteGuest = (guestId: string) => {
    const allRegistrations = JSON.parse(localStorage.getItem("event_registrations") || "[]")
    const updated = allRegistrations.filter((r: any) => r.id !== guestId)
    localStorage.setItem("event_registrations", JSON.stringify(updated))
    toast({ title: "Guest deleted successfully" })
    loadGuests()
  }

  const filteredGuests = guests.filter(g => 
    g.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.phone?.includes(searchTerm) ||
    g.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Guest List Management</h1>
          <p className="text-muted-foreground">Manage all wedding guests</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Guest Manually
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Guest</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Guest Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter guest name"
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
              <div>
                <Label>Number of Guests</Label>
                <Input
                  type="number"
                  min="1"
                  value={formData.guestsCount}
                  onChange={(e) => setFormData({ ...formData, guestsCount: parseInt(e.target.value) })}
                />
              </div>
              <Button onClick={handleAddGuest} className="w-full">Add Guest</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Guests ({filteredGuests.length})</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search guests..."
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
                <TableHead>Guest Name</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Number of Guests</TableHead>
                <TableHead>RSVP Status</TableHead>
                <TableHead>Accommodation</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGuests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    No guests found
                  </TableCell>
                </TableRow>
              ) : (
                filteredGuests.map((guest) => (
                  <TableRow key={guest.id}>
                    <TableCell className="font-medium">{guest.name}</TableCell>
                    <TableCell>{guest.phone || guest.email}</TableCell>
                    <TableCell>{guest.guestsCount || 1}</TableCell>
                    <TableCell>
                      <Badge variant={guest.status === "confirmed" ? "default" : guest.status === "declined" ? "destructive" : "secondary"}>
                        {guest.status || "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {guest.accommodationRequested ? (
                        <Badge variant="outline">Requested</Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteGuest(guest.id)}>
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
