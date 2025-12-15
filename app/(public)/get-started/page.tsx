"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  UserPlus,
  TrendingUp,
  Shield,
  CheckCircle,
  Clock,
  DollarSign,
  ArrowRight,
  AlertCircle,
  Wallet,
  BarChart3,
} from "lucide-react"
import Link from "next/link"

const steps = [
  {
    id: 1,
    title: "Create Your Account",
    description: "Sign up with your basic information and verify your email address",
    icon: UserPlus,
    duration: "2-3 minutes",
    requirements: [
      "Valid email address",
      "Strong password (minimum 6 characters)",
      "Full name and username",
      "Age 18 or older",
    ],
    details:
      "Registration is completely free and takes just a few minutes. You'll need to provide basic information and agree to our terms of service.",
  },
  {
    id: 2,
    title: "Fund Your Account",
    description: "Make your first deposit using Bitcoin to start trading",
    icon: Wallet,
    duration: "5-10 minutes",
    requirements: [
      "Minimum deposit: 0.001 BTC",
      "Bitcoin wallet with sufficient funds",
      "Valid Bitcoin address",
      "3 blockchain confirmations required",
    ],
    details:
      "Send Bitcoin to your unique deposit address. Your funds will be available after 3 blockchain confirmations, typically within 30-60 minutes.",
  },
  {
    id: 3,
    title: "Choose Investment Plan",
    description: "Select the trading plan that matches your investment goals",
    icon: BarChart3,
    duration: "1-2 minutes",
    requirements: [
      "Active account balance",
      "Understanding of plan terms",
      "Risk assessment completed",
      "Investment amount decided",
    ],
    details:
      "Our current plan offers 2.5% daily returns for 7 days. You can create multiple deposits and track each one separately.",
  },
  {
    id: 4,
    title: "Start Earning",
    description: "Watch your investment grow with daily automated returns",
    icon: TrendingUp,
    duration: "Ongoing",
    requirements: [
      "Active investment plan",
      "Daily profit calculations",
      "Withdrawal access after 24 hours",
      "Account monitoring tools",
    ],
    details:
      "Your first profit will be credited after 24 hours. You can withdraw your earnings anytime with instant processing.",
  },
]

const faqs = [
  {
    question: "How long does it take to get started?",
    answer:
      "The entire process takes about 10-15 minutes. Account creation is instant, but Bitcoin deposits require 3 blockchain confirmations which typically take 30-60 minutes.",
  },
  {
    question: "What's the minimum amount to start?",
    answer: "You can start with as little as 0.001 BTC (approximately $45-50 depending on current Bitcoin price).",
  },
  {
    question: "When will I receive my first profit?",
    answer:
      "Your first daily profit will be credited to your account 24 hours after your deposit is confirmed and your investment plan is activated.",
  },
  {
    question: "Can I withdraw my money anytime?",
    answer:
      "Yes, you can withdraw your profits anytime after the first 24 hours. Withdrawals are processed instantly with no fees.",
  },
  {
    question: "Is my investment safe?",
    answer:
      "We use advanced security measures and risk management strategies. However, like all investments, cryptocurrency trading carries inherent risks.",
  },
]

export default function GetStartedPage() {
  const [activeStep, setActiveStep] = useState(1)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Get Started in 4 Simple Steps</h1>
          <div className="w-20 h-1 bg-green-400 mx-auto mb-6"></div>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Join thousands of satisfied traders and start earning daily returns on your cryptocurrency investments. Our
            step-by-step guide will have you trading in minutes.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">2.5%</div>
              <div className="text-blue-100">Daily Returns</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">0.001</div>
              <div className="text-blue-100">Min. BTC Deposit</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">24/7</div>
              <div className="text-blue-100">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Indicator */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                      activeStep >= step.id ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  >
                    {activeStep > step.id ? <CheckCircle className="w-6 h-6" /> : step.id}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-1 mx-4 ${activeStep > step.id ? "bg-blue-600" : "bg-gray-300"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Step Details */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Step Navigation */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Steps Overview</h3>
                  <div className="space-y-4">
                    {steps.map((step) => (
                      <Card
                        key={step.id}
                        className={`cursor-pointer transition-all ${
                          activeStep === step.id ? "border-blue-500 shadow-md" : "hover:shadow-sm"
                        }`}
                        onClick={() => setActiveStep(step.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <step.icon
                              className={`w-6 h-6 ${activeStep === step.id ? "text-blue-600" : "text-gray-400"}`}
                            />
                            <div>
                              <h4
                                className={`font-semibold ${activeStep === step.id ? "text-blue-600" : "text-gray-700"}`}
                              >
                                {step.title}
                              </h4>
                              <div className="flex items-center text-sm text-gray-500 mt-1">
                                <Clock className="w-3 h-3 mr-1" />
                                {step.duration}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step Content */}
              <div className="lg:col-span-2">
                {steps.map((step) => (
                  <div key={step.id} className={activeStep === step.id ? "block" : "hidden"}>
                    <Card className="mb-8">
                      <CardHeader>
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                            <step.icon className="w-8 h-8 text-blue-600" />
                          </div>
                          <div>
                            <CardTitle className="text-2xl font-bold text-gray-900">
                              Step {step.id}: {step.title}
                            </CardTitle>
                            <p className="text-gray-600 mt-2">{step.description}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">What you'll need:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {step.requirements.map((req, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                                <span className="text-gray-600">{req}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Details:</h4>
                          <p className="text-gray-600 leading-relaxed">{step.details}</p>
                        </div>

                        {step.id === 1 && (
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="flex items-start space-x-3">
                              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <h5 className="font-semibold text-blue-900 mb-1">Important Note</h5>
                                <p className="text-blue-800 text-sm">
                                  Make sure to use a valid email address as you'll need to verify it before proceeding
                                  to the next step.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {step.id === 2 && (
                          <div className="bg-yellow-50 p-4 rounded-lg">
                            <div className="flex items-start space-x-3">
                              <Shield className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <h5 className="font-semibold text-yellow-900 mb-1">Security Tip</h5>
                                <p className="text-yellow-800 text-sm">
                                  Always double-check the deposit address before sending Bitcoin. Transactions are
                                  irreversible.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="flex justify-between items-center pt-4">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-500">Estimated time: {step.duration}</span>
                          </div>

                          {step.id === 1 && (
                            <Button asChild>
                              <Link href="/signup">
                                Start Registration <ArrowRight className="w-4 h-4 ml-2" />
                              </Link>
                            </Button>
                          )}

                          {step.id > 1 && step.id < 4 && (
                            <Button onClick={() => setActiveStep(step.id + 1)}>
                              Next Step <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          )}

                          {step.id === 4 && (
                            <Button asChild>
                              <Link href="/login">
                                Access Dashboard <ArrowRight className="w-4 h-4 ml-2" />
                              </Link>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Calculator Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">See Your Potential Earnings</h2>
            <div className="w-20 h-1 bg-green-500 mx-auto mb-8"></div>

            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-2">0.001 BTC</div>
                    <div className="text-sm text-gray-600 mb-4">Investment</div>
                    <div className="text-lg font-semibold text-green-600">+0.000175 BTC</div>
                    <div className="text-xs text-gray-500">Total Profit (7 days)</div>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-2">0.01 BTC</div>
                    <div className="text-sm text-gray-600 mb-4">Investment</div>
                    <div className="text-lg font-semibold text-green-600">+0.00175 BTC</div>
                    <div className="text-xs text-gray-500">Total Profit (7 days)</div>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-2">0.1 BTC</div>
                    <div className="text-sm text-gray-600 mb-4">Investment</div>
                    <div className="text-lg font-semibold text-green-600">+0.0175 BTC</div>
                    <div className="text-xs text-gray-500">Total Profit (7 days)</div>
                  </div>
                </div>

                <div className="mt-6">
                  <Button asChild variant="outline">
                    <Link href="/trading">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Try Full Calculator
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-0">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full p-6 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                      <ArrowRight
                        className={`w-5 h-5 text-gray-500 transition-transform ${
                          expandedFaq === index ? "rotate-90" : ""
                        }`}
                      />
                    </button>

                    {expandedFaq === index && (
                      <div className="px-6 pb-6 border-t border-gray-100">
                        <p className="text-gray-600 leading-relaxed pt-4">{faq.answer}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our platform today and start earning daily returns on your cryptocurrency investments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/signup">
                Create Account Now <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-blue-600"
              asChild
            >
              <Link href="/contact">Need Help? Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
