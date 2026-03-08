"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { api } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Trash2, Edit, HelpCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function FAQPage() {
  const params = useParams()
  const slug = params.slug as string
  const { toast } = useToast()
  const [faqs, setFaqs] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [form, setForm] = useState({ q: "", a: "" })

  useEffect(() => {
    const checkAuth = () => {
      const auth = sessionStorage.getItem("event_admin")
      if (auth !== slug) window.location.href = `/event/${slug}/manage/login`
    }
    checkAuth()
    loadFAQs()
  }, [slug])

  const loadFAQs = async () => {
    try {
      const data = await api.getEventBySlug(slug)
      setFaqs(data.faqs || [])
    } catch (error) {
      console.error("Failed to load FAQs", error)
    }
  }

  const handleSave = async () => {
    try {
      let updated = [...faqs]
      if (editIndex !== null) {
        updated[editIndex] = form
      } else {
        updated.push(form)
      }
      await api.updateEventBySlug(slug, { faqs: updated })
      setFaqs(updated)
      toast({ title: editIndex !== null ? "FAQ updated" : "FAQ added" })
      setOpen(false)
      resetForm()
    } catch (error) {
      toast({ title: "Failed to save", variant: "destructive" })
    }
  }

  const handleDelete = async (index: number) => {
    if (!confirm("Delete this FAQ?")) return
    try {
      const updated = faqs.filter((_, i) => i !== index)
      await api.updateEventBySlug(slug, { faqs: updated })
      setFaqs(updated)
      toast({ title: "FAQ deleted" })
    } catch (error) {
      toast({ title: "Failed to delete", variant: "destructive" })
    }
  }

  const handleEdit = (index: number) => {
    setEditIndex(index)
    setForm(faqs[index])
    setOpen(true)
  }

  const resetForm = () => {
    setForm({ q: "", a: "" })
    setEditIndex(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">FAQ Manager</h1>
          <p className="text-muted-foreground">Manage frequently asked questions</p>
        </div>
        <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) resetForm() }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add FAQ
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editIndex !== null ? "Edit FAQ" : "Add FAQ"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Question *</Label>
                <Input value={form.q} onChange={e => setForm({ ...form, q: e.target.value })} placeholder="Who can attend this event?" />
              </div>
              <div className="space-y-2">
                <Label>Answer *</Label>
                <Textarea value={form.a} onChange={e => setForm({ ...form, a: e.target.value })} placeholder="The event is open to all..." rows={4} />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={handleSave} disabled={!form.q || !form.a}>Save</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {faqs.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <HelpCircle className="h-12 w-12 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No FAQs added yet</p>
            </CardContent>
          </Card>
        ) : (
          faqs.map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{faq.q}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-2">{faq.a}</p>
                  </div>
                  <div className="flex gap-1 ml-4">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(index)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(index)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
