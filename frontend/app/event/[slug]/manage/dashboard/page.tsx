"use client"

import { useParams } from "next/navigation"
import { HackathonManagement } from "@/components/management/HackathonManagement"

export default function EventManageDashboard() {
  const params = useParams()
  const slug = params.slug as string

  return <HackathonManagement slug={slug} />
}
