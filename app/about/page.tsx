import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, Shield, Award, Users, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="pt-16 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20 relative overflow-hidden">
        {/* Floating Blockchain Illustration */}
        <div className="absolute top-10 right-10 w-40 h-30 opacity-20">
          <Image
            src="/illustrations/blockchain-network.svg"
            alt="Blockchain Network"
            width={160}
            height={120}
            className="animate-pulse"
          />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">About Emax Protocol</h1>
          <div className="w-20 h-1 bg-green-400 mx-auto mb-6"></div>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Your ultimate cryptocurrency trading broker, providing cutting-edge automated trading solutions since 2017.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Emax Protocol analysts use advanced predictions to purchase profitable digital currency at the optimal
              time. We provide customized portfolio services with minimal risk aversion, allowing traders to see better
              returns on their investments while protecting them from potential market risks.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Vision</h3>
              <div className="w-16 h-1 bg-blue-600 mb-6"></div>
              <p className="text-gray-600 mb-6">
                We analyze market data at various levels, focusing on machine learning algorithms for transaction
                information and order analysis. Our smart money tracking and outsourcing capabilities lead to reduced
                wait times and fewer errors, enabling optimal cryptocurrency purchases.
              </p>
              <p className="text-gray-600 mb-8">
                With extensive trading volume and leverage opportunities, the cryptocurrency market offers significant
                profit potential. We've developed automated trading systems to capitalize on daily profit opportunities.
              </p>
              <Button asChild size="lg">
                <Link href="/signup">
                  Start Trading <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <Image
                  src="/illustrations/trading-dashboard.png"
                  alt="Advanced Trading Analytics"
                  width={500}
                  height={350}
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Credentials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Incorporation & Credentials</h2>
            <div className="w-20 h-1 bg-green-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Emax Protocol is a registered cryptocurrency trading broker established in 2017. Our comprehensive
              services are designed to assist Bitcoin holders in making informed cryptocurrency management decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-8">
                <Award className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Certificate of Incorporation</h3>
                <p className="text-gray-600 mb-6">
                  Emax Protocol completed the registration procedure in January 2025 and is listed on the Companies
                  House registry.
                </p>
                <Button variant="outline">
                  <Shield className="w-4 h-4 mr-2" />
                  View Certificate
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Terms of Service</h3>
                <p className="text-gray-600 mb-6">
                  Please read our terms carefully before registering. By using our website, you confirm acceptance of
                  our terms of service.
                </p>
                <Button variant="outline" asChild>
                  <Link href="/terms">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Terms
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Digital Wallet Illustration */}
          <div className="flex justify-center mt-16">
            <div className="relative">
              <Image
                src="/illustrations/digital-wallet.png"
                alt="Secure Digital Wallet"
                width={400}
                height={500}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Emax Protocol</h2>
            <div className="w-20 h-1 bg-green-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Clock className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Instant Withdrawals</h3>
                <p className="text-gray-600">
                  Our fee-free instant withdrawal interface is accessible 24/7 with no hidden fees or charges.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Users className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
                <p className="text-gray-600">
                  Technical support and consultation available 24/7 through multiple communication channels.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <TrendingUp className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Daily Earnings</h3>
                <p className="text-gray-600">
                  Receive daily earnings at competitive rates once you activate your trading account.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team & Expertise */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Expertise</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 mb-12">
              We are a London-based company with a diverse team of professionals spanning multiple industries, from
              engineering to advanced computer technology. Our experts are well-versed in cryptocurrency techniques and
              blockchain technology.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">2017</div>
                <div className="text-gray-600">Years of Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                <div className="text-gray-600">Customer Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">0%</div>
                <div className="text-gray-600">Hidden Fees</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">Global</div>
                <div className="text-gray-600">Accessibility</div>
              </div>
            </div>

            {/* Crypto Mining Illustration */}
            <div className="flex justify-center">
              <div className="relative">
                <Image
                  src="/illustrations/crypto-mining.svg"
                  alt="Crypto Mining Infrastructure"
                  width={600}
                  height={400}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        {/* Background DeFi Illustration */}
        <div className="absolute bottom-0 left-0 w-full h-full opacity-10">
          <Image
            src="/illustrations/defi-protocol.svg"
            alt="DeFi Background"
            width={800}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Trading?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied traders who trust Emax Protocol for their cryptocurrency investments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/signup">Create Account</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-blue-600"
              asChild
            >
              <Link href="/get-started">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
