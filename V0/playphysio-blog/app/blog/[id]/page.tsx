import Link from "next/link"
import { Calendar, Clock, User, ArrowLeft, Share2, Heart, MessageCircle, Tag, BookOpen, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"

// This would typically come from a CMS or database
const blogPost = {
  id: 1,
  title: "The Science Behind Gamified Respiratory Therapy",
  content: `
    <p class="text-lg text-gray-700 leading-relaxed mb-6">Respiratory therapy has long been a challenge for both patients and healthcare providers. Traditional methods, while effective, often struggle with patient adherence and engagement, particularly among pediatric populations. At PlayPhysio, we've revolutionized this approach by combining proven respiratory therapy techniques with engaging game mechanics.</p>

    <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">The Challenge of Traditional Respiratory Therapy</h2>
    <p class="text-gray-700 leading-relaxed mb-6">Studies have shown that adherence to respiratory therapy regimens can be as low as 30-50% in pediatric populations. This poor adherence leads to suboptimal outcomes, increased healthcare costs, and frustration for both patients and families.</p>

    <div class="bg-gradient-to-br from-cyan-50 to-purple-50 rounded-xl p-6 my-8">
      <h3 class="text-lg font-semibold text-gray-800 mb-3">💡 Key Insight</h3>
      <p class="text-gray-700">Traditional respiratory therapy methods achieve only 30-50% adherence rates in children, while PlayPhysio achieves 94% adherence through gamification.</p>
    </div>

    <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">The Power of Gamification</h2>
    <p class="text-gray-700 leading-relaxed mb-4">Gamification leverages the psychological principles that make games engaging and applies them to non-game contexts. Key elements include:</p>
    <ul class="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
      <li><strong>Achievement Systems:</strong> Clear goals and rewards that motivate continued participation</li>
      <li><strong>Progress Tracking:</strong> Visual feedback that shows improvement over time</li>
      <li><strong>Social Elements:</strong> Community features that provide support and healthy competition</li>
      <li><strong>Immediate Feedback:</strong> Real-time responses that keep users engaged</li>
    </ul>

    <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">Clinical Validation</h2>
    <p class="text-gray-700 leading-relaxed mb-4">Our approach isn't just theoretically sound—it's clinically proven. In our latest study involving 200 pediatric patients over 6 months, we observed:</p>
    
    <div class="grid md:grid-cols-3 gap-4 my-8">
      <div class="bg-white border border-gray-200 rounded-xl p-6 text-center">
        <div class="text-3xl font-bold text-cyan-600 mb-2">94%</div>
        <div class="text-sm text-gray-600">Therapy Adherence Rate</div>
      </div>
      <div class="bg-white border border-gray-200 rounded-xl p-6 text-center">
        <div class="text-3xl font-bold text-emerald-600 mb-2">67%</div>
        <div class="text-sm text-gray-600">Improvement in Lung Function</div>
      </div>
      <div class="bg-white border border-gray-200 rounded-xl p-6 text-center">
        <div class="text-3xl font-bold text-purple-600 mb-2">89%</div>
        <div class="text-sm text-gray-600">Families Found Therapy Enjoyable</div>
      </div>
    </div>

    <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">The Technology Behind the Magic</h2>
    <p class="text-gray-700 leading-relaxed mb-4">PlayPhysio's platform combines several cutting-edge technologies:</p>
    <ul class="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
      <li><strong>Smart Sensors:</strong> Precise measurement of breathing patterns and technique</li>
      <li><strong>AI-Powered Adaptation:</strong> Personalized difficulty adjustment based on individual progress</li>
      <li><strong>Cloud Analytics:</strong> Comprehensive data tracking for healthcare providers</li>
      <li><strong>Cross-Platform Compatibility:</strong> Seamless experience across devices</li>
    </ul>

    <blockquote class="border-l-4 border-cyan-400 pl-6 py-4 my-8 bg-gray-50 rounded-r-lg">
      <p class="text-lg text-gray-700 italic">"PlayPhysio has transformed our approach to pediatric respiratory therapy. The engagement levels we see are unprecedented."</p>
      <footer class="text-sm text-gray-600 mt-2">— Dr. Michael Rodriguez, Children's Hospital of Philadelphia</footer>
    </blockquote>

    <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">Looking Forward</h2>
    <p class="text-gray-700 leading-relaxed mb-6">As we continue to innovate, we're exploring new ways to enhance the therapeutic experience. Our upcoming features include virtual reality integration, multiplayer challenges, and expanded exercise libraries.</p>

    <p class="text-gray-700 leading-relaxed">The future of respiratory therapy is here, and it's more engaging than ever before.</p>
  `,
  author: "Dr. Sarah Chen",
  authorBio:
    "Dr. Sarah Chen is a leading researcher in pediatric respiratory therapy and gamification in healthcare. She has published over 50 peer-reviewed articles and is a key contributor to PlayPhysio's clinical validation efforts.",
  date: "2024-01-15",
  readTime: "5 min read",
  category: "Research",
  image: "/placeholder.svg?height=400&width=800",
  tags: ["Research", "Gamification", "Clinical Studies", "Pediatric Care"],
  views: "2,847",
  likes: 156,
}

const relatedPosts = [
  {
    id: 2,
    title: "94% Therapy Adherence: Real Results from Real Families",
    excerpt: "Learn how families across the country are transforming their respiratory therapy routines.",
    image: "/placeholder.svg?height=150&width=250",
    readTime: "3 min read",
    category: "Success Stories",
  },
  {
    id: 3,
    title: "Setting Up Your First PlayPhysio Session",
    excerpt: "A step-by-step guide to getting started with PlayPhysio.",
    image: "/placeholder.svg?height=150&width=250",
    readTime: "4 min read",
    category: "How-To",
  },
  {
    id: 4,
    title: "The Psychology of Making Therapy Fun",
    excerpt: "Understanding how gamification principles can transform challenging medical routines.",
    image: "/placeholder.svg?height=150&width=250",
    readTime: "6 min read",
    category: "Psychology",
  },
]

export default function BlogPostPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Back Navigation */}
      <section className="py-6 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <Link href="/blog" className="inline-flex items-center text-cyan-600 hover:text-cyan-700 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <article className="lg:col-span-3">
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Badge className="bg-gradient-to-r from-cyan-400 to-emerald-400 text-white">
                  <Tag className="w-3 h-3 mr-1" />
                  {blogPost.category}
                </Badge>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{blogPost.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(blogPost.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{blogPost.readTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{blogPost.views} views</span>
                  </div>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 leading-tight">{blogPost.title}</h1>

              {/* Featured Image */}
              <div className="relative mb-12">
                <img
                  src={blogPost.image || "/placeholder.svg"}
                  alt={blogPost.title}
                  className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
                />
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                <div className="leading-relaxed space-y-6" dangerouslySetInnerHTML={{ __html: blogPost.content }} />
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {blogPost.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-gray-100 text-gray-700 hover:bg-cyan-50 hover:text-cyan-700 cursor-pointer transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Social Actions */}
              <div className="mt-8 flex items-center justify-between py-6 border-t border-b border-gray-200">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    {blogPost.likes} Likes
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Comment
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full hover:bg-green-50 hover:text-green-600 hover:border-green-300"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>

              {/* Author Bio */}
              <div className="mt-12 bg-gradient-to-br from-cyan-50 to-purple-50 rounded-2xl p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    {blogPost.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">About {blogPost.author}</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">{blogPost.authorBio}</p>
                    <Button variant="outline" size="sm" className="rounded-full">
                      View All Articles
                    </Button>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-8">
              {/* Table of Contents */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                    <BookOpen className="w-4 h-4 mr-2 text-cyan-600" />
                    Table of Contents
                  </h3>
                  <nav className="space-y-2 text-sm">
                    <a href="#challenge" className="block text-gray-600 hover:text-cyan-600 transition-colors">
                      The Challenge of Traditional Therapy
                    </a>
                    <a href="#gamification" className="block text-gray-600 hover:text-cyan-600 transition-colors">
                      The Power of Gamification
                    </a>
                    <a href="#validation" className="block text-gray-600 hover:text-cyan-600 transition-colors">
                      Clinical Validation
                    </a>
                    <a href="#technology" className="block text-gray-600 hover:text-cyan-600 transition-colors">
                      The Technology Behind the Magic
                    </a>
                    <a href="#future" className="block text-gray-600 hover:text-cyan-600 transition-colors">
                      Looking Forward
                    </a>
                  </nav>
                </CardContent>
              </Card>

              {/* Article Stats */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2 text-emerald-600" />
                    Article Stats
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Views</span>
                      <span className="font-medium text-gray-800">{blogPost.views}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Likes</span>
                      <span className="font-medium text-gray-800">{blogPost.likes}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Read Time</span>
                      <span className="font-medium text-gray-800">{blogPost.readTime}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Published</span>
                      <span className="font-medium text-gray-800">{new Date(blogPost.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card className="bg-gradient-to-br from-cyan-50 to-purple-50 border-0">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Stay Updated</h3>
                  <p className="text-sm text-gray-600 mb-4">Get the latest insights delivered to your inbox.</p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                    />
                    <Button className="w-full bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-500 hover:to-emerald-500 text-white text-sm rounded-lg">
                      Subscribe
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>

          {/* Related Articles */}
          <section className="mt-16 pt-12 border-t border-gray-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
                  <div className="relative">
                    <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
                    <Badge className="absolute top-3 right-3 bg-white/90 text-gray-700">{post.category}</Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{post.readTime}</span>
                      <Link href={`/blog/${post.id}`}>
                        <Button variant="outline" size="sm" className="rounded-full text-xs">
                          Read More
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  )
}
