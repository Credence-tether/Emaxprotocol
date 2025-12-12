import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieConsent } from "@/components/cookie-consent"
import { ChatWidget } from "@/components/chat-widget"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Emax Protocol - Hybrid Automated Cryptocurrency Trading",
  description:
    "Professional cryptocurrency trading platform with automated trading solutions, daily returns, and secure investment opportunities. Start with as little as $100.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
        <ChatWidget />
      </body>
    </html>
  )
}
