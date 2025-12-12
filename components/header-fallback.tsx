"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function HeaderFallback() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                EMAX PROTOCOL
              </span>
              <span className="text-xs text-gray-500 uppercase tracking-wider">Blockchain Protocols</span>
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

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link href="/signup">Create Account</Link>
            </Button>
            <Button asChild>
              <Link href="/login">Sign In</Link>
            </Button>
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
                <Button variant="outline" asChild>
                  <Link href="/signup">Create Account</Link>
                </Button>
                <Button asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
