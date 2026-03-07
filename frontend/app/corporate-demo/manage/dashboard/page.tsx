"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, DollarSign, Eye, LogOut } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export default function CorporateManageDashboard() {
  const router = useRouter()
  const { toast } = useToast()
  const [registrations, setRegistrations] = useState<any[]>([])

  useEffect(() => {
    // auth check
    const token = localStorage.getItem('token')
    if (!token) {
      router.push(`/corporate-demo/manage/login`)
      return
    }

    // load registrations from storage
    const allRegs = JSON.parse(localStorage.getItem("event_registrations") || "[]")
    setRegistrations(allRegs.filter((r: any) => r.eventCategory === "corporate"))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem(`corporate_manage_auth`)
    localStorage.removeItem('token')
    toast({ title: "Logged out", description: "You have been logged out" })
    router.push(`/corporate-demo/manage/login`)
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-blue-700">Corporate Demo Dashboard</h1>
          <p className="text-gray-500">Central hub for corporate event management</p>
        </div>
        <Button
          variant="outline"
          onClick={handleLogout}
          className="text-blue-700 border-blue-700 hover:bg-blue-50"
        >
          <LogOut className="mr-2 h-5 w-5" /> Logout
        </Button>
      </div>

      {/* statistic cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Registrations</CardTitle>
            <Users className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{registrations.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-lg">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Event Date</CardTitle>
            <Calendar className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">Dec 15, 2024</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-0 shadow-lg">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-yellow-800">Revenue</CardTitle>
            <DollarSign className="h-5 w-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">$0</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-0 shadow-lg">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Page Views</CardTitle>
            <Eye className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">-</div>
          </CardContent>
        </Card>
      </div>

      {/* actions */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg text-blue-700">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start" asChild>
            <Link href="/corporate-demo" target="_blank">View Demo Microsite</Link>
          </Button>
          <Button variant="outline" className="w-full justify-start">View Registrations</Button>
          <Button variant="outline" className="w-full justify-start">Export Data</Button>
        </CardContent>
      </Card>

      {/* recent regs */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg text-blue-700">Recent Registrations</CardTitle>
        </CardHeader>
        <CardContent>
          {registrations.length === 0 ? (
            <p className="text-gray-500">No registrations yet</p>
          ) : (
            <div className="space-y-2">
              {registrations.slice(0, 5).map((reg, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 border rounded hover:bg-blue-50 transition">
                  <div>
                    <p className="font-semibold text-blue-600">{reg.name}</p>
                    <p className="text-sm text-gray-500">{reg.email}</p>
                  </div>
                  <p className="text-xs text-gray-400">
                    {new Date(reg.registeredAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}