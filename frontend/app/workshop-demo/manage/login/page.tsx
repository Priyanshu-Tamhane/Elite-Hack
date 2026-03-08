"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Lock, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { api } from "@/lib/api"

export default function WorkshopManageLoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const authKey = `workshop_manage_auth`
    const isAuthenticated = localStorage.getItem(authKey)
    const token = localStorage.getItem("token")
    if (isAuthenticated === "true" && token) {
      router.push(`/workshop-demo/manage/dashboard`)
    }
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (password === "WORKSHOP2024") {
        localStorage.setItem('token', 'demo_token')
        const authKey = `workshop_manage_auth`
        localStorage.setItem(authKey, "true")
        toast({ title: "Success", description: "Access granted to workshop management" })
        router.push(`/workshop-demo/manage/dashboard`)
      } else {
        toast({ title: "Error", description: "Invalid management code", variant: "destructive" })
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Authentication failed", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-50 p-4">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600">
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-white" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
        </div>
        <span className="text-2xl font-bold text-emerald-600">EventSphere</span>
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-emerald-700">Workshop Management Login</CardTitle>
          <CardDescription>Enter the management code to access the workshop dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password">Management Code</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="password" type="password" placeholder="Enter management code" className="pl-10" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <p className="text-xs text-muted-foreground">
                This code was provided when the event was published
              </p>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>{loading ? "Verifying..." : "Access Management Panel"} <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
