import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Info } from "lucide-react"

export function Hero() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Hybrid automated cryptocurrency trading
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Private equity firm Emax Protocol came up with a Balanced Asset Basket that allowed it to invest in
              cryptocurrency and other similar blockchain based industries. The company's primary activity is focused on
              cryptocurrency domain such as field of exchange and stock markets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/about">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/signup">Open An Account</Link>
              </Button>
            </div>
          </div>

          <div className="flex justify-center">
            <Card className="w-full max-w-md">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-blue-600 mb-2">2.5%</div>
                  <div className="text-gray-600">
                    Daily
                    <br />
                    for 7 days
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Info className="w-4 h-4 mr-2 text-blue-500" />
                    Start with as little as $100.
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Info className="w-4 h-4 mr-2 text-blue-500" />
                    Principal included. 15% total return. Earn each calendar day.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
