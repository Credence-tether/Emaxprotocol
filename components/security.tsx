import { Card, CardContent } from "@/components/ui/card"
import { Shield, Clock, Headphones } from "lucide-react"

export function Security() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Reasons to choose us</h2>
          <div className="w-20 h-1 bg-green-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardContent className="p-8">
              <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h5 className="text-xl font-semibold mb-4">Instant Withdrawals</h5>
              <p className="text-gray-600">
                Our fee-free instant withdrawal interface is accessible 24/7. And they are no hidden fees or charges
                involved.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-8">
              <Headphones className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h5 className="text-xl font-semibold mb-4">24/7 support</h5>
              <p className="text-gray-600">
                Technical support and consultation are available 24 hours a day, 7 days a week through 3 different
                channels.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-8">
              <Clock className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h5 className="text-xl font-semibold mb-4">Daily Earnings</h5>
              <p className="text-gray-600">
                Once you've activated your trading account, you'll receive earnings every day at a good rate in regards
                to your plan.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
