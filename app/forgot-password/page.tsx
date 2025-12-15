"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ForgotPasswordRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/reset-password")
  }, [router])

  return null
}
