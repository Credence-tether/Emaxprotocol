"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Cookie, Settings, Shield, BarChart3, Target, Info, X, Check, AlertTriangle, Eye, Lock } from "lucide-react"
import Link from "next/link"

interface CookieCategory {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  required: boolean
  enabled: boolean
  cookies: {
    name: string
    purpose: string
    duration: string
    provider: string
  }[]
}

const cookieCategories: CookieCategory[] = [
  {
    id: "essential",
    name: "Essential Cookies",
    description: "These cookies are necessary for the website to function and cannot be switched off.",
    icon: <Shield className="w-5 h-5" />,
    required: true,
    enabled: true,
    cookies: [
      {
        name: "session_token",
        purpose: "Maintains user session and authentication",
        duration: "Session",
        provider: "Emax Protocol",
      },
      {
        name: "csrf_token",
        purpose: "Prevents cross-site request forgery attacks",
        duration: "Session",
        provider: "Emax Protocol",
      },
      {
        name: "cookie_consent",
        purpose: "Stores your cookie preferences",
        duration: "1 year",
        provider: "Emax Protocol",
      },
      {
        name: "security_settings",
        purpose: "Maintains security preferences and settings",
        duration: "30 days",
        provider: "Emax Protocol",
      },
    ],
  },
  {
    id: "functional",
    name: "Functional Cookies",
    description: "These cookies enable enhanced functionality and personalization.",
    icon: <Settings className="w-5 h-5" />,
    required: false,
    enabled: false,
    cookies: [
      {
        name: "user_preferences",
        purpose: "Stores your dashboard layout and display preferences",
        duration: "1 year",
        provider: "Emax Protocol",
      },
      {
        name: "language_setting",
        purpose: "Remembers your preferred language",
        duration: "1 year",
        provider: "Emax Protocol",
      },
      {
        name: "theme_preference",
        purpose: "Stores your dark/light mode preference",
        duration: "1 year",
        provider: "Emax Protocol",
      },
      {
        name: "notification_settings",
        purpose: "Manages your notification preferences",
        duration: "6 months",
        provider: "Emax Protocol",
      },
    ],
  },
  {
    id: "analytics",
    name: "Analytics Cookies",
    description: "These cookies help us understand how visitors interact with our website.",
    icon: <BarChart3 className="w-5 h-5" />,
    required: false,
    enabled: false,
    cookies: [
      {
        name: "_ga",
        purpose: "Distinguishes unique users and sessions",
        duration: "2 years",
        provider: "Google Analytics",
      },
      {
        name: "_ga_*",
        purpose: "Stores session state and user interactions",
        duration: "2 years",
        provider: "Google Analytics",
      },
      {
        name: "platform_analytics",
        purpose: "Tracks platform usage and performance metrics",
        duration: "1 year",
        provider: "Emax Protocol",
      },
      {
        name: "heatmap_data",
        purpose: "Records user interaction patterns for UX improvement",
        duration: "30 days",
        provider: "Hotjar",
      },
    ],
  },
  {
    id: "marketing",
    name: "Marketing Cookies",
    description: "These cookies are used to deliver relevant advertisements and track campaign effectiveness.",
    icon: <Target className="w-5 h-5" />,
    required: false,
    enabled: false,
    cookies: [
      {
        name: "marketing_consent",
        purpose: "Tracks consent for marketing communications",
        duration: "2 years",
        provider: "Emax Protocol",
      },
      {
        name: "_fbp",
        purpose: "Facebook pixel for conversion tracking",
        duration: "3 months",
        provider: "Facebook",
      },
      {
        name: "google_ads",
        purpose: "Google Ads conversion and remarketing",
        duration: "90 days",
        provider: "Google",
      },
      {
        name: "affiliate_tracking",
        purpose: "Tracks referral sources and affiliate conversions",
        duration: "30 days",
        provider: "Emax Protocol",
      },
    ],
  },
]

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [categories, setCategories] = useState<CookieCategory[]>(cookieCategories)
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie_consent")
    const lastInteraction = localStorage.getItem("cookie_last_interaction")

    if (!consent || !lastInteraction) {
      // Show banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 2000)
      return () => clearTimeout(timer)
    } else {
      // Load saved preferences
      try {
        const savedCategories = JSON.parse(consent)
        setCategories(savedCategories)
        setHasInteracted(true)
      } catch (error) {
        console.error("Error loading cookie preferences:", error)
        setIsVisible(true)
      }
    }
  }, [])

  const updateCategory = (categoryId: string, enabled: boolean) => {
    setCategories((prev) => prev.map((cat) => (cat.id === categoryId ? { ...cat, enabled } : cat)))
  }

  const acceptAll = () => {
    const updatedCategories = categories.map((cat) => ({ ...cat, enabled: true }))
    setCategories(updatedCategories)
    savePreferences(updatedCategories)
    setIsVisible(false)
    setHasInteracted(true)
  }

  const acceptSelected = () => {
    savePreferences(categories)
    setIsVisible(false)
    setHasInteracted(true)
  }

  const rejectAll = () => {
    const updatedCategories = categories.map((cat) => ({
      ...cat,
      enabled: cat.required,
    }))
    setCategories(updatedCategories)
    savePreferences(updatedCategories)
    setIsVisible(false)
    setHasInteracted(true)
  }

  const savePreferences = (prefs: CookieCategory[]) => {
    localStorage.setItem("cookie_consent", JSON.stringify(prefs))
    localStorage.setItem("cookie_last_interaction", new Date().toISOString())

    // Trigger cookie implementation based on preferences
    implementCookiePreferences(prefs)
  }

  const implementCookiePreferences = (prefs: CookieCategory[]) => {
    // Essential cookies are always enabled

    // Functional cookies
    const functional = prefs.find((cat) => cat.id === "functional")?.enabled
    if (!functional) {
      // Remove functional cookies
      document.cookie = "user_preferences=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      document.cookie = "language_setting=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      document.cookie = "theme_preference=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    }

    // Analytics cookies
    const analytics = prefs.find((cat) => cat.id === "analytics")?.enabled
    if (analytics) {
      // Initialize Google Analytics
      if (typeof window !== "undefined" && (window as any).gtag) {
        ;(window as any).gtag("consent", "update", {
          analytics_storage: "granted",
        })
      }
    } else {
      // Disable analytics
      if (typeof window !== "undefined" && (window as any).gtag) {
        ;(window as any).gtag("consent", "update", {
          analytics_storage: "denied",
        })
      }
    }

    // Marketing cookies
    const marketing = prefs.find((cat) => cat.id === "marketing")?.enabled
    if (marketing) {
      // Enable marketing pixels
      if (typeof window !== "undefined" && (window as any).gtag) {
        ;(window as any).gtag("consent", "update", {
          ad_storage: "granted",
          ad_user_data: "granted",
          ad_personalization: "granted",
        })
      }
    } else {
      // Disable marketing cookies
      if (typeof window !== "undefined" && (window as any).gtag) {
        ;(window as any).gtag("consent", "update", {
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
        })
      }
    }
  }

  const resetPreferences = () => {
    localStorage.removeItem("cookie_consent")
    localStorage.removeItem("cookie_last_interaction")
    setCategories(cookieCategories)
    setIsVisible(true)
    setHasInteracted(false)
  }

  if (!isVisible && !hasInteracted) return null

  return (
    <>
      {/* Cookie Consent Banner */}
      {isVisible && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg">
          <div className="container mx-auto max-w-6xl">
            <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Cookie className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">Cookie Preferences</h3>
                      <Badge className="bg-blue-600 text-white">GDPR Compliant</Badge>
                    </div>
                    <p className="text-gray-700 mb-4">
                      We use cookies to enhance your experience, analyze site usage, and assist in our marketing
                      efforts. You can customize your preferences or accept all cookies to continue.
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <Button onClick={acceptAll} className="bg-blue-600 hover:bg-blue-700">
                        <Check className="w-4 h-4 mr-2" />
                        Accept All
                      </Button>
                      <Button onClick={rejectAll} variant="outline">
                        <X className="w-4 h-4 mr-2" />
                        Reject All
                      </Button>
                      <Dialog open={showDetails} onOpenChange={setShowDetails}>
                        <DialogTrigger asChild>
                          <Button variant="outline">
                            <Settings className="w-4 h-4 mr-2" />
                            Customize
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="flex items-center space-x-2">
                              <Cookie className="w-6 h-6 text-blue-600" />
                              <span>Cookie Preferences</span>
                            </DialogTitle>
                            <DialogDescription>
                              Manage your cookie preferences. You can enable or disable different types of cookies
                              below.
                            </DialogDescription>
                          </DialogHeader>

                          <Tabs defaultValue="categories" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                              <TabsTrigger value="categories">Categories</TabsTrigger>
                              <TabsTrigger value="details">Cookie Details</TabsTrigger>
                              <TabsTrigger value="policy">Privacy Policy</TabsTrigger>
                            </TabsList>

                            <TabsContent value="categories" className="space-y-4">
                              {categories.map((category) => (
                                <Card key={category.id} className="overflow-hidden">
                                  <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                      <div className="flex items-center space-x-3">
                                        <div className="text-blue-600">{category.icon}</div>
                                        <div>
                                          <h4 className="font-semibold text-gray-900">{category.name}</h4>
                                          <p className="text-sm text-gray-600">{category.description}</p>
                                        </div>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        {category.required && (
                                          <Badge variant="outline" className="text-xs">
                                            Required
                                          </Badge>
                                        )}
                                        <Switch
                                          checked={category.enabled}
                                          onCheckedChange={(checked) => updateCategory(category.id, checked)}
                                          disabled={category.required}
                                        />
                                      </div>
                                    </div>
                                    <div className="text-sm text-gray-600">
                                      <strong>Cookies in this category:</strong> {category.cookies.length}
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </TabsContent>

                            <TabsContent value="details" className="space-y-4">
                              {categories.map((category) => (
                                <Card key={category.id}>
                                  <CardContent className="p-6">
                                    <div className="flex items-center space-x-3 mb-4">
                                      <div className="text-blue-600">{category.icon}</div>
                                      <h4 className="font-semibold text-gray-900">{category.name}</h4>
                                      <Badge variant={category.enabled ? "default" : "secondary"}>
                                        {category.enabled ? "Enabled" : "Disabled"}
                                      </Badge>
                                    </div>
                                    <div className="overflow-x-auto">
                                      <table className="w-full text-sm">
                                        <thead>
                                          <tr className="border-b">
                                            <th className="text-left py-2">Cookie Name</th>
                                            <th className="text-left py-2">Purpose</th>
                                            <th className="text-left py-2">Duration</th>
                                            <th className="text-left py-2">Provider</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {category.cookies.map((cookie, index) => (
                                            <tr key={index} className="border-b">
                                              <td className="py-2 font-mono text-xs">{cookie.name}</td>
                                              <td className="py-2">{cookie.purpose}</td>
                                              <td className="py-2">{cookie.duration}</td>
                                              <td className="py-2">{cookie.provider}</td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </TabsContent>

                            <TabsContent value="policy" className="space-y-4">
                              <Card>
                                <CardContent className="p-6">
                                  <div className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                      <Shield className="w-6 h-6 text-blue-600 mt-1" />
                                      <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Your Privacy Rights</h4>
                                        <p className="text-gray-700 text-sm">
                                          You have the right to accept or reject cookies, and to change your preferences
                                          at any time. Essential cookies cannot be disabled as they are necessary for
                                          the website to function.
                                        </p>
                                      </div>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                      <Eye className="w-6 h-6 text-green-600 mt-1" />
                                      <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Data Collection</h4>
                                        <p className="text-gray-700 text-sm">
                                          We only collect data that is necessary for the specified purposes. Analytics
                                          and marketing cookies help us improve our services and provide relevant
                                          content.
                                        </p>
                                      </div>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                      <Lock className="w-6 h-6 text-purple-600 mt-1" />
                                      <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Data Security</h4>
                                        <p className="text-gray-700 text-sm">
                                          All cookie data is encrypted and stored securely. We never sell your personal
                                          information to third parties and only share data with trusted service
                                          providers.
                                        </p>
                                      </div>
                                    </div>

                                    <div className="bg-blue-50 p-4 rounded-lg">
                                      <p className="text-sm text-blue-800">
                                        <strong>Need more information?</strong> Read our complete{" "}
                                        <Link href="/privacy" className="underline hover:text-blue-600">
                                          Privacy Policy
                                        </Link>{" "}
                                        for detailed information about how we handle your data.
                                      </p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </TabsContent>
                          </Tabs>

                          <div className="flex justify-between items-center pt-4 border-t">
                            <Button variant="outline" onClick={() => setShowDetails(false)}>
                              Cancel
                            </Button>
                            <div className="space-x-2">
                              <Button variant="outline" onClick={rejectAll}>
                                Reject All
                              </Button>
                              <Button onClick={acceptSelected} className="bg-blue-600 hover:bg-blue-700">
                                Save Preferences
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Link href="/privacy" className="text-sm text-blue-600 hover:underline self-center">
                        Privacy Policy
                      </Link>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setIsVisible(false)} className="flex-shrink-0">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Cookie Settings Button (Always visible after interaction) */}
      {hasInteracted && (
        <div className="fixed bottom-4 left-4 z-40">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-white/90 backdrop-blur-sm border-gray-300 hover:bg-white shadow-lg"
              >
                <Cookie className="w-4 h-4 mr-2" />
                Cookie Settings
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <Cookie className="w-6 h-6 text-blue-600" />
                  <span>Cookie Settings</span>
                </DialogTitle>
                <DialogDescription>Manage your cookie preferences and view current settings.</DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Info className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-900">Current Settings</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${category.enabled ? "bg-green-500" : "bg-gray-400"}`} />
                        <span className="text-blue-800">{category.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {categories.map((category) => (
                  <Card key={category.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-blue-600">{category.icon}</div>
                          <div>
                            <h4 className="font-medium text-gray-900">{category.name}</h4>
                            <p className="text-sm text-gray-600">{category.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {category.required && (
                            <Badge variant="outline" className="text-xs">
                              Required
                            </Badge>
                          )}
                          <Switch
                            checked={category.enabled}
                            onCheckedChange={(checked) => updateCategory(category.id, checked)}
                            disabled={category.required}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <div className="flex justify-between items-center pt-4 border-t">
                  <Button variant="outline" onClick={resetPreferences}>
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Reset to Default
                  </Button>
                  <div className="space-x-2">
                    <Button variant="outline" onClick={rejectAll}>
                      Reject All
                    </Button>
                    <Button onClick={acceptSelected} className="bg-blue-600 hover:bg-blue-700">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </>
  )
}
