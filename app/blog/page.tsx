import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, Clock, User, Edit } from "lucide-react"

export default function BlogPage() {
  // Mock blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with Python for Data Science",
      excerpt:
        "A comprehensive guide to beginning your journey in data science using Python. Learn about essential libraries, tools, and best practices.",
      content: "Full content here...",
      author: "Your Name",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "Data Science",
      tags: ["Python", "Data Science", "Pandas", "NumPy"],
      featured: true,
      published: true,
    },
    {
      id: 2,
      title: "Cybersecurity Best Practices for Developers",
      excerpt:
        "Essential security practices every developer should know to build secure applications and protect user data.",
      content: "Full content here...",
      author: "Your Name",
      date: "2024-01-10",
      readTime: "12 min read",
      category: "Cybersecurity",
      tags: ["Security", "Web Development", "Best Practices"],
      featured: true,
      published: true,
    },
    {
      id: 3,
      title: "Teaching Programming: Lessons Learned",
      excerpt:
        "Insights and experiences from teaching programming to hundreds of students. Tips for effective coding education.",
      content: "Full content here...",
      author: "Your Name",
      date: "2024-01-05",
      readTime: "6 min read",
      category: "Education",
      tags: ["Teaching", "Programming", "Education"],
      featured: false,
      published: true,
    },
    {
      id: 4,
      title: "Database Optimization Techniques",
      excerpt: "Advanced MySQL optimization strategies to improve query performance and database efficiency.",
      content: "Full content here...",
      author: "Your Name",
      date: "2023-12-28",
      readTime: "10 min read",
      category: "Database",
      tags: ["MySQL", "Optimization", "Performance"],
      featured: false,
      published: true,
    },
    {
      id: 5,
      title: "Machine Learning in Cybersecurity",
      excerpt: "Exploring how machine learning techniques can enhance cybersecurity threat detection and prevention.",
      content: "Full content here...",
      author: "Your Name",
      date: "2023-12-20",
      readTime: "15 min read",
      category: "AI & Security",
      tags: ["Machine Learning", "Cybersecurity", "AI"],
      featured: false,
      published: true,
    },
    {
      id: 6,
      title: "Building RESTful APIs with PHP",
      excerpt: "A step-by-step guide to creating robust and scalable RESTful APIs using PHP and modern frameworks.",
      content: "Full content here...",
      author: "Your Name",
      date: "2023-12-15",
      readTime: "9 min read",
      category: "Web Development",
      tags: ["PHP", "API", "REST", "Laravel"],
      featured: false,
      published: true,
    },
  ]

  const categories = [
    "All",
    "Data Science",
    "Cybersecurity",
    "Education",
    "Database",
    "AI & Security",
    "Web Development",
  ]
  const featuredPosts = blogPosts.filter((post) => post.featured)
  const recentPosts = blogPosts.filter((post) => !post.featured).slice(0, 4)

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-4">Blog</h1>
            <p className="text-xl text-gray-600">
              Insights, tutorials, and thoughts on technology, data science, and cybersecurity
            </p>
          </div>
          <Button asChild>
            <Link href="/blog/admin">
              <Edit className="h-4 w-4 mr-2" />
              Write Post
            </Link>
          </Button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((category) => (
            <Badge
              key={category}
              variant="outline"
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Featured Posts */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Featured Posts</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <div className="text-center p-8">
                    <Badge className="mb-4">{post.category}</Badge>
                    <h3 className="text-xl font-bold text-gray-800">{post.title}</h3>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 leading-relaxed">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-1">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button asChild className="w-full">
                    <Link href={`/blog/${post.id}`}>Read More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Posts */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Recent Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant="outline">{post.category}</Badge>
                    <div className="text-xs text-gray-500">{new Date(post.date).toLocaleDateString()}</div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 hover:text-blue-600 transition-colors">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </div>
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/blog/${post.id}`}>Read More</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6">
            Subscribe to get notified about new blog posts and updates on technology, data science, and cybersecurity
            topics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
