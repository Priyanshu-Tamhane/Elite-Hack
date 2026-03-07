"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

export default function EventManagePage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (!slug) return
    
    const authKey = `event_manage_auth_${slug}`
    const isAuthenticated = localStorage.getItem(authKey)
    
    if (isAuthenticated === "true") {
      router.replace(`/event/${slug}/manage/dashboard`)
    } else {
      router.replace(`/event/${slug}/manage/login`)
    }
    
    setChecking(false)
  }, [slug, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white">
      <p className="text-gray-600">Redirecting to management portal...</p>
    </div>
  )
}
