"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Image, Trash2, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { api } from "@/lib/api"

export default function GalleryManagementPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const slug = params.slug as string
  const [event, setEvent] = useState<any>(null)
  const [heroImage, setHeroImage] = useState("")
  const [newGalleryImage, setNewGalleryImage] = useState("")

  useEffect(() => {
    const authKey = sessionStorage.getItem("event_admin")

    if (authKey !== slug) {
      router.push(`/event/${slug}/manage/login`)
      return
    }

    const loadEvent = async () => {
      try {
        const data = await api.getEventBySlug(slug)
        setEvent(data)
        setHeroImage(data.media?.hero_image || data.bannerUrl || "")
      } catch {
        const publishedEvents = JSON.parse(localStorage.getItem("published_events") || "[]")
        const foundEvent = publishedEvents.find((e: any) => e.slug === slug)
        if (foundEvent) {
          setEvent(foundEvent)
          setHeroImage(foundEvent.media?.hero_image || "")
        }
      }
    }
    loadEvent()
  }, [slug, router])

  const updateEvent = (updatedEvent: any) => {
    const publishedEvents = JSON.parse(localStorage.getItem("published_events") || "[]")
    const index = publishedEvents.findIndex((e: any) => e.slug === slug)
    if (index !== -1) {
      publishedEvents[index] = updatedEvent
      localStorage.setItem("published_events", JSON.stringify(publishedEvents))
      setEvent(updatedEvent)
    }
  }

  const handleSaveHero = () => {
    if (!event) return
    const updatedEvent = {
      ...event,
      media: {
        ...event.media,
        hero_image: heroImage
      }
    }
    updateEvent(updatedEvent)
    toast({ title: "Success", description: "Hero image updated" })
  }

  const handleAddGalleryImage = () => {
    if (!event || !newGalleryImage) return
    const gallery = event.media?.gallery || []
    const updatedEvent = {
      ...event,
      media: {
        ...event.media,
        gallery: [...gallery, newGalleryImage]
      }
    }
    updateEvent(updatedEvent)
    setNewGalleryImage("")
    toast({ title: "Success", description: "Image added to gallery" })
  }

  const handleDeleteGalleryImage = (index: number) => {
    if (!event) return
    const gallery = [...(event.media?.gallery || [])]
    gallery.splice(index, 1)
    const updatedEvent = {
      ...event,
      media: {
        ...event.media,
        gallery
      }
    }
    updateEvent(updatedEvent)
    toast({ title: "Success", description: "Image removed from gallery" })
  }

  if (!event) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Gallery Management</h1>
        <p className="text-muted-foreground">Upload and manage {event?.category === "wedding" ? "wedding photos" : "event media"}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-5 w-5" />
            Hero Image
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hero">Hero Image URL</Label>
            <Input
              id="hero"
              type="url"
              placeholder="https://i.postimg.cc/..."
              value={heroImage}
              onChange={(e) => setHeroImage(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Upload to <a href="https://postimages.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">postimages.org</a> and paste URL
            </p>
          </div>
          {heroImage && (
            <div className="relative">
              <img src={heroImage} alt="Hero" className="w-full h-64 object-cover rounded-lg" />
            </div>
          )}
          <Button onClick={handleSaveHero}>Save Hero Image</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-5 w-5" />
            Gallery Images
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="url"
              placeholder="https://i.postimg.cc/..."
              value={newGalleryImage}
              onChange={(e) => setNewGalleryImage(e.target.value)}
            />
            <Button onClick={handleAddGalleryImage}>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {event.media?.gallery?.map((img: string, idx: number) => (
              <div key={idx} className="relative group">
                <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-48 object-cover rounded-lg" />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleDeleteGalleryImage(idx)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {(!event.media?.gallery || event.media.gallery.length === 0) && (
            <p className="text-center text-muted-foreground py-8">No gallery images yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
