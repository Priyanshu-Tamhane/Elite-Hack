"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { api } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"
import { useTheme } from "next-themes"
import { ArrowLeft, User, Lock, Save, Trash2, BarChart3, Bell, Moon, Sun } from "lucide-react"

export default function SettingsPage() {
  const router = useRouter()
  const { user, setUser } = useAuth()
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState({ totalEvents: 0, totalRegistrations: 0 })
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    emailNotifications: true
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        emailNotifications: user.emailNotifications ?? true
      })
    }
    loadStats()
  }, [user])

  const loadStats = async () => {
    try {
      const events = await api.getEvents()
      const totalEvents = events.length
      const totalRegistrations = events.reduce((sum: number, e: any) => sum + (e.registeredCount || 0), 0)
      setStats({ totalEvents, totalRegistrations })
    } catch (error) {
      console.error(error)
    }
  }

  const handleProfileUpdate = async () => {
    setLoading(true)
    try {
      const updatedUser = await api.request('/users/me', {
        method: 'PUT',
        body: JSON.stringify({ name: profileData.name, emailNotifications: profileData.emailNotifications })
      })
      setUser(updatedUser)
      toast({ title: "Success", description: "Profile updated successfully" })
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({ title: "Error", description: "Passwords don't match", variant: "destructive" })
      return
    }
    
    setLoading(true)
    try {
      await api.request('/users/change-password', {
        method: 'POST',
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      })
      toast({ title: "Success", description: "Password changed successfully" })
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) return
    
    setLoading(true)
    try {
      await api.request('/users/me', { method: 'DELETE' })
      localStorage.removeItem('token')
      toast({ title: "Account Deleted", description: "Your account has been permanently deleted" })
      router.push('/login')
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        {/* Account Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Account Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Total Events</p>
                <p className="text-3xl font-bold">{stats.totalEvents}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Total Registrations</p>
                <p className="text-3xl font-bold">{stats.totalRegistrations}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                placeholder="Your name"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                disabled
                className="bg-muted cursor-not-allowed"
              />
              <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
            </div>
            <Button onClick={handleProfileUpdate} disabled={loading}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive email updates about your events</p>
              </div>
              <Switch
                checked={profileData.emailNotifications}
                onCheckedChange={(checked) => setProfileData({ ...profileData, emailNotifications: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Theme</p>
                <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={theme === 'light' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTheme('light')}
                >
                  <Sun className="h-4 w-4 mr-2" />
                  Light
                </Button>
                <Button
                  variant={theme === 'dark' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTheme('dark')}
                >
                  <Moon className="h-4 w-4 mr-2" />
                  Dark
                </Button>
              </div>
            </div>
            <Button onClick={handleProfileUpdate} disabled={loading}>
              <Save className="mr-2 h-4 w-4" />
              Save Preferences
            </Button>
          </CardContent>
        </Card>

        {/* Password Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Change Password
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                placeholder="Enter current password"
              />
            </div>
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                placeholder="Enter new password"
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                placeholder="Confirm new password"
              />
            </div>
            <Button onClick={handlePasswordChange} disabled={loading}>
              <Lock className="mr-2 h-4 w-4" />
              Update Password
            </Button>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Logout</p>
                <p className="text-sm text-muted-foreground">Sign out of your account</p>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Delete Account</p>
                <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
              </div>
              <Button variant="destructive" onClick={handleDeleteAccount} disabled={loading}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
