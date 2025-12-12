import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, DollarSign, Award, TrendingUp, Mail, Globe } from "lucide-react"
import Link from "next/link"

export default function AffiliatePage() {
  return (
    <div className="pt-16 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Refer Your Friends and Get Commission!</h1>
          <div className="w-20 h-1 bg-green-400 mx-auto mb-6"></div>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            The affiliate program was created to reward members who share our cryptocurrency trading platform with their
            friends and colleagues. Earn up to 4% from their active deposits.
          </p>
        </div>
      </section>

      {/* Commission Structure */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <Card className="text-center hover:shadow-lg transition-shadow border-2 border-blue-100">
                <CardContent className="p-8">
                  <div className="text-5xl font-bold text-blue-600 mb-4">2%</div>
                  <h3 className="text-xl font-semibold mb-4">Default Commission</h3>
                  <p className="text-gray-600">
                    Earn 2% commission from every deposit made by users you refer to our platform.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow border-2 border-green-100">
                <CardContent className="p-8">
                  <div className="text-5xl font-bold text-green-600 mb-4">4%</div>
                  <h3 className="text-xl font-semibold mb-4">Representative Commission</h3>
                  <p className="text-gray-600">
                    Upgrade to Representative status and earn 4% commission on all referral deposits.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How the Affiliate Program Works</h2>
            <div className="w-20 h-1 bg-green-500 mx-auto"></div>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <Users className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-4">1. Share Your Link</h3>
                  <p className="text-gray-600">
                    Get your unique referral link from your account dashboard and share it with friends, family, and
                    your network.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <DollarSign className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-4">2. They Invest</h3>
                  <p className="text-gray-600">
                    When someone signs up using your link and makes their first deposit, they become your active
                    referral.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <TrendingUp className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-4">3. Earn Commission</h3>
                  <p className="text-gray-600">
                    Receive instant commission payments directly to your account for every deposit your referrals make.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Program Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Start Building Your Team</h2>
              <div className="w-16 h-1 bg-blue-600 mb-6"></div>
              <p className="text-lg text-gray-600 mb-8">
                Share your referral link with friends and earn 2% from their active deposits. Upgrade to Representative
                status to earn even more with 4% commission rates.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <Globe className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Global Reach</h4>
                    <p className="text-gray-600">
                      Dependable online cryptocurrency trading platform accessible from anywhere in the world.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Award className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Proven Track Record</h4>
                    <p className="text-gray-600">
                      Established in 2017 with a wide range of services designed to assist cryptocurrency holders.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Users className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Expert Support</h4>
                    <p className="text-gray-600">
                      24/7 customer support and portfolio management assistance from cryptocurrency experts.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Card className="w-full max-w-md">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Affiliate Benefits</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-gray-700">No Active Deposit Required</span>
                      <span className="text-green-600 font-semibold">✓</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-gray-700">Instant Commission Payments</span>
                      <span className="text-green-600 font-semibold">✓</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-gray-700">Lifetime Earnings</span>
                      <span className="text-green-600 font-semibold">✓</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-gray-700">Multi-level Referrals</span>
                      <span className="text-green-600 font-semibold">✓</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Representative Program */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="flex justify-center">
                  <Award className="w-64 h-64 text-purple-200" />
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="flex items-center mb-6">
                  <Award className="w-8 h-8 text-purple-600 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">Join Our Representative Program</h2>
                </div>
                <div className="w-16 h-1 bg-purple-600 mb-6"></div>

                <p className="text-lg text-gray-600 mb-8">
                  Become a representative of Emax Protocol and promote our cryptocurrency trading project in your region
                  through various channels including online presentations, client meetings, and personal blogs.
                </p>

                <div className="bg-white p-6 rounded-lg border border-purple-200 mb-8">
                  <h4 className="font-semibold text-gray-900 mb-4">Requirements:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Ability to promote our platform professionally</li>
                    <li>• Experience in online/offline marketing</li>
                    <li>• Commitment to ethical promotion practices</li>
                    <li>• No active deposit required</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    <strong>Note:</strong> We never support SPAM or illegal promotion methods. Send your details to get
                    started.
                  </p>

                  <Button asChild size="lg">
                    <a href="mailto:hey@templaterex.com">
                      <Mail className="w-4 h-4 mr-2" />
                      Apply Now
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Earning?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our affiliate program today and start earning commission from your referrals immediately.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/signup">
              Sign Up Now <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
