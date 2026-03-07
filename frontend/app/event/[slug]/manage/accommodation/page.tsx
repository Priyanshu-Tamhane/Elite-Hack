"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Hotel, Bed } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AccommodationManagementPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const slug = params.slug as string
  const [event, setEvent] = useState<any>(null)
  const [guests, setGuests] = useState<any[]>([])
  const [assignments, setAssignments] = useState<any[]>([])
  const [selectedGuest, setSelectedGuest] = useState("")
  const [roomType, setRoomType] = useState("")
  const [roomNumber, setRoomNumber] = useState("")

  useEffect(() => {
    const authKey = sessionStorage.getItem("event_admin")
    if (authKey !== slug) {
      router.push(`/event/${slug}/manage-login`)
      return
    }

    const publishedEvents = JSON.parse(localStorage.getItem("published_events") || "[]")
    const foundEvent = publishedEvents.find((e: any) => e.slug === slug)
    if (foundEvent) setEvent(foundEvent)

    const allRegistrations = JSON.parse(localStorage.getItem("event_registrations") || "[]")
    const eventGuests = allRegistrations.filter((r: any) => r.eventSlug === slug)
    setGuests(eventGuests)

    const savedAssignments = JSON.parse(localStorage.getItem(`room_assignments_${slug}`) || "[]")
    setAssignments(savedAssignments)
  }, [slug, router])

  const handleAssignRoom = () => {
    const guest = guests.find(g => g.id === selectedGuest)
    if (!guest || !roomType || !roomNumber) return

    const newAssignment = {
      guestId: guest.id,
      guestName: guest.name,
      roomType,
      roomNumber,
      assignedAt: new Date().toISOString()
    }

    const updated = [...assignments, newAssignment]
    setAssignments(updated)
    localStorage.setItem(`room_assignments_${slug}`, JSON.stringify(updated))
    
    toast({ title: "Room assigned successfully" })
    setSelectedGuest("")
    setRoomType("")
    setRoomNumber("")
  }

  const handleRemoveAssignment = (guestId: string) => {
    const updated = assignments.filter(a => a.guestId !== guestId)
    setAssignments(updated)
    localStorage.setItem(`room_assignments_${slug}`, JSON.stringify(updated))
    toast({ title: "Room assignment removed" })
  }

  const inventory = event?.inventory || {}
  const roomTypes = [
    { name: "Twin Rooms", key: "twinRooms", total: inventory.twinRooms || 0 },
    { name: "Suites", key: "suites", total: inventory.suites || 0 },
    { name: "Bunk Beds", key: "bunkBeds", total: inventory.bunkBeds || 0 }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Accommodation Management</h1>
        <p className="text-muted-foreground">Manage room allocations for guests</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {roomTypes.map((room) => {
          const booked = assignments.filter(a => a.roomType === room.key).length
          const remaining = room.total - booked
          return (
            <Card key={room.key}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{room.name}</CardTitle>
                <Hotel className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{room.total}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Booked: {booked} | Remaining: {remaining}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Room Assignments</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Bed className="mr-2 h-4 w-4" />
                  Assign Room
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Assign Room to Guest</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Select Guest</Label>
                    <Select value={selectedGuest} onValueChange={setSelectedGuest}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose guest" />
                      </SelectTrigger>
                      <SelectContent>
                        {guests.map((guest) => (
                          <SelectItem key={guest.id} value={guest.id}>
                            {guest.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Room Type</Label>
                    <Select value={roomType} onValueChange={setRoomType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose room type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="twinRooms">Twin Room</SelectItem>
                        <SelectItem value="suites">Suite</SelectItem>
                        <SelectItem value="bunkBeds">Bunk Bed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Room Number</Label>
                    <Input
                      value={roomNumber}
                      onChange={(e) => setRoomNumber(e.target.value)}
                      placeholder="e.g., 101"
                    />
                  </div>
                  <Button onClick={handleAssignRoom} className="w-full">Assign Room</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Guest Name</TableHead>
                <TableHead>Room Type</TableHead>
                <TableHead>Room Number</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    No room assignments yet
                  </TableCell>
                </TableRow>
              ) : (
                assignments.map((assignment) => (
                  <TableRow key={assignment.guestId}>
                    <TableCell className="font-medium">{assignment.guestName}</TableCell>
                    <TableCell>{assignment.roomType.replace(/([A-Z])/g, ' $1').trim()}</TableCell>
                    <TableCell>{assignment.roomNumber}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveAssignment(assignment.guestId)}
                      >
                        Remove
                      </Button>
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
