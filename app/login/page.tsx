"use client"

import type React from "react"

import { useState } from "react"
import { signIn } from "@/lib/supabase"
import { AuthWrapper } from "@/components/auth-wrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const { data, error: signInError } = await signIn(email, password)
      if (signInError) {
        setError(signInError.message)
      } else if (data.user) {
        router.push("/dashboard")
      }
    } catch (error: any) {
      setError(error.message || "An error occurred during login")
    } finally {
      setLoading(false)
    }
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
              <CardTitle className="text-2xl font-bold">Welcome back!</CardTitle>
              <CardDescription className="text-white/80">Sign in to your Emax Protocol account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive" className="bg-red-500/20 border-red-500/50">
                    <AlertDescription className="text-white">{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="text-center">
                  <Link href="/forgot-password" className="text-sm text-blue-300 hover:text-blue-200 transition-colors">
                    Forgot your password?
                  </Link>
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {loading ? "Signing in..." : "Sign in to your account"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-white/80">
                  Don't have an account yet?{" "}
                  <Link href="/signup" className="text-blue-300 hover:text-blue-200 font-medium">
                    Signup Now
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
