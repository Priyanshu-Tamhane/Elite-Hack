"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"

export default function EventManagePage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  useEffect(() => {
    const authKey = sessionStorage.getItem("event_admin")
    
    if (authKey === slug) {
      router.push(`/event/${slug}/manage/dashboard`)
    } else {
      router.push(`/event/${slug}/manage/login`)
    }
  }, [slug, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting...</p>
    </div>
  )
}
