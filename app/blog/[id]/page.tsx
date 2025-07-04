import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// This would typically come from a database or CMS
const blogPosts = [
  {
    id: "1",
    title: "Building Modern Web Applications with Next.js 14",
    excerpt: "Exploring the latest features and best practices for building scalable web applications.",
    content: `
      <p>Next.js 14 brings exciting new features that make building modern web applications even more powerful and efficient. In this comprehensive guide, we'll explore the key improvements and how to leverage them in your projects.</p>
      
      <h2>App Router Enhancements</h2>
      <p>The App Router continues to evolve with better performance and developer experience. Key improvements include:</p>
      <ul>
        <li>Enhanced server components with better streaming</li>
        <li>Improved client-side navigation</li>
        <li>Better error handling and loading states</li>
      </ul>
      
      <h2>Performance Optimizations</h2>
      <p>Next.js 14 introduces several performance optimizations that make your applications faster out of the box:</p>
      <ul>
        <li>Improved bundling and tree-shaking</li>
        <li>Better image optimization</li>
        <li>Enhanced caching strategies</li>
      </ul>
      
      <h2>Developer Experience</h2>
      <p>The developer experience continues to improve with better tooling and debugging capabilities.</p>
    `,
    author: "Ian Muiruri",
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["Next.js", "React", "Web Development"],
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop",
  },
  {
    id: "2",
    title: "The Future of TypeScript in 2024",
    excerpt: "Exploring upcoming TypeScript features and their impact on modern development.",
    content: `
      <p>TypeScript continues to evolve rapidly, with exciting features planned for 2024. Let's explore what's coming and how it will impact our development workflow.</p>
      
      <h2>Type System Improvements</h2>
      <p>The TypeScript team is working on several enhancements to the type system that will make it even more powerful and expressive.</p>
      
      <h2>Performance Enhancements</h2>
      <p>Significant performance improvements are coming that will make TypeScript compilation faster and more efficient.</p>
    `,
    author: "Ian Muiruri",
    date: "2024-01-10",
    readTime: "6 min read",
    tags: ["TypeScript", "JavaScript", "Programming"],
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop",
  },
]

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id,
  }))
}

export default function BlogPost({ params }: { params: { id: string } }) {
  const post = blogPosts.find((p) => p.id === params.id)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>

        <article>
          <div className="relative h-64 md:h-96 mb-8 rounded-2xl overflow-hidden">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold font-poppins">{post.title}</h1>

              <div className="flex items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>

            <Card>
              <CardContent className="p-8">
                <div
                  className="prose prose-lg max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </CardContent>
            </Card>
          </div>
        </article>
      </div>
    </div>
  )
}
