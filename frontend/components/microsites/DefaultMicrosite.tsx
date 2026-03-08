"use client"

import { useState, useEffect } from "react"

/* ═══════════════════════════════════════════════════════════
   MOCK DATA — AI Innovation Conference 2026
═══════════════════════════════════════════════════════════ */
const EVENT = {
  name: "AI Innovation Conference 2026",
  tagline: "Exploring the Future of Artificial Intelligence",
  slug: "ai-innovation-conference-2026",
  category: "Conference",
  dates: "March 20–21, 2026",
  startDate: "2026-03-20T09:00:00",
  location: "Pune Convention Center",
  address: "Senapati Bapat Road, Pune, Maharashtra 411016",
  description:
    "The AI Innovation Conference brings together industry leaders, researchers, and developers to explore the latest breakthroughs in Artificial Intelligence. Two days of keynotes, hands-on workshops, and meaningful networking with the minds shaping tomorrow.",
  purpose: "Our goal is to bridge the gap between cutting-edge AI research and real-world application — empowering professionals across sectors to harness AI responsibly and effectively.",
  audience: "AI researchers, software engineers, startup founders, product managers, students in tech, and enterprise decision-makers looking to understand AI's strategic impact.",
  theme: { primary: "#0A84FF", bg: "#F8FAFF", dark: "#09111F" },
  highlights: [
    { icon: "🎤", label: "12+ Expert Speakers", desc: "Industry leaders from Google, Microsoft & top research labs" },
    { icon: "🛠", label: "15+ Workshops", desc: "Hands-on sessions on LLMs, Computer Vision, and AI Ethics" },
    { icon: "🚀", label: "Startup Showcase", desc: "10 AI startups pitching to a live investor panel" },
    { icon: "🤝", label: "Networking Sessions", desc: "Structured networking with 500+ professionals" },
    { icon: "📜", label: "Certificates", desc: "Official certificate of participation for all attendees" },
    { icon: "🎁", label: "Swag Kit", desc: "Exclusive conference merchandise for registered attendees" },
  ],
  schedule: [
    {
      day: "Day 1 — March 20",
      items: [
        { time: "09:00 AM", title: "Registration & Welcome Coffee", type: "logistics", speaker: "" },
        { time: "10:00 AM", title: "Opening Keynote: AI in 2026 and Beyond", type: "keynote", speaker: "Dr. Priya Kapoor" },
        { time: "11:30 AM", title: "Panel: Responsible AI Development", type: "panel", speaker: "Multi-speaker" },
        { time: "01:00 PM", title: "Lunch Break & Networking", type: "logistics", speaker: "" },
        { time: "02:30 PM", title: "Workshop: Building with LLMs", type: "workshop", speaker: "Arjun Mehta" },
        { time: "04:30 PM", title: "Workshop: Computer Vision in Practice", type: "workshop", speaker: "Dr. Sneha Rao" },
        { time: "06:30 PM", title: "Startup Showcase — Pitch Round 1", type: "special", speaker: "" },
        { time: "08:00 PM", title: "Networking Dinner", type: "logistics", speaker: "" },
      ],
    },
    {
      day: "Day 2 — March 21",
      items: [
        { time: "09:30 AM", title: "Keynote: AI Ethics & Governance", type: "keynote", speaker: "Vikram Nair" },
        { time: "11:00 AM", title: "Workshop: AI in Healthcare", type: "workshop", speaker: "Dr. Meera Patel" },
        { time: "01:00 PM", title: "Lunch Break", type: "logistics", speaker: "" },
        { time: "02:30 PM", title: "Startup Pitch Finals & Investor Panel", type: "special", speaker: "Live Jury" },
        { time: "04:00 PM", title: "Fireside Chat: AI & The Future of Work", type: "panel", speaker: "Rohan Das" },
        { time: "05:30 PM", title: "Award Ceremony & Closing Keynote", type: "keynote", speaker: "Dr. Priya Kapoor" },
        { time: "07:00 PM", title: "Closing Ceremony & Farewell", type: "logistics", speaker: "" },
      ],
    },
  ],
  speakers: [
    { name: "Dr. Priya Kapoor", role: "AI Research Lead", org: "Google DeepMind", emoji: "👩‍🔬", topic: "AI in 2026 and Beyond" },
    { name: "Arjun Mehta", role: "Principal Engineer", org: "Microsoft Azure AI", emoji: "👨‍💻", topic: "Building with LLMs" },
    { name: "Dr. Sneha Rao", role: "Computer Vision Lead", org: "Meta AI", emoji: "👩‍💻", topic: "Vision in Practice" },
    { name: "Vikram Nair", role: "Policy Director", org: "NASSCOM", emoji: "🧑‍⚖️", topic: "AI Ethics & Governance" },
    { name: "Dr. Meera Patel", role: "Chief Medical AI Officer", org: "Apollo Hospitals", emoji: "👩‍⚕️", topic: "AI in Healthcare" },
    { name: "Rohan Das", role: "Founder & CEO", org: "TechVenture AI", emoji: "🚀", topic: "AI & The Future of Work" },
  ],
  tickets: [
    { name: "Student Pass", price: "₹299", tag: "For Students", color: "#34C759", perks: ["Both-day access", "All workshops", "Certificate", "Digital swag"] },
    { name: "Standard Pass", price: "₹499", tag: "Most Popular", color: "#0A84FF", perks: ["Both-day access", "All workshops", "Certificate", "Conference kit", "Lunch included"], popular: true },
    { name: "VIP Pass", price: "₹999", tag: "Full Experience", color: "#FF9F0A", perks: ["Both-day access", "All workshops", "VIP seating", "Speaker meet & greet", "Exclusive lounge", "Premium swag bag"] },
  ],
  sponsors: [
    { name: "TechCorp India", tier: "Title Sponsor", emoji: "🏆" },
    { name: "AWS India", tier: "Gold Sponsor", emoji: "☁️" },
    { name: "Microsoft", tier: "Gold Sponsor", emoji: "💻" },
    { name: "NASSCOM", tier: "Community Partner", emoji: "🤝" },
    { name: "Times of India", tier: "Media Partner", emoji: "📰" },
    { name: "YourStory", tier: "Media Partner", emoji: "📖" },
  ],
  faqs: [
    { q: "Who can attend this event?", a: "The conference is open to all — AI researchers, engineers, startup founders, students, and enterprise professionals are all welcome." },
    { q: "Is registration mandatory?", a: "Yes, prior registration is required. Walk-ins may not be accommodated due to limited seating capacity." },
    { q: "Will certificates be provided?", a: "Yes. All registered attendees who attend at least one full day will receive an official digital certificate of participation." },
    { q: "Can I attend workshops without the full pass?", a: "Workshops are included in all pass types. However, VIP pass holders get priority seating in all sessions." },
    { q: "Is accommodation available?", a: "We have tie-ups with nearby hotels offering conference rates. Details are sent via email after registration." },
    { q: "Will sessions be recorded?", a: "Select keynotes and panels will be available for registered attendees post-event. Workshops are in-person only." },
  ],
  contact: { name: "Rahul Mehta", role: "Event Coordinator", phone: "+91 98765 43210", email: "rahul@eventsphere.com", linkedin: "linkedin.com/in/rahulmehta" },
  venue: { name: "Pune Convention Center", address: "Senapati Bapat Road, Pune – 411016", map: "https://maps.google.com/?q=Pune+Convention+Center", parking: "Basement parking available. 200 slots. Entry from Gate 3.", directions: "10 min from Pune Railway Station. Nearest metro: Civil Court." },
  social: { instagram: "@aiconf2026", linkedin: "AI Innovation Conference", youtube: "AI Conf 2026", twitter: "@aiconf2026" },
}

/* ═══════════════════════════════════════════════════════════
   GLOBAL STYLES
═══════════════════════════════════════════════════════════ */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Instrument+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { margin: 0; }

  .dm { font-family: 'Syne', sans-serif; }
  .db { font-family: 'Instrument Sans', sans-serif; }

  @keyframes dm-up    { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
  @keyframes dm-in    { from { opacity:0; } to { opacity:1; } }
  @keyframes dm-tick  { 0%,100% { transform:scale(1); } 50% { transform:scale(1.05); } }
  @keyframes dm-dash  { to { stroke-dashoffset: 0; } }
  @keyframes dm-bob   { 0%,100% { transform:translateX(-50%) translateY(0); } 50% { transform:translateX(-50%) translateY(6px); } }
  @keyframes dm-pulse { 0%,100% { opacity:0.4; } 50% { opacity:1; } }
  @keyframes dm-slide { from { transform:translateX(100%); opacity:0; } to { transform:translateX(0); opacity:1; } }

  .dm-a1 { animation: dm-up 0.75s ease 0.1s both; }
  .dm-a2 { animation: dm-up 0.75s ease 0.25s both; }
  .dm-a3 { animation: dm-up 0.75s ease 0.4s both; }
  .dm-a4 { animation: dm-up 0.75s ease 0.55s both; }
  .dm-a5 { animation: dm-up 0.75s ease 0.7s both; }

  .dm-card { transition: transform 0.28s ease, box-shadow 0.28s ease; }
  .dm-card:hover { transform: translateY(-5px); box-shadow: 0 20px 48px rgba(10,132,255,0.12) !important; }

  .dm-btn { transition: all 0.22s ease; cursor: pointer; border: none; }
  .dm-btn:hover { filter: brightness(1.08); transform: translateY(-1px); }

  .dm-link { transition: color 0.2s; }
  .dm-link:hover { color: #0A84FF !important; }

  .dm-input:focus { outline: none; border-color: #0A84FF !important; box-shadow: 0 0 0 3px rgba(10,132,255,0.12) !important; }

  .dm-nav-link { transition: all 0.2s; cursor: pointer; border: none; background: none; }

  .dm-tag {
    display: inline-block; padding: 4px 12px; border-radius: 100px;
    font-family: 'Instrument Sans', sans-serif;
    font-size: 11px; font-weight: 600; letter-spacing: 1px;
  }

  .dm-sched-row { transition: background 0.2s; }
  .dm-sched-row:hover { background: rgba(10,132,255,0.04) !important; }

  .dm-dot-grid {
    background-image: radial-gradient(rgba(10,132,255,0.12) 1px, transparent 1px);
    background-size: 28px 28px;
  }

  .dm-line-grid {
    background-image: linear-gradient(rgba(10,132,255,0.06) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(10,132,255,0.06) 1px, transparent 1px);
    background-size: 40px 40px;
  }
`

function StyleInjector() {
  useEffect(() => {
    if (document.getElementById("dm-styles")) return
    const s = document.createElement("style"); s.id = "dm-styles"; s.textContent = CSS
    document.head.appendChild(s)
  }, [])
  return null
}

/* ═══ HELPERS ═══ */
function useCountdown(date: string) {
  const [cd, setCd] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  useEffect(() => {
    const tick = () => {
      const diff = new Date(date).getTime() - Date.now()
      if (diff <= 0) return
      setCd({ days: Math.floor(diff / 86400000), hours: Math.floor((diff % 86400000) / 3600000), minutes: Math.floor((diff % 3600000) / 60000), seconds: Math.floor((diff % 60000) / 1000) })
    }
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id)
  }, [date])
  return cd
}

const TYPE_META: Record<string, { color: string; label: string }> = {
  keynote:  { color: "#0A84FF", label: "Keynote" },
  workshop: { color: "#34C759", label: "Workshop" },
  panel:    { color: "#FF9F0A", label: "Panel" },
  special:  { color: "#BF5AF2", label: "Special" },
  logistics:{ color: "#8E8E93", label: "" },
}

/* ═══════════════════════════════════════════════════════════
   NAV
═══════════════════════════════════════════════════════════ */
function Nav({ event }: { event: typeof EVENT }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 64)
    window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn)
  }, [])

  const links = ["About", "Schedule", "Speakers", "Tickets", "Venue", "FAQ"]
  const go = (id: string) => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" })

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 300,
      background: scrolled ? "rgba(255,255,255,0.96)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(10,132,255,0.1)" : "none",
      padding: scrolled ? "14px 56px" : "22px 56px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      transition: "all 0.4s ease",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#0A84FF" }} />
        <span className="dm" style={{ fontSize: 15, fontWeight: 700, color: scrolled ? "#09111F" : "#fff", letterSpacing: 0.5 }}>
          EventSphere
        </span>
      </div>

      <div style={{ display: "flex", gap: 32 }}>
        {links.map(l => (
          <button key={l} className="dm-nav-link db" onClick={() => go(l)}
            style={{ fontSize: 14, fontWeight: 500, color: scrolled ? "#444" : "rgba(255,255,255,0.85)", letterSpacing: 0.3 }}>
            {l}
          </button>
        ))}
      </div>

      <button className="dm-btn dm" onClick={() => go("tickets")}
        style={{ background: "#0A84FF", color: "#fff", padding: "10px 22px", borderRadius: 8, fontSize: 13, fontWeight: 600, letterSpacing: 0.5 }}>
        Register Now
      </button>
    </nav>
  )
}

/* ═══════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════ */
function Hero({ event }: { event: typeof EVENT }) {
  const cd = useCountdown(event.startDate)
  const pc = event.theme.primary

  return (
    <section style={{
      minHeight: "100vh", position: "relative", display: "flex", alignItems: "center",
      background: event.theme.dark, overflow: "hidden",
    }}>
      <div className="dm-dot-grid" style={{ position: "absolute", inset: 0, opacity: 0.8 }} />
      <div style={{ position: "absolute", top: "-20%", right: "-10%", width: 700, height: 700, borderRadius: "50%", background: `radial-gradient(circle, rgba(10,132,255,0.15) 0%, transparent 65%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-10%", left: "5%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, rgba(10,132,255,0.08) 0%, transparent 70%)`, pointerEvents: "none" }} />
      <div style={{
        position: "absolute", top: 0, right: 0, width: 3, height: "100%",
        background: `linear-gradient(to bottom, transparent, ${pc}, transparent)`, opacity: 0.3,
      }} />

      <div className="db" style={{ maxWidth: 1180, margin: "0 auto", padding: "130px 56px 80px", width: "100%", position: "relative", zIndex: 2 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 80, alignItems: "center" }}>
          <div>
            <div className="dm-a1">
              <span className="dm-tag" style={{ background: "rgba(10,132,255,0.15)", color: pc, border: `1px solid rgba(10,132,255,0.25)`, marginBottom: 28, display: "inline-block" }}>
                {event.category} · {event.dates}
              </span>
            </div>

            <h1 className="dm dm-a2" style={{ fontSize: "clamp(40px,5.5vw,68px)", fontWeight: 800, color: "#fff", margin: "0 0 16px", lineHeight: 1.08, letterSpacing: -1 }}>
              {event.name}
            </h1>

            <p className="dm-a3 db" style={{ fontSize: 20, color: "rgba(255,255,255,0.5)", margin: "0 0 14px", fontWeight: 300, lineHeight: 1.6 }}>
              {event.tagline}
            </p>

            <div className="dm-a4" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 40 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#34C759" }} />
              <span className="db" style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", letterSpacing: 0.5 }}>
                {event.location} &nbsp;·&nbsp; {event.dates}
              </span>
            </div>

            <div className="dm-a5" style={{ display: "flex", gap: 12 }}>
              <button className="dm-btn dm" onClick={() => document.getElementById("tickets")?.scrollIntoView({ behavior: "smooth" })}
                style={{ background: pc, color: "#fff", padding: "15px 32px", borderRadius: 8, fontSize: 15, fontWeight: 700, boxShadow: `0 8px 28px rgba(10,132,255,0.35)` }}>
                Register Now →
              </button>
              <button className="dm-btn db" onClick={() => document.getElementById("schedule")?.scrollIntoView({ behavior: "smooth" })}
                style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.8)", padding: "15px 28px", borderRadius: 8, fontSize: 15, fontWeight: 500, border: "1px solid rgba(255,255,255,0.12)" }}>
                View Schedule
              </button>
            </div>
          </div>

          <div style={{
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 16, padding: "36px 32px", backdropFilter: "blur(12px)",
          }}>
            <div className="db" style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: 3, textTransform: "uppercase", marginBottom: 24, textAlign: "center" }}>
              Event starts in
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 28 }}>
              {[{ l: "Days", v: cd.days }, { l: "Hours", v: cd.hours }, { l: "Minutes", v: cd.minutes }, { l: "Seconds", v: cd.seconds }].map(({ l, v }) => (
                <div key={l} style={{
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 10, padding: "18px 12px", textAlign: "center",
                  animation: l === "Seconds" ? "dm-tick 1s ease-in-out infinite" : "none",
                }}>
                  <div className="dm" style={{ fontSize: 42, fontWeight: 800, color: "#fff", lineHeight: 1 }}>{String(v).padStart(2, "0")}</div>
                  <div className="db" style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: 2, marginTop: 6, textTransform: "uppercase" }}>{l}</div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20 }}>
              <div className="db" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginBottom: 6 }}>📍 Venue</div>
              <div className="dm" style={{ fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.75)" }}>{event.venue.name}</div>
              <div className="db" style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{event.address}</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", animation: "dm-bob 2s ease-in-out infinite" }}>
        <div style={{ width: 28, height: 28, border: "1px solid rgba(255,255,255,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>↓</span>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   ABOUT
═══════════════════════════════════════════════════════════ */
function About({ event }: { event: typeof EVENT }) {
  return (
    <section id="about" style={{ background: event.theme.bg, padding: "100px 56px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <div>
            <div className="db" style={{ fontSize: 11, color: event.theme.primary, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>
              01 — About the Event
            </div>
            <h2 className="dm" style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 800, color: event.theme.dark, margin: "0 0 24px", lineHeight: 1.1, letterSpacing: -0.5 }}>
              Why Attend?
            </h2>
            <p className="db" style={{ fontSize: 17, color: "#444", lineHeight: 1.85, marginBottom: 20 }}>{event.description}</p>
            <p className="db" style={{ fontSize: 16, color: "#666", lineHeight: 1.85 }}>{event.purpose}</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 0, paddingTop: 20 }}>
            {[
              { label: "Who Should Attend?", content: event.audience, icon: "👥" },
              { label: "Event Format", content: "2 full days of keynotes, workshops, panels, and networking. All sessions in-person.", icon: "📅" },
              { label: "Language", content: "All sessions in English. Q&A open in English & Hindi.", icon: "🌐" },
            ].map((item, i) => (
              <div key={i} style={{ padding: "24px 0", borderBottom: i < 2 ? "1px solid rgba(0,0,0,0.07)" : "none" }}>
                <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: `rgba(10,132,255,0.08)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="dm" style={{ fontSize: 15, fontWeight: 700, color: event.theme.dark, marginBottom: 4 }}>{item.label}</div>
                    <p className="db" style={{ fontSize: 14, color: "#666", margin: 0, lineHeight: 1.7 }}>{item.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   HIGHLIGHTS
═══════════════════════════════════════════════════════════ */
function Highlights({ event }: { event: typeof EVENT }) {
  return (
    <section id="highlights" style={{ background: "#fff", padding: "100px 56px", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="db" style={{ fontSize: 11, color: event.theme.primary, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600, marginBottom: 14 }}>02 — Highlights</div>
          <h2 className="dm" style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 800, color: event.theme.dark, margin: 0, letterSpacing: -0.5 }}>
            What to Expect
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {event.highlights.map((h, i) => (
            <div key={i} className="dm-card" style={{
              background: event.theme.bg, border: "1px solid rgba(0,0,0,0.06)",
              borderRadius: 14, padding: "32px 28px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: `rgba(10,132,255,0.08)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 18 }}>
                {h.icon}
              </div>
              <div className="dm" style={{ fontSize: 18, fontWeight: 700, color: event.theme.dark, marginBottom: 8 }}>{h.label}</div>
              <p className="db" style={{ fontSize: 14, color: "#666", margin: 0, lineHeight: 1.7 }}>{h.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   SCHEDULE
═══════════════════════════════════════════════════════════ */
function Schedule({ event }: { event: typeof EVENT }) {
  const [activeDay, setActiveDay] = useState(0)
  const pc = event.theme.primary
  const schedule = event.schedule || []

  if (schedule.length === 0) {
    return (
      <section id="schedule" style={{ background: event.theme.bg, padding: "100px 56px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", textAlign: "center" }}>
          <div className="db" style={{ fontSize: 11, color: pc, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600, marginBottom: 14 }}>03 — Agenda</div>
          <h2 className="dm" style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 800, color: event.theme.dark, margin: "0 0 24px", letterSpacing: -0.5 }}>Event Schedule</h2>
          <p className="db" style={{ fontSize: 16, color: "#888" }}>Schedule coming soon</p>
        </div>
      </section>
    )
  }

  return (
    <section id="schedule" style={{ background: event.theme.bg, padding: "100px 56px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ marginBottom: 52 }}>
          <div className="db" style={{ fontSize: 11, color: pc, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600, marginBottom: 14 }}>03 — Agenda</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
            <h2 className="dm" style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 800, color: event.theme.dark, margin: 0, letterSpacing: -0.5 }}>Event Schedule</h2>
            <div style={{ display: "flex", gap: 4, background: "rgba(0,0,0,0.04)", borderRadius: 10, padding: 4 }}>
              {schedule.map((d, i) => (
                <button key={i} className="dm-btn dm" onClick={() => setActiveDay(i)}
                  style={{
                    padding: "10px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                    background: activeDay === i ? "#fff" : "transparent",
                    color: activeDay === i ? pc : "#888",
                    boxShadow: activeDay === i ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
                  }}>
                  Day {i + 1}
                </button>
              ))}
            </div>
          </div>
          <div className="db" style={{ fontSize: 14, color: "#888", marginTop: 12 }}>{schedule[activeDay].day}</div>
        </div>

        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(0,0,0,0.07)", overflow: "hidden", boxShadow: "0 4px 32px rgba(0,0,0,0.05)" }}>
          {schedule[activeDay].items.map((item, i) => {
            const meta = TYPE_META[item.type]
            const isLogistics = item.type === "logistics"
            return (
              <div key={i} className="dm-sched-row" style={{
                display: "grid", gridTemplateColumns: "140px 1fr auto",
                borderBottom: i < event.schedule[activeDay].items.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none",
                background: i % 2 === 0 ? "#fff" : "rgba(248,250,255,0.6)",
              }}>
                <div style={{ padding: "20px 24px", borderRight: "1px solid rgba(0,0,0,0.05)", display: "flex", alignItems: "center" }}>
                  <span className="db" style={{ fontSize: 13, fontWeight: 600, color: isLogistics ? "#aaa" : pc }}>{item.time}</span>
                </div>
                <div style={{ padding: "20px 28px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <span className="dm" style={{ fontSize: 16, fontWeight: isLogistics ? 400 : 600, color: isLogistics ? "#999" : event.theme.dark }}>{item.title}</span>
                  {item.speaker && <span className="db" style={{ fontSize: 13, color: "#888", marginTop: 2 }}>with {item.speaker}</span>}
                </div>
                <div style={{ padding: "20px 24px", display: "flex", alignItems: "center" }}>
                  {!isLogistics && (
                    <span className="dm-tag" style={{ background: `${meta.color}15`, color: meta.color, border: `1px solid ${meta.color}25` }}>
                      {meta.label}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   SPEAKERS
═══════════════════════════════════════════════════════════ */
function Speakers({ event }: { event: typeof EVENT }) {
  const [hover, setHover] = useState<number | null>(null)
  const speakers = event.speakers || []

  if (speakers.length === 0) {
    return (
      <section id="speakers" style={{ background: "#fff", padding: "100px 56px", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", textAlign: "center" }}>
          <div className="db" style={{ fontSize: 11, color: event.theme.primary, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600, marginBottom: 14 }}>04 — Speakers</div>
          <h2 className="dm" style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 800, color: event.theme.dark, margin: "0 0 24px", letterSpacing: -0.5 }}>Meet the Lineup</h2>
          <p className="db" style={{ fontSize: 16, color: "#888" }}>Speakers will be announced soon</p>
        </div>
      </section>
    )
  }

  return (
    <section id="speakers" style={{ background: "#fff", padding: "100px 56px", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ marginBottom: 56 }}>
          <div className="db" style={{ fontSize: 11, color: event.theme.primary, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600, marginBottom: 14 }}>04 — Speakers</div>
          <h2 className="dm" style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 800, color: event.theme.dark, margin: 0, letterSpacing: -0.5 }}>
            Meet the Lineup
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {speakers.map((sp, i) => (
            <div key={i}
              onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
              className="dm-card" style={{
                border: hover === i ? `1px solid ${event.theme.primary}` : "1px solid rgba(0,0,0,0.07)",
                borderRadius: 14, overflow: "hidden",
                background: "#fff", cursor: "default",
                boxShadow: hover === i ? `0 16px 40px rgba(10,132,255,0.12)` : "0 2px 8px rgba(0,0,0,0.04)",
              }}>
              <div style={{
                height: 140,
                background: `linear-gradient(135deg, ${["#EBF5FF", "#EBF8FF", "#F0EEFF", "#FFEEEB", "#EEFFEE", "#FFF8EB"][i % 6]}, ${event.theme.bg})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 56,
                borderBottom: "1px solid rgba(0,0,0,0.05)",
                position: "relative",
              }}>
                {sp.emoji}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: hover === i ? event.theme.primary : "transparent", transition: "background 0.25s" }} />
              </div>

              <div style={{ padding: "22px 22px 26px" }}>
                <div className="dm" style={{ fontSize: 18, fontWeight: 700, color: event.theme.dark, marginBottom: 2 }}>{sp.name}</div>
                <div className="db" style={{ fontSize: 13, fontWeight: 600, color: event.theme.primary, marginBottom: 4 }}>{sp.role}</div>
                <div className="db" style={{ fontSize: 12, color: "#888", marginBottom: 14 }}>{sp.org}</div>
                <div style={{ padding: "8px 12px", background: event.theme.bg, borderRadius: 8, borderLeft: `3px solid ${event.theme.primary}` }}>
                  <span className="db" style={{ fontSize: 12, color: "#555" }}>"{sp.topic}"</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   REGISTRATION FORM
═══════════════════════════════════════════════════════════ */
function Registration({ event }: { event: typeof EVENT }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", org: "", ticket: "standard" })
  const [done, setDone] = useState(false)
  const pc = event.theme.primary

  const submit = (e: React.FormEvent) => { e.preventDefault(); setDone(true) }

  const inputStyle: React.CSSProperties = {
    width: "100%", background: event.theme.bg, border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: 8, padding: "13px 16px", fontSize: 15, fontFamily: "'Instrument Sans', sans-serif",
    color: event.theme.dark, transition: "all 0.2s",
  }

  return (
    <section id="register" style={{ background: event.theme.bg, padding: "100px 56px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
        <div>
          <div className="db" style={{ fontSize: 11, color: pc, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>05 — Register</div>
          <h2 className="dm" style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 800, color: event.theme.dark, margin: "0 0 20px", letterSpacing: -0.5 }}>Secure Your Spot</h2>
          <p className="db" style={{ fontSize: 17, color: "#666", lineHeight: 1.8, marginBottom: 36 }}>
            Seats are limited. Register now to confirm your place at {event.name}.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {["Instant email confirmation", "Certificate of participation", "Access to all sessions", "Networking with 500+ professionals"].map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: `rgba(10,132,255,0.1)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 11, color: pc }}>✓</span>
                </div>
                <span className="db" style={{ fontSize: 15, color: "#555" }}>{p}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#fff", borderRadius: 16, padding: "40px", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 8px 40px rgba(0,0,0,0.06)" }}>
          {done ? (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(52,199,89,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 32 }}>✅</div>
              <h3 className="dm" style={{ fontSize: 28, color: event.theme.dark, margin: "0 0 8px" }}>You're Registered!</h3>
              <p className="db" style={{ fontSize: 15, color: "#888" }}>A confirmation email has been sent to your inbox. See you at the conference!</p>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {[
                { label: "Full Name", key: "name", type: "text", placeholder: "Rahul Mehta" },
                { label: "Email Address", key: "email", type: "email", placeholder: "rahul@company.com" },
                { label: "Phone Number", key: "phone", type: "tel", placeholder: "+91 98765 43210" },
                { label: "Organization / College", key: "org", type: "text", placeholder: "Company or institution name" },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label className="db" style={{ fontSize: 12, fontWeight: 600, color: "#888", letterSpacing: 0.5, display: "block", marginBottom: 7 }}>{label}</label>
                  <input className="dm-input db" type={type} placeholder={placeholder}
                    value={(form as any)[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} required
                    style={inputStyle} />
                </div>
              ))}

              <div>
                <label className="db" style={{ fontSize: 12, fontWeight: 600, color: "#888", letterSpacing: 0.5, display: "block", marginBottom: 7 }}>Ticket Type</label>
                <select className="dm-input db" value={form.ticket} onChange={e => setForm({ ...form, ticket: e.target.value })}
                  style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}>
                  <option value="student">Student Pass — ₹299</option>
                  <option value="standard">Standard Pass — ₹499</option>
                  <option value="vip">VIP Pass — ₹999</option>
                </select>
              </div>

              <button type="submit" className="dm-btn dm" style={{ background: pc, color: "#fff", padding: "15px 24px", borderRadius: 8, fontSize: 15, fontWeight: 700, marginTop: 4, boxShadow: `0 6px 20px rgba(10,132,255,0.28)` }}>
                Complete Registration →
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   TICKETS
═══════════════════════════════════════════════════════════ */
function Tickets({ event }: { event: typeof EVENT }) {
  const pc = event.theme.primary
  const tickets = event.tickets || []

  if (tickets.length === 0) {
    return (
      <section id="tickets" style={{ background: "#fff", padding: "100px 56px", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", textAlign: "center" }}>
          <div className="db" style={{ fontSize: 11, color: pc, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600, marginBottom: 14 }}>06 — Passes</div>
          <h2 className="dm" style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 800, color: event.theme.dark, margin: "0 0 24px", letterSpacing: -0.5 }}>Choose Your Pass</h2>
          <p className="db" style={{ fontSize: 16, color: "#888" }}>Ticket information coming soon</p>
        </div>
      </section>
    )
  }

  return (
    <section id="tickets" style={{ background: "#fff", padding: "100px 56px", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="db" style={{ fontSize: 11, color: pc, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600, marginBottom: 14 }}>06 — Passes</div>
          <h2 className="dm" style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 800, color: event.theme.dark, margin: "0 0 12px", letterSpacing: -0.5 }}>Choose Your Pass</h2>
          <p className="db" style={{ color: "#888", fontSize: 16 }}>All passes include access to both days and the networking dinner.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, alignItems: "start" }}>
          {tickets.map((t, i) => (
            <div key={i} className="dm-card" style={{
              borderRadius: 16, overflow: "hidden",
              border: t.popular ? `2px solid ${pc}` : "1px solid rgba(0,0,0,0.08)",
              boxShadow: t.popular ? `0 20px 60px rgba(10,132,255,0.18)` : "0 4px 16px rgba(0,0,0,0.05)",
              position: "relative",
              marginTop: t.popular ? -12 : 0,
            }}>
              {t.popular && (
                <div style={{ background: pc, padding: "8px", textAlign: "center" }}>
                  <span className="dm-tag" style={{ background: "rgba(255,255,255,0.2)", color: "#fff", fontSize: 10 }}>⭐ Most Popular</span>
                </div>
              )}
              <div style={{ padding: "32px 28px", background: "#fff" }}>
                <div className="db" style={{ fontSize: 12, fontWeight: 700, color: "#aaa", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>{t.tag}</div>
                <div className="dm" style={{ fontSize: 28, fontWeight: 800, color: event.theme.dark, marginBottom: 4 }}>{t.name}</div>
                <div className="dm" style={{ fontSize: 48, fontWeight: 800, color: t.popular ? pc : event.theme.dark, lineHeight: 1, marginBottom: 28 }}>{t.price}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                  {t.perks.map((p, j) => (
                    <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", background: t.popular ? `rgba(10,132,255,0.1)` : "rgba(0,0,0,0.05)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                        <span style={{ fontSize: 10, color: t.popular ? pc : "#888" }}>✓</span>
                      </div>
                      <span className="db" style={{ fontSize: 14, color: "#555", lineHeight: 1.4 }}>{p}</span>
                    </div>
                  ))}
                </div>
                <button className="dm-btn dm" onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}
                  style={{
                    width: "100%", padding: "14px 20px", borderRadius: 8, fontSize: 14, fontWeight: 700,
                    background: t.popular ? pc : "transparent",
                    color: t.popular ? "#fff" : pc,
                    border: t.popular ? "none" : `1.5px solid ${pc}`,
                    boxShadow: t.popular ? `0 6px 20px rgba(10,132,255,0.28)` : "none",
                  }}>
                  Get {t.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   VENUE
═══════════════════════════════════════════════════════════ */
function Venue({ event }: { event: typeof EVENT }) {
  const pc = event.theme.primary

  return (
    <section id="venue" style={{ background: event.theme.bg, padding: "100px 56px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div className="db" style={{ fontSize: 11, color: pc, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>07 — Venue</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, borderRadius: 16, overflow: "hidden", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 8px 40px rgba(0,0,0,0.07)" }}>
          <div style={{ background: event.theme.dark, padding: "52px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h2 className="dm" style={{ fontSize: 40, fontWeight: 800, color: "#fff", margin: "0 0 8px" }}>{event.venue.name}</h2>
            <p className="db" style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", marginBottom: 40, lineHeight: 1.7 }}>{event.venue.address}</p>

            {[
              { icon: "🅿️", label: "Parking", val: event.venue.parking },
              { icon: "🚌", label: "Directions", val: event.venue.directions },
              { icon: "📅", label: "Event Dates", val: event.dates },
            ].map((row, i) => (
              <div key={i} style={{ display: "flex", gap: 16, padding: "16px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                <span style={{ fontSize: 20 }}>{row.icon}</span>
                <div>
                  <div className="db" style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>{row.label}</div>
                  <div className="db" style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", marginTop: 2, lineHeight: 1.6 }}>{row.val}</div>
                </div>
              </div>
            ))}

            <a href={event.venue.map} target="_blank" rel="noopener noreferrer"
              className="dm-btn dm" style={{
                display: "inline-flex", alignItems: "center", gap: 8, marginTop: 32, alignSelf: "flex-start",
                padding: "13px 24px", background: pc, color: "#fff", textDecoration: "none",
                borderRadius: 8, fontSize: 14, fontWeight: 700,
              }}>
              📍 Open in Google Maps
            </a>
          </div>

          <div style={{ position: "relative", minHeight: 460, background: "#e8eff8", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
            <div className="dm-line-grid" style={{ position: "absolute", inset: 0 }} />
            <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
              <div style={{ fontSize: 56, marginBottom: 12 }}>📍</div>
              <div className="dm" style={{ fontSize: 22, fontWeight: 700, color: event.theme.dark }}>{event.venue.name}</div>
              <div className="db" style={{ fontSize: 14, color: "#666", marginTop: 4 }}>Pune, Maharashtra</div>
              <a href={event.venue.map} target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-block", marginTop: 20, padding: "10px 22px", background: pc, color: "#fff", borderRadius: 8, textDecoration: "none", fontSize: 13, fontWeight: 600 }}>
                View Full Map →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   SPONSORS
═══════════════════════════════════════════════════════════ */
function Sponsors({ event }: { event: typeof EVENT }) {
  return (
    <section id="sponsors" style={{ background: "#fff", padding: "80px 56px", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div className="db" style={{ fontSize: 11, color: "#999", letterSpacing: 3, textTransform: "uppercase", fontWeight: 600, textAlign: "center", marginBottom: 40 }}>
          Our Partners & Sponsors
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {event.sponsors.map((s, i) => (
            <div key={i} className="dm-card" style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "18px 22px", borderRadius: 10,
              background: event.theme.bg, border: "1px solid rgba(0,0,0,0.06)",
            }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(10,132,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                {s.emoji}
              </div>
              <div>
                <div className="dm" style={{ fontSize: 15, fontWeight: 700, color: event.theme.dark }}>{s.name}</div>
                <div className="dm-tag" style={{ background: "rgba(10,132,255,0.08)", color: event.theme.primary, border: "1px solid rgba(10,132,255,0.15)", fontSize: 10, marginTop: 4 }}>{s.tier}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   GALLERY
═══════════════════════════════════════════════════════════ */
function Gallery({ event }: { event: typeof EVENT }) {
  const items = [
    { label: "Opening Keynote 2025", emoji: "🎤", bg: "#EBF5FF" },
    { label: "Workshop Sessions", emoji: "🛠", bg: "#EBF8FF" },
    { label: "Networking Lounge", emoji: "🤝", bg: "#F0EEFF" },
    { label: "Startup Showcase", emoji: "🚀", bg: "#FFEEEB" },
    { label: "Panel Discussions", emoji: "💬", bg: "#EEFFEE" },
    { label: "Award Ceremony", emoji: "🏆", bg: "#FFF8EB" },
  ]
  return (
    <section id="gallery" style={{ background: event.theme.bg, padding: "100px 56px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ marginBottom: 52 }}>
          <div className="db" style={{ fontSize: 11, color: event.theme.primary, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600, marginBottom: 14 }}>08 — Gallery</div>
          <h2 className="dm" style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 800, color: event.theme.dark, margin: 0, letterSpacing: -0.5 }}>Previous Highlights</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {items.map((item, i) => (
            <div key={i} className="dm-card" style={{
              aspectRatio: i === 0 ? "16/8" : "1/1",
              gridColumn: i === 0 ? "span 2" : "auto",
              background: item.bg,
              borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexDirection: "column", gap: 10,
            }}>
              <span style={{ fontSize: i === 0 ? 56 : 40 }}>{item.emoji}</span>
              <span className="db" style={{ fontSize: 13, color: "#888", fontWeight: 500 }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   FAQ
═══════════════════════════════════════════════════════════ */
function FAQ({ event }: { event: typeof EVENT }) {
  const [open, setOpen] = useState<number | null>(null)
  const pc = event.theme.primary

  return (
    <section id="faq" style={{ background: "#fff", padding: "100px 56px", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ marginBottom: 52, textAlign: "center" }}>
          <div className="db" style={{ fontSize: 11, color: pc, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600, marginBottom: 14 }}>09 — FAQ</div>
          <h2 className="dm" style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 800, color: event.theme.dark, margin: 0, letterSpacing: -0.5 }}>Frequently Asked</h2>
        </div>

        {event.faqs.map((f, i) => (
          <div key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
            <button className="dm-btn db" onClick={() => setOpen(open === i ? null : i)}
              style={{
                width: "100%", textAlign: "left", padding: "22px 0",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                color: open === i ? pc : event.theme.dark,
                fontSize: 16, fontWeight: 600,
              }}>
              {f.q}
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: open === i ? pc : "rgba(0,0,0,0.05)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, marginLeft: 16,
                transition: "all 0.25s",
              }}>
                <span style={{ fontSize: 14, color: open === i ? "#fff" : "#888", fontWeight: 700, transform: open === i ? "rotate(45deg)" : "rotate(0)", display: "block", transition: "transform 0.25s" }}>+</span>
              </div>
            </button>
            {open === i && (
              <div style={{ animation: "dm-up 0.25s ease both" }}>
                <p className="db" style={{ fontSize: 15, color: "#666", lineHeight: 1.8, padding: "0 0 22px", margin: 0 }}>{f.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   CONTACT
═══════════════════════════════════════════════════════════ */
function Contact({ event }: { event: typeof EVENT }) {
  const pc = event.theme.primary

  return (
    <section id="contact" style={{ background: event.theme.bg, padding: "100px 56px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <div className="db" style={{ fontSize: 11, color: pc, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>10 — Contact</div>
            <h2 className="dm" style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 800, color: event.theme.dark, margin: "0 0 20px", letterSpacing: -0.5 }}>Get in Touch</h2>
            <p className="db" style={{ fontSize: 17, color: "#666", lineHeight: 1.8, marginBottom: 36 }}>
              Questions about registration, sponsorship, or the event? Our coordinator is happy to help.
            </p>

            <div style={{ background: "#fff", borderRadius: 14, padding: "28px 28px", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", marginBottom: 28 }}>
              <div className="dm" style={{ fontSize: 20, fontWeight: 700, color: event.theme.dark, marginBottom: 2 }}>{event.contact.name}</div>
              <div className="db" style={{ fontSize: 13, color: pc, fontWeight: 600, marginBottom: 18 }}>{event.contact.role}</div>
              {[
                { icon: "📞", val: event.contact.phone },
                { icon: "✉️", val: event.contact.email },
                { icon: "💼", val: event.contact.linkedin },
              ].map((row, i) => (
                <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
                  <span>{row.icon}</span>
                  <span className="db" style={{ fontSize: 14, color: "#555" }}>{row.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="db" style={{ fontSize: 12, fontWeight: 600, color: "#aaa", letterSpacing: 2, textTransform: "uppercase", marginBottom: 18 }}>Follow the Event</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 36 }}>
              {[
                { icon: "📸", name: "Instagram", handle: event.social.instagram, color: "#E1306C" },
                { icon: "💼", name: "LinkedIn", handle: event.social.linkedin, color: "#0A66C2" },
                { icon: "▶️", name: "YouTube", handle: event.social.youtube, color: "#FF0000" },
                { icon: "𝕏", name: "Twitter / X", handle: event.social.twitter, color: "#000" },
              ].map((s, i) => (
                <div key={i} className="dm-card" style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "16px", borderRadius: 10,
                  background: "#fff", border: "1px solid rgba(0,0,0,0.07)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}>
                  <div style={{ fontSize: 20 }}>{s.icon}</div>
                  <div>
                    <div className="dm" style={{ fontSize: 13, fontWeight: 700, color: event.theme.dark }}>{s.name}</div>
                    <div className="db" style={{ fontSize: 11, color: "#aaa" }}>{s.handle}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: event.theme.dark, borderRadius: 14, padding: "36px 32px", textAlign: "center" }}>
              <div className="dm" style={{ fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Ready to Join?</div>
              <p className="db" style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", marginBottom: 24 }}>Limited seats available. Register before they fill up.</p>
              <button className="dm-btn dm" onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}
                style={{ background: pc, color: "#fff", padding: "14px 36px", borderRadius: 8, fontSize: 15, fontWeight: 700, boxShadow: `0 8px 24px rgba(10,132,255,0.35)` }}>
                Register Now →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════ */
function Footer({ event }: { event: typeof EVENT }) {
  const pc = event.theme.primary
  return (
    <footer style={{ background: event.theme.dark, padding: "56px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
        <div>
          <div className="dm" style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 4 }}>{event.name}</div>
          <div className="db" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>{event.dates} · {event.location}</div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: pc }} />
          <span className="db" style={{ fontSize: 13, color: "rgba(255,255,255,0.25)" }}>
            Powered by EventSphere · eventsphere.com/event/{event.slug}
          </span>
        </div>
      </div>
    </footer>
  )
}

/* ═══════════════════════════════════════════════════════════
   ROOT EXPORT
═══════════════════════════════════════════════════════════ */
export function DefaultMicrosite({ event: eventProp = EVENT }: { event?: typeof EVENT }) {
  const event = { ...EVENT, ...eventProp }

  return (
    <div className="db" style={{ minHeight: "100vh", background: event.theme.bg }}>
      <StyleInjector />
      <Nav event={event} />
      <Hero event={event} />
      <About event={event} />
      <Highlights event={event} />
      <Schedule event={event} />
      <Speakers event={event} />
      <Registration event={event} />
      <Tickets event={event} />
      <Venue event={event} />
      <Sponsors event={event} />
      <Gallery event={event} />
      <FAQ event={event} />
      <Contact event={event} />
      <Footer event={event} />
    </div>
  )
}

export default DefaultMicrosite
