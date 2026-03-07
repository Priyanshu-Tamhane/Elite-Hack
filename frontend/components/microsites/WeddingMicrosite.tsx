"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, MapPin, Heart, Clock, Phone, Mail, Hotel, Users, ChevronDown, Camera } from "lucide-react"
import { api } from "@/lib/api"

interface WeddingMicrositeProps {
  event: any
}

export function WeddingMicrosite({ event }: WeddingMicrositeProps) {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [formData, setFormData] = useState({ name: "", phone: "", guests: "1", meal: "veg" })
  const [scrolled, setScrolled] = useState(false)
  const primaryColor = "#C9986A"

  useEffect(() => {
    if (event.startDate) {
      const timer = setInterval(() => {
        const now = new Date().getTime()
        const eventDate = new Date(event.startDate).getTime()
        const distance = eventDate - now
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [event.startDate])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleRSVP = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.createRegistration(event.slug, {
        name: formData.name,
        phone: formData.phone,
        guestsCount: parseInt(formData.guests),
        mealPreference: formData.meal,
        status: "pending"
      })
      alert("RSVP submitted successfully!")
      setFormData({ name: "", phone: "", guests: "1", meal: "veg" })
    } catch (error) {
      alert("Failed to submit RSVP. Please try again.")
    }
  }

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div style={{ minHeight: "100vh", background: "#FFFCF8", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Jost:wght@300;400;500&display=swap');
        .wedding-display { font-family: 'Playfair Display', serif; }
        .wedding-body { font-family: 'Jost', sans-serif; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
        @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-14px); } }
        @keyframes pulse { 0%,100% { transform:scale(1); } 50% { transform:scale(1.05); } }
        .fade-up-1 { animation: fadeUp 1s ease 0.2s both; }
        .fade-up-2 { animation: fadeUp 1s ease 0.5s both; }
        .fade-up-3 { animation: fadeUp 1s ease 0.8s both; }
        .fade-up-4 { animation: fadeUp 1s ease 1.1s both; }
      `}</style>

      {/* Navigation */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        padding: scrolled ? "12px 40px" : "22px 40px",
        background: scrolled ? "rgba(255,252,248,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? `1px solid ${primaryColor}20` : "none",
        transition: "all 0.4s ease",
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <span className="wedding-display" style={{ fontSize: 20, fontStyle: "italic", letterSpacing: 2, color: scrolled ? "#1a1008" : "#fff" }}>
          {event.eventName?.split(" ")[0]?.[0] || "W"} & {event.eventName?.split(" ")[2]?.[0] || "W"}
        </span>
        <div style={{ display: "flex", gap: 32 }}>
          {["Story", "Ceremonies", "RSVP", "Gallery", "Contact"].map((l) => (
            <button key={l} onClick={() => scrollToSection(l.toLowerCase())} className="wedding-body"
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, letterSpacing: 3,
                textTransform: "uppercase", color: scrolled ? "#1a1008" : "rgba(255,255,255,0.9)", padding: "4px 0" }}>
              {l}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        minHeight: "100vh", position: "relative", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", overflow: "hidden",
        background: event.bannerUrl 
          ? `linear-gradient(rgba(10,6,3,0.45), rgba(10,6,3,0.55)), url(${event.bannerUrl}) center/cover`
          : `linear-gradient(135deg, #1a0f06 0%, #2e1a0a 50%, ${primaryColor}55 100%)`
      }}>
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 24px" }}>
          <div className="fade-up-1">
            <span className="wedding-display" style={{ fontSize: 13, letterSpacing: 6, color: primaryColor, fontStyle: "italic" }}>
              ✦ Together Forever ✦
            </span>
          </div>
          <div className="fade-up-2" style={{ margin: "28px 0 0" }}>
            <h1 className="wedding-display" style={{ fontSize: "clamp(56px, 13vw, 128px)", fontWeight: 400, color: "#fff",
              margin: 0, lineHeight: 0.88, letterSpacing: -3, textShadow: `0 0 120px ${primaryColor}55` }}>
              {event.eventName}
            </h1>
          </div>
          <div className="fade-up-3" style={{ marginTop: 36 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
              <div style={{ width: 52, height: 1, background: `linear-gradient(to right, transparent, ${primaryColor})` }} />
              <span className="wedding-body" style={{ color: "rgba(255,255,255,0.75)", fontSize: 15, letterSpacing: 4 }}>
                {event.startDate}
              </span>
              <div style={{ width: 52, height: 1, background: `linear-gradient(to left, transparent, ${primaryColor})` }} />
            </div>
            <p className="wedding-body" style={{ color: primaryColor, fontSize: 14, letterSpacing: 4, marginTop: 8 }}>
              {event.venue?.name || event.venue}
            </p>
          </div>
          <div className="fade-up-4" style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 52 }}>
            {[{ label: "Days", v: countdown.days }, { label: "Hours", v: countdown.hours },
              { label: "Mins", v: countdown.minutes }, { label: "Secs", v: countdown.seconds }].map(({ label, v }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ width: 84, height: 84, border: `1px solid ${primaryColor}50`, background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(10px)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
                  animation: label === "Secs" ? "pulse 1s ease-in-out infinite" : "none" }}>
                  <span className="wedding-display" style={{ fontSize: 34, color: "#fff", fontWeight: 500 }}>
                    {String(v).padStart(2, "0")}
                  </span>
                </div>
                <span className="wedding-body" style={{ display: "block", marginTop: 8, fontSize: 10, letterSpacing: 3,
                  color: primaryColor, textTransform: "uppercase" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", color: `${primaryColor}bb`,
          animation: "float 2.4s ease-in-out infinite" }}>
          <ChevronDown size={28} />
        </div>
      </section>

      {/* Story */}
      <section id="story" style={{ background: "#FFFCF8", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
              <div style={{ flex: 1, height: 1, background: `${primaryColor}30` }} />
              <span className="wedding-display" style={{ fontSize: 12, letterSpacing: 5, color: primaryColor, textTransform: "uppercase" }}>
                Our Journey
              </span>
              <div style={{ flex: 1, height: 1, background: `${primaryColor}30` }} />
            </div>
            <h2 className="wedding-display" style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 400, lineHeight: 1.15,
              margin: "0 0 40px", color: "#1a1008" }}>How It All Began</h2>
            <p className="wedding-display" style={{ fontSize: 20, fontStyle: "italic", lineHeight: 1.9, color: "#5c3d22", marginBottom: 40 }}>
              "{event.description}"
            </p>
          </div>
          <div style={{ position: "relative" }}>
            {event.media?.hero_image ? (
              <div style={{ width: "100%", aspectRatio: "3/4", borderRadius: 4, overflow: "hidden",
                boxShadow: "0 8px 32px rgba(0,0,0,0.12)", border: `1px solid ${primaryColor}30` }}>
                <img src={event.media.hero_image} alt="Our Photo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ) : (
              <div style={{ width: "100%", aspectRatio: "3/4", background: `linear-gradient(145deg, ${primaryColor}20, #f5ecd7)`,
                borderRadius: 4, border: `1px solid ${primaryColor}30`, display: "flex", alignItems: "center",
                justifyContent: "center", flexDirection: "column", gap: 12 }}>
                <Heart size={48} style={{ color: primaryColor }} />
                <span className="wedding-body" style={{ fontSize: 13, letterSpacing: 3, color: primaryColor }}>Our Photo</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Ceremonies */}
      {event.schedule && event.schedule.length > 0 && (
        <section id="ceremonies" style={{ background: "#1a0f06", padding: "100px 24px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, justifyContent: "center", marginBottom: 12 }}>
                <div style={{ width: 60, height: 1, background: `${primaryColor}30` }} />
                <span className="wedding-display" style={{ fontSize: 12, letterSpacing: 5, color: primaryColor, textTransform: "uppercase" }}>
                  The Celebrations
                </span>
                <div style={{ width: 60, height: 1, background: `${primaryColor}30` }} />
              </div>
              <h2 className="wedding-display" style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 400, color: "#fff8f0", margin: 0 }}>
                Wedding Ceremonies
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(event.schedule.length, 3)}, 1fr)`, gap: 2 }}>
              {event.schedule.map((c: any, i: number) => (
                <div key={i} style={{ background: i % 2 === 0 ? `${primaryColor}15` : `${primaryColor}08`,
                  borderTop: `2px solid ${primaryColor}30`, padding: "44px 28px", textAlign: "center" }}>
                  <div className="wedding-body" style={{ fontSize: 10, color: primaryColor, letterSpacing: 4,
                    textTransform: "uppercase", marginBottom: 10 }}>{c.date}</div>
                  <div className="wedding-display" style={{ fontSize: 22, color: "#fff8f0", marginBottom: 6 }}>{c.title}</div>
                  <div className="wedding-body" style={{ fontSize: 14, color: primaryColor, marginBottom: 14 }}>{c.time}</div>
                  {c.venue && (
                    <div className="wedding-body" style={{ fontSize: 12, color: "rgba(255,248,240,0.45)", letterSpacing: 1 }}>
                      📍 {c.venue}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RSVP */}
      {event.rsvp_settings?.enabled && (
        <section id="rsvp" style={{ background: "#FFFCF8", padding: "100px 24px" }}>
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, justifyContent: "center", marginBottom: 12 }}>
                <div style={{ width: 60, height: 1, background: `${primaryColor}30` }} />
                <span className="wedding-display" style={{ fontSize: 12, letterSpacing: 5, color: primaryColor, textTransform: "uppercase" }}>
                  Kindly Reply
                </span>
                <div style={{ width: 60, height: 1, background: `${primaryColor}30` }} />
              </div>
              <h2 className="wedding-display" style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 400, margin: 0, color: "#1a1008" }}>
                Will You Join Us?
              </h2>
            </div>
            <form onSubmit={handleRSVP} style={{ background: "#fff", borderRadius: 8, padding: 48,
              boxShadow: "0 4px 48px rgba(0,0,0,0.07)", border: `1px solid ${primaryColor}20` }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <div>
                  <Label className="wedding-body" style={{ fontSize: 11, letterSpacing: 3, color: "#8b6a3e", textTransform: "uppercase" }}>
                    Full Name
                  </Label>
                  <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Your full name" required style={{ marginTop: 8, borderColor: `${primaryColor}30` }} />
                </div>
                <div>
                  <Label className="wedding-body" style={{ fontSize: 11, letterSpacing: 3, color: "#8b6a3e", textTransform: "uppercase" }}>
                    Phone Number
                  </Label>
                  <Input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+91 00000 00000" required style={{ marginTop: 8, borderColor: `${primaryColor}30` }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  {event.rsvp_settings.plus_one && (
                    <div>
                      <Label className="wedding-body" style={{ fontSize: 11, letterSpacing: 3, color: "#8b6a3e", textTransform: "uppercase" }}>
                        Guests
                      </Label>
                      <Input type="number" min="1" max={event.rsvp_settings.max_guests} value={formData.guests}
                        onChange={(e) => setFormData({...formData, guests: e.target.value})} style={{ marginTop: 8, borderColor: `${primaryColor}30` }} />
                    </div>
                  )}
                  {event.rsvp_settings.meal_preference && (
                    <div>
                      <Label className="wedding-body" style={{ fontSize: 11, letterSpacing: 3, color: "#8b6a3e", textTransform: "uppercase" }}>
                        Meal
                      </Label>
                      <select value={formData.meal} onChange={(e) => setFormData({...formData, meal: e.target.value})}
                        style={{ width: "100%", marginTop: 8, padding: "10px", borderRadius: 6, border: `1px solid ${primaryColor}30`,
                        background: "#fff", fontSize: 14 }}>
                        <option value="veg">Vegetarian</option>
                        <option value="nonveg">Non-Vegetarian</option>
                        <option value="vegan">Vegan</option>
                      </select>
                    </div>
                  )}
                </div>
                <Button type="submit" className="wedding-body" style={{ background: primaryColor, marginTop: 8, padding: "18px",
                  fontSize: 13, letterSpacing: 4, textTransform: "uppercase" }}>
                  Confirm Attendance
                </Button>
              </div>
            </form>
          </div>
        </section>
      )}

      {/* Accommodation */}
      {event.accommodation?.hotel_name && (
        <section style={{ background: "#f5ecd7", padding: "100px 24px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ marginBottom: 52 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
                <div style={{ flex: 1, height: 1, background: `${primaryColor}30` }} />
                <span className="wedding-display" style={{ fontSize: 12, letterSpacing: 5, color: primaryColor, textTransform: "uppercase" }}>
                  Where to Stay
                </span>
                <div style={{ flex: 1, height: 1, background: `${primaryColor}30` }} />
              </div>
              <h2 className="wedding-display" style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 400, margin: 0, color: "#1a1008",
                textAlign: "center" }}>{event.accommodation.hotel_name}</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
              {[
                { label: "Twin Rooms", count: event.accommodation.twin_rooms, icon: "🛏" },
                { label: "Suites", count: event.accommodation.suites, icon: "🏨" },
                { label: "Bunk Beds", count: event.accommodation.bunk_beds, icon: "🪵" }
              ].filter(r => r.count).map((r, i) => (
                <div key={i} style={{ padding: "32px 28px", background: "#FFFCF8", borderLeft: `3px solid ${primaryColor}`,
                  borderRadius: "0 6px 6px 0", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", textAlign: "center" }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{r.icon}</div>
                  <div className="wedding-display" style={{ fontSize: 20, color: "#1a1008", marginBottom: 4 }}>{r.label}</div>
                  <div className="wedding-body" style={{ fontSize: 13, color: "#8b6a3e" }}>{r.count} available</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      <section id="gallery" style={{ background: "#FFFCF8", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, justifyContent: "center", marginBottom: 12 }}>
              <div style={{ width: 60, height: 1, background: `${primaryColor}30` }} />
              <span className="wedding-display" style={{ fontSize: 12, letterSpacing: 5, color: primaryColor, textTransform: "uppercase" }}>
                Captured Moments
              </span>
              <div style={{ width: 60, height: 1, background: `${primaryColor}30` }} />
            </div>
            <h2 className="wedding-display" style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 400, margin: 0, color: "#1a1008" }}>
              Our Gallery
            </h2>
          </div>
          {event.media?.gallery && event.media.gallery.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
              {event.media.gallery.map((src: string, i: number) => (
                <div key={i} style={{ aspectRatio: "1/1", borderRadius: 4, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
                  <img src={src} alt={`Gallery ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "80px 24px", background: `linear-gradient(135deg, ${primaryColor}08, #f5ecd744)`,
              border: `1px solid ${primaryColor}20`, borderRadius: 8 }}>
              <Camera size={52} style={{ color: primaryColor, marginBottom: 20 }} />
              <p className="wedding-display" style={{ fontSize: 24, color: "#1a1008", fontStyle: "italic", margin: "0 0 8px" }}>
                Coming Soon
              </p>
              <p className="wedding-body" style={{ fontSize: 16, color: "#8b6a3e" }}>
                Photos will appear here after the event
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact */}
      {event.contact?.name && (
        <section id="contact" style={{ background: "#1a0f06", padding: "100px 24px" }}>
          <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, justifyContent: "center", marginBottom: 12 }}>
              <div style={{ width: 60, height: 1, background: `${primaryColor}30` }} />
              <span className="wedding-display" style={{ fontSize: 12, letterSpacing: 5, color: primaryColor, textTransform: "uppercase" }}>
                Get in Touch
              </span>
              <div style={{ width: 60, height: 1, background: `${primaryColor}30` }} />
            </div>
            <h2 className="wedding-display" style={{ fontSize: 48, fontWeight: 400, color: "#fff8f0", margin: "0 0 48px" }}>
              Contact Us
            </h2>
            <div style={{ background: `${primaryColor}10`, border: `1px solid ${primaryColor}25`, borderRadius: 8, padding: "52px 48px" }}>
              <h3 className="wedding-display" style={{ fontSize: 26, color: "#fff8f0", margin: "0 0 32px" }}>{event.contact.name}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
                  <Phone size={16} style={{ color: primaryColor }} />
                  <span className="wedding-body" style={{ fontSize: 18, color: "rgba(255,248,240,0.8)" }}>{event.contact.phone}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
                  <Mail size={16} style={{ color: primaryColor }} />
                  <span className="wedding-body" style={{ fontSize: 18, color: "rgba(255,248,240,0.8)" }}>{event.contact.email}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ position: "relative", padding: "100px 24px", background: `linear-gradient(135deg, #1a0f06, #2e1a0a, ${primaryColor}66)`,
        textAlign: "center" }}>
        <Heart size={52} style={{ color: primaryColor, marginBottom: 24 }} />
        <h2 className="wedding-display" style={{ fontSize: "clamp(32px,5vw,56px)", fontWeight: 400, color: "#fff8f0", margin: "0 0 16px" }}>
          Join Us on Our Special Day
        </h2>
        <p className="wedding-body" style={{ fontSize: 18, color: "rgba(255,248,240,0.6)", marginBottom: 40 }}>
          We'd be honoured to celebrate with you
        </p>
        {event.rsvp_settings?.enabled && (
          <button onClick={() => scrollToSection("rsvp")} className="wedding-body"
            style={{ padding: "18px 52px", background: primaryColor, color: "#fff", border: "none", borderRadius: 4,
            fontSize: 13, letterSpacing: 4, textTransform: "uppercase", cursor: "pointer" }}>
            RSVP Now
          </button>
        )}
      </section>

      {/* Footer */}
      <footer style={{ background: "#0d0703", padding: "48px 24px", textAlign: "center" }}>
        <div className="wedding-display" style={{ fontSize: 34, fontStyle: "italic", color: "#fff8f0", marginBottom: 8 }}>
          {event.eventName}
        </div>
        <div className="wedding-body" style={{ fontSize: 11, color: primaryColor, letterSpacing: 5, textTransform: "uppercase", marginBottom: 24 }}>
          {event.startDate} · {event.venue?.name || event.venue}
        </div>
        <p className="wedding-body" style={{ fontSize: 13, color: "rgba(255,248,240,0.25)", margin: 0 }}>
          Powered by EventSphere
        </p>
      </footer>
    </div>
  )
}
