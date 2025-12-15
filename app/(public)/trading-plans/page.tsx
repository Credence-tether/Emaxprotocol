import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, TrendingUp, Clock, Shield, Zap } from "lucide-react"
import Link from "next/link"

export default function TradingPlansPage() {
  const plans = [
    {
      name: "Consensus",
      subtitle: "Perfect for Beginners",
      minDeposit: "$250.00",
      maxDeposit: "$999.00",
      dailyROI: "1.5%",
      profitWithdrawal: "24 Hours",
      capitalWithdrawal: "3 Days",
      color: "from-blue-500 to-blue-600",
      features: ["24/7 Customer Support", "Real-time Portfolio Tracking", "Basic Trading Signals", "Mobile App Access"],
      popular: false,
    },
    {
      name: "Polkadot",
      subtitle: "Most Popular Choice",
      minDeposit: "$2,000.00",
      maxDeposit: "$4,999.00",
      dailyROI: "2%",
      profitWithdrawal: "24 Hours",
      capitalWithdrawal: "5 Days",
      color: "from-purple-500 to-purple-600",
      features: [
        "Priority Customer Support",
        "Advanced Trading Signals",
        "Risk Management Tools",
        "Weekly Market Analysis",
      ],
      popular: true,
    },
    {
      name: "Ethereum Protocol",
      subtitle: "For Serious Investors",
      minDeposit: "$6,000.00",
      maxDeposit: "$10,000.00",
      dailyROI: "3%",
      profitWithdrawal: "3 Days",
      capitalWithdrawal: "9 Days",
      color: "from-green-500 to-green-600",
      features: [
        "Dedicated Account Manager",
        "Premium Trading Algorithms",
        "Custom Risk Profiles",
        "Daily Market Reports",
      ],
      popular: false,
    },
    {
      name: "Hyperledger Fabric",
      subtitle: "VIP Investment Tier",
      minDeposit: "$20,000.00",
      maxDeposit: "Unlimited",
      dailyROI: "4%",
      profitWithdrawal: "4 Days",
      capitalWithdrawal: "12 Days",
      color: "from-orange-500 to-orange-600",
      features: [
        "VIP Customer Service",
        "Institutional-Grade Tools",
        "Personalized Strategies",
        "Direct Trader Access",
      ],
      popular: false,
    },
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Trading Plans</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose from our professionally managed investment plans designed to maximize your returns while minimizing
            risk through advanced trading algorithms and market analysis.
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center">
              <Shield className="w-5 h-5 mr-2 text-green-500" />
              Secure & Regulated
            </div>
            <div className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
              Guaranteed Returns
            </div>
            <div className="flex items-center">
              <Zap className="w-5 h-5 mr-2 text-purple-500" />
              Fast Withdrawals
            </div>
          </div>
        </div>
      </section>

      {/* Trading Plans */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {plan.popular && (
                  <Badge className="absolute top-4 right-4 bg-yellow-500 text-white z-10">Most Popular</Badge>
                )}

                <CardHeader className={`bg-gradient-to-r ${plan.color} text-white relative`}>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-white/90">{plan.subtitle}</CardDescription>
                  <div className="text-3xl font-bold mt-4">
                    {plan.dailyROI}
                    <span className="text-lg font-normal"> Daily ROI</span>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Min Deposit:</span>
                      <span className="font-semibold">{plan.minDeposit}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Max Deposit:</span>
                      <span className="font-semibold">{plan.maxDeposit}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Profit Withdrawal:</span>
                      <span className="font-semibold">{plan.profitWithdrawal}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Capital Withdrawal:</span>
                      <span className="font-semibold">{plan.capitalWithdrawal}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Features Included:</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full" size="lg" asChild>
                    <Link href="/get-started">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose Our Trading Plans?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Guaranteed Returns</h3>
              <p className="text-gray-600">
                Our advanced algorithms ensure consistent daily returns on your investment.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
              <p className="text-gray-600">Your investments are protected by bank-level security and insurance.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Withdrawals</h3>
              <p className="text-gray-600">Quick and reliable withdrawal processing with minimal waiting times.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
