"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Calendar, Users, Ticket, MapPin, Building2, Image, HelpCircle, Phone, Share2, Palette } from "lucide-react"

interface OtherInventoryProps {
  onDataChange: (data: any) => void
}

export function OtherInventory({ onDataChange }: OtherInventoryProps) {
  const [tagline, setTagline] = useState("")
  const [bannerUrl, setBannerUrl] = useState("")
  const [startDate, setStartDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endDate, setEndDate] = useState("")
  const [endTime, setEndTime] = useState("")
  const [location, setLocation] = useState("")
  const [address, setAddress] = useState("")
  const [description, setDescription] = useState("")
  const [purpose, setPurpose] = useState("")
  const [audience, setAudience] = useState("")
  
  const [highlights, setHighlights] = useState([{ id: 1, icon: "", title: "", description: "" }])
  const [schedule, setSchedule] = useState([{ id: 1, day: "", items: [{ id: 1, title: "", type: "keynote", speaker: "", time: "", description: "" }] }])
  const [speakers, setSpeakers] = useState([{ id: 1, name: "", role: "", org: "", topic: "", photoUrl: "", bio: "" }])
  const [tickets, setTickets] = useState([{ id: 1, name: "", price: "", description: "", perks: "", quantity: "", popular: false }])
  
  const [venueName, setVenueName] = useState("")
  const [venueAddress, setVenueAddress] = useState("")
  const [mapLink, setMapLink] = useState("")
  const [parking, setParking] = useState("")
  const [directions, setDirections] = useState("")
  
  const [sponsors, setSponsors] = useState([{ id: 1, name: "", tier: "Gold Sponsor", logoUrl: "", websiteUrl: "" }])
  const [heroImage, setHeroImage] = useState("")
  const [galleryImages, setGalleryImages] = useState("")
  const [faqs, setFaqs] = useState([{ id: 1, question: "", answer: "" }])
  
  const [contactName, setContactName] = useState("")
  const [contactRole, setContactRole] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactLinkedin, setContactLinkedin] = useState("")
  
  const [instagram, setInstagram] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [youtube, setYoutube] = useState("")
  const [twitter, setTwitter] = useState("")
  
  const [primaryColor, setPrimaryColor] = useState("#0A84FF")
  const [bgColor, setBgColor] = useState("#F8FAFF")
  const [darkColor, setDarkColor] = useState("#09111F")
  const [fontStyle, setFontStyle] = useState("Modern Sans")

  useEffect(() => {
    onDataChange({
      hero: { tagline, bannerUrl, startDate, startTime, endDate, endTime, location, address },
      about: { description, purpose, audience },
      highlights: highlights.map(h => ({ icon: h.icon, title: h.title, description: h.description })),
      schedule: schedule.map(s => ({ day: s.day, items: s.items.map(i => ({ title: i.title, type: i.type, speaker: i.speaker, time: i.time, description: i.description })) })),
      speakers: speakers.map(s => ({ name: s.name, role: s.role, org: s.org, topic: s.topic, photoUrl: s.photoUrl, bio: s.bio })),
      tickets: tickets.map(t => ({ name: t.name, price: t.price, description: t.description, perks: t.perks.split(",").map(p => p.trim()), quantity: Number(t.quantity), popular: t.popular })),
      venue: { name: venueName, address: venueAddress, mapLink, parking, directions },
      sponsors: sponsors.map(s => ({ name: s.name, tier: s.tier, logoUrl: s.logoUrl, websiteUrl: s.websiteUrl })),
      gallery: { heroImage, images: galleryImages.split(",").map(i => i.trim()).filter(Boolean) },
      faq: faqs.map(f => ({ question: f.question, answer: f.answer })),
      contact: { name: contactName, role: contactRole, phone: contactPhone, email: contactEmail, linkedin: contactLinkedin },
      social: { instagram, linkedin, youtube, twitter },
      theme: { primaryColor, bgColor, darkColor, fontStyle }
    })
  }, [tagline, bannerUrl, startDate, startTime, endDate, endTime, location, address, description, purpose, audience, highlights, schedule, speakers, tickets, venueName, venueAddress, mapLink, parking, directions, sponsors, heroImage, galleryImages, faqs, contactName, contactRole, contactPhone, contactEmail, contactLinkedin, instagram, linkedin, youtube, twitter, primaryColor, bgColor, darkColor, fontStyle])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5 text-primary" />Hero / Basic Information</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2"><Label>Event Tagline</Label><Input value={tagline} onChange={e => setTagline(e.target.value)} placeholder="Exploring the Future of AI" /></div>
            <div className="space-y-2"><Label>Banner Image URL</Label><Input value={bannerUrl} onChange={e => setBannerUrl(e.target.value)} placeholder="https://..." /></div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2"><Label>Start Date</Label><Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} /></div>
            <div className="space-y-2"><Label>Start Time</Label><Input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} /></div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2"><Label>End Date</Label><Input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} /></div>
            <div className="space-y-2"><Label>End Time</Label><Input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} /></div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2"><Label>Location</Label><Input value={location} onChange={e => setLocation(e.target.value)} placeholder="Pune Convention Center" /></div>
            <div className="space-y-2"><Label>Full Address</Label><Input value={address} onChange={e => setAddress(e.target.value)} placeholder="Senapati Bapat Road, Pune" /></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" />About Event</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2"><Label>Event Description</Label><Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe your event..." rows={4} /></div>
          <div className="space-y-2"><Label>Event Purpose</Label><Textarea value={purpose} onChange={e => setPurpose(e.target.value)} placeholder="What is the goal of this event?" rows={3} /></div>
          <div className="space-y-2"><Label>Target Audience</Label><Textarea value={audience} onChange={e => setAudience(e.target.value)} placeholder="Who should attend? (e.g., AI researchers, developers, students)" rows={3} /></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2"><Ticket className="h-5 w-5 text-primary" />Event Highlights</CardTitle>
            <Button variant="outline" size="sm" onClick={() => setHighlights([...highlights, { id: Date.now(), icon: "", title: "", description: "" }])}><Plus className="mr-2 h-4 w-4" />Add Highlight</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {highlights.map((h, i) => (
            <div key={h.id} className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm">Highlight {i + 1}</span>
                {highlights.length > 1 && <Button variant="ghost" size="sm" onClick={() => setHighlights(highlights.filter(x => x.id !== h.id))}><Trash2 className="h-4 w-4" /></Button>}
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <Input placeholder="Icon (emoji)" value={h.icon} onChange={e => setHighlights(highlights.map(x => x.id === h.id ? { ...x, icon: e.target.value } : x))} />
                <Input placeholder="Title" value={h.title} onChange={e => setHighlights(highlights.map(x => x.id === h.id ? { ...x, title: e.target.value } : x))} />
                <Input placeholder="Description" value={h.description} onChange={e => setHighlights(highlights.map(x => x.id === h.id ? { ...x, description: e.target.value } : x))} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5 text-primary" />Event Schedule</CardTitle>
            <Button variant="outline" size="sm" onClick={() => setSchedule([...schedule, { id: Date.now(), day: "", items: [{ id: Date.now(), title: "", type: "keynote", speaker: "", time: "", description: "" }] }])}><Plus className="mr-2 h-4 w-4" />Add Day</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {schedule.map((day, dayIdx) => (
            <div key={day.id} className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Input placeholder="Day (e.g., Day 1 - March 20)" value={day.day} onChange={e => setSchedule(schedule.map(d => d.id === day.id ? { ...d, day: e.target.value } : d))} className="max-w-xs" />
                {schedule.length > 1 && <Button variant="ghost" size="sm" onClick={() => setSchedule(schedule.filter(d => d.id !== day.id))}><Trash2 className="h-4 w-4" /></Button>}
              </div>
              <Button variant="outline" size="sm" onClick={() => setSchedule(schedule.map(d => d.id === day.id ? { ...d, items: [...d.items, { id: Date.now(), title: "", type: "keynote", speaker: "", time: "", description: "" }] } : d))}><Plus className="mr-2 h-4 w-4" />Add Session</Button>
              {day.items.map((item, itemIdx) => (
                <div key={item.id} className="ml-4 rounded border p-3 space-y-2 bg-muted/30">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold">Session {itemIdx + 1}</span>
                    {day.items.length > 1 && <Button variant="ghost" size="sm" onClick={() => setSchedule(schedule.map(d => d.id === day.id ? { ...d, items: d.items.filter(i => i.id !== item.id) } : d))}><Trash2 className="h-3 w-3" /></Button>}
                  </div>
                  <div className="grid gap-2 md:grid-cols-2">
                    <Input placeholder="Session Title" value={item.title} onChange={e => setSchedule(schedule.map(d => d.id === day.id ? { ...d, items: d.items.map(i => i.id === item.id ? { ...i, title: e.target.value } : i) } : d))} />
                    <Select value={item.type} onValueChange={v => setSchedule(schedule.map(d => d.id === day.id ? { ...d, items: d.items.map(i => i.id === item.id ? { ...i, type: v } : i) } : d))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{["keynote", "workshop", "panel", "special", "logistics"].map(t => <SelectItem key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2 md:grid-cols-2">
                    <Input placeholder="Speaker Name" value={item.speaker} onChange={e => setSchedule(schedule.map(d => d.id === day.id ? { ...d, items: d.items.map(i => i.id === item.id ? { ...i, speaker: e.target.value } : i) } : d))} />
                    <Input type="time" value={item.time} onChange={e => setSchedule(schedule.map(d => d.id === day.id ? { ...d, items: d.items.map(i => i.id === item.id ? { ...i, time: e.target.value } : i) } : d))} />
                  </div>
                  <Input placeholder="Description" value={item.description} onChange={e => setSchedule(schedule.map(d => d.id === day.id ? { ...d, items: d.items.map(i => i.id === item.id ? { ...i, description: e.target.value } : i) } : d))} />
                </div>
              ))}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" />Speakers / Guests</CardTitle>
            <Button variant="outline" size="sm" onClick={() => setSpeakers([...speakers, { id: Date.now(), name: "", role: "", org: "", topic: "", photoUrl: "", bio: "" }])}><Plus className="mr-2 h-4 w-4" />Add Speaker</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {speakers.map((s, i) => (
            <div key={s.id} className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm">Speaker {i + 1}</span>
                {speakers.length > 1 && <Button variant="ghost" size="sm" onClick={() => setSpeakers(speakers.filter(x => x.id !== s.id))}><Trash2 className="h-4 w-4" /></Button>}
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <Input placeholder="Name" value={s.name} onChange={e => setSpeakers(speakers.map(x => x.id === s.id ? { ...x, name: e.target.value } : x))} />
                <Input placeholder="Role" value={s.role} onChange={e => setSpeakers(speakers.map(x => x.id === s.id ? { ...x, role: e.target.value } : x))} />
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <Input placeholder="Organization" value={s.org} onChange={e => setSpeakers(speakers.map(x => x.id === s.id ? { ...x, org: e.target.value } : x))} />
                <Input placeholder="Topic" value={s.topic} onChange={e => setSpeakers(speakers.map(x => x.id === s.id ? { ...x, topic: e.target.value } : x))} />
              </div>
              <Input placeholder="Photo URL" value={s.photoUrl} onChange={e => setSpeakers(speakers.map(x => x.id === s.id ? { ...x, photoUrl: e.target.value } : x))} />
              <Textarea placeholder="Bio" value={s.bio} onChange={e => setSpeakers(speakers.map(x => x.id === s.id ? { ...x, bio: e.target.value } : x))} rows={2} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2"><Ticket className="h-5 w-5 text-primary" />Ticket Types</CardTitle>
            <Button variant="outline" size="sm" onClick={() => setTickets([...tickets, { id: Date.now(), name: "", price: "", description: "", perks: "", quantity: "", popular: false }])}><Plus className="mr-2 h-4 w-4" />Add Ticket</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {tickets.map((t, i) => (
            <div key={t.id} className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm">Ticket {i + 1}</span>
                {tickets.length > 1 && <Button variant="ghost" size="sm" onClick={() => setTickets(tickets.filter(x => x.id !== t.id))}><Trash2 className="h-4 w-4" /></Button>}
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <Input placeholder="Name" value={t.name} onChange={e => setTickets(tickets.map(x => x.id === t.id ? { ...x, name: e.target.value } : x))} />
                <Input placeholder="Price" value={t.price} onChange={e => setTickets(tickets.map(x => x.id === t.id ? { ...x, price: e.target.value } : x))} />
                <Input type="number" placeholder="Quantity" value={t.quantity} onChange={e => setTickets(tickets.map(x => x.id === t.id ? { ...x, quantity: e.target.value } : x))} />
              </div>
              <Input placeholder="Description" value={t.description} onChange={e => setTickets(tickets.map(x => x.id === t.id ? { ...x, description: e.target.value } : x))} />
              <Input placeholder="Perks (comma separated)" value={t.perks} onChange={e => setTickets(tickets.map(x => x.id === t.id ? { ...x, perks: e.target.value } : x))} />
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={t.popular} onChange={e => setTickets(tickets.map(x => x.id === t.id ? { ...x, popular: e.target.checked } : x))} />
                <Label>Mark as Popular</Label>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" />Venue Information</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2"><Label>Venue Name</Label><Input value={venueName} onChange={e => setVenueName(e.target.value)} placeholder="Convention Center" /></div>
            <div className="space-y-2"><Label>Venue Address</Label><Input value={venueAddress} onChange={e => setVenueAddress(e.target.value)} placeholder="Full address" /></div>
          </div>
          <div className="space-y-2"><Label>Google Maps Link</Label><Input value={mapLink} onChange={e => setMapLink(e.target.value)} placeholder="https://maps.google.com/..." /></div>
          <div className="space-y-2"><Label>Parking Information</Label><Textarea value={parking} onChange={e => setParking(e.target.value)} placeholder="Parking details" rows={2} /></div>
          <div className="space-y-2"><Label>Travel Directions</Label><Textarea value={directions} onChange={e => setDirections(e.target.value)} placeholder="How to reach" rows={2} /></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2"><Building2 className="h-5 w-5 text-primary" />Sponsors</CardTitle>
            <Button variant="outline" size="sm" onClick={() => setSponsors([...sponsors, { id: Date.now(), name: "", tier: "Gold Sponsor", logoUrl: "", websiteUrl: "" }])}><Plus className="mr-2 h-4 w-4" />Add Sponsor</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {sponsors.map((s, i) => (
            <div key={s.id} className="flex gap-3 items-start rounded-lg border p-3">
              <div className="flex-1 grid grid-cols-4 gap-3">
                <Input placeholder="Name" value={s.name} onChange={e => setSponsors(sponsors.map(x => x.id === s.id ? { ...x, name: e.target.value } : x))} />
                <Select value={s.tier} onValueChange={v => setSponsors(sponsors.map(x => x.id === s.id ? { ...x, tier: v } : x))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{["Title Sponsor", "Gold Sponsor", "Silver Sponsor", "Community Partner", "Media Partner"].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
                <Input placeholder="Logo URL" value={s.logoUrl} onChange={e => setSponsors(sponsors.map(x => x.id === s.id ? { ...x, logoUrl: e.target.value } : x))} />
                <Input placeholder="Website" value={s.websiteUrl} onChange={e => setSponsors(sponsors.map(x => x.id === s.id ? { ...x, websiteUrl: e.target.value } : x))} />
              </div>
              {sponsors.length > 1 && <Button variant="ghost" size="icon" onClick={() => setSponsors(sponsors.filter(x => x.id !== s.id))}><Trash2 className="h-4 w-4" /></Button>}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Image className="h-5 w-5 text-primary" />Gallery</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2"><Label>Hero Image URL</Label><Input value={heroImage} onChange={e => setHeroImage(e.target.value)} placeholder="https://..." /></div>
          <div className="space-y-2"><Label>Gallery Images (comma separated URLs)</Label><Textarea value={galleryImages} onChange={e => setGalleryImages(e.target.value)} placeholder="https://..., https://..." rows={3} /></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2"><HelpCircle className="h-5 w-5 text-primary" />FAQ</CardTitle>
            <Button variant="outline" size="sm" onClick={() => setFaqs([...faqs, { id: Date.now(), question: "", answer: "" }])}><Plus className="mr-2 h-4 w-4" />Add FAQ</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {faqs.map((f, i) => (
            <div key={f.id} className="rounded-lg border p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">FAQ {i + 1}</span>
                {faqs.length > 1 && <Button variant="ghost" size="sm" onClick={() => setFaqs(faqs.filter(x => x.id !== f.id))}><Trash2 className="h-4 w-4" /></Button>}
              </div>
              <Input placeholder="Question" value={f.question} onChange={e => setFaqs(faqs.map(x => x.id === f.id ? { ...x, question: e.target.value } : x))} />
              <Textarea placeholder="Answer" value={f.answer} onChange={e => setFaqs(faqs.map(x => x.id === f.id ? { ...x, answer: e.target.value } : x))} rows={2} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Phone className="h-5 w-5 text-primary" />Contact Information</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2"><Label>Contact Person Name</Label><Input value={contactName} onChange={e => setContactName(e.target.value)} placeholder="John Doe" /></div>
            <div className="space-y-2"><Label>Role</Label><Input value={contactRole} onChange={e => setContactRole(e.target.value)} placeholder="Event Coordinator" /></div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2"><Label>Phone</Label><Input value={contactPhone} onChange={e => setContactPhone(e.target.value)} placeholder="+91 98765 43210" /></div>
            <div className="space-y-2"><Label>Email</Label><Input value={contactEmail} onChange={e => setContactEmail(e.target.value)} placeholder="contact@event.com" /></div>
          </div>
          <div className="space-y-2"><Label>LinkedIn / Website</Label><Input value={contactLinkedin} onChange={e => setContactLinkedin(e.target.value)} placeholder="linkedin.com/in/..." /></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Share2 className="h-5 w-5 text-primary" />Social Media Links</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2"><Label>Instagram</Label><Input value={instagram} onChange={e => setInstagram(e.target.value)} placeholder="@yourevent" /></div>
            <div className="space-y-2"><Label>LinkedIn</Label><Input value={linkedin} onChange={e => setLinkedin(e.target.value)} placeholder="Event Page" /></div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2"><Label>YouTube</Label><Input value={youtube} onChange={e => setYoutube(e.target.value)} placeholder="Channel Name" /></div>
            <div className="space-y-2"><Label>Twitter / X</Label><Input value={twitter} onChange={e => setTwitter(e.target.value)} placeholder="@yourevent" /></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Palette className="h-5 w-5 text-primary" />Theme Settings</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2"><Label>Primary Color</Label><Input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} /></div>
            <div className="space-y-2"><Label>Background Color</Label><Input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} /></div>
            <div className="space-y-2"><Label>Dark Theme Color</Label><Input type="color" value={darkColor} onChange={e => setDarkColor(e.target.value)} /></div>
          </div>
          <div className="space-y-2">
            <Label>Font Style</Label>
            <Select value={fontStyle} onValueChange={setFontStyle}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{["Modern Sans", "Classic Serif", "Bold Display", "Minimal"].map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
