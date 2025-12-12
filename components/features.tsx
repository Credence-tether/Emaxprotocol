import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Features() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Portfolio Management Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h5 className="text-blue-600 font-semibold mb-2">Managing Your cryptocurrency Market Portfolio</h5>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Passion relates to performance</h2>
            <div className="w-20 h-1 bg-green-500 mb-6"></div>
            <p className="text-gray-600 mb-8">
              We first use our traders' experience and knowledge to establish a link between the price of individual
              digital coins and the cryptocurrency market. Using the econometrics and statistical methods, we look at
              the precision and, with the help of data mining, we enhance the predictive parts for the next step.
            </p>
            <Button asChild>
              <Link href="/about">
                Know More <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <Image
                src="/illustrations/trading-chart.png"
                alt="Trading Dashboard"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Affiliate Program Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 flex justify-center">
            <div className="relative">
              <Image
                src="/illustrations/digital-wallet.png"
                alt="Digital Wallet"
                width={400}
                height={300}
                className="rounded-lg"
              />
              <Card className="absolute bottom-4 left-4 w-48 bg-white/90 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-2">2%</div>
                      <div className="text-sm text-gray-600">Standard Commission</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-2">4%</div>
                      <div className="text-sm text-gray-600">Representative Commission</div>
                    </div>
                  </div>
                  <div className="text-center text-sm text-gray-500">
                    <Link href="/affiliate" className="text-blue-600 hover:underline">
                      How to become a representative?
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h5 className="text-blue-600 font-semibold mb-2">Affiliate Program</h5>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Earn Extra</h2>
            <div className="w-20 h-1 bg-green-500 mb-6"></div>
            <p className="text-gray-600 mb-8">
              Share your referral link, which is made available in your account, with friends, and you'll earn 4% from
              their active deposit. You can even earn 8% when you apply for a Representative status with our company.
            </p>
            <Button asChild>
              <Link href="/affiliate">
                Become a Partner <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
