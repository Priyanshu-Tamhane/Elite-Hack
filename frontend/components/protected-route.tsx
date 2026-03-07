"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRole?: 'organizer' | 'participant'
}

export function ProtectedRoute({ children, allowedRole }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    } else if (!loading && user && allowedRole && user.role !== allowedRole) {
      router.push(user.role === 'organizer' ? '/dashboard' : '/participant/dashboard')
    }
  }, [user, loading, router, allowedRole])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!user || (allowedRole && user.role !== allowedRole)) {
    return null
  }

  return <>{children}</>
}
