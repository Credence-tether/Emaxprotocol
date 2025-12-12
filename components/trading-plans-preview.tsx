import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function TradingPlansPreview() {
  const plans = [
    {
      name: "Consensus",
      minDeposit: "$250",
      maxDeposit: "$999",
      dailyROI: "1.5%",
      profitWithdrawal: "24 Hours",
      capitalWithdrawal: "3 Days",
      color: "from-blue-500 to-blue-600",
      popular: false,
    },
    {
      name: "Polkadot",
      minDeposit: "$2,000",
      maxDeposit: "$4,999",
      dailyROI: "2%",
      profitWithdrawal: "24 Hours",
      capitalWithdrawal: "5 Days",
      color: "from-purple-500 to-purple-600",
      popular: true,
    },
    {
      name: "Ethereum Protocol",
      minDeposit: "$6,000",
      maxDeposit: "$10,000",
      dailyROI: "3%",
      profitWithdrawal: "3 Days",
      capitalWithdrawal: "9 Days",
      color: "from-green-500 to-green-600",
      popular: false,
    },
    {
      name: "Hyperledger Fabric",
      minDeposit: "$20,000",
      maxDeposit: "Unlimited",
      dailyROI: "4%",
      profitWithdrawal: "4 Days",
      capitalWithdrawal: "12 Days",
      color: "from-orange-500 to-orange-600",
      popular: false,
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Trading Plans</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our carefully designed investment plans with guaranteed daily returns and flexible withdrawal
            options tailored to your investment goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {plans.map((plan, index) => (
            <Card key={index} className="relative overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {plan.popular && <Badge className="absolute top-4 right-4 bg-yellow-500 text-white">Popular</Badge>}

              <CardHeader className={`bg-gradient-to-r ${plan.color} text-white`}>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-white/90">{plan.dailyROI} Daily ROI</CardDescription>
              </CardHeader>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Min Deposit:</span>
                    <span className="font-semibold">{plan.minDeposit}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Max Deposit:</span>
                    <span className="font-semibold">{plan.maxDeposit}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Daily ROI:</span>
                    <span className="font-semibold text-green-600">{plan.dailyROI}</span>
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

                <Button className="w-full mt-6" asChild>
                  <Link href="/get-started">Get Started</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" asChild>
            <Link href="/trading-plans">View All Trading Plans</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
