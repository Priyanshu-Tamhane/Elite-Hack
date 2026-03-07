"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"

export default function EventManagePage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  useEffect(() => {
    router.push(`/event/${slug}/manage/dashboard`)
  }, [slug, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting to dashboard...</p>
    </div>
  )
}
