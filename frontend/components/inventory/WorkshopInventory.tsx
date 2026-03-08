"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Calendar, User } from "lucide-react"

export function WorkshopInventory({ onDataChange }: { onDataChange: (data: any) => void }) {
  const [maxParticipants, setMaxParticipants] = useState(50)
  const [sessions, setSessions] = useState<any[]>([
    { id: Date.now(), title: "Intro", instructor: "", date: "", time: "", duration: "60" }
  ])
  const [materials, setMaterials] = useState("")
  const [instructors, setInstructors] = useState([{ name: "", bio: "" }])

  useEffect(() => {
    onDataChange({ maxParticipants, sessions, materials, instructors })
  }, [maxParticipants, sessions, materials, instructors, onDataChange])

  const addSession = () => setSessions(prev => [...prev, { id: Date.now(), title: "", instructor: "", date: "", time: "", duration: "60" }])
  const removeSession = (id: number) => setSessions(prev => prev.filter(s => s.id !== id))
  const updateSession = (id: number, field: string, val: any) => setSessions(prev => prev.map(s => s.id === id ? { ...s, [field]: val } : s))

  const addInstructor = () => setInstructors(prev => [...prev, { name: "", bio: "" }])
  const updateInstructor = (i: number, field: string, val: any) => { const next = [...instructors]; (next[i] as any)[field] = val; setInstructors(next) }
  const removeInstructor = (i: number) => setInstructors(prev => prev.filter((_, idx) => idx !== i))

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2"><Calendar className="h-5 w-5 text-primary" /><CardTitle>Workshop Sessions</CardTitle></div>
          <p className="text-sm text-muted-foreground">Define workshop sessions and durations</p>
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
                    <Label>Instructor</Label>
                    <Input value={s.instructor} onChange={e => updateSession(s.id, 'instructor', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input type="date" value={s.date} onChange={e => updateSession(s.id, 'date', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Time</Label>
                    <Input type="time" value={s.time} onChange={e => updateSession(s.id, 'time', e.target.value)} />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Duration (minutes)</Label>
                    <Input value={s.duration} onChange={e => updateSession(s.id, 'duration', e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addSession}><Plus className="mr-2 h-3 w-3" />Add Session</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2"><User className="h-5 w-5 text-primary" /><CardTitle>Instructors</CardTitle></div>
          <p className="text-sm text-muted-foreground">Add instructors and short bios</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {instructors.map((ins, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="flex-1 space-y-2">
                  <Input placeholder="Name" value={ins.name} onChange={e => updateInstructor(i, 'name', e.target.value)} />
                  <Textarea placeholder="Short bio" value={ins.bio} onChange={e => updateInstructor(i, 'bio', e.target.value)} />
                </div>
                <div>
                  <Button variant="ghost" size="icon" onClick={() => removeInstructor(i)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addInstructor}><Plus className="mr-2 h-3 w-3" />Add Instructor</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Materials & Capacity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label>Max Participants</Label>
              <Input type="number" value={maxParticipants} onChange={e => setMaxParticipants(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label>Materials Required (one per line)</Label>
              <Textarea placeholder="Laptop\nNotebook\nPen" value={materials} onChange={e => setMaterials(e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default WorkshopInventory
