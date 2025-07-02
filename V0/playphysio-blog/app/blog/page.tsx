import Link from "next/link"
import { Calendar, Clock, User, ArrowRight, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import Footer from "@/components/footer"

const blogPosts = [
  {
    id: 1,
    title: "The Science Behind Gamified Respiratory Therapy",
    excerpt:
      "Discover how Playphysio's innovative approach combines proven respiratory therapy techniques with engaging game mechanics to improve patient outcomes.",
    author: "Dr. Sarah Chen",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Research",
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
  },
  {
    id: 2,
    title: "94% Therapy Adherence: Real Results from Real Families",
    excerpt:
      "Learn how families across the country are transforming their respiratory therapy routines with Playphysio's engaging platform.",
    author: "Maria Rodriguez",
    date: "2024-01-10",
    readTime: "3 min read",
    category: "Success Stories",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    title: "Setting Up Your First Playphysio Session",
    excerpt:
      "A step-by-step guide to getting started with Playphysio, from device connection to your first breathing exercise game.",
    author: "Tech Team",
    date: "2024-01-08",
    readTime: "4 min read",
    category: "How-To",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 4,
    title: "The Psychology of Making Therapy Fun",
    excerpt:
      "Understanding how gamification principles can transform challenging medical routines into enjoyable experiences for children.",
    author: "Dr. Michael Thompson",
    date: "2024-01-05",
    readTime: "6 min read",
    category: "Psychology",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 5,
    title: "Clinical Validation: Our Research Journey",
    excerpt:
      "An inside look at the rigorous testing and validation process that ensures PlayPhysio meets the highest medical standards.",
    author: "Research Team",
    date: "2024-01-03",
    readTime: "7 min read",
    category: "Research",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 6,
    title: "Parent's Guide: Supporting Your Child's Therapy Journey",
    excerpt:
      "Tips and strategies for parents to create a supportive environment that encourages consistent therapy participation.",
    author: "Jennifer Walsh",
    date: "2024-01-01",
    readTime: "5 min read",
    category: "Parenting",
    image: "/placeholder.svg?height=200&width=400",
  },
]

const categories = ["All", "Research", "Success Stories", "How-To", "Psychology", "Parenting"]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cyan-50 to-purple-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                PlayPhysio
              </span>{" "}
              <span className="text-gray-800">Blog</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Insights, research, and stories about transforming respiratory therapy through innovative gamification and
              thoughtful design.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                className={
                  category === "All"
                    ? "bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-500 hover:to-emerald-500 text-white rounded-full"
                    : "rounded-full hover:bg-cyan-50 hover:text-cyan-600 hover:border-cyan-300"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-cyan-50 to-purple-50 rounded-2xl overflow-hidden shadow-lg">
              <div className="grid md:grid-cols-2 gap-8 p-8">
                <div className="space-y-4">
                  <Badge className="bg-gradient-to-r from-cyan-400 to-emerald-400 text-white">Featured</Badge>
                  <h2 className="text-3xl font-bold text-gray-800">{blogPosts[0].title}</h2>
                  <p className="text-gray-600 leading-relaxed">{blogPosts[0].excerpt}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{blogPosts[0].author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(blogPosts[0].date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{blogPosts[0].readTime}</span>
                    </div>
                  </div>
                  <Button className="bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-500 hover:to-emerald-500 text-white rounded-full">
                    Read Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                <div className="relative">
                  <img
                    src={blogPosts[0].image || "/placeholder.svg"}
                    alt={blogPosts[0].title}
                    className="w-full h-64 object-cover rounded-xl"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white/90 text-gray-700">
                      <Tag className="w-3 h-3 mr-1" />
                      {blogPosts[0].category}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-200"
              >
                <div className="relative">
                  <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white/90 text-gray-700">
                      <Tag className="w-3 h-3 mr-1" />
                      {post.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                  <Link href={`/blog/${post.id}`}>
                    <Button
                      variant="outline"
                      className="w-full rounded-full hover:bg-cyan-50 hover:text-cyan-600 hover:border-cyan-300"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-br from-cyan-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Stay Updated with PlayPhysio</h2>
            <p className="text-gray-600 leading-relaxed">
              Get the latest insights, research updates, and success stories delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
              />
              <Button className="bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-500 hover:to-emerald-500 text-white px-8 py-3 rounded-full">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-gray-500">We respect your privacy and will never share your information.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
