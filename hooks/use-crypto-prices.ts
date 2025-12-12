"use client"

import { useState, useEffect } from "react"

interface CryptoCurrency {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
  image: string
  last_updated: string
}

interface CryptoPricesState {
  data: CryptoCurrency[]
  loading: boolean
  error: string | null
  lastUpdated: Date | null
}

// Base cryptocurrency data with realistic 2025 prices
const baseCryptoData: CryptoCurrency[] = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    current_price: 98450.75,
    price_change_percentage_24h: 3.2,
    market_cap: 1945000000000,
    total_volume: 28500000000,
    image: "/placeholder.svg?height=32&width=32",
    last_updated: new Date().toISOString(),
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    current_price: 3890.25,
    price_change_percentage_24h: 2.8,
    market_cap: 467000000000,
    total_volume: 15200000000,
    image: "/placeholder.svg?height=32&width=32",
    last_updated: new Date().toISOString(),
  },
  {
    id: "solana",
    symbol: "sol",
    name: "Solana",
    current_price: 245.8,
    price_change_percentage_24h: 5.1,
    market_cap: 118000000000,
    total_volume: 4800000000,
    image: "/placeholder.svg?height=32&width=32",
    last_updated: new Date().toISOString(),
  },
  {
    id: "ripple",
    symbol: "xrp",
    name: "XRP",
    current_price: 2.85,
    price_change_percentage_24h: 1.9,
    market_cap: 162000000000,
    total_volume: 3200000000,
    image: "/placeholder.svg?height=32&width=32",
    last_updated: new Date().toISOString(),
  },
  {
    id: "cardano",
    symbol: "ada",
    name: "Cardano",
    current_price: 1.25,
    price_change_percentage_24h: 4.2,
    market_cap: 44000000000,
    total_volume: 1800000000,
    image: "/placeholder.svg?height=32&width=32",
    last_updated: new Date().toISOString(),
  },
  {
    id: "avalanche-2",
    symbol: "avax",
    name: "Avalanche",
    current_price: 52.3,
    price_change_percentage_24h: 3.7,
    market_cap: 21000000000,
    total_volume: 890000000,
    image: "/placeholder.svg?height=32&width=32",
    last_updated: new Date().toISOString(),
  },
  {
    id: "chainlink",
    symbol: "link",
    name: "Chainlink",
    current_price: 28.95,
    price_change_percentage_24h: -1.2,
    market_cap: 18000000000,
    total_volume: 750000000,
    image: "/placeholder.svg?height=32&width=32",
    last_updated: new Date().toISOString(),
  },
  {
    id: "polygon",
    symbol: "matic",
    name: "Polygon",
    current_price: 1.18,
    price_change_percentage_24h: 6.8,
    market_cap: 12000000000,
    total_volume: 420000000,
    image: "/placeholder.svg?height=32&width=32",
    last_updated: new Date().toISOString(),
  },
]

// Function to simulate realistic price fluctuations
function simulateMarketUpdate(cryptos: CryptoCurrency[]): CryptoCurrency[] {
  return cryptos.map((crypto) => {
    // Simulate small price changes (±0.5%)
    const priceChange = (Math.random() - 0.5) * 0.01 // ±0.5%
    const newPrice = crypto.current_price * (1 + priceChange)

    // Update the 24h percentage slightly
    const percentageChange = (Math.random() - 0.5) * 0.2 // ±0.1%
    const newPercentage = crypto.price_change_percentage_24h + percentageChange

    // Recalculate market cap based on new price
    const newMarketCap = crypto.market_cap * (1 + priceChange)

    // Simulate volume changes
    const volumeChange = (Math.random() - 0.5) * 0.1 // ±5%
    const newVolume = crypto.total_volume * (1 + volumeChange)

    return {
      ...crypto,
      current_price: newPrice,
      price_change_percentage_24h: newPercentage,
      market_cap: newMarketCap,
      total_volume: newVolume,
      last_updated: new Date().toISOString(),
    }
  })
}

export function useCryptoPrices() {
  const [state, setState] = useState<CryptoPricesState>({
    data: baseCryptoData,
    loading: false,
    error: null,
    lastUpdated: new Date(),
  })

  const updatePrices = () => {
    setState((prevState) => {
      const updatedData = simulateMarketUpdate(prevState.data)
      return {
        ...prevState,
        data: updatedData,
        lastUpdated: new Date(),
        error: null,
      }
    })
  }

  const fetchCryptoPrices = async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }))

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      updatePrices()

      setState((prev) => ({ ...prev, loading: false }))
    } catch (error) {
      console.error("Error updating crypto prices:", error)
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "Error updating prices. Showing cached data.",
      }))
    }
  }

  useEffect(() => {
    // Initial load
    setState((prev) => ({
      ...prev,
      data: baseCryptoData,
      loading: false,
      lastUpdated: new Date(),
    }))

    // Set up interval for simulated updates (every 30 seconds)
    const interval = setInterval(updatePrices, 30000)

    return () => clearInterval(interval)
  }, [])

  return {
    ...state,
    refetch: fetchCryptoPrices,
  }
}
