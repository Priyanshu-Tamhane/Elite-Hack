"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Hotel, Calendar, MapPin, Phone, Plus, Trash2 } from "lucide-react"

interface WeddingInventoryProps {
  onDataChange: (data: any) => void
}

export function WeddingInventory({ onDataChange }: WeddingInventoryProps) {
  const [rsvpEnabled, setRsvpEnabled] = useState(true)
  const [plusOneEnabled, setPlusOneEnabled] = useState(true)
  const [maxGuests, setMaxGuests] = useState("4")
  const [mealPreference, setMealPreference] = useState(true)
  
  const [schedule, setSchedule] = useState([
    { id: 1, title: "", date: "", time: "", venue: "", description: "" }
  ])
  
  const [venueName, setVenueName] = useState("")
  const [venueAddress, setVenueAddress] = useState("")
  const [venueMap, setVenueMap] = useState("")
  const [parking, setParking] = useState("")
  
  const [contactName, setContactName] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [altContact, setAltContact] = useState("")
  
  const [hotelName, setHotelName] = useState("")
  const [checkinDate, setCheckinDate] = useState("")
  const [checkoutDate, setCheckoutDate] = useState("")
  const [twinRooms, setTwinRooms] = useState("40")
  const [suites, setSuites] = useState("10")
  const [bunkBeds, setBunkBeds] = useState("100")

  // Update parent component whenever data changes
  useEffect(() => {
    const data = {
      rsvp_settings: {
        enabled: rsvpEnabled,
        plus_one: plusOneEnabled,
        max_guests: maxGuests,
        meal_preference: mealPreference
      },
      schedule,
      venue: {
        name: venueName,
        address: venueAddress,
        map: venueMap,
        parking
      },
      contact: {
        name: contactName,
        phone: contactPhone,
        email: contactEmail,
        alt_contact: altContact
      },
      accommodation: {
        hotel_name: hotelName,
        checkin: checkinDate,
        checkout: checkoutDate,
        twin_rooms: twinRooms,
        suites: suites,
        bunk_beds: bunkBeds
      }
    }
    onDataChange(data)
  }, [rsvpEnabled, plusOneEnabled, maxGuests, mealPreference, schedule, venueName, venueAddress, venueMap, parking, contactName, contactPhone, contactEmail, altContact, hotelName, checkinDate, checkoutDate, twinRooms, suites, bunkBeds, onDataChange])

  const addScheduleItem = () => {
    setSchedule([...schedule, { id: Date.now(), title: "", date: "", time: "", venue: "", description: "" }])
  }

  const removeScheduleItem = (id: number) => {
    setSchedule(schedule.filter(item => item.id !== id))
  }

  const updateScheduleItem = (id: number, field: string, value: string) => {
    setSchedule(schedule.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  return (
    <div className="space-y-6">
      {/* RSVP Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            RSVP Settings
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Control how guests respond through the wedding microsite
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="rsvp-enabled">Enable RSVP</Label>
            <Switch id="rsvp-enabled" checked={rsvpEnabled} onCheckedChange={setRsvpEnabled} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="plus-one">Enable Plus One Guests</Label>
            <Switch id="plus-one" checked={plusOneEnabled} onCheckedChange={setPlusOneEnabled} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="max-guests">Max Guests Per Invite</Label>
            <Input id="max-guests" type="number" value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="meal-pref">Enable Meal Preference Selection</Label>
            <Switch id="meal-pref" checked={mealPreference} onCheckedChange={setMealPreference} />
          </div>
        </CardContent>
      </Card>

      {/* Wedding Ceremony Schedule */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Wedding Ceremony Schedule
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Add multiple ceremony events for the wedding timeline
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={addScheduleItem}>
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {schedule.map((item, index) => (
            <div key={item.id} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <Label>Event {index + 1}</Label>
                {schedule.length > 1 && (
                  <Button variant="ghost" size="sm" onClick={() => removeScheduleItem(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Ceremony Name</Label>
                  <Input 
                    placeholder="e.g. Haldi Ceremony" 
                    value={item.title}
                    onChange={(e) => updateScheduleItem(item.id, 'title', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Venue</Label>
                  <Input 
                    placeholder="e.g. Garden Lawn" 
                    value={item.venue}
                    onChange={(e) => updateScheduleItem(item.id, 'venue', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input 
                    type="date" 
                    value={item.date}
                    onChange={(e) => updateScheduleItem(item.id, 'date', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Time</Label>
                  <Input 
                    type="time" 
                    value={item.time}
                    onChange={(e) => updateScheduleItem(item.id, 'time', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description (Optional)</Label>
                <Textarea 
                  placeholder="Brief description of the ceremony" 
                  value={item.description}
                  onChange={(e) => updateScheduleItem(item.id, 'description', e.target.value)}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Venue Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Venue Information
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Location details displayed on the microsite
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="venue-name">Venue Name</Label>
            <Input id="venue-name" placeholder="e.g. Taj Hotel Pune" value={venueName} onChange={(e) => setVenueName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="venue-address">Full Address</Label>
            <Textarea id="venue-address" placeholder="Complete address" value={venueAddress} onChange={(e) => setVenueAddress(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="venue-map">Google Maps Link</Label>
            <Input id="venue-map" type="url" placeholder="https://maps.google.com/..." value={venueMap} onChange={(e) => setVenueMap(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="parking">Parking Information (Optional)</Label>
            <Textarea id="parking" placeholder="Parking details" value={parking} onChange={(e) => setParking(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            Contact Information
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Help guests reach out for assistance
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contact-name">Contact Person Name</Label>
              <Input id="contact-name" placeholder="e.g. Amit Sharma" value={contactName} onChange={(e) => setContactName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-phone">Phone Number</Label>
              <Input id="contact-phone" type="tel" placeholder="9876543210" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Email Address</Label>
              <Input id="contact-email" type="email" placeholder="amit@email.com" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="alt-contact">Alternate Contact (Optional)</Label>
              <Input id="alt-contact" type="tel" placeholder="Alternate phone" value={altContact} onChange={(e) => setAltContact(e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accommodation Meta Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hotel className="h-5 w-5 text-primary" />
            Accommodation Details
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Hotel and room allocation for guests
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hotel-name">Hotel Name</Label>
            <Input id="hotel-name" placeholder="e.g. Taj Hotel Pune" value={hotelName} onChange={(e) => setHotelName(e.target.value)} />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="checkin">Check-in Date</Label>
              <Input id="checkin" type="date" value={checkinDate} onChange={(e) => setCheckinDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="checkout">Check-out Date</Label>
              <Input id="checkout" type="date" value={checkoutDate} onChange={(e) => setCheckoutDate(e.target.value)} />
            </div>
          </div>
          <div className="space-y-4 pt-4 border-t">
            <Label>Room Allocation</Label>
            <div className="grid gap-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Standard Twin Room</p>
                  <p className="text-xs text-muted-foreground">2 Guests per room</p>
                </div>
                <Input type="number" value={twinRooms} onChange={(e) => setTwinRooms(e.target.value)} className="w-20 text-center" />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Single Suite</p>
                  <p className="text-xs text-muted-foreground">Private room</p>
                </div>
                <Input type="number" value={suites} onChange={(e) => setSuites(e.target.value)} className="w-20 text-center" />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Bunk Beds (Hostel Style)</p>
                  <p className="text-xs text-muted-foreground">Shared space</p>
                </div>
                <Input type="number" value={bunkBeds} onChange={(e) => setBunkBeds(e.target.value)} className="w-20 text-center" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
