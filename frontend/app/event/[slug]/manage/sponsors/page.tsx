"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { api } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Trash2, Edit, Award } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SponsorsPage() {
  const params = useParams()
  const slug = params.slug as string
  const { toast } = useToast()
  const [sponsors, setSponsors] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [form, setForm] = useState({ name: "", tier: "Gold Sponsor", emoji: "🏆", website: "" })

  useEffect(() => {
    const checkAuth = () => {
      const auth = sessionStorage.getItem("event_admin")
      if (auth !== slug) window.location.href = `/event/${slug}/manage/login`
    }
    checkAuth()
    loadSponsors()
  }, [slug])

  const loadSponsors = async () => {
    try {
      const data = await api.getEventBySlug(slug)
      setSponsors(data.sponsors || [])
    } catch (error) {
      console.error("Failed to load sponsors", error)
    }
  }

  const handleSave = async () => {
    try {
      let updated = [...sponsors]
      if (editIndex !== null) {
        updated[editIndex] = form
      } else {
        updated.push(form)
      }
      await api.updateEventBySlug(slug, { sponsors: updated })
      setSponsors(updated)
      toast({ title: editIndex !== null ? "Sponsor updated" : "Sponsor added" })
      setOpen(false)
      resetForm()
    } catch (error) {
      toast({ title: "Failed to save", variant: "destructive" })
    }
  }

  const handleDelete = async (index: number) => {
    if (!confirm("Delete this sponsor?")) return
    try {
      const updated = sponsors.filter((_, i) => i !== index)
      await api.updateEventBySlug(slug, { sponsors: updated })
      setSponsors(updated)
      toast({ title: "Sponsor deleted" })
    } catch (error) {
      toast({ title: "Failed to delete", variant: "destructive" })
    }
  }

  const handleEdit = (index: number) => {
    setEditIndex(index)
    setForm(sponsors[index])
    setOpen(true)
  }

  const resetForm = () => {
    setForm({ name: "", tier: "Gold Sponsor", emoji: "🏆", website: "" })
    setEditIndex(null)
  }

  const tierColors: Record<string, string> = {
    "Title Sponsor": "bg-yellow-100 text-yellow-800 border-yellow-300",
    "Gold Sponsor": "bg-amber-100 text-amber-800 border-amber-300",
    "Silver Sponsor": "bg-gray-100 text-gray-800 border-gray-300",
    "Community Partner": "bg-blue-100 text-blue-800 border-blue-300",
    "Media Partner": "bg-purple-100 text-purple-800 border-purple-300",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sponsors</h1>
          <p className="text-muted-foreground">Manage event sponsors</p>
        </div>
        <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) resetForm() }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Sponsor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editIndex !== null ? "Edit Sponsor" : "Add Sponsor"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Sponsor Name *</Label>
                <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="TechCorp India" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tier *</Label>
                  <Select value={form.tier} onValueChange={tier => setForm({ ...form, tier })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Title Sponsor">Title Sponsor</SelectItem>
                      <SelectItem value="Gold Sponsor">Gold Sponsor</SelectItem>
                      <SelectItem value="Silver Sponsor">Silver Sponsor</SelectItem>
                      <SelectItem value="Community Partner">Community Partner</SelectItem>
                      <SelectItem value="Media Partner">Media Partner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Emoji</Label>
                  <Input value={form.emoji} onChange={e => setForm({ ...form, emoji: e.target.value })} placeholder="🏆" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Website URL</Label>
                <Input value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} placeholder="https://techcorp.com" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={handleSave} disabled={!form.name}>Save</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sponsors.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Award className="h-12 w-12 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No sponsors added yet</p>
            </CardContent>
          </Card>
        ) : (
          sponsors.map((sponsor, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{sponsor.emoji}</div>
                    <div>
                      <CardTitle className="text-lg">{sponsor.name}</CardTitle>
                      <div className={`inline-block mt-2 px-2 py-1 rounded text-xs font-semibold border ${tierColors[sponsor.tier] || "bg-gray-100"}`}>
                        {sponsor.tier}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(index)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(index)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {sponsor.website && (
                <CardContent>
                  <a href={sponsor.website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                    Visit Website →
                  </a>
                </CardContent>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
