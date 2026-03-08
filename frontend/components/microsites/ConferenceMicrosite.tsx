"use client"

import { useState, useEffect, useRef } from "react"
import { Calendar, MapPin, Clock, User, Download, FolderOpen, ArrowDownToLine, FileText, Zap, ArrowUp, Menu, X, BookOpen, Tag, CheckCircle, Lock, AlertTriangle, XCircle, Users, Wifi, Monitor, Play, ChevronDown } from "lucide-react"

/* ─── Helpers ─────────────────────────────────────────────────── */
function formatDate(d: string) {
    if (!d) return ""
    return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
}

function useScrollReveal(deps: any[] = []) {
    useEffect(() => {
        const els = document.querySelectorAll(".cm-fade-up")
        if (!els.length) return
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("cm-visible"); obs.unobserve(e.target) } })
        }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" })
        els.forEach(el => obs.observe(el))
        return () => obs.disconnect()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)
}

function useFadeUp(ref: React.RefObject<HTMLElement | null>) {
    useEffect(() => {
        if (!ref.current) return
        const els = ref.current.querySelectorAll(".cm-fade-up")
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("cm-visible"); obs.unobserve(e.target) } })
        }, { threshold: 0.1 })
        els.forEach(el => obs.observe(el))
        return () => obs.disconnect()
    }, [ref])
}

/* ─── Countdown ───────────────────────────────────────────────── */
function Countdown({ targetDate }: { targetDate: string }) {
    const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
    useEffect(() => {
        const calc = () => {
            const diff = new Date(targetDate).getTime() - Date.now()
            if (diff <= 0) return setT({ days: 0, hours: 0, minutes: 0, seconds: 0 })
            setT({ days: Math.floor(diff / 86400000), hours: Math.floor((diff % 86400000) / 3600000), minutes: Math.floor((diff % 3600000) / 60000), seconds: Math.floor((diff % 60000) / 1000) })
        }
        calc(); const id = setInterval(calc, 1000); return () => clearInterval(id)
    }, [targetDate])
    return (
        <div style={{ display: "flex", gap: "0.85rem", justifyContent: "center", flexWrap: "wrap" }}>
            {[{ l: "Days", v: t.days }, { l: "Hours", v: t.hours }, { l: "Minutes", v: t.minutes }, { l: "Seconds", v: t.seconds }].map(({ l, v }, i) => (
                <div key={l} style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 18, padding: "1.1rem 1.4rem", minWidth: 88, textAlign: "center" }}>
                    <div style={{ fontSize: "2rem", fontWeight: 800, color: i % 2 === 0 ? "#818cf8" : "#06b6d4", lineHeight: 1 }}>{String(v).padStart(2, "0")}</div>
                    <div style={{ fontSize: "0.62rem", color: "#64748b", fontWeight: 700, marginTop: "0.3rem", textTransform: "uppercase", letterSpacing: "0.12em" }}>{l}</div>
                </div>
            ))}
        </div>
    )
}

/* ─── Navbar ──────────────────────────────────────────────────── */
const NAV_LINKS = [{ id: "about", label: "About" }, { id: "agenda", label: "Agenda" }, { id: "registration", label: "Register" }, { id: "resources", label: "Resources" }]

function Navbar({ event }: { event: any }) {
    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [progress, setProgress] = useState(0)
    const [active, setActive] = useState("")
    const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setOpen(false) }
    useEffect(() => {
        const fn = () => { setScrolled(window.scrollY > 40); const dh = document.documentElement.scrollHeight - window.innerHeight; setProgress(dh > 0 ? (window.scrollY / dh) * 100 : 0) }
        window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn)
    }, [])
    useEffect(() => {
        const sections = NAV_LINKS.map(l => document.getElementById(l.id)).filter(Boolean) as HTMLElement[]
        const obs = new IntersectionObserver(entries => { const v = entries.find(e => e.isIntersecting); if (v) setActive(v.target.id) }, { threshold: 0.25 })
        sections.forEach(s => obs.observe(s)); return () => sections.forEach(s => obs.unobserve(s))
    }, [])
    return (
        <>
            <nav style={{ position: "sticky", top: 0, zIndex: 1000, transition: "all 0.4s", background: scrolled ? "rgba(8,8,18,0.92)" : "rgba(8,8,18,0.4)", backdropFilter: "blur(24px)", borderBottom: scrolled ? "1px solid rgba(99,102,241,0.2)" : "1px solid transparent", boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.6)" : "none" }}>
                <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 2rem" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                            {event?.conferenceInfo?.logo ? <img src={event.conferenceInfo.logo} alt={event.eventName} style={{ height: 36, borderRadius: 8 }} /> : <div style={{ background: "linear-gradient(135deg,#6366f1,#06b6d4)", borderRadius: 12, padding: 7, display: "flex", alignItems: "center", justifyContent: "center" }}><Zap size={19} color="white" fill="white" /></div>}
                            <span style={{ fontWeight: 800, fontSize: "1.25rem", background: "linear-gradient(135deg,#e2e8f0,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{event?.eventName || "EventSphere"}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.15rem" }} className="conf-hidden-mobile">
                            {NAV_LINKS.map(link => {
                                const isA = active === link.id
                                return <button key={link.id} id={`conf-nav-${link.id}`} onClick={() => scrollTo(link.id)} style={{ background: isA ? "rgba(99,102,241,0.12)" : "transparent", border: isA ? "1px solid rgba(99,102,241,0.3)" : "1px solid transparent", cursor: "pointer", padding: "0.5rem 1.1rem", borderRadius: 9999, fontSize: "0.88rem", fontWeight: 600, color: isA ? "#818cf8" : "#94a3b8", transition: "all 0.25s" }}>{link.label}</button>
                            })}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                            <button id="conf-nav-register" onClick={() => scrollTo("registration")} className="conf-btn-primary conf-hidden-mobile" style={{ padding: "0.55rem 1.5rem", fontSize: "0.85rem" }}>Register Now</button>
                            <button id="conf-hamburger" onClick={() => setOpen(!open)} className="conf-show-mobile" style={{ background: open ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.06)", border: "1px solid rgba(99,102,241,0.25)", borderRadius: 10, padding: 9, cursor: "pointer", color: "white", display: "none" }}>{open ? <X size={20} /> : <Menu size={20} />}</button>
                        </div>
                    </div>
                    {open && <div style={{ borderTop: "1px solid rgba(99,102,241,0.15)", padding: "1rem 0 1.25rem", display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                        {NAV_LINKS.map(l => <button key={l.id} onClick={() => scrollTo(l.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: "0.85rem 1rem", borderRadius: 10, textAlign: "left", fontSize: "0.95rem", fontWeight: 600, color: active === l.id ? "#818cf8" : "#94a3b8" }}>{l.label}</button>)}
                        <button onClick={() => scrollTo("registration")} className="conf-btn-primary" style={{ marginTop: "0.75rem", justifyContent: "center" }}>Register Now</button>
                    </div>}
                </div>
                <div style={{ position: "absolute", bottom: 0, left: 0, height: 2, width: `${progress}%`, background: "linear-gradient(90deg,#6366f1,#06b6d4)", transition: "width 0.1s linear" }} />
            </nav>
        </>
    )
}

/* ─── Hero ────────────────────────────────────────────────────── */
function HeroSection({ event }: { event: any }) {
    useScrollReveal([event])
    const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    const conf = event?.conferenceInfo || {}
    const isFuture = event?.startDate && new Date(event.startDate) > new Date()
    return (
        <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${event?.bannerUrl || event?.bannerImage || ""})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.28) saturate(1.2)", zIndex: 0 }} />
            <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(180deg,rgba(8,8,18,0.7) 0%,rgba(8,8,18,0.1) 45%,rgba(8,8,18,0.95) 100%)" }} />
            <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "radial-gradient(ellipse 90% 70% at 50% 30%,rgba(99,102,241,0.22) 0%,transparent 70%)" }} />
            <div style={{ position: "absolute", inset: 0, zIndex: 1, backgroundImage: "linear-gradient(rgba(99,102,241,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.03) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
            <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "clamp(5rem,10vw,8rem) 1.5rem 4rem", maxWidth: 1000, margin: "0 auto" }}>
                {conf.logo && <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "center" }}><img src={conf.logo} alt={event.eventName} style={{ height: 80, borderRadius: 16, filter: "drop-shadow(0 8px 30px rgba(99,102,241,0.5))" }} /></div>}
                {event?.category && <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}><div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.35)", borderRadius: 9999, padding: "0.4rem 1.25rem", fontSize: "0.78rem", fontWeight: 700, color: "#818cf8", letterSpacing: "0.1em", textTransform: "uppercase" }}><span>✦</span> {event.category}</div></div>}
                <h1 style={{ fontSize: "clamp(2.75rem,8vw,6rem)", fontWeight: 900, lineHeight: 1.02, letterSpacing: "-0.04em", marginBottom: "1.5rem", background: "linear-gradient(135deg,#ffffff 0%,#c7d2fe 50%,#67e8f9 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{event?.eventName || "EventSphere Conference"}</h1>
                {conf.tagline && <p style={{ fontSize: "clamp(1rem,2.5vw,1.3rem)", color: "#94a3b8", lineHeight: 1.75, maxWidth: 680, margin: "0 auto 2.5rem" }}>{conf.tagline}</p>}
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginBottom: "3rem" }}>
                    {(event?.startDate || event?.endDate) && <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 9999, padding: "0.5rem 1.25rem", fontSize: "0.88rem", color: "#e2e8f0", fontWeight: 500, backdropFilter: "blur(8px)" }}><Calendar size={14} color="#6366f1" />{formatDate(event.startDate)}{event.endDate && event.endDate !== event.startDate && <> – {formatDate(event.endDate)}</>}</div>}
                    {event?.venue && <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 9999, padding: "0.5rem 1.25rem", fontSize: "0.88rem", color: "#e2e8f0", fontWeight: 500, backdropFilter: "blur(8px)" }}><MapPin size={14} color="#06b6d4" />{event.venue}</div>}
                    {conf.eventMode && <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: 9999, padding: "0.4rem 1rem", fontSize: "0.85rem", color: "#818cf8", fontWeight: 600 }}>{conf.eventMode === "Virtual" ? <Wifi size={14} /> : conf.eventMode === "Hybrid" ? <Monitor size={14} /> : <Users size={14} />}{conf.eventMode}</div>}
                </div>
                {isFuture && <div style={{ marginBottom: "3.5rem" }}><p style={{ fontSize: "0.7rem", color: "#475569", marginBottom: "1.25rem", letterSpacing: "0.14em", fontWeight: 700, textTransform: "uppercase" }}>Event Starts In</p><Countdown targetDate={event.startDate} /></div>}
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
                    <button id="conf-hero-register" onClick={() => scrollTo("registration")} className="conf-btn-primary" style={{ fontSize: "1rem", padding: "1rem 2.75rem", borderRadius: 9999 }}>Register Now →</button>
                    <button id="conf-hero-agenda" onClick={() => scrollTo("agenda")} className="conf-btn-outline" style={{ fontSize: "1rem", padding: "1rem 2.75rem", display: "flex", alignItems: "center", gap: "0.4rem" }}><Play size={15} fill="currentColor" strokeWidth={0} /> View Agenda</button>
                </div>
                <p style={{ marginTop: "2.5rem", fontSize: "0.82rem", color: "#334155" }}>✓ Secure checkout &nbsp;·&nbsp; ✓ Instant confirmation &nbsp;·&nbsp; ✓ Certificate of attendance</p>
            </div>
            <button style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", zIndex: 2, background: "transparent", border: "none", cursor: "pointer", animation: "confFloat 2.5s ease-in-out infinite" }} onClick={() => scrollTo("about")} aria-label="Scroll down"><div style={{ border: "1.5px solid rgba(255,255,255,0.18)", borderRadius: 9999, padding: "0.6rem", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.04)", backdropFilter: "blur(8px)" }}><ChevronDown size={22} color="rgba(255,255,255,0.4)" /></div></button>
        </section>
    )
}

/* ─── About ───────────────────────────────────────────────────── */
function AboutSection({ event }: { event: any }) {
    const ref = useRef<HTMLElement>(null)
    useFadeUp(ref)
    const conf = event?.conferenceInfo || {}
    if (!event?.description && !event?.category) return null
    const modeMeta: Record<string, { emoji: string; color: string; bg: string; border: string }> = {
        "In-Person": { emoji: "🏛️", color: "#6366f1", bg: "rgba(99,102,241,0.07)", border: "rgba(99,102,241,0.2)" },
        "Virtual": { emoji: "💻", color: "#06b6d4", bg: "rgba(6,182,212,0.07)", border: "rgba(6,182,212,0.2)" },
        "Hybrid": { emoji: "🌐", color: "#a855f7", bg: "rgba(168,85,247,0.07)", border: "rgba(168,85,247,0.2)" },
    }
    const mm = modeMeta[conf.eventMode || ""] || modeMeta["In-Person"]
    return (
        <section ref={ref} id="about" style={{ background: "#0f0f1e", padding: "7rem 1.5rem", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: "radial-gradient(rgba(99,102,241,0.06) 1px,transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
            <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
                <div className="cm-fade-up" style={{ textAlign: "center", marginBottom: "4rem" }}>
                    <span className="conf-section-tag"><BookOpen size={11} /> About The Conference</span>
                    <h2 style={{ fontFamily: "Outfit,sans-serif", fontSize: "clamp(1.9rem,4vw,2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", background: "linear-gradient(135deg,#e2e8f0 30%,#818cf8 80%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1.2 }}>{event?.eventName || "About This Event"}</h2>
                </div>
                {event?.description && <div className="cm-fade-up" style={{ padding: "2.25rem 2.5rem", background: "rgba(15,15,30,0.8)", border: "1px solid rgba(99,102,241,0.14)", borderRadius: 20, marginBottom: "1.5rem", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 2, background: "linear-gradient(90deg,transparent,rgba(99,102,241,0.5),transparent)" }} />
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}><div style={{ background: "linear-gradient(135deg,#6366f1,#06b6d4)", borderRadius: 12, padding: 10, display: "flex", alignItems: "center", justifyContent: "center" }}><BookOpen size={17} color="white" /></div><span style={{ fontWeight: 700, color: "#e2e8f0" }}>Event Description</span></div>
                    <p style={{ fontSize: "1.025rem", color: "#94a3b8", lineHeight: 1.9 }}>{event.description}</p>
                </div>}
                <div className="cm-fade-up" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "1rem" }}>
                    {event?.category && <div style={{ padding: "1.5rem", background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.18)", borderRadius: 16, display: "flex", alignItems: "center", gap: "1rem" }}><div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Tag size={18} color="#6366f1" /></div><div><p style={{ fontSize: "0.68rem", fontWeight: 700, color: "#6366f1", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.3rem" }}>Category</p><p style={{ fontSize: "1rem", color: "#e2e8f0", fontWeight: 700 }}>{event.category}</p></div></div>}
                    {conf.eventMode && <div style={{ padding: "1.5rem", background: mm.bg, border: `1px solid ${mm.border}`, borderRadius: 16, display: "flex", alignItems: "center", gap: "1rem" }}><div style={{ width: 44, height: 44, borderRadius: 12, background: mm.color + "20", border: `1px solid ${mm.color}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "1.4rem" }}>{mm.emoji}</div><div><p style={{ fontSize: "0.68rem", fontWeight: 700, color: mm.color, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.3rem" }}>Event Mode</p><p style={{ fontSize: "1rem", color: "#e2e8f0", fontWeight: 700 }}>{conf.eventMode}</p></div></div>}
                </div>
            </div>
        </section>
    )
}

/* ─── Agenda ──────────────────────────────────────────────────── */
function AgendaSection({ event }: { event: any }) {
    const ref = useRef<HTMLElement>(null)
    useFadeUp(ref)
    const agenda: any[] = event?.agenda || []
    const [activeDay, setActiveDay] = useState(0)
    if (!agenda.length) return null
    const totalSessions = agenda.reduce((a: number, d: any) => a + (d.sessions?.length || 0), 0)
    return (
        <section ref={ref} id="agenda" style={{ padding: "7rem 1.5rem", background: "#080812", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "-10%", left: "50%", transform: "translateX(-50%)", width: 900, height: 500, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(99,102,241,0.07) 0%,transparent 65%)", zIndex: 0, pointerEvents: "none" }} />
            <div style={{ maxWidth: 960, margin: "0 auto", position: "relative", zIndex: 1 }}>
                <div className="cm-fade-up" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
                    <span className="conf-section-tag"><Calendar size={11} /> Schedule</span>
                    <h2 style={{ fontFamily: "Outfit,sans-serif", fontSize: "clamp(1.9rem,4vw,2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "0.75rem", color: "#f1f5f9" }}>Conference <span style={{ background: "linear-gradient(135deg,#818cf8,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Agenda</span></h2>
                    <p style={{ fontSize: "1rem", color: "#64748b", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>{totalSessions} sessions across {agenda.length} day{agenda.length > 1 ? "s" : ""}</p>
                </div>
                {agenda.length > 1 && <div className="cm-fade-up" style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", justifyContent: "center", marginBottom: "3rem" }}>
                    {agenda.map((day: any, idx: number) => {
                        const isA = activeDay === idx
                        return <button key={day.day} id={`conf-agenda-day-${idx}`} onClick={() => setActiveDay(idx)} style={{ padding: "0.7rem 1.75rem", borderRadius: 9999, border: isA ? "none" : "1px solid rgba(99,102,241,0.2)", background: isA ? "linear-gradient(135deg,#6366f1,#4f46e5)" : "rgba(15,15,30,0.8)", color: isA ? "white" : "#64748b", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer", boxShadow: isA ? "0 6px 24px rgba(99,102,241,0.4)" : "none" }}>{day.label || `Day ${day.day}`}</button>
                    })}
                </div>}
                {agenda[activeDay]?.date && <p style={{ textAlign: "center", fontSize: "0.78rem", color: "#475569", marginBottom: "1.75rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>{new Date(agenda[activeDay].date + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</p>}
                {agenda[activeDay] && <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                    {agenda[activeDay].sessions?.map((session: any, idx: number) => {
                        const time = session.startTime && session.endTime ? `${session.startTime} – ${session.endTime}` : session.startTime || ""
                        const colors = ["linear-gradient(180deg,#6366f1,#4f46e5)", "linear-gradient(180deg,#06b6d4,#0891b2)", "linear-gradient(180deg,#a855f7,#7c3aed)"]
                        return (
                            <div key={session._id || idx} style={{ display: "grid", gridTemplateColumns: "minmax(175px,auto) 1fr", gap: "1.25rem", alignItems: "start", padding: "1.5rem 1.5rem 1.5rem 1.75rem", background: "rgba(15,15,30,0.7)", border: "1px solid rgba(99,102,241,0.12)", borderRadius: 20, position: "relative", transition: "all 0.3s" }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.4)"; (e.currentTarget as HTMLElement).style.transform = "translateX(4px)" }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.12)"; (e.currentTarget as HTMLElement).style.transform = "translateX(0)" }}
                            >
                                <div style={{ position: "absolute", left: 0, top: "15%", bottom: "15%", width: 3, background: colors[idx % 3], borderRadius: "0 3px 3px 0" }} />
                                <div>{time && <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "linear-gradient(135deg,rgba(99,102,241,0.2),rgba(79,70,229,0.15))", border: "1px solid rgba(99,102,241,0.25)", borderRadius: 10, padding: "0.5rem 0.75rem" }}><Clock size={11} color="#818cf8" /><span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#e2e8f0", whiteSpace: "nowrap" }}>{time}</span></div>}</div>
                                <div style={{ minWidth: 0 }}>
                                    <h4 style={{ fontFamily: "Outfit,sans-serif", fontSize: "1.05rem", fontWeight: 700, color: "#f1f5f9", marginBottom: (session.speaker || session.room) ? "0.65rem" : 0, letterSpacing: "-0.02em" }}>{session.title}</h4>
                                    {(session.speaker || session.room) && <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                                        {session.speaker && <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.8rem", color: "#818cf8", fontWeight: 500 }}><User size={12} />{session.speaker}</span>}
                                        {session.room && <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.8rem", color: "#64748b", fontWeight: 500 }}><MapPin size={12} />{session.room}</span>}
                                    </div>}
                                </div>
                            </div>
                        )
                    })}
                </div>}
            </div>
        </section>
    )
}

/* ─── Registration ────────────────────────────────────────────── */
function RegistrationSection({ event }: { event: any }) {
    const ref = useRef<HTMLElement>(null)
    useFadeUp(ref)
    const rs = event?.registrationSettings || {}
    const isFree = (rs.registrationType || "free") === "free"
    const deadline = rs.deadline || null
    const tickets: any[] = rs.tickets || []
    if (!tickets.length) return null
    const now = new Date()
    const deadlineDate = deadline ? new Date(deadline) : null
    const isDeadlinePassed = deadlineDate ? now > deadlineDate : false
    const isClosed = isDeadlinePassed
    const deadlineStr = deadlineDate ? deadlineDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : null
    const PALETTE = [
        { accent: "#6366f1", glow: "rgba(99,102,241,0.3)", bg: "rgba(99,102,241,0.07)", border: "rgba(99,102,241,0.25)" },
        { accent: "#06b6d4", glow: "rgba(6,182,212,0.3)", bg: "rgba(6,182,212,0.07)", border: "rgba(6,182,212,0.25)" },
        { accent: "#a855f7", glow: "rgba(168,85,247,0.35)", bg: "rgba(168,85,247,0.08)", border: "rgba(168,85,247,0.35)" },
        { accent: "#10b981", glow: "rgba(16,185,129,0.3)", bg: "rgba(16,185,129,0.07)", border: "rgba(16,185,129,0.25)" },
    ]
    return (
        <section ref={ref} id="registration" style={{ padding: "7rem 1.5rem", background: "#0f0f1e", position: "relative", overflow: "hidden" }}>
            <div style={{ maxWidth: 1140, margin: "0 auto", position: "relative", zIndex: 1 }}>
                <div className="cm-fade-up" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
                    <span className="conf-section-tag"><Lock size={11} /> Registration</span>
                    <h2 style={{ fontFamily: "Outfit,sans-serif", fontSize: "clamp(1.9rem,4vw,2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "0.75rem", color: "#f1f5f9" }}>{isFree ? "Register for " : "Choose Your "}<span style={{ background: "linear-gradient(135deg,#818cf8,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{isFree ? "Free" : "Pass"}</span></h2>
                </div>
                {isClosed && <div className="cm-fade-up" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem", padding: "1rem 1.5rem", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 14, marginBottom: "2rem", maxWidth: 520, margin: "0 auto 2.5rem" }}><AlertTriangle size={18} color="#ef4444" /><span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#ef4444" }}>Registration Closed — No new registrations are being accepted.</span></div>}
                {deadlineStr && <div className="cm-fade-up" style={{ display: "flex", flexWrap: "wrap", gap: "0.85rem", justifyContent: "center", marginBottom: "3rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", padding: "0.8rem 1.4rem", background: isDeadlinePassed ? "rgba(239,68,68,0.07)" : "rgba(251,191,36,0.06)", border: `1px solid ${isDeadlinePassed ? "rgba(239,68,68,0.25)" : "rgba(251,191,36,0.2)"}`, borderRadius: 14, fontSize: "0.88rem", color: isDeadlinePassed ? "#ef4444" : "#fbbf24" }}><Calendar size={15} /><span><strong>Deadline:</strong> {deadlineStr}</span></div>
                </div>}
                <div className="cm-fade-up" style={tickets.length === 1 ? { display: "flex", justifyContent: "center" } : { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.75rem" }}>
                    {tickets.map((ticket: any, idx: number) => {
                        const t = PALETTE[idx % PALETTE.length]
                        const name = ticket.type || ticket.name || "Conference Pass"
                        const benefits: string[] = ticket.benefits || []
                        return (
                            <div key={ticket._id || idx} style={tickets.length === 1 ? { width: "100%", maxWidth: 460 } : {}}>
                                <div style={{ position: "relative", background: "rgba(12,12,28,0.92)", border: `1px solid ${isClosed ? "rgba(100,116,139,0.2)" : t.border}`, borderRadius: 24, padding: "2.5rem 2rem", display: "flex", flexDirection: "column", backdropFilter: "blur(20px)", overflow: "hidden", transition: "all 0.4s" }}>
                                    <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1, background: `linear-gradient(90deg,transparent,${isClosed ? "rgba(100,116,139,0.3)" : t.accent + "80"},transparent)` }} />
                                    {isClosed && <div style={{ position: "absolute", top: 0, left: 0, right: 0, background: "rgba(0,0,0,0.55)", zIndex: 2, borderRadius: "24px 24px 0 0", padding: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}><XCircle size={14} color="#ef4444" /><span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#ef4444", textTransform: "uppercase" }}>Registration Closed</span></div>}
                                    <div style={{ background: isClosed ? "rgba(100,116,139,0.1)" : `${t.accent}18`, border: `1px solid ${isClosed ? "rgba(100,116,139,0.2)" : t.accent + "35"}`, borderRadius: 14, padding: 11, display: "inline-flex", marginBottom: "1.25rem", marginTop: isClosed ? "1.5rem" : 0, width: "fit-content" }}><Zap size={22} color={isClosed ? "#475569" : t.accent} fill={isClosed ? "#475569" : t.accent} /></div>
                                    <h3 style={{ fontFamily: "Outfit,sans-serif", fontSize: "1.35rem", fontWeight: 800, marginBottom: "0.5rem", color: isClosed ? "#64748b" : "#f1f5f9" }}>{name}</h3>
                                    {ticket.paperSubmission && <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)", borderRadius: 9999, padding: "0.28rem 0.85rem", fontSize: "0.73rem", fontWeight: 700, color: "#06b6d4", marginBottom: "1.25rem", width: "fit-content" }}><FileText size={11} /> Includes Paper Submission</div>}
                                    {isFree ? <div style={{ marginBottom: "1.75rem" }}><span style={{ fontFamily: "Outfit,sans-serif", fontSize: "1.6rem", fontWeight: 900, background: `linear-gradient(135deg,${t.accent},#6366f1)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Free Registration</span></div> : ticket.price != null ? <div style={{ display: "flex", alignItems: "baseline", gap: "0.3rem", marginBottom: "1.75rem" }}><span style={{ fontSize: "0.8rem", color: isClosed ? "#475569" : t.accent, fontWeight: 700 }}>{ticket.currency || "USD"}</span><span style={{ fontFamily: "Outfit,sans-serif", fontSize: "3rem", fontWeight: 900, lineHeight: 1, color: isClosed ? "#475569" : "#f8fafc" }}>{ticket.price.toLocaleString()}</span><span style={{ fontSize: "0.82rem", color: "#475569" }}>/person</span></div> : null}
                                    {benefits.length > 0 && <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.7rem", marginBottom: "2rem" }}>{benefits.map((b: string, i: number) => <div key={i} style={{ display: "flex", gap: "0.65rem", alignItems: "flex-start" }}><CheckCircle size={16} color={isClosed ? "#334155" : t.accent} style={{ flexShrink: 0, marginTop: 2 }} /><span style={{ fontSize: "0.875rem", color: isClosed ? "#475569" : "#94a3b8", lineHeight: 1.55 }}>{b}</span></div>)}</div>}
                                    {isClosed ? <button disabled style={{ background: "rgba(71,85,105,0.25)", border: "1.5px solid rgba(71,85,105,0.3)", color: "#475569", borderRadius: 14, padding: "1rem", fontWeight: 700, fontSize: "0.95rem", cursor: "not-allowed", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}><XCircle size={15} />Registration Closed</button> :
                                        <a href={`/event/${event.slug}/register`} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", background: "transparent", border: `1.5px solid ${t.accent}`, color: t.accent, borderRadius: 14, padding: "1rem", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer", width: "100%", textDecoration: "none", transition: "all 0.3s" }}>Register Now →</a>}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

/* ─── Resources ───────────────────────────────────────────────── */
/* Helper: convert camelCase / snake_case keys to readable labels */
function formatResourceKey(key: string): string {
    const MAP: Record<string, string> = {
        brochure: "Conference Brochure", schedulePdf: "Event Schedule", schedule_pdf: "Event Schedule",
        guidelines: "Submission Guidelines", researchGuidelines: "Research Guidelines",
        research_guidelines: "Research Guidelines", agenda: "Conference Agenda",
        handbook: "Attendee Handbook", map: "Venue Map", codeOfConduct: "Code of Conduct",
        code_of_conduct: "Code of Conduct", sponsorKit: "Sponsor Kit", sponsor_kit: "Sponsor Kit",
    }
    if (MAP[key]) return MAP[key]
    return key.replace(/([A-Z])/g, " $1").replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase()).trim()
}

function ResourcesSection({ event }: { event: any }) {
    const ref = useRef<HTMLElement>(null)
    useFadeUp(ref)

    // Normalize resources: support both array [{label, url, fileType}] and object {key: url}
    const rawResources = event?.resources
    let resources: { label: string; url: string; fileType: string }[] = []

    if (Array.isArray(rawResources)) {
        resources = rawResources.filter((r: any) => r.url || r.label)
    } else if (rawResources && typeof rawResources === "object") {
        resources = Object.entries(rawResources)
            .filter(([_, url]) => typeof url === "string" && (url as string).length > 0)
            .map(([key, url]) => ({
                label: formatResourceKey(key),
                url: url as string,
                fileType: (url as string).split(".").pop()?.toLowerCase() || "pdf",
            }))
    }

    const FILE_META: Record<string, { emoji: string; color: string; bg: string; border: string; label: string }> = {
        pdf: { emoji: "📄", color: "#ef4444", bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.25)", label: "PDF" },
        doc: { emoji: "📝", color: "#3b82f6", bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.25)", label: "DOC" },
        docx: { emoji: "📝", color: "#3b82f6", bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.25)", label: "DOCX" },
        ppt: { emoji: "📊", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.25)", label: "PPT" },
        pptx: { emoji: "📊", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.25)", label: "PPTX" },
        xls: { emoji: "📊", color: "#22c55e", bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.25)", label: "XLS" },
        xlsx: { emoji: "📊", color: "#22c55e", bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.25)", label: "XLSX" },
        zip: { emoji: "📦", color: "#a855f7", bg: "rgba(168,85,247,0.1)", border: "rgba(168,85,247,0.25)", label: "ZIP" },
    }

    return (
        <section ref={ref} id="resources" style={{ padding: "7rem 1.5rem", background: "#080812", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "20%", right: "-10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div style={{ maxWidth: 760, margin: "0 auto", position: "relative", zIndex: 1 }}>
                <div className="cm-fade-up" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
                    <span className="conf-section-tag"><FolderOpen size={11} /> Downloads</span>
                    <h2 style={{ fontFamily: "Outfit,sans-serif", fontSize: "clamp(1.9rem,4vw,2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "0.75rem", color: "#f1f5f9" }}>Conference <span style={{ background: "linear-gradient(135deg,#06b6d4,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Resources</span></h2>
                    <p style={{ fontFamily: "Inter,sans-serif", fontSize: "1.05rem", color: "#94a3b8", maxWidth: 520, margin: "0 auto", lineHeight: 1.6 }}>Download important documents related to the conference.</p>
                </div>

                {resources.length === 0 ? (
                    <div className="cm-fade-up" style={{ textAlign: "center", padding: "3rem 2rem", background: "rgba(12,12,28,0.6)", border: "1px solid rgba(99,102,241,0.12)", borderRadius: 24, backdropFilter: "blur(20px)" }}>
                        <FolderOpen size={48} style={{ color: "#334155", marginBottom: "1rem" }} />
                        <p style={{ fontFamily: "Inter,sans-serif", fontSize: "1rem", color: "#64748b", margin: 0 }}>No resources available yet.</p>
                    </div>
                ) : (
                    <div className="cm-fade-up" style={{ background: "rgba(12,12,28,0.6)", border: "1px solid rgba(99,102,241,0.12)", borderRadius: 24, overflow: "hidden", backdropFilter: "blur(20px)" }}>
                        <div style={{ padding: "1rem 1.75rem", background: "rgba(99,102,241,0.06)", borderBottom: "1px solid rgba(99,102,241,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><FolderOpen size={15} color="#6366f1" /><span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#818cf8", letterSpacing: "0.08em", textTransform: "uppercase" }}>{resources.length} file{resources.length > 1 ? "s" : ""} available</span></div>
                            <Download size={15} color="#475569" />
                        </div>
                        <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                            {resources.map((r, i) => {
                                const ext = (r.fileType || r.url?.split(".").pop() || "").toLowerCase()
                                const meta = FILE_META[ext] || { emoji: "📁", color: "#6366f1", bg: "rgba(99,102,241,0.1)", border: "rgba(99,102,241,0.25)", label: ext.toUpperCase() || "FILE" }
                                return (
                                    <div key={r.label + i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.5rem 1.75rem", background: "rgba(12,12,28,0.8)", border: "1px solid rgba(99,102,241,0.1)", borderRadius: 18, gap: "1.25rem", transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)", position: "relative", overflow: "hidden" }}
                                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.35)"; (e.currentTarget as HTMLElement).style.transform = "translateX(6px) scale(1.01)" }}
                                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.1)"; (e.currentTarget as HTMLElement).style.transform = "translateX(0) scale(1)" }}>
                                        <div style={{ position: "absolute", left: 0, top: "15%", bottom: "15%", width: 3, background: `linear-gradient(180deg,${meta.color},${meta.color}80)`, borderRadius: "0 3px 3px 0" }} />
                                        <div style={{ display: "flex", alignItems: "center", gap: "1.1rem", flex: 1, minWidth: 0 }}>
                                            <div style={{ flexShrink: 0, width: 52, height: 52, background: meta.bg, border: `1px solid ${meta.border}`, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem" }}>{meta.emoji}</div>
                                            <div style={{ minWidth: 0 }}>
                                                <p style={{ fontFamily: "Outfit,sans-serif", fontSize: "1rem", fontWeight: 700, color: "#f1f5f9", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: "0.3rem" }}>{r.label}</p>
                                                <span style={{ fontSize: "0.68rem", fontWeight: 700, color: meta.color, background: meta.bg, border: `1px solid ${meta.border}`, borderRadius: 6, padding: "0.1rem 0.5rem" }}>{meta.label}</span>
                                            </div>
                                        </div>
                                        <a href={r.url || "#"} download target="_blank" rel="noopener noreferrer" id={`conf-resource-${i}`}
                                            style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: "0.45rem", padding: "0.65rem 1.25rem", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)", color: "#818cf8", borderRadius: 12, textDecoration: "none", fontSize: "0.82rem", fontWeight: 700, transition: "all 0.3s ease" }}
                                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.25)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.5)"; (e.currentTarget as HTMLElement).style.transform = "scale(1.05)" }}
                                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.1)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.25)"; (e.currentTarget as HTMLElement).style.transform = "scale(1)" }}
                                        ><ArrowDownToLine size={14} /> Download</a>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

/* ─── Footer ──────────────────────────────────────────────────── */
function FooterSection({ event }: { event: any }) {
    const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" })
    const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    return (
        <footer style={{ background: "rgba(4,4,14,0.98)", borderTop: "1px solid rgba(99,102,241,0.12)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "4.5rem 2rem 2.5rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: "3.5rem", marginBottom: "3.5rem" }}>
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "1.25rem", cursor: "pointer" }} onClick={scrollTop}>
                            {event?.conferenceInfo?.logo ? <img src={event.conferenceInfo.logo} alt={event.eventName} style={{ height: 34, borderRadius: 8 }} /> : <div style={{ background: "linear-gradient(135deg,#6366f1,#06b6d4)", borderRadius: 11, padding: 7, display: "flex", alignItems: "center", justifyContent: "center" }}><Zap size={18} color="white" fill="white" /></div>}
                            <span style={{ fontFamily: "Outfit,sans-serif", fontWeight: 800, fontSize: "1.2rem", background: "linear-gradient(135deg,#e2e8f0,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{event?.eventName || "EventSphere"}</span>
                        </div>
                        <p style={{ fontSize: "0.875rem", color: "#475569", lineHeight: 1.8, maxWidth: 240 }}>{event?.conferenceInfo?.tagline || "Connecting minds and shaping futures."}</p>
                        {(event?.startDate || event?.endDate) && <div style={{ marginTop: "1.25rem", display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.15)", borderRadius: 9999, padding: "0.35rem 0.9rem", fontSize: "0.77rem", fontWeight: 600, color: "#6366f1" }}>📅 {formatDate(event.startDate)}{event.endDate && event.endDate !== event.startDate ? ` – ${formatDate(event.endDate)}` : ""}</div>}
                    </div>
                    <div>
                        <h4 style={{ fontFamily: "Outfit,sans-serif", fontSize: "0.72rem", fontWeight: 700, color: "#6366f1", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "1.25rem" }}>Navigation</h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                            {NAV_LINKS.map(link => <button key={link.id} onClick={() => scrollTo(link.id)} style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: 0, fontSize: "0.9rem", color: "#475569", fontWeight: 500, transition: "all 0.2s" }}>{link.label}</button>)}
                        </div>
                    </div>
                </div>
                <div style={{ height: 1, background: "linear-gradient(90deg,transparent,rgba(99,102,241,0.18) 30%,rgba(99,102,241,0.18) 70%,transparent)", marginBottom: "1.75rem" }} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
                    <p style={{ fontSize: "0.8rem", color: "#2d3748" }}>© {new Date().getFullYear()} {event?.eventName || "EventSphere"}. Powered by <span style={{ color: "#6366f1", fontWeight: 600 }}>EventSphere</span>.</p>
                    <button id="conf-scroll-top" onClick={scrollTop} style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 12, width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#6366f1", transition: "all 0.3s" }} title="Back to top"><ArrowUp size={18} /></button>
                </div>
            </div>
        </footer>
    )
}

/* ─── Sticky CTA ──────────────────────────────────────────────── */
function StickyRegister({ event }: { event: any }) {
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        const fn = () => { const hero = document.getElementById("hero"); if (!hero) return; setVisible(window.scrollY > hero.offsetHeight) }
        window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn)
    }, [])
    const has = (event?.registrationSettings?.tickets || []).length > 0
    if (!has) return null
    return (
        <div style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 999, opacity: visible ? 1 : 0, transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)", transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)", pointerEvents: visible ? "auto" : "none" }}>
            <button id="conf-sticky-register" onClick={() => document.getElementById("registration")?.scrollIntoView({ behavior: "smooth" })} className="conf-btn-primary" style={{ padding: "0.85rem 2rem", fontSize: "0.9rem", boxShadow: "0 12px 40px rgba(99,102,241,0.55)" }}>Register Now →</button>
        </div>
    )
}

/* ─── Root ────────────────────────────────────────────────────── */
interface ConferenceMicrositeProps { event: any }

export function ConferenceMicrosite({ event }: ConferenceMicrositeProps) {
    useScrollReveal([event])
    return (
        <div style={{ background: "#080812", color: "#f1f5f9", minHeight: "100vh" }}>
            <Navbar event={event} />
            <main>
                <HeroSection event={event} />
                <AboutSection event={event} />
                <AgendaSection event={event} />
                <RegistrationSection event={event} />
                <ResourcesSection event={event} />
            </main>
            <FooterSection event={event} />
            <StickyRegister event={event} />

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap');
        .cm-fade-up { opacity:0; transform:translateY(36px); transition:opacity 0.7s cubic-bezier(0.16,1,0.3,1),transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        .cm-visible  { opacity:1!important; transform:translateY(0)!important; }
        .conf-section-tag { display:inline-flex;align-items:center;gap:0.4rem;font-size:0.72rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#06b6d4;background:rgba(6,182,212,0.1);border:1px solid rgba(6,182,212,0.25);padding:0.3rem 0.9rem;border-radius:9999px;margin-bottom:1rem; }
        .conf-btn-primary { background:linear-gradient(135deg,#6366f1 0%,#4f46e5 100%);color:white;padding:0.8rem 2.25rem;border-radius:9999px;font-weight:700;font-size:0.95rem;border:none;cursor:pointer;transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1);display:inline-flex;align-items:center;gap:0.5rem;text-decoration:none;white-space:nowrap; }
        .conf-btn-primary:hover { transform:translateY(-3px) scale(1.02);box-shadow:0 12px 35px rgba(99,102,241,0.55); }
        .conf-btn-outline { background:transparent;color:white;padding:0.8rem 2.25rem;border-radius:9999px;font-weight:700;font-size:0.95rem;border:1.5px solid rgba(255,255,255,0.25);cursor:pointer;transition:all 0.3s ease;display:inline-flex;align-items:center;gap:0.5rem;text-decoration:none;white-space:nowrap;backdrop-filter:blur(8px); }
        .conf-btn-outline:hover { border-color:#6366f1;background:rgba(99,102,241,0.12);transform:translateY(-3px); }
        @keyframes confFloat { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(-8px)} }
        @media(max-width:768px){.conf-hidden-mobile{display:none!important}.conf-show-mobile{display:flex!important}}
        @media(min-width:769px){.conf-show-mobile{display:none!important}.conf-hidden-mobile{display:flex!important}}
      `}</style>
        </div>
    )
}
