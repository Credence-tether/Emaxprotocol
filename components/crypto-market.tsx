"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function CryptoMarket() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Most Traded Cryptocurrencies in 2025</h2>
          <div className="w-20 h-1 bg-green-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="w-8 h-8 bg-orange-500 rounded-full mr-3"></div>
                Bitcoin (BTC)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-semibold">$45,230.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">24h Change:</span>
                  <span className="text-green-600">+2.45%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Market Cap:</span>
                  <span className="font-semibold">$890.2B</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full mr-3"></div>
                Ethereum (ETH)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-semibold">$3,120.75</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">24h Change:</span>
                  <span className="text-green-600">+1.85%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Market Cap:</span>
                  <span className="font-semibold">$375.8B</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="w-8 h-8 bg-gray-400 rounded-full mr-3"></div>
                Litecoin (LTC)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-semibold">$185.30</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">24h Change:</span>
                  <span className="text-red-600">-0.75%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Market Cap:</span>
                  <span className="font-semibold">$13.5B</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="w-8 h-8 bg-purple-500 rounded-full mr-3"></div>
                Tether (USDT)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-semibold">$1.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">24h Change:</span>
                  <span className="text-gray-600">0.00%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Market Cap:</span>
                  <span className="font-semibold">$95.2B</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
