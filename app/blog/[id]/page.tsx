import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// Sample blog posts data
const blogPosts = [
  {
    id: "modern-web-development",
    title: "The Future of Modern Web Development",
    excerpt: "Exploring the latest trends and technologies shaping the future of web development.",
    content: `
      <p>Web development has evolved dramatically over the past few years, with new frameworks, tools, and methodologies emerging at a rapid pace. In this article, we'll explore the key trends that are shaping the future of modern web development.</p>
      
      <h2>The Rise of Full-Stack Frameworks</h2>
      <p>Frameworks like Next.js, Nuxt.js, and SvelteKit are revolutionizing how we build web applications by providing full-stack capabilities out of the box. These frameworks offer server-side rendering, static site generation, and API routes in a single package.</p>
      
      <h2>Edge Computing and Serverless</h2>
      <p>The shift towards edge computing and serverless architectures is enabling developers to build faster, more scalable applications with reduced infrastructure complexity.</p>
      
      <h2>AI-Powered Development Tools</h2>
      <p>AI tools like GitHub Copilot and ChatGPT are transforming how developers write code, making development more efficient and accessible to newcomers.</p>
    `,
    author: "Ian Muiruri Waigango",
    date: "2024-01-15",
    readTime: "5 min read",
    tags: ["Web Development", "Technology", "Future"],
    category: "Technology",
  },
  {
    id: "react-best-practices",
    title: "React Best Practices for 2024",
    excerpt: "Essential React patterns and practices every developer should know.",
    content: `
      <p>React continues to be one of the most popular frontend frameworks, and with its constant evolution, it's important to stay up-to-date with the latest best practices.</p>
      
      <h2>Component Composition</h2>
      <p>Focus on creating small, reusable components that follow the single responsibility principle. This makes your code more maintainable and testable.</p>
      
      <h2>Custom Hooks</h2>
      <p>Extract complex logic into custom hooks to promote reusability and separation of concerns.</p>
      
      <h2>Performance Optimization</h2>
      <p>Use React.memo, useMemo, and useCallback judiciously to prevent unnecessary re-renders.</p>
    `,
    author: "Ian Muiruri Waigango",
    date: "2024-01-10",
    readTime: "7 min read",
    tags: ["React", "JavaScript", "Best Practices"],
    category: "Development",
  },
  {
    id: "typescript-guide",
    title: "TypeScript: A Complete Guide for Beginners",
    excerpt: "Learn TypeScript from scratch and understand why it's essential for modern development.",
    content: `
      <p>TypeScript has become an essential tool for modern JavaScript development, providing type safety and better developer experience.</p>
      
      <h2>Why TypeScript?</h2>
      <p>TypeScript adds static type checking to JavaScript, helping catch errors at compile time rather than runtime.</p>
      
      <h2>Getting Started</h2>
      <p>Setting up TypeScript in your project is straightforward with modern tooling and frameworks.</p>
      
      <h2>Advanced Features</h2>
      <p>Explore generics, utility types, and advanced patterns that make TypeScript powerful.</p>
    `,
    author: "Ian Muiruri Waigango",
    date: "2024-01-05",
    readTime: "10 min read",
    tags: ["TypeScript", "JavaScript", "Tutorial"],
    category: "Tutorial",
  },
]

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id,
  }))
}

interface BlogPostPageProps {
  params: {
    id: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.id === params.id)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>

          <div className="space-y-4">
            <Badge variant="secondary" className="mb-4">
              {post.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-poppins leading-tight">{post.title}</h1>
            <p className="text-xl text-muted-foreground">{post.excerpt}</p>
          </div>

          <div className="flex items-center gap-6 mt-8 pt-8 border-t">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{post.readTime}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <Card className="glass-effect">
          <CardContent className="p-8">
            <div
              className="prose prose-lg max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </CardContent>
        </Card>

        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold mb-4">Enjoyed this article?</h3>
          <p className="text-muted-foreground mb-6">Let's connect and discuss more about technology and development.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/blog">Read More Articles</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
