import { LiveCryptoMarket } from "@/components/live-crypto-market"

export default function MarketsPage() {
  return (
    <div className="pt-16">
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cryptocurrency Markets</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real-time cryptocurrency prices, market caps, and trading volumes powered by CoinGecko API
          </p>
        </div>
      </section>
      <LiveCryptoMarket />
    </div>
  )
}
