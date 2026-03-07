"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Calendar, MapPin, Users, Trophy, Clock, Code, Zap, Award,
  CheckCircle, Mail, Phone, Globe, ChevronDown, ChevronUp,
  Twitter, Linkedin, Github, Star, DollarSign, Cpu, Wifi
} from "lucide-react"

interface HackathonMicrositeProps {
  event: any
}

function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const target = targetDate ? new Date(targetDate).getTime() : new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).getTime()
    const update = () => {
      const now = Date.now()
      const diff = target - now
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [targetDate])

  return timeLeft
}

const faqs = [
  { q: "Who can participate?", a: "This hackathon is open to students, developers, designers, and entrepreneurs of all skill levels." },
  { q: "Is it free to participate?", a: "Yes! Registration is completely free. We provide meals, swag, and accommodation support for outstation participants." },
  { q: "What is the team size?", a: "Check the event details for min/max team size. Solo participants are also welcome." },
  { q: "What should I bring?", a: "Your laptop, chargers, student ID, and your enthusiasm!" },
  { q: "Will there be mentors?", a: "Yes! Industry experts will guide teams throughout the hackathon." },
  { q: "What are the judging criteria?", a: "Projects are judged on Innovation, Technical Complexity, Real-world Impact, Scalability, and Presentation quality." },
]

export function HackathonMicrosite({ event }: HackathonMicrositeProps) {
  const countdown = useCountdown(event?.startDate)
  const [activeDay, setActiveDay] = useState("Day 1")
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [form, setForm] = useState({ name: "", email: "", phone: "", teamName: "", teamSize: "1", experience: "beginner", track: "", bio: "" })
  const [submitted, setSubmitted] = useState(false)

  // ── Dynamic data from event prop ──
  const eventName  = event?.eventName  || "Hackathon Event"
  const description = event?.description || "Join us for an amazing hackathon experience."
  const venue       = event?.venue       || "TBA"
  const slug        = event?.slug        || "hackathon"

  const sponsorList: any[]  = event?.sponsors || []
  const scheduleData: any[] = event?.schedule || []
  const trackList: any[]    = event?.tracks || []
  const prizes              = event?.prizes || { first: { amount: "0", perks: "" }, second: { amount: "0", perks: "" }, third: { amount: "0", perks: "" }, special: [] }

  const days = [...new Set(scheduleData.map((s: any) => s.day))]
  const filteredSchedule = scheduleData.filter((s: any) => s.day === activeDay)

  // Set default track for form once trackList is known
  useEffect(() => {
    if (trackList.length > 0 && !form.track) {
      setForm(f => ({ ...f, track: trackList[0].title }))
    }
  }, [trackList.length])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const typeColor: Record<string, string> = {
    Opening:    "bg-purple-500/20 text-purple-300 border-purple-500/30",
    Workshop:   "bg-blue-500/20 text-blue-300 border-blue-500/30",
    Break:      "bg-gray-500/20 text-gray-300 border-gray-500/30",
    Hacking:    "bg-green-500/20 text-green-300 border-green-500/30",
    Mentoring:  "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    Checkpoint: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    Judging:    "bg-orange-500/20 text-orange-300 border-orange-500/30",
    Closing:    "bg-rose-500/20 text-rose-300 border-rose-500/30",
    Submission: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#080B14", fontFamily: "'Inter', sans-serif", color: "#E2E8F0" }}>

      {/* ─── Sticky Nav ─── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, backgroundColor: "rgba(8,11,20,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(139,92,246,0.2)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#7C3AED,#3B82F6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Zap style={{ width: 18, height: 18, color: "white" }} />
            </div>
            <span style={{ fontWeight: 800, fontSize: 18, color: "white" }}>{eventName}</span>
          </div>
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {["About", "Schedule", "Sponsors", "FAQ"].map(s => (
              <a key={s} href={`#${s.toLowerCase()}`} style={{ fontSize: 14, color: "#94A3B8", textDecoration: "none", fontWeight: 500, cursor: "pointer" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#A78BFA")}
                onMouseLeave={e => (e.currentTarget.style.color = "#94A3B8")}
              >{s}</a>
            ))}
          </div>
          <a href="#register">
            <button style={{ background: "linear-gradient(135deg,#7C3AED,#3B82F6)", color: "white", border: "none", borderRadius: 8, padding: "9px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
              Register Now
            </button>
          </a>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section style={{ position: "relative", minHeight: "92vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {/* Banner image OR fallback grid */}
        {event?.bannerImage ? (
          <>
            <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${event.bannerImage})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }} />
            {/* Dark gradient overlay so text is always readable */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(8,11,20,0.55) 0%, rgba(8,11,20,0.70) 50%, rgba(8,11,20,0.92) 100%)" }} />
            {/* Subtle purple tint to keep brand feel */}
            <div style={{ position: "absolute", inset: 0, background: "rgba(124,58,237,0.12)" }} />
          </>
        ) : (
          <>
            {/* grid bg */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(139,92,246,0.12) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,0.12) 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
            {/* glow blobs */}
            <div style={{ position: "absolute", top: "15%", left: "10%", width: 400, height: 400, background: "radial-gradient(circle,rgba(124,58,237,0.25) 0%,transparent 70%)", borderRadius: "50%", filter: "blur(60px)" }} />
            <div style={{ position: "absolute", bottom: "20%", right: "8%", width: 350, height: 350, background: "radial-gradient(circle,rgba(59,130,246,0.2) 0%,transparent 70%)", borderRadius: "50%", filter: "blur(60px)" }} />
          </>
        )}

        <div style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: 880, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.35)", borderRadius: 999, padding: "6px 18px", marginBottom: 28 }}>
            <Zap style={{ width: 14, height: 14, color: "#A78BFA" }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: "#A78BFA", letterSpacing: "0.1em" }}>HACKATHON 2025</span>
          </div>

          <h1 style={{ fontSize: "clamp(40px,7vw,80px)", fontWeight: 900, lineHeight: 1.05, marginBottom: 24, background: "linear-gradient(135deg,#ffffff 30%,#A78BFA 70%,#60A5FA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {eventName}
          </h1>

          <p style={{ fontSize: 18, color: "#94A3B8", maxWidth: 620, margin: "0 auto 40px", lineHeight: 1.75 }}>
            {description}
          </p>

          {/* Countdown */}
          <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 40 }}>
            {[
              { v: countdown.days, l: "DAYS" },
              { v: countdown.hours, l: "HRS" },
              { v: countdown.minutes, l: "MIN" },
              { v: countdown.seconds, l: "SEC" },
            ].map(({ v, l }) => (
              <div key={l} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(139,92,246,0.3)", borderRadius: 12, padding: "14px 20px", minWidth: 72, textAlign: "center" }}>
                <div style={{ fontSize: 36, fontWeight: 900, color: "white", lineHeight: 1 }}>{String(v).padStart(2, "0")}</div>
                <div style={{ fontSize: 10, color: "#7C3AED", fontWeight: 700, marginTop: 4, letterSpacing: "0.1em" }}>{l}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#register">
              <button style={{ background: "linear-gradient(135deg,#7C3AED,#3B82F6)", color: "white", border: "none", borderRadius: 12, padding: "15px 36px", fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 0 40px rgba(124,58,237,0.4)" }}>
                🚀 Register Now — It&apos;s Free
              </button>
            </a>
            <a href="#schedule">
              <button style={{ background: "transparent", color: "white", border: "1.5px solid rgba(139,92,246,0.5)", borderRadius: 12, padding: "15px 36px", fontSize: 16, fontWeight: 600, cursor: "pointer" }}>
                View Schedule
              </button>
            </a>
          </div>

          {/* Quick stats */}
          <div style={{ display: "flex", gap: 32, justifyContent: "center", marginTop: 52, flexWrap: "wrap" }}>
            {[
              { icon: <Users style={{ width: 16, height: 16 }} />, label: "500+ Hackers" },
              { icon: <Trophy style={{ width: 16, height: 16 }} />, label: "$10,000 in Prizes" },
              { icon: <Clock style={{ width: 16, height: 16 }} />, label: "48 Hours" },
              { icon: <MapPin style={{ width: 16, height: 16 }} />, label: venue },
            ].map(({ icon, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, color: "#64748B", fontSize: 14 }}>
                <span style={{ color: "#7C3AED" }}>{icon}</span>
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* scroll indicator */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", animation: "bounce 2s infinite" }}>
          <div style={{ width: 24, height: 40, border: "2px solid rgba(139,92,246,0.4)", borderRadius: 999, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: 6 }}>
            <div style={{ width: 4, height: 10, background: "#7C3AED", borderRadius: 999 }} />
          </div>
        </div>
      </section>

      {/* ─── About ─── */}
      <section id="about" style={{ padding: "96px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: 999, padding: "5px 14px", marginBottom: 20 }}>
              <Code style={{ width: 13, height: 13, color: "#A78BFA" }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: "#A78BFA", letterSpacing: "0.1em" }}>ABOUT THE HACKATHON</span>
            </div>
            <h2 style={{ fontSize: 40, fontWeight: 800, color: "white", marginBottom: 20, lineHeight: 1.2 }}>Build. Collaborate.<br />Innovate. Win.</h2>
            <p style={{ fontSize: 16, color: "#94A3B8", lineHeight: 1.8, marginBottom: 24 }}>
              {eventName} is a 48-hour marathon of innovation where developers, designers, and thinkers come together to build solutions that matter. Whether you&apos;re a seasoned programmer or just starting out, this is the place for you.
            </p>
            <p style={{ fontSize: 16, color: "#94A3B8", lineHeight: 1.8, marginBottom: 32 }}>
              With mentorship from industry leaders, access to cloud credits, real-world problem statements, and an incredible community — this hackathon gives you everything you need to build your next big thing.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {["Certificates for all", "Free meals & snacks", "Cloud credits worth $500", "Expert mentorship", "Job opportunities", "Swag for everyone"].map(perk => (
                <div key={perk} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#CBD5E1" }}>
                  <CheckCircle style={{ width: 16, height: 16, color: "#22C55E", flexShrink: 0 }} />
                  {perk}
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {trackList.map((track: any, i: number) => {
              const trackColors = [
                { bg: "rgba(124,58,237,0.12)", icon: "#A78BFA" },
                { bg: "rgba(59,130,246,0.12)",  icon: "#60A5FA" },
                { bg: "rgba(34,197,94,0.12)",   icon: "#4ADE80" },
                { bg: "rgba(249,115,22,0.12)",  icon: "#FB923C" },
              ]
              const col = trackColors[i % trackColors.length]
              return (
                <div key={track.title || i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 20 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: col.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14, fontSize: 20 }}>
                    🚀
                  </div>
                  <h4 style={{ fontWeight: 700, fontSize: 15, color: "white", marginBottom: 6 }}>{track.title}</h4>
                  <p style={{ fontSize: 12, color: "#64748B", lineHeight: 1.6 }}>{track.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── Prizes ─── */}
      <section style={{ padding: "96px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(234,179,8,0.1)", border: "1px solid rgba(234,179,8,0.25)", borderRadius: 999, padding: "5px 14px", marginBottom: 20 }}>
            <Award style={{ width: 13, height: 13, color: "#EAB308" }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: "#EAB308", letterSpacing: "0.1em" }}>PRIZES & REWARDS</span>
          </div>
          <h2 style={{ fontSize: 40, fontWeight: 800, color: "white" }}>Win Big, Build Bigger</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr 1fr", gap: 20, alignItems: "end", maxWidth: 900, margin: "0 auto" }}>
          {/* 2nd */}
          <div style={{ background: "linear-gradient(180deg,rgba(148,163,184,0.12) 0%,rgba(148,163,184,0.04) 100%)", border: "1px solid rgba(148,163,184,0.25)", borderRadius: 20, padding: "36px 24px", textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🥈</div>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: "white", marginBottom: 8 }}>2nd Place</h3>
            <p style={{ fontSize: 36, fontWeight: 900, color: "#94A3B8", marginBottom: 16 }}>${prizes?.second?.amount || "3,000"}</p>
            <div style={{ fontSize: 13, color: "#64748B" }}>{prizes?.second?.perks || "Cloud Credits + Certificates"}</div>
          </div>
          {/* 1st */}
          <div style={{ background: "linear-gradient(180deg,rgba(234,179,8,0.2) 0%,rgba(234,179,8,0.05) 100%)", border: "1px solid rgba(234,179,8,0.4)", borderRadius: 24, padding: "48px 28px", textAlign: "center", boxShadow: "0 0 60px rgba(234,179,8,0.15)" }}>
            <div style={{ fontSize: 52, marginBottom: 12 }}>🏆</div>
            <div style={{ background: "rgba(234,179,8,0.2)", borderRadius: 999, padding: "3px 12px", display: "inline-block", fontSize: 11, fontWeight: 700, color: "#EAB308", marginBottom: 12 }}>GRAND PRIZE</div>
            <h3 style={{ fontSize: 24, fontWeight: 900, color: "white", marginBottom: 10 }}>1st Place</h3>
            <p style={{ fontSize: 44, fontWeight: 900, color: "#EAB308", marginBottom: 16 }}>${prizes?.first?.amount || "5,000"}</p>
            <div style={{ fontSize: 13, color: "#94A3B8" }}>{prizes?.first?.perks || "VC Meetings + Premium Swag + Internship"}</div>
          </div>
          {/* 3rd */}
          <div style={{ background: "linear-gradient(180deg,rgba(249,115,22,0.12) 0%,rgba(249,115,22,0.04) 100%)", border: "1px solid rgba(249,115,22,0.25)", borderRadius: 20, padding: "36px 24px", textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🥉</div>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: "white", marginBottom: 8 }}>3rd Place</h3>
            <p style={{ fontSize: 36, fontWeight: 900, color: "#FB923C", marginBottom: 16 }}>${prizes?.third?.amount || "1,000"}</p>
            <div style={{ fontSize: 13, color: "#64748B" }}>{prizes?.third?.perks || "Certificates + Goodies"}</div>
          </div>
        </div>
        {/* Special prizes — dynamic */}
        <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}>
          {(prizes?.special?.length ? prizes.special : []).map((sp: any, i: number) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "10px 18px", fontSize: 13, color: "#94A3B8" }}>
              🎖 {sp.title}{sp.amount ? ` · $${sp.amount}` : ""}
            </div>
          ))}
        </div>
      </section>

      {/* ─── Schedule ─── */}
      <section id="schedule" style={{ padding: "96px 24px", background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)", borderRadius: 999, padding: "5px 14px", marginBottom: 20 }}>
              <Calendar style={{ width: 13, height: 13, color: "#60A5FA" }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: "#60A5FA", letterSpacing: "0.1em" }}>EVENT SCHEDULE</span>
            </div>
            <h2 style={{ fontSize: 40, fontWeight: 800, color: "white" }}>48-Hour Timeline</h2>
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 40 }}>
            {days.map(d => (
              <button key={d} onClick={() => setActiveDay(d)}
                style={{ padding: "8px 24px", borderRadius: 8, border: activeDay === d ? "1px solid #7C3AED" : "1px solid rgba(255,255,255,0.1)", background: activeDay === d ? "rgba(124,58,237,0.25)" : "transparent", color: activeDay === d ? "#A78BFA" : "#64748B", fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
              >{d}</button>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {filteredSchedule.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 20, alignItems: "flex-start", padding: "16px 20px", background: "rgba(255,255,255,0.03)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ minWidth: 80, fontSize: 13, color: "#64748B", fontWeight: 600, marginTop: 2 }}>{item.time}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 10px", borderRadius: 999, border: "1px solid", ...(typeColor[item.type] ? {} : {}), background: "rgba(124,58,237,0.15)", borderColor: "rgba(124,58,237,0.3)", color: "#A78BFA" }} className={typeColor[item.type]}>
                      {item.type}
                    </span>
                    <h4 style={{ fontSize: 15, fontWeight: 700, color: "white" }}>{item.title}</h4>
                  </div>
                  <p style={{ fontSize: 13, color: "#64748B" }}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Sponsors ─── */}
      <section id="sponsors" style={{ padding: "80px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: "white", marginBottom: 10 }}>Our Sponsors</h2>
          <p style={{ fontSize: 15, color: "#64748B" }}>These companies make this hackathon possible.</p>
        </div>
        {["Platinum", "Gold", "Silver", "Bronze", "Community"].map(tier => {
          const filtered = sponsorList.filter((s: any) => s.tier === tier)
          if (filtered.length === 0) return null
          const tierStyles: Record<string, { color: string; badge: string }> = {
            Platinum: { color: "#A78BFA", badge: "rgba(124,58,237,0.15)" },
            Gold:     { color: "#EAB308", badge: "rgba(234,179,8,0.15)" },
            Silver:   { color: "#94A3B8", badge: "rgba(148,163,184,0.15)" },
            Bronze:   { color: "#FB923C", badge: "rgba(249,115,22,0.15)" },
            Community:{ color: "#4ADE80", badge: "rgba(34,197,94,0.15)" },
          }
          return (
            <div key={tier} style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <div style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.06)" }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: tierStyles[tier].color, padding: "3px 14px", background: tierStyles[tier].badge, borderRadius: 999 }}>{tier} Sponsors</span>
                <div style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.06)" }} />
              </div>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                {filtered.map((s: any) => (
                  <a key={s.name} href={s.website || "#"} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "20px 36px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minWidth: tier === "Gold" || tier === "Platinum" ? 200 : 160 }}>
                      <span style={{ fontWeight: 800, fontSize: tier === "Gold" || tier === "Platinum" ? 18 : 15, color: "white", letterSpacing: "0.05em" }}>{s.name}</span>
                      {s.description && <span style={{ fontSize: 11, color: "#64748B", marginTop: 4, textAlign: "center" }}>{s.description}</span>}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )
        })}
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <p style={{ fontSize: 14, color: "#64748B" }}>Interested in sponsoring?{" "}
            <a href="mailto:sponsors@eventsphere.io" style={{ color: "#7C3AED", textDecoration: "none" }}>Contact us →</a>
          </p>
        </div>
      </section>

      {/* ─── Organizers ─── */}
      {(event?.organizers?.length > 0 && event.organizers.some((o: any) => o.name)) && (
        <section style={{ padding: "80px 24px", background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 style={{ fontSize: 36, fontWeight: 800, color: "white", marginBottom: 10 }}>Meet the Organizers</h2>
              <p style={{ fontSize: 15, color: "#64748B" }}>The team behind this hackathon</p>
            </div>
            <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
              {event.organizers.filter((o: any) => o.name).map((org: any, i: number) => {
                const initials = org.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase()
                return (
                  <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "28px 24px", textAlign: "center", width: 220 }}>
                    <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#7C3AED,#3B82F6)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 22, fontWeight: 800, color: "white" }}>
                      {initials}
                    </div>
                    <h4 style={{ fontWeight: 700, fontSize: 16, color: "white", marginBottom: 4 }}>{org.name}</h4>
                    {org.role && <p style={{ fontSize: 13, color: "#A78BFA", marginBottom: 4 }}>{org.role}</p>}
                    {org.company && <p style={{ fontSize: 12, color: "#64748B", marginBottom: 16 }}>{org.company}</p>}
                    <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                      {org.twitter && <a href={org.twitter.startsWith("http") ? org.twitter : `https://twitter.com/${org.twitter.replace("@","")}`} target="_blank" rel="noreferrer" style={{ color: "#64748B" }}><Twitter style={{ width: 16, height: 16 }} /></a>}
                      {org.linkedin && <a href={org.linkedin.startsWith("http") ? org.linkedin : `https://${org.linkedin}`} target="_blank" rel="noreferrer" style={{ color: "#64748B" }}><Linkedin style={{ width: 16, height: 16 }} /></a>}
                      {org.email && <a href={`mailto:${org.email}`} style={{ color: "#64748B" }}><Mail style={{ width: 16, height: 16 }} /></a>}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ─── FAQ ─── */}
      <section id="faq" style={{ padding: "80px 24px", background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 740, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: "white", marginBottom: 10 }}>Frequently Asked Questions</h2>
            <p style={{ fontSize: 15, color: "#64748B" }}>Everything you need to know before registering.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, overflow: "hidden" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: "white" }}>{faq.q}</span>
                  {openFaq === i ? <ChevronUp style={{ width: 18, height: 18, color: "#7C3AED" }} /> : <ChevronDown style={{ width: 18, height: 18, color: "#64748B" }} />}
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 20px 18px", fontSize: 14, color: "#94A3B8", lineHeight: 1.7 }}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Registration Form ─── */}
      <section id="register" style={{ padding: "96px 24px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 999, padding: "5px 14px", marginBottom: 20 }}>
              <CheckCircle style={{ width: 13, height: 13, color: "#4ADE80" }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: "#4ADE80", letterSpacing: "0.1em" }}>FREE REGISTRATION</span>
            </div>
            <h2 style={{ fontSize: 40, fontWeight: 800, color: "white", marginBottom: 12 }}>Register for {eventName}</h2>
            <p style={{ fontSize: 15, color: "#64748B" }}>Secure your spot. It takes less than 2 minutes.</p>
          </div>

          {submitted ? (
            <div style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 20, padding: "60px 40px", textAlign: "center" }}>
              <div style={{ fontSize: 64, marginBottom: 20 }}>🎉</div>
              <h3 style={{ fontSize: 28, fontWeight: 800, color: "white", marginBottom: 12 }}>You&apos;re Registered!</h3>
              <p style={{ fontSize: 16, color: "#94A3B8", marginBottom: 24 }}>Welcome to <strong style={{ color: "#4ADE80" }}>{eventName}</strong>! We&apos;ve sent a confirmation to <strong>{form.email}</strong>. Get ready to build something amazing!</p>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                <a href={`/event/${slug}/register`}>
                  <button style={{ background: "rgba(34,197,94,0.2)", color: "#4ADE80", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 10, padding: "10px 24px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
                    Full Registration Portal
                  </button>
                </a>
                <button onClick={() => setSubmitted(false)} style={{ background: "transparent", color: "#64748B", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "10px 24px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
                  Register Another
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "40px", display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#94A3B8", marginBottom: 8 }}>Full Name *</label>
                  <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your full name"
                    style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px 14px", fontSize: 14, color: "white", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#94A3B8", marginBottom: 8 }}>Email Address *</label>
                  <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com"
                    style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px 14px", fontSize: 14, color: "white", outline: "none", boxSizing: "border-box" }} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#94A3B8", marginBottom: 8 }}>Phone Number</label>
                  <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210"
                    style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px 14px", fontSize: 14, color: "white", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#94A3B8", marginBottom: 8 }}>Team Name</label>
                  <input value={form.teamName} onChange={e => setForm({ ...form, teamName: e.target.value })} placeholder="Team Awesome (or solo)"
                    style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px 14px", fontSize: 14, color: "white", outline: "none", boxSizing: "border-box" }} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#94A3B8", marginBottom: 8 }}>Team Size</label>
                  <select value={form.teamSize} onChange={e => setForm({ ...form, teamSize: e.target.value })}
                    style={{ width: "100%", background: "#111827", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px 14px", fontSize: 14, color: "white", outline: "none" }}>
                    {["1", "2", "3", "4"].map(n => <option key={n} value={n}>{n} {n === "1" ? "member (solo)" : "members"}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#94A3B8", marginBottom: 8 }}>Experience</label>
                  <select value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })}
                    style={{ width: "100%", background: "#111827", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px 14px", fontSize: 14, color: "white", outline: "none" }}>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#94A3B8", marginBottom: 8 }}>Track</label>
                  <select value={form.track} onChange={e => setForm({ ...form, track: e.target.value })}
                    style={{ width: "100%", background: "#111827", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px 14px", fontSize: 14, color: "white", outline: "none" }}>
                    {trackList.map((t: any) => <option key={t.title} value={t.title}>{t.title}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#94A3B8", marginBottom: 8 }}>Tell us about yourself / your idea</label>
                <textarea value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} placeholder="Brief background, skills, what you want to build..." rows={3}
                  style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px 14px", fontSize: 14, color: "white", outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }} />
              </div>
              <button type="submit" style={{ background: "linear-gradient(135deg,#7C3AED,#3B82F6)", color: "white", border: "none", borderRadius: 12, padding: "16px", fontSize: 16, fontWeight: 700, cursor: "pointer", width: "100%", boxShadow: "0 0 40px rgba(124,58,237,0.3)" }}>
                🚀 Complete Registration
              </button>
              <p style={{ textAlign: "center", fontSize: 12, color: "#475569" }}>
                By registering, you agree to the event&apos;s Code of Conduct and Privacy Policy.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "48px 24px", background: "rgba(0,0,0,0.4)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#7C3AED,#3B82F6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Zap style={{ width: 14, height: 14, color: "white" }} />
            </div>
            <span style={{ fontWeight: 700, fontSize: 16, color: "white" }}>EventSphere</span>
          </div>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
            {[
              { icon: <Mail style={{ width: 14, height: 14 }} />, label: "support@eventsphere.io" },
              { icon: <Github style={{ width: 14, height: 14 }} />, label: "github.com/eventsphere" },
              { icon: <Twitter style={{ width: 14, height: 14 }} />, label: "@EventSphere" },
            ].map(({ icon, label }) => (
              <span key={label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#64748B" }}>
                {icon} {label}
              </span>
            ))}
          </div>
          <p style={{ fontSize: 12, color: "#334155", textAlign: "center" }}>
            © 2025 EventSphere Inc. Powered by innovation. Built for hackers.
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-8px); }
        }
        * { box-sizing: border-box; }
        input::placeholder, textarea::placeholder { color: #475569; }
        select option { background: #111827; }
      `}</style>
    </div>
  )
}
