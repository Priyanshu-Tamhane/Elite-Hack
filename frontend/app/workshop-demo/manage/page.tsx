"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function WorkshopManagePage() {
  const router = useRouter()

  useEffect(() => {
    router.push(`/workshop-demo/manage/login`)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting to workshop management login...</p>
    </div>
  )
}
