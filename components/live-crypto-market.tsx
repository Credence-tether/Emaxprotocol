"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCryptoPrices } from "@/hooks/use-crypto-prices"
import { RefreshCw, TrendingUp, TrendingDown, Clock, Zap } from "lucide-react"

export function LiveCryptoMarket() {
  const { data, loading, error, lastUpdated, refetch } = useCryptoPrices()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 6 : 2,
    }).format(price)
  }

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`
    }
    return `$${marketCap.toLocaleString()}`
  }

  const formatPercentage = (percentage: number) => {
    const isPositive = percentage >= 0
    return (
      <span className={`flex items-center ${isPositive ? "text-green-600" : "text-red-600"}`}>
        {isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
        {isPositive ? "+" : ""}
        {percentage.toFixed(2)}%
      </span>
    )
  }

  // Generate crypto icon based on symbol
  const getCryptoIcon = (symbol: string) => {
    const iconStyle = "w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"

    switch (symbol.toLowerCase()) {
      case "btc":
        return <div className={`${iconStyle} bg-orange-500`}>₿</div>
      case "eth":
        return <div className={`${iconStyle} bg-blue-600`}>Ξ</div>
      case "sol":
        return <div className={`${iconStyle} bg-purple-600`}>◎</div>
      case "xrp":
        return <div className={`${iconStyle} bg-gray-800`}>✗</div>
      case "ada":
        return <div className={`${iconStyle} bg-blue-500`}>₳</div>
      case "avax":
        return <div className={`${iconStyle} bg-red-600`}>▲</div>
      case "link":
        return <div className={`${iconStyle} bg-blue-700`}>⬢</div>
      case "matic":
        return <div className={`${iconStyle} bg-purple-700`}>⬟</div>
      default:
        return <div className={`${iconStyle} bg-gray-500`}>{symbol.charAt(0).toUpperCase()}</div>
    }
  }

  if (loading && data.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Live Cryptocurrency Prices</h2>
            <div className="w-20 h-1 bg-green-500 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-3xl font-bold text-gray-900">Live Cryptocurrency Prices</h2>
            <div className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              <Zap className="w-4 h-4" />
              Live Updates
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={refetch}
              disabled={loading}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
          <div className="w-20 h-1 bg-green-500 mx-auto mb-4"></div>
          {lastUpdated && (
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          )}
          {error && (
            <div className="text-amber-600 text-sm mt-2 bg-amber-50 px-4 py-2 rounded-lg inline-block">{error}</div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((crypto, index) => (
            <Card key={crypto.id} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getCryptoIcon(crypto.symbol)}
                    <div className="ml-3">
                      <div className="font-semibold">{crypto.name}</div>
                      <div className="text-sm text-gray-500 uppercase">{crypto.symbol}</div>
                    </div>
                  </div>
                  <div className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">#{index + 1}</div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="font-bold text-xl">{formatPrice(crypto.current_price)}</div>
                    <div className="text-sm">{formatPercentage(crypto.price_change_percentage_24h)}</div>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Market Cap:</span>
                      <span className="font-semibold">{formatMarketCap(crypto.market_cap)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Volume (24h):</span>
                      <span className="font-semibold">{formatMarketCap(crypto.total_volume)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Market Summary */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold">
                  {data.filter((crypto) => crypto.price_change_percentage_24h > 0).length}
                </div>
                <div className="text-green-100 mt-1">Gainers Today</div>
                <div className="text-xs text-green-200 mt-2">
                  {(
                    (data.filter((crypto) => crypto.price_change_percentage_24h > 0).length / data.length) *
                    100
                  ).toFixed(0)}
                  % of market
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold">
                  {data.filter((crypto) => crypto.price_change_percentage_24h < 0).length}
                </div>
                <div className="text-red-100 mt-1">Losers Today</div>
                <div className="text-xs text-red-200 mt-2">
                  {(
                    (data.filter((crypto) => crypto.price_change_percentage_24h < 0).length / data.length) *
                    100
                  ).toFixed(0)}
                  % of market
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold">
                  {formatMarketCap(data.reduce((sum, crypto) => sum + crypto.market_cap, 0))}
                </div>
                <div className="text-blue-100 mt-1">Total Market Cap</div>
                <div className="text-xs text-blue-200 mt-2">
                  24h Volume: {formatMarketCap(data.reduce((sum, crypto) => sum + crypto.total_volume, 0))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
