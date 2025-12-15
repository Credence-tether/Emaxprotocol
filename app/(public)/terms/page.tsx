"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, FileText, Shield, AlertTriangle, Scale } from "lucide-react"
import Image from "next/image"

interface TermsSection {
  id: string
  title: string
  icon: React.ReactNode
  content: string[]
  subsections?: {
    title: string
    content: string[]
  }[]
}

const termsData: TermsSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    icon: <Scale className="w-6 h-6" />,
    content: [
      "By accessing and using the Emax Protocol platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.",
      "These terms constitute a legally binding agreement between you and Emax Protocol Limited, a company incorporated under the laws of the United Kingdom.",
      "If you do not agree to these terms, you must not use our services or access our platform.",
      "We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.",
    ],
  },
  {
    id: "definitions",
    title: "Definitions and Interpretation",
    icon: <FileText className="w-6 h-6" />,
    content: ["In these Terms and Conditions, unless the context otherwise requires:"],
    subsections: [
      {
        title: "Key Definitions",
        content: [
          "'Platform' means the Emax Protocol trading platform, website, and associated services",
          "'User' or 'You' means any individual or entity accessing or using our services",
          "'Services' means all trading, investment, and related services provided by Emax Protocol",
          "'Digital Assets' means cryptocurrencies, tokens, and other blockchain-based assets",
          "'Investment Plan' means any trading or investment product offered through our platform",
          "'Account' means your registered user account on our platform",
        ],
      },
    ],
  },
  {
    id: "eligibility",
    title: "Eligibility and Account Registration",
    icon: <Shield className="w-6 h-6" />,
    content: [
      "You must be at least 18 years of age to use our services.",
      "You must have the legal capacity to enter into binding contracts in your jurisdiction.",
      "You represent that all information provided during registration is accurate and complete.",
      "You are responsible for maintaining the confidentiality of your account credentials.",
    ],
    subsections: [
      {
        title: "Prohibited Jurisdictions",
        content: [
          "Our services are not available to residents of certain jurisdictions including but not limited to:",
          "- United States of America and its territories",
          "- Countries subject to international sanctions",
          "- Jurisdictions where cryptocurrency trading is prohibited",
          "You must comply with all applicable laws in your jurisdiction regarding cryptocurrency trading.",
        ],
      },
      {
        title: "Account Verification",
        content: [
          "We may require identity verification before allowing access to certain services",
          "You must provide accurate and up-to-date documentation when requested",
          "We reserve the right to suspend accounts pending verification completion",
          "False or misleading information may result in immediate account termination",
        ],
      },
    ],
  },
  {
    id: "services",
    title: "Description of Services",
    icon: <FileText className="w-6 h-6" />,
    content: [
      "Emax Protocol provides automated cryptocurrency trading services through advanced algorithms and market analysis.",
      "Our platform offers various investment plans with different risk profiles and return expectations.",
      "We provide portfolio management services designed to optimize returns while managing risk exposure.",
    ],
    subsections: [
      {
        title: "Trading Services",
        content: [
          "Automated cryptocurrency trading using proprietary algorithms",
          "Real-time market analysis and trade execution",
          "Portfolio diversification across multiple digital assets",
          "Daily profit calculations and distributions",
          "24/7 trading operations across global markets",
        ],
      },
      {
        title: "Investment Plans",
        content: [
          "Multiple investment tiers with varying minimum deposits",
          "Fixed-term investment periods with specified return rates",
          "Principal protection mechanisms where applicable",
          "Flexible withdrawal options subject to plan terms",
        ],
      },
    ],
  },
  {
    id: "risks",
    title: "Risk Disclosure and Warnings",
    icon: <AlertTriangle className="w-6 h-6" />,
    content: [
      "Cryptocurrency trading involves substantial risk and may not be suitable for all investors.",
      "Digital asset prices are highly volatile and can result in significant losses.",
      "Past performance does not guarantee future results.",
      "You should only invest funds that you can afford to lose entirely.",
    ],
    subsections: [
      {
        title: "Market Risks",
        content: [
          "Cryptocurrency markets operate 24/7 and are subject to extreme volatility",
          "Regulatory changes may impact market conditions and asset values",
          "Technical issues or network congestion may affect trading operations",
          "Liquidity risks may impact the ability to execute trades at desired prices",
        ],
      },
      {
        title: "Technology Risks",
        content: [
          "Blockchain networks may experience technical difficulties or attacks",
          "Smart contract vulnerabilities could result in loss of funds",
          "Platform downtime may prevent access to accounts or trading functions",
          "Cybersecurity threats pose ongoing risks to digital asset storage",
        ],
      },
    ],
  },
  {
    id: "deposits",
    title: "Deposits and Withdrawals",
    icon: <FileText className="w-6 h-6" />,
    content: [
      "All deposits must be made in supported cryptocurrencies as specified on our platform.",
      "Minimum deposit amounts apply and are clearly displayed for each investment plan.",
      "Deposits are credited after the required number of blockchain confirmations.",
      "We do not charge fees for deposits or withdrawals unless otherwise specified.",
    ],
    subsections: [
      {
        title: "Deposit Requirements",
        content: [
          "Minimum deposit: 0.001 BTC or equivalent in supported cryptocurrencies",
          "Deposits must originate from wallets you own and control",
          "Third-party deposits are not permitted and may be returned",
          "All deposits are subject to anti-money laundering checks",
        ],
      },
      {
        title: "Withdrawal Policy",
        content: [
          "Withdrawals are processed within 24 hours of request submission",
          "Minimum withdrawal amount: 0.0005 BTC or equivalent",
          "Withdrawals are sent to the same address type as the original deposit",
          "Additional verification may be required for large withdrawal amounts",
        ],
      },
    ],
  },
  {
    id: "fees",
    title: "Fees and Charges",
    icon: <FileText className="w-6 h-6" />,
    content: [
      "Our fee structure is transparent and clearly disclosed on our platform.",
      "We do not charge hidden fees or commissions on standard transactions.",
      "Network fees for blockchain transactions are borne by the respective networks.",
    ],
    subsections: [
      {
        title: "Fee Schedule",
        content: [
          "Deposit fees: None (network fees apply)",
          "Withdrawal fees: None (network fees apply)",
          "Trading fees: Included in spread pricing",
          "Account maintenance fees: None for active accounts",
        ],
      },
    ],
  },
  {
    id: "prohibited",
    title: "Prohibited Activities",
    icon: <AlertTriangle className="w-6 h-6" />,
    content: ["The following activities are strictly prohibited on our platform:"],
    subsections: [
      {
        title: "Prohibited Uses",
        content: [
          "Money laundering or financing of illegal activities",
          "Market manipulation or fraudulent trading practices",
          "Attempting to circumvent security measures or access controls",
          "Creating multiple accounts to abuse promotional offers",
          "Using automated systems to exploit platform vulnerabilities",
          "Providing false or misleading information during registration",
        ],
      },
    ],
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    icon: <Shield className="w-6 h-6" />,
    content: [
      "Our liability is limited to the maximum extent permitted by applicable law.",
      "We are not liable for losses resulting from market volatility or external factors beyond our control.",
      "Force majeure events may suspend or limit our services without liability.",
    ],
    subsections: [
      {
        title: "Exclusions",
        content: [
          "We exclude liability for indirect, consequential, or punitive damages",
          "Maximum liability is limited to the amount of funds held in your account",
          "We are not responsible for losses due to user error or negligence",
          "Third-party service failures are excluded from our liability",
        ],
      },
    ],
  },
  {
    id: "termination",
    title: "Account Termination",
    icon: <FileText className="w-6 h-6" />,
    content: [
      "Either party may terminate the agreement with appropriate notice.",
      "We reserve the right to suspend or terminate accounts for violations of these terms.",
      "Upon termination, you remain liable for any outstanding obligations.",
    ],
    subsections: [
      {
        title: "Termination Procedures",
        content: [
          "Account closure requests must be submitted through official channels",
          "Outstanding positions will be closed at prevailing market rates",
          "Remaining funds will be returned to verified withdrawal addresses",
          "Account data may be retained as required by applicable regulations",
        ],
      },
    ],
  },
  {
    id: "governing",
    title: "Governing Law and Dispute Resolution",
    icon: <Scale className="w-6 h-6" />,
    content: [
      "These terms are governed by the laws of England and Wales.",
      "Any disputes will be subject to the exclusive jurisdiction of English courts.",
      "We encourage resolution of disputes through direct communication before legal proceedings.",
    ],
    subsections: [
      {
        title: "Dispute Resolution Process",
        content: [
          "Initial disputes should be reported through our customer support channels",
          "We aim to resolve complaints within 15 business days",
          "Unresolved disputes may be escalated to relevant regulatory bodies",
          "Legal proceedings must be initiated within one year of the dispute arising",
        ],
      },
    ],
  },
]

export default function TermsPage() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["acceptance"]))

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId)
    } else {
      newExpanded.add(sectionId)
    }
    setExpandedSections(newExpanded)
  }

  const expandAll = () => {
    setExpandedSections(new Set(termsData.map((section) => section.id)))
  }

  const collapseAll = () => {
    setExpandedSections(new Set())
  }

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <Image src="/icons/file-pdf.svg" alt="Terms" width={48} height={48} className="mr-4" />
            <h1 className="text-4xl lg:text-5xl font-bold">Terms & Conditions</h1>
          </div>
          <div className="w-20 h-1 bg-green-400 mx-auto mb-6"></div>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Please read these terms and conditions carefully before using our services. By accessing our platform, you
            agree to be bound by these terms.
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm">
            <Badge className="bg-green-600 text-white">Last Updated: January 15, 2025</Badge>
            <Badge className="bg-blue-600 text-white">Version 3.2</Badge>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Quick Actions:</span>
                <Button onClick={expandAll} variant="outline" size="sm">
                  Expand All
                </Button>
                <Button onClick={collapseAll} variant="outline" size="sm">
                  Collapse All
                </Button>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" size="sm">
                  Print Version
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Table of Contents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {termsData.map((section, index) => (
                <Card
                  key={section.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => {
                    document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 text-blue-600">{section.icon}</div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {index + 1}. {section.title}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {termsData.map((section, index) => (
                <Card key={section.id} id={section.id} className="overflow-hidden">
                  <div
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleSection(section.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0 text-blue-600">{section.icon}</div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">
                              {index + 1}. {section.title}
                            </h3>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          {expandedSections.has(section.id) ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </div>

                  {expandedSections.has(section.id) && (
                    <div className="border-t border-gray-200">
                      <CardContent className="p-6 pt-6">
                        <div className="space-y-4">
                          {section.content.map((paragraph, pIndex) => (
                            <p key={pIndex} className="text-gray-700 leading-relaxed">
                              {paragraph}
                            </p>
                          ))}

                          {section.subsections && (
                            <div className="mt-6 space-y-6">
                              {section.subsections.map((subsection, subIndex) => (
                                <div key={subIndex} className="border-l-4 border-blue-200 pl-6">
                                  <h4 className="text-lg font-semibold text-gray-900 mb-3">{subsection.title}</h4>
                                  <div className="space-y-2">
                                    {subsection.content.map((item, itemIndex) => (
                                      <p key={itemIndex} className="text-gray-700 leading-relaxed">
                                        {item}
                                      </p>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-16 bg-yellow-50 border-t border-yellow-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-yellow-300 bg-yellow-50">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <AlertTriangle className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-yellow-900 mb-4">Important Legal Notice</h3>
                    <div className="space-y-3 text-yellow-800">
                      <p>
                        <strong>High Risk Investment Warning:</strong> Trading in cryptocurrencies and digital assets
                        carries a high level of risk and may not be suitable for all investors. The high degree of
                        leverage can work against you as well as for you.
                      </p>
                      <p>
                        <strong>Regulatory Status:</strong> Emax Protocol Limited is authorized and regulated by the
                        Financial Conduct Authority (FCA) under reference number FRN 123456789.
                      </p>
                      <p>
                        <strong>Professional Advice:</strong> Before deciding to trade, you should carefully consider
                        your investment objectives, level of experience, and risk appetite. You should seek independent
                        financial advice if you have any doubts.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Questions About These Terms?</h2>
            <p className="text-gray-600 mb-8">
              If you have any questions about these Terms and Conditions, please don't hesitate to contact our legal
              team.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <FileText className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Legal Department</h3>
                  <p className="text-sm text-gray-600">legal@emaxprotocol.com</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Shield className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Compliance Team</h3>
                  <p className="text-sm text-gray-600">compliance@emaxprotocol.com</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Image src="/icons/conversation.svg" alt="Support" width={32} height={32} className="mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Customer Support</h3>
                  <p className="text-sm text-gray-600">support@emaxprotocol.com</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
