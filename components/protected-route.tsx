"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, isAdmin } from '@/lib/supabase'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAdmin?: boolean
  redirectTo?: string
}

export function ProtectedRoute({ 
  children, 
  requireAdmin = false,
  redirectTo = '/login'
}: ProtectedRouteProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    checkAuthorization()
  }, [requireAdmin])

  const checkAuthorization = async () => {
    try {
      const user = await getCurrentUser()
      if (!user) {
        router.push(redirectTo)
        return
      }

      if (requireAdmin) {
        const adminStatus = await isAdmin()
        if (!adminStatus) {
          router.push('/dashboard')
          return
        }
      }

      setAuthorized(true)
    } catch (error) {
      console.error('Authorization check failed:', error)
      router.push(redirectTo)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Alert className="max-w-md">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {requireAdmin 
              ? "You don't have permission to access this page. Admin privileges required."
              : "Please log in to access this page."}
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return <>{children}</>
}
