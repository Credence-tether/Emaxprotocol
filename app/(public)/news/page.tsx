import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const newsArticles = [
  {
    id: 1,
    title: "Emax Protocol Announces Major Platform Upgrade for 2025",
    excerpt:
      "Enhanced security features, improved user interface, and advanced trading algorithms now available to all users.",
    date: "2025-01-15",
    author: "Emax Protocol Team",
    category: "Platform Updates",
    featured: true,
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 2,
    title: "New Partnership with Leading Blockchain Security Firm",
    excerpt: "Strategic alliance strengthens platform security and expands our cryptocurrency trading capabilities.",
    date: "2025-01-10",
    author: "Business Development",
    category: "Partnerships",
    featured: false,
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 3,
    title: "Q4 2024 Trading Performance Report Released",
    excerpt: "Exceptional returns achieved across all investment plans with 98.5% customer satisfaction rate.",
    date: "2025-01-05",
    author: "Analytics Team",
    category: "Reports",
    featured: false,
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 4,
    title: "Enhanced Mobile Trading Experience Now Live",
    excerpt:
      "New mobile interface provides seamless trading experience with real-time notifications and advanced charting.",
    date: "2024-12-28",
    author: "Product Team",
    category: "Product Updates",
    featured: false,
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 5,
    title: "Regulatory Compliance Update: Full FCA Authorization",
    excerpt:
      "Emax Protocol receives full authorization from Financial Conduct Authority, reinforcing our commitment to regulatory excellence.",
    date: "2024-12-20",
    author: "Legal & Compliance",
    category: "Regulatory",
    featured: false,
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 6,
    title: "Year-End Trading Statistics: Record-Breaking Performance",
    excerpt:
      "2024 concludes with unprecedented trading volumes and consistent daily returns for our investor community.",
    date: "2024-12-15",
    author: "Research Team",
    category: "Market Analysis",
    featured: false,
    image: "/placeholder.svg?height=300&width=500",
  },
]

const pressReleases = [
  {
    title: "Emax Protocol Expands Operations to European Markets",
    date: "2025-01-12",
    type: "Press Release",
    downloadUrl: "#",
  },
  {
    title: "Q4 2024 Financial Results and Market Outlook",
    date: "2025-01-08",
    type: "Financial Report",
    downloadUrl: "#",
  },
  {
    title: "New Cryptocurrency Trading Algorithms Patent Filed",
    date: "2024-12-30",
    type: "Innovation Update",
    downloadUrl: "#",
  },
]

export default function NewsPage() {
  const featuredArticle = newsArticles.find((article) => article.featured)
  const regularArticles = newsArticles.filter((article) => !article.featured)

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Latest News & Updates</h1>
          <div className="w-20 h-1 bg-green-400 mx-auto mb-6"></div>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Stay informed with the latest developments, platform updates, and market insights from Emax Protocol.
          </p>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <Badge className="bg-blue-600 text-white mb-4">Featured Story</Badge>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Latest Headlines</h2>
              </div>

              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-64 lg:h-auto">
                    <Image
                      src={featuredArticle.image || "/placeholder.svg"}
                      alt={featuredArticle.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-green-600 text-white">{featuredArticle.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-8 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{featuredArticle.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{featuredArticle.excerpt}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-6">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="mr-4">{new Date(featuredArticle.date).toLocaleDateString()}</span>
                      <User className="w-4 h-4 mr-2" />
                      <span>{featuredArticle.author}</span>
                    </div>
                    <Button className="self-start">
                      Read Full Article <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* News Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Recent News</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-blue-600 text-white">{article.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">{article.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm line-clamp-3">{article.excerpt}</p>
                    <div className="flex items-center text-xs text-gray-500 mb-4">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span className="mr-3">{new Date(article.date).toLocaleDateString()}</span>
                      <User className="w-3 h-3 mr-1" />
                      <span>{article.author}</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Read More <ArrowRight className="w-3 h-3 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Press Releases & Documents */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Press Releases */}
              <div>
                <div className="flex items-center mb-8">
                  <Image src="/icons/file-pdf.svg" alt="Documents" width={32} height={32} className="mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">Press Releases</h2>
                </div>

                <div className="space-y-4">
                  {pressReleases.map((release, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2">{release.title}</h3>
                            <div className="flex items-center text-sm text-gray-500 mb-3">
                              <Calendar className="w-4 h-4 mr-2" />
                              <span className="mr-4">{new Date(release.date).toLocaleDateString()}</span>
                              <Badge variant="outline">{release.type}</Badge>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <a href={release.downloadUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Company Resources */}
              <div>
                <div className="flex items-center mb-8">
                  <Image
                    src="/icons/diploma-certificate.svg"
                    alt="Certificates"
                    width={32}
                    height={32}
                    className="mr-3"
                  />
                  <h2 className="text-2xl font-bold text-gray-900">Company Resources</h2>
                </div>

                <div className="space-y-6">
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Image
                          src="/icons/trend-up.svg"
                          alt="Performance"
                          width={40}
                          height={40}
                          className="flex-shrink-0"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">Trading Performance Reports</h3>
                          <p className="text-sm text-gray-600 mb-3">
                            Monthly and quarterly performance analytics with detailed market insights.
                          </p>
                          <Button variant="outline" size="sm">
                            View Reports <ArrowRight className="w-3 h-3 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Image
                          src="/icons/job-security.svg"
                          alt="Security"
                          width={40}
                          height={40}
                          className="flex-shrink-0"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">Security & Compliance</h3>
                          <p className="text-sm text-gray-600 mb-3">
                            Regulatory compliance documents and security audit reports.
                          </p>
                          <Button variant="outline" size="sm">
                            Learn More <ArrowRight className="w-3 h-3 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Image
                          src="/icons/conversation.svg"
                          alt="Support"
                          width={40}
                          height={40}
                          className="flex-shrink-0"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">Investor Relations</h3>
                          <p className="text-sm text-gray-600 mb-3">
                            Connect with our investor relations team for detailed information.
                          </p>
                          <Button variant="outline" size="sm" asChild>
                            <Link href="/contact">
                              Contact Us <ArrowRight className="w-3 h-3 ml-2" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and never miss important updates about platform developments and market
            insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button variant="secondary" className="px-8">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
