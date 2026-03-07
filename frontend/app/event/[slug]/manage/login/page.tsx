"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function EventManageLoginPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const slug = params.slug as string
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [event, setEvent] = useState<any>(null)

  useEffect(() => {
    // Check if already authenticated
    const authKey = `event_manage_auth_${slug}`
    const isAuthenticated = localStorage.getItem(authKey)
    if (isAuthenticated === "true") {
      router.push(`/event/${slug}/manage/dashboard`)
      return
    }

    // Load event details
    const publishedEvents = JSON.parse(localStorage.getItem("published_events") || "[]")
    const foundEvent = publishedEvents.find((e: any) => e.slug === slug)
    if (foundEvent) {
      setEvent(foundEvent)
    }
  }, [slug, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simple password check - in production, this should be more secure
      // For now, we'll use a simple password: "admin123" or the event slug
      if (password === "admin123" || password === slug) {
        const authKey = `event_manage_auth_${slug}`
        localStorage.setItem(authKey, "true")
        
        toast({
          title: "Success",
          description: "Access granted to event management",
        })
        
        router.push(`/event/${slug}/manage/dashboard`)
      } else {
        toast({
          title: "Error",
          description: "Invalid password",
          variant: "destructive",
        })
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Authentication failed",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-muted via-background to-muted p-4">
      {/* Logo */}
      <Link href="/" className="mb-8 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-6 w-6 text-primary-foreground"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <span className="text-2xl font-bold text-primary">EventSphere</span>
      </Link>

      {/* Card */}
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Event Management Access</CardTitle>
          <CardDescription>
            Enter the password to manage <span className="font-semibold">{event.eventName}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Management Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground">
                This password was set when the event was created
              </p>
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Verifying..." : "Access Management Panel"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            {/* Back Link */}
            <div className="text-center">
              <Link 
                href={`/event/${slug}`} 
                className="text-sm text-muted-foreground hover:text-primary hover:underline"
              >
                ← Back to Event Page
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Help Text */}
      <p className="mt-6 max-w-sm text-center text-xs text-muted-foreground">
        If you've forgotten your password, please contact the event organizer or use the main dashboard.
      </p>
    </div>
  )
}
