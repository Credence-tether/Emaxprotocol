"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Menu, X, LogOut, User, Shield } from "lucide-react"
import { getCurrentUser, isAdmin, signOut } from "@/lib/supabase"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isUserAdmin, setIsUserAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
      
      if (currentUser) {
        const adminStatus = await isAdmin()
        setIsUserAdmin(adminStatus)
      }
    } catch (error) {
      console.error('Error checking user:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      setUser(null)
      setIsUserAdmin(false)
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-10 w-32">
              <Image src="/images/emax-logo.png" alt="Emax Protocol Logo" fill className="object-contain" priority />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
              About Us
            </Link>
            <Link href="/trading" className="text-gray-700 hover:text-blue-600 transition-colors">
              Trading
            </Link>
            <Link href="/trading-plans" className="text-gray-700 hover:text-blue-600 transition-colors">
              Trading Plans
            </Link>
            <Link href="/markets" className="text-gray-700 hover:text-blue-600 transition-colors">
              Markets
            </Link>
            <Link href="/affiliate" className="text-gray-700 hover:text-blue-600 transition-colors">
              Affiliate
            </Link>
            <Link href="/get-started" className="text-gray-700 hover:text-blue-600 transition-colors">
              Get Started
            </Link>
            <Link href="/faq" className="text-gray-700 hover:text-blue-600 transition-colors">
              FAQ
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {!loading && (
              <>
                {user ? (
                  <>
                    {isUserAdmin && (
                      <Button variant="outline" asChild>
                        <Link href="/admin/dashboard">
                          <Shield className="h-4 w-4 mr-2" />
                          Admin Panel
                        </Link>
                      </Button>
                    )}
                    <Button variant="outline" asChild>
                      <Link href="/dashboard">
                        <User className="h-4 w-4 mr-2" />
                        Dashboard
                      </Link>
                    </Button>
                    <Button variant="destructive" onClick={handleSignOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" asChild>
                      <Link href="/signup">Create Account</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/login">Sign In</Link>
                    </Button>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                About Us
              </Link>
              <Link href="/trading" className="text-gray-700 hover:text-blue-600 transition-colors">
                Trading
              </Link>
              <Link href="/trading-plans" className="text-gray-700 hover:text-blue-600 transition-colors">
                Trading Plans
              </Link>
              <Link href="/markets" className="text-gray-700 hover:text-blue-600 transition-colors">
                Markets
              </Link>
              <Link href="/affiliate" className="text-gray-700 hover:text-blue-600 transition-colors">
                Affiliate
              </Link>
              <Link href="/get-started" className="text-gray-700 hover:text-blue-600 transition-colors">
                Get Started
              </Link>
              <Link href="/faq" className="text-gray-700 hover:text-blue-600 transition-colors">
                FAQ
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                Contact
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                {!loading && (
                  <>
                    {user ? (
                      <>
                        {isUserAdmin && (
                          <Button variant="outline" asChild>
                            <Link href="/admin/dashboard">
                              <Shield className="h-4 w-4 mr-2" />
                              Admin Panel
                            </Link>
                          </Button>
                        )}
                        <Button variant="outline" asChild>
                          <Link href="/dashboard">
                            <User className="h-4 w-4 mr-2" />
                            Dashboard
                          </Link>
                        </Button>
                        <Button variant="destructive" onClick={handleSignOut}>
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="outline" asChild>
                          <Link href="/signup">Create Account</Link>
                        </Button>
                        <Button asChild>
                          <Link href="/login">Sign In</Link>
                        </Button>
                      </>
                    )}
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
