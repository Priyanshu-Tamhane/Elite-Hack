"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Plus, Trash2, Calendar, MapPin, Phone } from "lucide-react"

export function CorporateInventory({ onDataChange }: { onDataChange: (data: any) => void }) {
  const [totalCapacity, setTotalCapacity] = useState(500)
  const [departmentAllocations, setDepartmentAllocations] = useState<{ department: string; seats: number }[]>([
    { department: "Engineering", seats: 150 },
    { department: "Sales", seats: 100 },
  ])

  // RSVP / Registration settings
  const [registrationOpen, setRegistrationOpen] = useState(true)
  const [maxPerCompany, setMaxPerCompany] = useState("5")

  // Schedule / Sessions
  const [sessions, setSessions] = useState<any[]>([
    { id: Date.now(), title: "Opening", date: "", time: "", room: "" }
  ])

  // Venue & Contact
  const [venueName, setVenueName] = useState("")
  const [venueAddress, setVenueAddress] = useState("")
  const [contactName, setContactName] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [contactEmail, setContactEmail] = useState("")

  useEffect(() => {
    const data = {
      totalCapacity,
      departmentAllocations,
      registration: {
        open: registrationOpen,
        maxPerCompany: Number(maxPerCompany) || 0,
      },
      sessions,
      venue: {
        name: venueName,
        address: venueAddress,
      },
      contact: {
        name: contactName,
        phone: contactPhone,
        email: contactEmail,
      }
    }
    onDataChange(data)
  }, [totalCapacity, departmentAllocations, registrationOpen, maxPerCompany, sessions, venueName, venueAddress, contactName, contactPhone, contactEmail, onDataChange])

  const addDepartment = () => setDepartmentAllocations(prev => [...prev, { department: "New Dept", seats: 10 }])
  const removeDepartment = (i: number) => setDepartmentAllocations(prev => prev.filter((_, idx) => idx !== i))
  const updateDepartment = (i: number, field: string, val: any) => {
    const next = [...departmentAllocations]; (next[i] as any)[field] = field === 'seats' ? Number(val) : val; setDepartmentAllocations(next)
  }

  const addSession = () => setSessions(prev => [...prev, { id: Date.now(), title: "", date: "", time: "", room: "" }])
  const removeSession = (id: number) => setSessions(prev => prev.filter(s => s.id !== id))
  const updateSession = (id: number, field: string, val: any) => setSessions(prev => prev.map(s => s.id === id ? { ...s, [field]: val } : s))

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2"><Calendar className="h-5 w-5 text-primary" /><CardTitle>Registration Settings</CardTitle></div>
          <p className="text-sm text-muted-foreground">Control how corporate attendees register</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center justify-between">
              <Label>Open Registrations</Label>
              <Switch checked={registrationOpen} onCheckedChange={setRegistrationOpen} />
            </div>
            <div className="space-y-2">
              <Label>Max Seats Per Company</Label>
              <Input type="number" value={maxPerCompany} onChange={e => setMaxPerCompany(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Total Attendee Capacity</Label>
              <Input type="number" value={totalCapacity} onChange={e => setTotalCapacity(Number(e.target.value))} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2"><CardTitle>Corporate Sessions</CardTitle></div>
            <Button variant="outline" size="sm" onClick={addSession}><Plus className="mr-2 h-3 w-3" />Add Session</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sessions.map((s, idx) => (
              <div key={s.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Session {idx + 1}</Label>
                  {sessions.length > 1 && (
                    <Button variant="ghost" size="sm" onClick={() => removeSession(s.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input value={s.title} onChange={e => updateSession(s.id, 'title', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Room / Hall</Label>
                    <Input value={s.room} onChange={e => updateSession(s.id, 'room', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input type="date" value={s.date} onChange={e => updateSession(s.id, 'date', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Time</Label>
                    <Input type="time" value={s.time} onChange={e => updateSession(s.id, 'time', e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" /><CardTitle>Venue Information</CardTitle></div>
          <p className="text-sm text-muted-foreground">Location details displayed on the microsite</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label>Venue Name</Label>
            <Input placeholder="e.g. Corporate HQ Auditorium" value={venueName} onChange={e => setVenueName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Full Address</Label>
            <Textarea placeholder="Complete address" value={venueAddress} onChange={e => setVenueAddress(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2"><Phone className="h-5 w-5 text-primary" /><CardTitle>Contact Information</CardTitle></div>
          <p className="text-sm text-muted-foreground">Help attendees reach out for assistance</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Contact Person Name</Label>
              <Input value={contactName} onChange={e => setContactName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input type="tel" value={contactPhone} onChange={e => setContactPhone(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Department Allocations</CardTitle>
          <p className="text-sm text-muted-foreground">Allocate seats by department</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {departmentAllocations.map((d, i) => (
              <div key={i} className="flex gap-2 items-center">
                <Input value={d.department} onChange={e => updateDepartment(i, 'department', e.target.value)} className="flex-1" />
                <Input type="number" value={d.seats} onChange={e => updateDepartment(i, 'seats', Number(e.target.value))} className="w-28" />
                <Button variant="ghost" size="icon" onClick={() => removeDepartment(i)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            ))}
            <div className="mt-3">
              <Button variant="outline" size="sm" onClick={addDepartment}><Plus className="mr-2 h-3 w-3" />Add Department</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CorporateInventory
