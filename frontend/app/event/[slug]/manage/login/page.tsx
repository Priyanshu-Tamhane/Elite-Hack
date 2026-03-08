"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock } from "lucide-react"
import { api } from "@/lib/api"

export default function FestivalManageLoginPage() {
  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const event = await api.getEventBySlug(slug)
      
      if (event.managementPassword === password || event.adminPassword === password) {
        sessionStorage.setItem("event_admin", slug)
        router.push(`/event/${slug}/manage/dashboard`)
      } else {
        setError("Invalid password")
      }
    } catch (err) {
      setError("Failed to authenticate")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0a0a" }}>
      <Card style={{ width: "100%", maxWidth: 420, border: "1px solid rgba(255,61,0,0.2)" }}>
        <CardHeader>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <Lock className="h-6 w-6 text-primary" />
            <CardTitle>Festival Management Access</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">Enter your management password to continue</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Management Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Authenticating..." : "Access Dashboard"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
