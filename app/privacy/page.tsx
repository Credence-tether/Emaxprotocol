"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ChevronDown,
  ChevronUp,
  Shield,
  Eye,
  Lock,
  Database,
  Users,
  Globe,
  FileText,
  AlertTriangle,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface PrivacySection {
  id: string
  title: string
  icon: React.ReactNode
  content: string[]
  subsections?: {
    title: string
    content: string[]
    table?: {
      headers: string[]
      rows: string[][]
    }
  }[]
}

const privacyData: PrivacySection[] = [
  {
    id: "introduction",
    title: "Introduction and Data Controller",
    icon: <Shield className="w-6 h-6" />,
    content: [
      "Emax Protocol Limited ('we', 'us', or 'our') is committed to protecting your privacy and personal data. This Privacy Policy explains how we collect, use, process, and protect your information when you use our cryptocurrency trading platform.",
      "We are the data controller for the personal information we collect about you. Our registered office is located at 1735 Bingamon Branch Road, New York, United States.",
      "This policy complies with the UK General Data Protection Regulation (UK GDPR), the Data Protection Act 2018, and other applicable data protection laws.",
      "By using our services, you consent to the collection and use of your information as described in this policy.",
    ],
    subsections: [
      {
        title: "Contact Information",
        content: [
          "Data Protection Officer: privacy@emaxprotocol.com",
          "Registered Address: 1735 Bingamon Branch Road, New York, United States",
          "Company Registration: England and Wales, Company Number: 12345678",
          "FCA Registration: FRN 123456789",
        ],
      },
    ],
  },
  {
    id: "information-collected",
    title: "Information We Collect",
    icon: <Database className="w-6 h-6" />,
    content: [
      "We collect various types of information to provide and improve our services, comply with legal obligations, and ensure platform security.",
      "The information we collect falls into several categories, each serving specific purposes for our operations.",
    ],
    subsections: [
      {
        title: "Personal Identification Information",
        content: [
          "Full name and date of birth",
          "Email address and phone number",
          "Residential address and nationality",
          "Government-issued identification documents",
          "Photographs for identity verification",
          "Employment and income information",
        ],
      },
      {
        title: "Financial Information",
        content: [
          "Cryptocurrency wallet addresses",
          "Transaction history and trading patterns",
          "Deposit and withdrawal records",
          "Investment preferences and risk tolerance",
          "Source of funds documentation",
          "Tax identification numbers where required",
        ],
      },
      {
        title: "Technical Information",
        content: [
          "IP addresses and device identifiers",
          "Browser type and operating system",
          "Login timestamps and session data",
          "Platform usage analytics",
          "Security logs and access records",
          "Cookies and tracking technologies",
        ],
      },
      {
        title: "Communication Records",
        content: [
          "Customer support conversations",
          "Email correspondence",
          "Chat logs and support tickets",
          "Phone call recordings (where permitted)",
          "Feedback and survey responses",
        ],
      },
    ],
  },
  {
    id: "legal-basis",
    title: "Legal Basis for Processing",
    icon: <FileText className="w-6 h-6" />,
    content: [
      "We process your personal data based on several legal grounds under data protection law.",
      "The specific legal basis depends on the type of data and the purpose for which we process it.",
    ],
    subsections: [
      {
        title: "Legal Bases",
        content: [],
        table: {
          headers: ["Purpose", "Legal Basis", "Data Types"],
          rows: [
            ["Account Registration", "Contract Performance", "Identity, Contact Information"],
            ["KYC/AML Compliance", "Legal Obligation", "Identity Documents, Financial Records"],
            ["Trading Services", "Contract Performance", "Financial Data, Transaction History"],
            ["Platform Security", "Legitimate Interest", "Technical Data, Security Logs"],
            ["Marketing Communications", "Consent", "Contact Information, Preferences"],
            ["Customer Support", "Contract Performance", "Communication Records"],
            ["Regulatory Reporting", "Legal Obligation", "Transaction Data, Identity Information"],
          ],
        },
      },
    ],
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    icon: <Eye className="w-6 h-6" />,
    content: [
      "We use your personal information for various purposes related to providing our services and meeting our legal obligations.",
      "All processing activities are conducted in accordance with applicable data protection laws and our legitimate business interests.",
    ],
    subsections: [
      {
        title: "Service Provision",
        content: [
          "Creating and managing your trading account",
          "Processing deposits, withdrawals, and trades",
          "Providing customer support and assistance",
          "Calculating and distributing investment returns",
          "Maintaining platform security and integrity",
          "Personalizing your user experience",
        ],
      },
      {
        title: "Legal and Regulatory Compliance",
        content: [
          "Verifying your identity (Know Your Customer - KYC)",
          "Monitoring for money laundering (Anti-Money Laundering - AML)",
          "Reporting suspicious activities to authorities",
          "Maintaining records as required by financial regulations",
          "Responding to legal requests and court orders",
          "Conducting risk assessments and due diligence",
        ],
      },
      {
        title: "Business Operations",
        content: [
          "Analyzing platform usage and performance",
          "Improving our services and developing new features",
          "Conducting market research and analysis",
          "Managing business relationships and partnerships",
          "Protecting against fraud and security threats",
          "Maintaining business records and archives",
        ],
      },
      {
        title: "Communications",
        content: [
          "Sending service-related notifications",
          "Providing account updates and statements",
          "Delivering marketing communications (with consent)",
          "Responding to inquiries and support requests",
          "Sending regulatory and compliance notices",
        ],
      },
    ],
  },
  {
    id: "data-sharing",
    title: "Data Sharing and Disclosure",
    icon: <Users className="w-6 h-6" />,
    content: [
      "We may share your personal information with third parties in specific circumstances and always in accordance with applicable data protection laws.",
      "We do not sell your personal data to third parties for marketing purposes.",
    ],
    subsections: [
      {
        title: "Service Providers",
        content: [
          "Cloud hosting and infrastructure providers",
          "Payment processors and financial institutions",
          "Identity verification and KYC service providers",
          "Customer support and communication platforms",
          "Analytics and monitoring services",
          "Legal and professional advisors",
        ],
      },
      {
        title: "Regulatory and Legal Disclosures",
        content: [
          "Financial Conduct Authority (FCA) and other regulators",
          "Law enforcement agencies when legally required",
          "Courts and legal proceedings",
          "Tax authorities and revenue services",
          "Anti-money laundering reporting entities",
          "Fraud prevention agencies",
        ],
      },
      {
        title: "Business Transfers",
        content: [
          "In case of merger, acquisition, or sale of assets",
          "During corporate restructuring or reorganization",
          "To potential buyers during due diligence processes",
          "Subject to confidentiality agreements and data protection requirements",
        ],
      },
      {
        title: "Data Processing Agreements",
        content: [
          "All third-party processors are bound by data processing agreements",
          "We ensure adequate data protection measures are in place",
          "Regular audits and compliance checks are conducted",
          "Data transfers are protected by appropriate safeguards",
        ],
      },
    ],
  },
  {
    id: "international-transfers",
    title: "International Data Transfers",
    icon: <Globe className="w-6 h-6" />,
    content: [
      "Some of our service providers and business partners are located outside the UK and European Economic Area (EEA).",
      "We ensure that all international transfers of personal data are protected by appropriate safeguards.",
    ],
    subsections: [
      {
        title: "Transfer Safeguards",
        content: [
          "Standard Contractual Clauses approved by the European Commission",
          "Adequacy decisions for countries with equivalent data protection",
          "Binding Corporate Rules for multinational organizations",
          "Certification schemes and codes of conduct",
          "Specific derogations for particular situations",
        ],
      },
      {
        title: "Countries We Transfer Data To",
        content: [
          "United States (cloud infrastructure and analytics)",
          "Singapore (regional data processing)",
          "Canada (customer support services)",
          "Australia (compliance and regulatory services)",
          "All transfers are subject to appropriate safeguards",
        ],
      },
    ],
  },
  {
    id: "data-security",
    title: "Data Security and Protection",
    icon: <Lock className="w-6 h-6" />,
    content: [
      "We implement comprehensive security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.",
      "Our security framework follows industry best practices and regulatory requirements.",
    ],
    subsections: [
      {
        title: "Technical Safeguards",
        content: [
          "End-to-end encryption for data transmission",
          "AES-256 encryption for data at rest",
          "Multi-factor authentication for account access",
          "Regular security audits and penetration testing",
          "Secure cloud infrastructure with redundancy",
          "Real-time monitoring and threat detection",
        ],
      },
      {
        title: "Organizational Measures",
        content: [
          "Staff training on data protection and security",
          "Access controls and need-to-know principles",
          "Regular security awareness programs",
          "Incident response and breach notification procedures",
          "Data retention and disposal policies",
          "Vendor security assessments and monitoring",
        ],
      },
      {
        title: "Compliance Certifications",
        content: [
          "ISO 27001 Information Security Management",
          "SOC 2 Type II compliance",
          "PCI DSS for payment card data",
          "Regular third-party security assessments",
          "Continuous monitoring and improvement",
        ],
      },
    ],
  },
  {
    id: "retention",
    title: "Data Retention",
    icon: <Database className="w-6 h-6" />,
    content: [
      "We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected and to comply with legal obligations.",
      "Different types of data have different retention periods based on legal requirements and business needs.",
    ],
    subsections: [
      {
        title: "Retention Periods",
        content: [],
        table: {
          headers: ["Data Type", "Retention Period", "Legal Basis"],
          rows: [
            ["Identity Documents", "7 years after account closure", "AML Regulations"],
            ["Transaction Records", "7 years after transaction", "Financial Services Regulations"],
            ["Communication Records", "3 years after last contact", "Business Records"],
            ["Marketing Data", "Until consent withdrawn", "GDPR Consent"],
            ["Security Logs", "2 years from creation", "Security Requirements"],
            ["Account Information", "7 years after closure", "Regulatory Requirements"],
          ],
        },
      },
      {
        title: "Data Disposal",
        content: [
          "Secure deletion of electronic data using industry standards",
          "Physical destruction of paper documents",
          "Certificate of destruction for sensitive materials",
          "Regular audits of data disposal processes",
          "Verification of third-party disposal services",
        ],
      },
    ],
  },
  {
    id: "your-rights",
    title: "Your Data Protection Rights",
    icon: <Shield className="w-6 h-6" />,
    content: [
      "Under data protection law, you have several rights regarding your personal data.",
      "You can exercise these rights by contacting our Data Protection Officer.",
    ],
    subsections: [
      {
        title: "Your Rights Include",
        content: [
          "Right of Access: Request copies of your personal data",
          "Right to Rectification: Correct inaccurate or incomplete data",
          "Right to Erasure: Request deletion of your personal data",
          "Right to Restrict Processing: Limit how we use your data",
          "Right to Data Portability: Receive your data in a structured format",
          "Right to Object: Object to processing based on legitimate interests",
          "Rights related to Automated Decision Making: Human review of automated decisions",
        ],
      },
      {
        title: "How to Exercise Your Rights",
        content: [
          "Submit requests through our secure customer portal",
          "Email our Data Protection Officer at privacy@emaxprotocol.com",
          "Send written requests to our registered address",
          "We will respond within one month of receiving your request",
          "Identity verification may be required for security purposes",
          "Some rights may be limited by legal or regulatory requirements",
        ],
      },
      {
        title: "Right to Complain",
        content: [
          "You have the right to lodge a complaint with the Information Commissioner's Office (ICO)",
          "ICO Contact: casework@ico.org.uk or 0303 123 1113",
          "You can also complain to the supervisory authority in your country",
          "We encourage you to contact us first to resolve any concerns",
        ],
      },
    ],
  },
  {
    id: "cookies",
    title: "Cookies and Tracking Technologies",
    icon: <Eye className="w-6 h-6" />,
    content: [
      "We use cookies and similar tracking technologies to enhance your experience on our platform.",
      "You can control cookie settings through your browser preferences.",
    ],
    subsections: [
      {
        title: "Types of Cookies We Use",
        content: [],
        table: {
          headers: ["Cookie Type", "Purpose", "Duration"],
          rows: [
            ["Essential Cookies", "Platform functionality and security", "Session/Persistent"],
            ["Performance Cookies", "Analytics and platform optimization", "Up to 2 years"],
            ["Functional Cookies", "User preferences and settings", "Up to 1 year"],
            ["Marketing Cookies", "Targeted advertising (with consent)", "Up to 1 year"],
          ],
        },
      },
      {
        title: "Managing Cookies",
        content: [
          "Browser settings allow you to block or delete cookies",
          "Our cookie consent banner provides granular controls",
          "Essential cookies cannot be disabled for platform functionality",
          "Disabling cookies may affect platform performance",
          "You can withdraw consent at any time through your account settings",
        ],
      },
    ],
  },
  {
    id: "children",
    title: "Children's Privacy",
    icon: <Users className="w-6 h-6" />,
    content: [
      "Our services are not intended for individuals under the age of 18.",
      "We do not knowingly collect personal information from children under 18.",
      "If we become aware that we have collected data from a child, we will delete it promptly.",
      "Parents or guardians who believe their child has provided us with personal information should contact us immediately.",
    ],
  },
  {
    id: "changes",
    title: "Changes to This Privacy Policy",
    icon: <FileText className="w-6 h-6" />,
    content: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.",
      "We will notify you of any material changes through email or platform notifications.",
      "The updated policy will be posted on our website with the effective date.",
      "Continued use of our services after changes constitutes acceptance of the updated policy.",
    ],
    subsections: [
      {
        title: "Notification Methods",
        content: [
          "Email notifications to registered users",
          "In-platform notifications and banners",
          "Updates posted on our website",
          "Social media announcements for major changes",
        ],
      },
    ],
  },
]

export default function PrivacyPage() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["introduction"]))

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
    setExpandedSections(new Set(privacyData.map((section) => section.id)))
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
            <Shield className="w-12 h-12 mr-4" />
            <h1 className="text-4xl lg:text-5xl font-bold">Privacy Policy</h1>
          </div>
          <div className="w-20 h-1 bg-green-400 mx-auto mb-6"></div>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal
            information in compliance with UK GDPR and data protection laws.
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm">
            <Badge className="bg-green-600 text-white">Last Updated: January 15, 2025</Badge>
            <Badge className="bg-blue-600 text-white">GDPR Compliant</Badge>
            <Badge className="bg-purple-600 text-white">Version 2.1</Badge>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
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
                <Button variant="outline" size="sm" asChild>
                  <Link href="/contact">
                    <Shield className="w-4 h-4 mr-2" />
                    Contact DPO
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Protection Summary */}
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Your Data Protection at a Glance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <Lock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Secure Encryption</h3>
                  <p className="text-sm text-gray-600">AES-256 encryption for all data at rest and in transit</p>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">GDPR Compliant</h3>
                  <p className="text-sm text-gray-600">Full compliance with UK GDPR and data protection laws</p>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <Eye className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Transparent Processing</h3>
                  <p className="text-sm text-gray-600">Clear information about how we use your data</p>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <Users className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Your Rights</h3>
                  <p className="text-sm text-gray-600">Full control over your personal data and privacy</p>
                </CardContent>
              </Card>
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
              {privacyData.map((section, index) => (
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

      {/* Privacy Policy Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {privacyData.map((section, index) => (
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

                                  {subsection.table ? (
                                    <div className="overflow-x-auto">
                                      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                                        <thead className="bg-gray-50">
                                          <tr>
                                            {subsection.table.headers.map((header, headerIndex) => (
                                              <th
                                                key={headerIndex}
                                                className="px-4 py-3 text-left text-sm font-medium text-gray-900 border-b"
                                              >
                                                {header}
                                              </th>
                                            ))}
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {subsection.table.rows.map((row, rowIndex) => (
                                            <tr key={rowIndex} className="border-b border-gray-100">
                                              {row.map((cell, cellIndex) => (
                                                <td key={cellIndex} className="px-4 py-3 text-sm text-gray-700">
                                                  {cell}
                                                </td>
                                              ))}
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  ) : (
                                    <div className="space-y-2">
                                      {subsection.content.map((item, itemIndex) => (
                                        <p key={itemIndex} className="text-gray-700 leading-relaxed">
                                          {item}
                                        </p>
                                      ))}
                                    </div>
                                  )}
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

      {/* Data Subject Rights */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Exercise Your Data Rights</h2>
              <p className="text-lg text-gray-600">
                You have full control over your personal data. Contact us to exercise any of these rights.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Eye className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Access Your Data</h3>
                  <p className="text-sm text-gray-600 mb-4">Request a copy of all personal data we hold about you</p>
                  <Button variant="outline" size="sm">
                    Request Access
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <FileText className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Correct Your Data</h3>
                  <p className="text-sm text-gray-600 mb-4">Update or correct any inaccurate information</p>
                  <Button variant="outline" size="sm">
                    Request Correction
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Delete Your Data</h3>
                  <p className="text-sm text-gray-600 mb-4">Request deletion of your personal information</p>
                  <Button variant="outline" size="sm">
                    Request Deletion
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Lock className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Restrict Processing</h3>
                  <p className="text-sm text-gray-600 mb-4">Limit how we process your personal data</p>
                  <Button variant="outline" size="sm">
                    Request Restriction
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Database className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Data Portability</h3>
                  <p className="text-sm text-gray-600 mb-4">Receive your data in a structured format</p>
                  <Button variant="outline" size="sm">
                    Request Export
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Shield className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Object to Processing</h3>
                  <p className="text-sm text-gray-600 mb-4">Object to certain types of data processing</p>
                  <Button variant="outline" size="sm">
                    Submit Objection
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Privacy Questions or Concerns?</h2>
            <p className="text-gray-600 mb-8">
              Our Data Protection Officer is here to help with any privacy-related questions or requests.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Shield className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Data Protection Officer</h3>
                  <p className="text-sm text-gray-600">privacy@emaxprotocol.com</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Image src="/icons/conversation.svg" alt="Support" width={32} height={32} className="mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Customer Support</h3>
                  <p className="text-sm text-gray-600">support@emaxprotocol.com</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <FileText className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">ICO Complaints</h3>
                  <p className="text-sm text-gray-600">casework@ico.org.uk</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
