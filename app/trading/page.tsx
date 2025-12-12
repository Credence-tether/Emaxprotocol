"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TrendingUp, Calculator, DollarSign, Clock, Shield, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function TradingPage() {
  const [investmentAmount, setInvestmentAmount] = useState(1.0)
  const [calculations, setCalculations] = useState({
    hourlyProfit: 0,
    dailyProfit: 0,
    totalReturn: 0,
  })

  useEffect(() => {
    const dailyRate = 0.025 // 2.5% daily
    const days = 7
    const dailyProfit = investmentAmount * dailyRate
    const totalReturn = investmentAmount * (1 + dailyRate * days)

    setCalculations({
      hourlyProfit: dailyProfit / 24,
      dailyProfit: dailyProfit,
      totalReturn: totalReturn,
    })
  }, [investmentAmount])

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20 relative overflow-hidden">
        {/* Floating Illustrations */}
        <div className="absolute top-10 left-10 w-32 h-24 opacity-20">
          <Image
            src="/illustrations/trading-dashboard.png"
            alt="Trading Dashboard"
            width={128}
            height={96}
            className="animate-pulse rounded"
          />
        </div>
        <div className="absolute bottom-10 right-10 w-32 h-24 opacity-20">
          <Image
            src="/illustrations/defi-protocol.svg"
            alt="DeFi Protocol"
            width={128}
            height={96}
            className="animate-pulse"
          />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Hybrid Automated Cryptocurrency Trading</h1>
          <div className="w-20 h-1 bg-green-400 mx-auto mb-6"></div>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Managing Your Cryptocurrency Market Portfolio with advanced algorithmic trading principles and machine
            learning technology.
          </p>

          {/* Investment Plan Card */}
          <Card className="max-w-md mx-auto bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6 text-center">
              <div className="text-5xl font-bold text-green-400 mb-2">2.5%</div>
              <div className="text-lg text-white/90 mb-4">
                Daily
                <br />
                for 7 days
              </div>
              <div className="space-y-2 text-sm text-white/80">
                <div className="flex items-center justify-center">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Start with as little as $100
                </div>
                <div className="flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Principal included. 17.5% total return
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Trading Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Advanced Trading Features</h2>
            <div className="w-20 h-1 bg-green-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our sophisticated trading algorithms analyze market data in real-time to maximize your returns while
              minimizing risk exposure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Zap className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Automated Trading</h3>
                <p className="text-gray-600">
                  AI-powered algorithms execute trades 24/7, capitalizing on market opportunities while you sleep.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Risk Management</h3>
                <p className="text-gray-600">
                  Advanced risk assessment tools protect your investment with diversified trading strategies.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Clock className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Real-time Analytics</h3>
                <p className="text-gray-600">
                  Monitor your portfolio performance with live data and comprehensive market analysis.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Trading Illustration */}
          <div className="flex justify-center mb-16">
            <div className="relative">
              <Image
                src="/illustrations/trading-dashboard.png"
                alt="Professional Trading Dashboard"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Calculator */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Calculate Your Profit</h2>
              <div className="w-20 h-1 bg-green-500 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600">
                Try entering different amounts and see how much you'll earn with our trading platform.
              </p>
            </div>

            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50"></div>
              <CardHeader className="relative">
                <CardTitle className="text-center text-2xl font-bold text-gray-900 flex items-center justify-center">
                  <Calculator className="w-6 h-6 mr-2" />
                  Investment Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="relative p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <Label htmlFor="investment" className="text-lg font-semibold mb-4 block">
                      Enter Your Investment Amount
                    </Label>
                    <div className="relative">
                      <Input
                        id="investment"
                        type="number"
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(Number(e.target.value) || 0)}
                        min="0.001"
                        step="0.001"
                        className="text-2xl font-bold h-16 pr-16"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-gray-500">
                        BTC
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-white rounded-lg border">
                      <span className="text-gray-600">Hourly Profit</span>
                      <span className="font-bold text-green-600">{calculations.hourlyProfit.toFixed(8)} BTC</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white rounded-lg border">
                      <span className="text-gray-600">Daily Profit</span>
                      <span className="font-bold text-green-600">{calculations.dailyProfit.toFixed(8)} BTC</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white rounded-lg border">
                      <span className="text-gray-600">Total Return (7 days)</span>
                      <span className="font-bold text-blue-600">{calculations.totalReturn.toFixed(8)} BTC</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2 text-blue-500" />
                    You can have as many deposits as you want
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-blue-500" />
                    Minimum withdrawal amount is 0.0005 BTC
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <Button size="lg" asChild>
                    <Link href="/signup">Sign Up Now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trading Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Our Trading Works</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-4">Market Analysis</h3>
                <p className="text-gray-600">
                  Our AI algorithms analyze market trends, trading volumes, and price movements across multiple
                  exchanges.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-4">Automated Execution</h3>
                <p className="text-gray-600">
                  Trades are executed automatically based on predetermined strategies and risk parameters.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-4">Profit Distribution</h3>
                <p className="text-gray-600">
                  Daily profits are calculated and distributed to your account automatically every 24 hours.
                </p>
              </div>
            </div>

            {/* Mining Illustration */}
            <div className="flex justify-center mt-16">
              <div className="relative">
                <Image
                  src="/illustrations/crypto-mining.svg"
                  alt="Crypto Mining Process"
                  width={500}
                  height={300}
                  className="rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        {/* Background DeFi Illustration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <Image
            src="/illustrations/defi-protocol.svg"
            alt="DeFi Background"
            width={800}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6">Start Trading Today</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our automated trading platform and start earning daily returns on your cryptocurrency investments.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/signup">Create Trading Account</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
