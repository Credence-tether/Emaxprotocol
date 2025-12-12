"use client"

import type React from "react"

import { useState } from "react"
import { signUp } from "@/lib/supabase"
import { AuthWrapper } from "@/components/auth-wrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    password: "",
    password2: "",
    email: "",
    agree: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullname.trim()) {
      newErrors.fullname = "Please enter your full name!"
    }

    if (!formData.username.trim()) {
      newErrors.username = "Please enter your username!"
    } else if (!/^[A-Za-z0-9_-]+$/.test(formData.username)) {
      newErrors.username = "For username you should use English letters and digits only!"
    }

    if (!formData.password) {
      newErrors.password = "Please enter your password!"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters!"
    }

    if (formData.password !== formData.password2) {
      newErrors.password2 = "Please check your password!"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your e-mail address!"
    } else if (!/^[^@]+@[^@]+\.\w{2,4}$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address!"
    }

    if (!formData.agree) {
      newErrors.agree = "You have to agree with the Terms and Conditions!"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      const { data, error: signUpError } = await signUp(
        formData.email,
        formData.password,
        {
          fullName: formData.fullname,
          username: formData.username,
        }
      )
      
      if (signUpError) {
        setErrors({ submit: signUpError.message })
      } else if (data.user) {
        router.push("/dashboard")
      }
    } catch (error: any) {
      setErrors({ submit: error.message || "An error occurred during signup" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agree: checked }))
    if (errors.agree) {
      setErrors((prev) => ({ ...prev, agree: "" }))
    }
  }

  return (
    <AuthWrapper>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden py-8">
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
              <CardTitle className="text-2xl font-bold">Create your Account</CardTitle>
              <CardDescription className="text-white/80">Join Emax Protocol and start trading today</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {errors.submit && (
                  <Alert variant="destructive" className="bg-red-500/20 border-red-500/50">
                    <AlertDescription className="text-white">{errors.submit}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="fullname">Full Name</Label>
                  <Input
                    id="fullname"
                    name="fullname"
                    type="text"
                    placeholder="Your Full Name"
                    value={formData.fullname}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                  />
                  {errors.fullname && (
                    <Alert variant="destructive" className="bg-red-500/20 border-red-500/50">
                      <AlertDescription className="text-white">{errors.fullname}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                  />
                  {errors.username && (
                    <Alert variant="destructive" className="bg-red-500/20 border-red-500/50">
                      <AlertDescription className="text-white">{errors.username}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password must be 6 characters"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60 pr-10"
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password && (
                    <Alert variant="destructive" className="bg-red-500/20 border-red-500/50">
                      <AlertDescription className="text-white">{errors.password}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password2">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="password2"
                      name="password2"
                      type={showPassword2 ? "text" : "password"}
                      placeholder="Verify your Password"
                      value={formData.password2}
                      onChange={handleInputChange}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60 pr-10"
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword2(!showPassword2)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                    >
                      {showPassword2 ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password2 && (
                    <Alert variant="destructive" className="bg-red-500/20 border-red-500/50">
                      <AlertDescription className="text-white">{errors.password2}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your e-mail address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                  />
                  {errors.email && (
                    <Alert variant="destructive" className="bg-red-500/20 border-red-500/50">
                      <AlertDescription className="text-white">{errors.email}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-white/80">
                    <strong>Your Upline:</strong> N/A (n/a)
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="agree"
                      checked={formData.agree}
                      onCheckedChange={handleCheckboxChange}
                      className="border-white/20 data-[state=checked]:bg-blue-600"
                    />
                    <Label htmlFor="agree" className="text-xs leading-5">
                      By clicking through, I agree to <strong>Emax Protocol</strong>{" "}
                      <Link href="/terms" className="text-blue-300 hover:text-blue-200 underline">
                        Terms and Privacy
                      </Link>
                    </Label>
                  </div>
                  {errors.agree && (
                    <Alert variant="destructive" className="bg-red-500/20 border-red-500/50">
                      <AlertDescription className="text-white">{errors.agree}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? "Creating Account..." : "CREATE YOUR ACCOUNT"}
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
