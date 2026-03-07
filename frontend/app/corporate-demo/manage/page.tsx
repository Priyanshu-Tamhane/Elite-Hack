"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function CorporateManagePage() {
  const router = useRouter()

  useEffect(() => {
    // Always redirect to corporate login
    router.push(`/corporate-demo/manage/login`)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting to management login...</p>
    </div>
  )
}