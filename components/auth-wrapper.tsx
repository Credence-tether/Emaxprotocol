"use client"

import type React from "react"

import { isSupabaseConfigured } from "@/lib/supabase"
import { SupabaseSetupGuide } from "./supabase-setup-guide"

interface AuthWrapperProps {
  children: React.ReactNode
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  if (!isSupabaseConfigured()) {
    return <SupabaseSetupGuide />
  }

  return <>{children}</>
}
