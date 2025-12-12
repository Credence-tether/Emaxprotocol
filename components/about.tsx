import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp } from "lucide-react"
import Link from "next/link"

export function About() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-8">
          <TrendingUp className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h5 className="text-blue-600 font-semibold mb-2">Our Vision</h5>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Managing Your Cryptocurrency Market Portfolio</h2>
          <div className="w-20 h-1 bg-green-500 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-4xl mx-auto mb-8">
            We look at the market's various levels, especially pertaining to the data of the learning machines of
            transactions information and orders. It also looks at smart money arrivals and outsources. This leads to
            lower wait times and a reduction in mistakes, allowing people to buy the most lucrative cryptocurrency. With
            so many trading going on and the leverage it has, the cryptocurrency market has been quite lucrative. We
            have come up with programmed dealership machines to address the vast array of day-to-day profits.
          </p>
          <Button size="lg" asChild>
            <Link href="/signup">
              Start Trading <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Decorative circles */}
        <div className="flex justify-center space-x-4 mt-12">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-blue-200 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
