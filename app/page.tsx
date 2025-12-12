import { Features } from "@/components/features"
import { About } from "@/components/about"
import { Security } from "@/components/security"
import { LiveCryptoMarket } from "@/components/live-crypto-market"
import { Hero } from "@/components/hero"
import TradingPlansPreview from "@/components/trading-plans-preview"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="pt-16">
      <section className="relative py-20 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: "url(/images/building-walls-hero.jpg)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 to-purple-700/80" />

        {/* Floating Trading Dashboard Illustration */}
        <div className="absolute top-10 right-10 w-40 h-30 opacity-30">
          <Image
            src="/illustrations/trading-dashboard.png"
            alt="Trading Dashboard"
            width={160}
            height={120}
            className="animate-pulse rounded-lg"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <Hero />
        </div>
      </section>
      <Features />
      <TradingPlansPreview />
      <LiveCryptoMarket />
      <About />
      <Security />
    </div>
  )
}
