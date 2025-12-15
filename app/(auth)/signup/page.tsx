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

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    const newErrors = validateForm()
    if (!formData.agree) {
      newErrors.agree = "You must agree to the terms"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    try {
      const { data, error: signUpError } = await signUp(formData.email, formData.password, {
        fullName: formData.fullname,
        username: formData.username,
      })

      if (signUpError) {
        setErrors({ submit: signUpError.message })
      } else if (data.user) {
        router.push("/dashboard")
      }
    } catch (caught: any) {
      setErrors({ submit: caught?.message || "An error occurred during signup" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

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
      <div className="w-full max-w-md px-4">
        <Card className="bg-white/10 border-white/20 text-white">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Create your account</CardTitle>
            <CardDescription className="text-white/80">Join Emax Protocol and start trading</CardDescription>
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
                  placeholder="Your full name"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
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
                />
                {errors.username && (
                  <Alert variant="destructive" className="bg-red-500/20 border-red-500/50">
                    <AlertDescription className="text-white">{errors.username}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
                {errors.email && (
                  <Alert variant="destructive" className="bg-red-500/20 border-red-500/50">
                    <AlertDescription className="text-white">{errors.email}</AlertDescription>
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
                    placeholder="At least 6 characters"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                    aria-label={showPassword ? "Hide password" : "Show password"}
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
                    placeholder="Confirm password"
                    value={formData.password2}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword2((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                    aria-label={showPassword2 ? "Hide password" : "Show password"}
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
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agree"
                    checked={formData.agree}
                    onCheckedChange={handleCheckboxChange}
                    className="border-white/20 data-[state=checked]:bg-blue-600"
                  />
                  <Label htmlFor="agree" className="text-xs leading-5">
                    I agree to the{" "}
                    <Link href="/terms" className="text-blue-300 hover:text-blue-200 underline">
                      Terms & Privacy
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
                {isLoading ? "Creating account..." : "Create account"}
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
      </div>
    </AuthWrapper>
  )
}
