"use client"

import type React from "react"

import { useState } from "react"
import { resetPassword } from "@/lib/supabase"
import { AuthWrapper } from "@/components/auth-wrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      setError("Please enter your email address!")
      return
    }

    setLoading(true)
    setError("")

    try {
      const { error: resetError } = await resetPassword(email)
      if (resetError) {
        setError(resetError.message)
      } else {
        setSuccess(true)
      }
    } catch (error: any) {
      setError(error.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <AuthWrapper>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white/5 rounded-full animate-pulse"
                style={{
                  width: `${Math.random() * 300 + 50}px`,
                  height: `${Math.random() * 300 + 50}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${Math.random() * 3 + 2}s`,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 w-full max-w-md mx-4">
            <Card className="backdrop-blur-md bg-white/10 border-white/20 text-white">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-green-400">Email Sent!</CardTitle>
                <CardDescription className="text-white/80">
                  Check your email for password reset instructions
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-white/80 mb-6">
                  We've sent a password reset link to {email}. Please check your inbox and follow the instructions to
                  reset your password.
                </p>
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                  <Link href="/login">Back to Login</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </AuthWrapper>
    )
  }

  return (
    <AuthWrapper>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white/5 rounded-full animate-pulse"
              style={{
                width: `${Math.random() * 300 + 50}px`,
                height: `${Math.random() * 300 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
              }}
            />
          ))}
        </div>

        {/* Top Navigation */}
        <div className="absolute top-0 left-0 right-0 p-4 bg-black/20 backdrop-blur-sm">
          <div className="container mx-auto">
            <nav className="flex flex-wrap gap-4 text-sm text-white/80">
              <Link href="/" className="hover:text-white transition-colors">
                🏠 Home
              </Link>
              <Link href="/about" className="hover:text-white transition-colors">
                📖 About Us
              </Link>
              <Link href="/trading" className="hover:text-white transition-colors">
                📊 Trading
              </Link>
              <Link href="/affiliate" className="hover:text-white transition-colors">
                📢 Affiliate Program
              </Link>
              <Link href="/get-started" className="hover:text-white transition-colors">
                🚀 Get Started
              </Link>
              <Link href="/faq" className="hover:text-white transition-colors">
                ❓ FAQ
              </Link>
              <Link href="/news" className="hover:text-white transition-colors">
                📰 News
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                📝 Terms & Conditions
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors">
                📞 Contact Us
              </Link>
            </nav>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-md mx-4">
          <Card className="backdrop-blur-md bg-white/10 border-white/20 text-white">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Recover my account</CardTitle>
              <CardDescription className="text-white/80">Please complete the following form.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setError("")
                    }}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                  />
                  {error && (
                    <Alert variant="destructive" className="bg-red-500/20 border-red-500/50">
                      <AlertDescription className="text-white">{error}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {loading ? "Sending..." : "Reset my password"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-white/80">
                  Already have an account?{" "}
                  <Link href="/login" className="text-blue-300 hover:text-blue-200 font-medium">
                    Sign in
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Footer Links */}
          <div className="mt-6 text-center text-sm text-white/60">
            <Link href="/" className="hover:text-white transition-colors">
              Home Page
            </Link>
            <span className="mx-2">•</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span className="mx-2">•</span>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </AuthWrapper>
  )
}
