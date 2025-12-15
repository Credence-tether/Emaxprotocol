"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

interface FAQCategory {
  id: string
  title: string
  items: FAQItem[]
}

const faqData: FAQCategory[] = [
  {
    id: "general",
    title: "General",
    items: [
      {
        question:
          "What is the main idea behind the establishment of Emax Protocol? Is the company for 'real'? And is there anything that really proves this?",
        answer: `Emax Protocol is a cryptocurrency trading company established in 2017. The wide array of services we offer were specifically designed to assist Bitcoin holders in making good trading decisions. We are a London-based company that possesses a group of trading professionals covering many industries, ranging from engineering to advanced computer technology. Our group of professionals are widely versed in cryptocurrency techniques as well and can expertly answer any question you might have concerning cryptocurrency trading.

We have one main goal: to provide our customers with a unique platform for their cryptocurrency trading. This is why we have employed the use of a cutting-edge platform with extensive infrastructure. Our Bitcoin trading services is quite affordable and any of our clients can start trading as soon as they are ready. We are able to make this possible through the use of diversified trading options. This way, your risk is practically reduced, making your trading safer.

Verify our status: https://beta.companieshouse.gov.uk`,
      },
      {
        question:
          "You seem to provide a quite lucrative interest rate for a limited period of time. Where is the funds coming from?",
        answer:
          "As a result of the volume of cryptocurrency trading and our cutting-edge trading technology, we have the ability to provide an interest rate that's higher than what's usually obtainable in the average market. Moreover, the fact that we are always spreading our reach as far as we can globally helps us in reaching new heights. Plus, we have to stick only to concepts that have to do with modern-day infrastructure if we want to maintain our status as one of the best cryptocurrency trading platforms.",
      },
      {
        question: "Are there risks involved?",
        answer:
          "You already made a good decision by deciding to join our community. Emax Protocol is a completely risk-free trading company, all thanks to our overall ideology and company concept. In addition, our company is made up of certified professionals in various fields such as cryptocurrency trading, blockchain technology, cryptocurrency finance and security. Our goal is to provide a seamless trading experience based on expert project management. We aim to make cryptocurrency trading available to anybody that has no experience within the field.",
      },
    ],
  },
  {
    id: "account",
    title: "Account & Transactions",
    items: [
      {
        question: "What will be my interest return?",
        answer: "Your total return will be 150%, that's 50% net profit.",
      },
      {
        question: "Can I withdraw my initial deposit? Will it be returned after 15 days?",
        answer: "No, your initial deposit is included into your daily interest.",
      },
      {
        question: "My deposit was not added. What should I do?",
        answer:
          "If your deposit failed, and was not added to the system after 3 blockchain confirmations, contact hey@templaterex.com with your transaction details.",
      },
      {
        question:
          "What condition is required before one can become a member of your trading project? And is membership limited to certain countries?",
        answer:
          "You have to be at least 18 years old before you're allowed to become a member. In addition to this, you must agree to our Terms of Service. Anybody from anywhere in the world can join. Even if you live in the desert, as long as you have an internet connection, you're free to join.",
      },
      {
        question: "Can I have more than one account?",
        answer:
          "Unfortunately, members are limited to one account. Attempts to open multiple accounts may result in a ban.",
      },
      {
        question: "What fees are applicable to internal and external transactions, if any?",
        answer: "No fee is applied for any type of transactions.",
      },
      {
        question: "What's the expected return after I fund my account?",
        answer: "You return rate is fixed: 10% daily for 15 days.",
      },
      {
        question: "What's the minimal deposit amount?",
        answer: "You can start with as little as 0.001 BTC.",
      },
      {
        question: "I've added funds to my personal account. When will I receive my first interest payment?",
        answer:
          "After you've transferred funds to your deposit address, those funds will be added to your account after it receives 3 confirmations on our blockchain network. First interest will be added after 24h.",
      },
      {
        question: "How can I withdraw my interest?",
        answer:
          "You can withdraw your funds by logging into your account and visiting the withdrawal page. There, you can request an instant withdrawal.",
      },
      {
        question: "How long does it take for a withdrawal to be processed?",
        answer: "All withdrawals are processed instantly, however some cases may take up to 24 hours.",
      },
      {
        question: "Can I add funds to an existing deposit?",
        answer: "You can't add funds to an existing deposit, but you can make as many deposits as you wish.",
      },
      {
        question: "Is there a limit for how long I'll receive interest?",
        answer: "You'll continue to earn interest (10%) for 15 consecutive days.",
      },
      {
        question: "What's the minimum withdrawal amount?",
        answer: "The minimum withdrawal amount is as little as 0.0005 BTC.",
      },
    ],
  },
  {
    id: "affiliate",
    title: "Affiliate",
    items: [
      {
        question: "Do I need an active deposit to earn affiliate commission?",
        answer: "No, active deposit is not needed.",
      },
      {
        question: "How can I earn affiliate commission?",
        answer:
          "Share your referral link, which is made available in your account, with friends, and you'll earn 4% from their active deposit. You can even earn 8% when you apply for a Representative status with our company.",
      },
      {
        question: "How can I join Representatives?",
        answer:
          "For you to become a representative of Emax Protocol, you need to have the ability to promote and support our cryptocurrency trading project in your region through various means, like online/offline presentations, meetings with clients, a personal blog, etc. However, notes that we never support SPAM nor any form of illegal promotion of our project. If you think this is 'right up your alley', then send your personal details; full name, phone number, username, country, city, email and messenger ID to hey@templaterex.com, and we will respond within 24 business hours. You don't need to have an active deposit to be a Regional Representative.",
      },
    ],
  },
]

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("general")
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const toggleItem = (categoryId: string, itemIndex: number) => {
    const itemKey = `${categoryId}-${itemIndex}`
    const newExpanded = new Set(expandedItems)

    if (newExpanded.has(itemKey)) {
      newExpanded.delete(itemKey)
    } else {
      newExpanded.add(itemKey)
    }

    setExpandedItems(newExpanded)
  }

  const isItemExpanded = (categoryId: string, itemIndex: number) => {
    return expandedItems.has(`${categoryId}-${itemIndex}`)
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <div className="w-20 h-1 bg-green-400 mx-auto mb-6"></div>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            You ask, we answer. 99% of most commonly asked questions are listed here.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Category Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {faqData.map((category, index) => (
              <div key={category.id} className="flex items-center">
                <Button
                  variant={activeCategory === category.id ? "default" : "outline"}
                  onClick={() => setActiveCategory(category.id)}
                  className={`${
                    activeCategory === category.id
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {category.title}
                </Button>
                {index < faqData.length - 1 && <span className="mx-2 text-gray-400">/</span>}
              </div>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="max-w-4xl mx-auto">
            {faqData.map((category) => (
              <div key={category.id} className={`space-y-4 ${activeCategory === category.id ? "block" : "hidden"}`}>
                {category.items.map((item, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-0">
                      <button
                        onClick={() => toggleItem(category.id, index)}
                        className="w-full p-6 text-left hover:bg-gray-50 transition-colors flex items-center justify-between group"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 pr-4 group-hover:text-blue-600 transition-colors">
                          Q: {item.question}
                        </h3>
                        <div className="flex-shrink-0">
                          {isItemExpanded(category.id, index) ? (
                            <ChevronUp className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
                          )}
                        </div>
                      </button>

                      {isItemExpanded(category.id, index) && (
                        <div className="px-6 pb-6 border-t border-gray-100">
                          <div className="pt-4">
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                              <span className="font-semibold text-blue-600">A:</span> {item.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-16 text-center">
            <Card className="max-w-2xl mx-auto bg-blue-50 border-blue-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h3>
                <p className="text-gray-600 mb-6">
                  Can't find the answer you're looking for? Our support team is here to help you 24/7.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild className="bg-blue-600 hover:bg-blue-700">
                    <a href="/contact">Contact Support</a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="mailto:hey@templaterex.com">Send Email</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
