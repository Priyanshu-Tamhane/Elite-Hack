"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Trophy, Building2, Calendar, Zap, UserCircle } from "lucide-react"

const HACKATHON_STORAGE_KEY = "hackathon_inventory_draft"

interface HackathonInventoryProps {
  onDataChange: (data: any) => void
}

export function HackathonInventory({ onDataChange }: HackathonInventoryProps) {
  const [totalCapacity, setTotalCapacity] = useState("1000")
  const [maxTeamSize, setMaxTeamSize] = useState("4")
  const [minTeamSize, setMinTeamSize] = useState("1")
  
  const [prizes, setPrizes] = useState({
    first: { amount: "", perks: "" },
    second: { amount: "", perks: "" },
    third: { amount: "", perks: "" },
    special: [] as { title: string; amount: string }[],
  })
  const [sponsors, setSponsors] = useState([{ name: "", tier: "Gold", website: "", description: "" }])
  const [schedule, setSchedule] = useState<any[]>([])
  const [tracks, setTracks] = useState<any[]>([])
  const [organizers, setOrganizers] = useState<any[]>([])

  useEffect(() => {
    const saved = localStorage.getItem(HACKATHON_STORAGE_KEY)
    if (saved) {
      try {
        const d = JSON.parse(saved)
        if (d.prizes) setPrizes(d.prizes)
        if (d.sponsors) setSponsors(d.sponsors)
        if (d.schedule) setSchedule(d.schedule)
        if (d.tracks) setTracks(d.tracks)
        if (d.organizers) setOrganizers(d.organizers)
        if (d.totalCapacity) setTotalCapacity(d.totalCapacity)
        if (d.maxTeamSize) setMaxTeamSize(d.maxTeamSize)
        if (d.minTeamSize) setMinTeamSize(d.minTeamSize)
      } catch (_) {}
    }
  }, [])

  useEffect(() => {
    const data = { prizes, sponsors, schedule, tracks, organizers, totalCapacity, maxTeamSize, minTeamSize }
    localStorage.setItem(HACKATHON_STORAGE_KEY, JSON.stringify(data))
    onDataChange(data)
  }, [prizes, sponsors, schedule, tracks, organizers, totalCapacity, maxTeamSize, minTeamSize])

  const addSponsor = () => setSponsors([...sponsors, { name: "", tier: "Bronze", website: "", description: "" }])
  const removeSponsor = (i: number) => setSponsors(sponsors.filter((_, idx) => idx !== i))
  const updateSponsor = (i: number, field: string, val: string) => {
    const next = [...sponsors]; (next[i] as any)[field] = val; setSponsors(next)
  }

  const addScheduleItem = () => setSchedule([...schedule, { day: "Day 1", time: "09:00", type: "Hacking", title: "", description: "" }])
  const removeScheduleItem = (i: number) => setSchedule(schedule.filter((_, idx) => idx !== i))
  const updateScheduleItem = (i: number, field: string, val: string) => {
    const next = [...schedule]; (next[i] as any)[field] = val; setSchedule(next)
  }

  const addSpecialPrize = () => setPrizes({ ...prizes, special: [...prizes.special, { title: "", amount: "" }] })
  const removeSpecialPrize = (i: number) => setPrizes({ ...prizes, special: prizes.special.filter((_, idx) => idx !== i) })
  const updateSpecialPrize = (i: number, field: string, val: string) => {
    const next = [...prizes.special]; (next[i] as any)[field] = val; setPrizes({ ...prizes, special: next })
  }

  const addTrack = () => setTracks([...tracks, { title: "", description: "" }])
  const removeTrack = (i: number) => setTracks(tracks.filter((_, idx) => idx !== i))
  const updateTrack = (i: number, field: string, val: string) => {
    const next = [...tracks]; (next[i] as any)[field] = val; setTracks(next)
  }

  const addOrganizer = () => setOrganizers([...organizers, { name: "", role: "", company: "", email: "", twitter: "", linkedin: "" }])
  const removeOrganizer = (i: number) => setOrganizers(organizers.filter((_, idx) => idx !== i))
  const updateOrganizer = (i: number, field: string, val: string) => {
    const next = [...organizers]; (next[i] as any)[field] = val; setOrganizers(next)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <CardTitle>Hackathon Tracks</CardTitle>
            </div>
            <Button variant="outline" size="sm" onClick={addTrack}>
              <Plus className="mr-2 h-4 w-4" /> Add Track
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {tracks.map((track, i) => (
            <div key={i} className="flex gap-3 items-start rounded-lg border p-3">
              <div className="flex-1 grid grid-cols-2 gap-3">
                <Input placeholder="Track Name" value={track.title} onChange={e => updateTrack(i, "title", e.target.value)} />
                <Input placeholder="Description" value={track.description} onChange={e => updateTrack(i, "description", e.target.value)} />
              </div>
              <Button variant="ghost" size="icon" onClick={() => removeTrack(i)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserCircle className="h-5 w-5 text-primary" />
              <CardTitle>Organizers</CardTitle>
            </div>
            <Button variant="outline" size="sm" onClick={addOrganizer}>
              <Plus className="mr-2 h-4 w-4" /> Add Organizer
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {organizers.map((org, i) => (
            <div key={i} className="rounded-lg border p-4 space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <Input placeholder="Full Name" value={org.name} onChange={e => updateOrganizer(i, "name", e.target.value)} />
                <Input placeholder="Role" value={org.role} onChange={e => updateOrganizer(i, "role", e.target.value)} />
                <Input placeholder="Company" value={org.company} onChange={e => updateOrganizer(i, "company", e.target.value)} />
              </div>
              <div className="grid grid-cols-3 gap-3 items-end">
                <Input type="email" placeholder="Email" value={org.email} onChange={e => updateOrganizer(i, "email", e.target.value)} />
                <Input placeholder="Twitter" value={org.twitter} onChange={e => updateOrganizer(i, "twitter", e.target.value)} />
                <div className="flex gap-2">
                  <Input placeholder="LinkedIn" value={org.linkedin} onChange={e => updateOrganizer(i, "linkedin", e.target.value)} className="flex-1" />
                  <Button variant="ghost" size="icon" onClick={() => removeOrganizer(i)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <CardTitle>Prize Pool</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            {(["first", "second", "third"] as const).map((place) => (
              <div key={place} className="rounded-xl border-2 p-4 space-y-3">
                <p className="font-bold">{place === "first" ? "🥇 1st" : place === "second" ? "🥈 2nd" : "🥉 3rd"} Place</p>
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <span className="px-2 text-sm bg-muted border-r">₹</span>
                  <Input type="number" value={prizes[place].amount} onChange={e => setPrizes({ ...prizes, [place]: { ...prizes[place], amount: e.target.value } })} className="border-0" placeholder="0" />
                </div>
                <Textarea placeholder="Perks" value={prizes[place].perks} onChange={e => setPrizes({ ...prizes, [place]: { ...prizes[place], perks: e.target.value } })} className="min-h-[70px]" />
              </div>
            ))}
          </div>
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label>Special Prizes</Label>
              <Button variant="outline" size="sm" onClick={addSpecialPrize}>
                <Plus className="mr-2 h-3 w-3" /> Add
              </Button>
            </div>
            <div className="space-y-2">
              {prizes.special.map((sp, i) => (
                <div key={i} className="flex gap-3 items-center">
                  <Input placeholder="Prize Title" value={sp.title} onChange={e => updateSpecialPrize(i, "title", e.target.value)} className="flex-1" />
                  <div className="flex items-center border rounded-lg overflow-hidden w-36">
                    <span className="px-2 text-sm bg-muted border-r">₹</span>
                    <Input type="number" placeholder="500" value={sp.amount} onChange={e => updateSpecialPrize(i, "amount", e.target.value)} className="border-0 w-24" />
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeSpecialPrize(i)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              <CardTitle>Sponsors</CardTitle>
            </div>
            <Button variant="outline" size="sm" onClick={addSponsor}>
              <Plus className="mr-2 h-4 w-4" /> Add Sponsor
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {sponsors.map((sponsor, i) => (
            <div key={i} className="rounded-lg border p-4 space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <Input placeholder="Company Name" value={sponsor.name} onChange={e => updateSponsor(i, "name", e.target.value)} />
                <select value={sponsor.tier} onChange={e => updateSponsor(i, "tier", e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  {["Platinum", "Gold", "Silver", "Bronze", "Community"].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <Input placeholder="Website URL" value={sponsor.website} onChange={e => updateSponsor(i, "website", e.target.value)} />
              </div>
              <div className="flex gap-3 items-end">
                <Input placeholder="Description" value={sponsor.description} onChange={e => updateSponsor(i, "description", e.target.value)} className="flex-1" />
                <Button variant="ghost" size="icon" onClick={() => removeSponsor(i)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <CardTitle>Event Schedule</CardTitle>
            </div>
            <Button variant="outline" size="sm" onClick={addScheduleItem}>
              <Plus className="mr-2 h-4 w-4" /> Add Item
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {schedule.map((item, i) => (
            <div key={i} className="rounded-lg border p-3 space-y-3">
              <div className="grid grid-cols-4 gap-3">
                <select value={item.day} onChange={e => updateScheduleItem(i, "day", e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  {["Day 1", "Day 2", "Day 3", "Day 4"].map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <Input type="time" value={item.time} onChange={e => updateScheduleItem(i, "time", e.target.value)} />
                <select value={item.type} onChange={e => updateScheduleItem(i, "type", e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  {["Opening", "Workshop", "Hacking", "Mentoring", "Checkpoint", "Submission", "Judging", "Closing", "Break"].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <Input placeholder="Title" value={item.title} onChange={e => updateScheduleItem(i, "title", e.target.value)} />
              </div>
              <div className="flex gap-3 items-end">
                <Input placeholder="Description" value={item.description} onChange={e => updateScheduleItem(i, "description", e.target.value)} className="flex-1" />
                <Button variant="ghost" size="icon" onClick={() => removeScheduleItem(i)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
