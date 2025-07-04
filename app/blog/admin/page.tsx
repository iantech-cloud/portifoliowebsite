"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ArrowLeft, Save, Eye, Plus, X } from "lucide-react"

export default function BlogAdminPage() {
  const [post, setPost] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: [] as string[],
    featured: false,
    published: false,
  })

  const [newTag, setNewTag] = useState("")
  const [isPreview, setIsPreview] = useState(false)

  const categories = ["Data Science", "Cybersecurity", "Education", "Web Development", "Database", "AI & Security"]

  const handleAddTag = () => {
    if (newTag.trim() && !post.tags.includes(newTag.trim())) {
      setPost((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setPost((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleSave = () => {
    // In a real application, this would save to a database
    console.log("Saving post:", post)
    alert("Post saved successfully!")
  }

  const handlePublish = () => {
    // In a real application, this would publish the post
    setPost((prev) => ({ ...prev, published: true }))
    console.log("Publishing post:", post)
    alert("Post published successfully!")
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost">
              <Link href="/blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Blog Editor</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsPreview(!isPreview)}>
              <Eye className="h-4 w-4 mr-2" />
              {isPreview ? "Edit" : "Preview"}
            </Button>
            <Button onClick={handleSave} variant="outline">
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button onClick={handlePublish}>Publish</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-2">
            {!isPreview ? (
              <Card>
                <CardHeader>
                  <CardTitle>Write Your Post</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter post title..."
                      value={post.title}
                      onChange={(e) => setPost((prev) => ({ ...prev, title: e.target.value }))}
                      className="text-lg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      placeholder="Brief description of your post..."
                      value={post.excerpt}
                      onChange={(e) => setPost((prev) => ({ ...prev, excerpt: e.target.value }))}
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      placeholder="Write your post content here... You can use Markdown formatting."
                      value={post.content}
                      onChange={(e) => setPost((prev) => ({ ...prev, content: e.target.value }))}
                      rows={20}
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Supports Markdown formatting: **bold**, *italic*, # headers, ```code blocks```, etc.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              /* Preview Mode */
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Badge className="mb-2">{post.category || "Uncategorized"}</Badge>
                      <h1 className="text-3xl font-bold">{post.title || "Untitled Post"}</h1>
                      <p className="text-gray-600 mt-2">{post.excerpt}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="prose max-w-none">
                      <div className="whitespace-pre-wrap">
                        {post.content.split("\n").map((line, index) => {
                          if (line.startsWith("# ")) {
                            return (
                              <h1 key={index} className="text-2xl font-bold mt-6 mb-3">
                                {line.substring(2)}
                              </h1>
                            )
                          } else if (line.startsWith("## ")) {
                            return (
                              <h2 key={index} className="text-xl font-semibold mt-4 mb-2">
                                {line.substring(3)}
                              </h2>
                            )
                          } else if (line.startsWith("### ")) {
                            return (
                              <h3 key={index} className="text-lg font-semibold mt-3 mb-2">
                                {line.substring(4)}
                              </h3>
                            )
                          } else if (line.trim() === "") {
                            return <br key={index} />
                          } else {
                            return (
                              <p key={index} className="mb-3">
                                {line}
                              </p>
                            )
                          }
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Post Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Post Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={post.category}
                    onValueChange={(value) => setPost((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={post.featured}
                    onCheckedChange={(checked) => setPost((prev) => ({ ...prev, featured: checked }))}
                  />
                  <Label htmlFor="featured">Featured Post</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    checked={post.published}
                    onCheckedChange={(checked) => setPost((prev) => ({ ...prev, published: checked }))}
                  />
                  <Label htmlFor="published">Published</Label>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                  />
                  <Button size="sm" onClick={handleAddTag}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button onClick={() => handleRemoveTag(tag)} className="ml-1 hover:text-red-500">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Writing Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Writing Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2 text-gray-600">
                  <li>• Use clear, descriptive titles</li>
                  <li>• Write engaging excerpts</li>
                  <li>• Break content into sections</li>
                  <li>• Use code blocks for examples</li>
                  <li>• Add relevant tags</li>
                  <li>• Include practical examples</li>
                </ul>
              </CardContent>
            </Card>

            {/* Markdown Guide */}
            <Card>
              <CardHeader>
                <CardTitle>Markdown Guide</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm space-y-1 text-gray-600">
                  <div>
                    <code># Header 1</code>
                  </div>
                  <div>
                    <code>## Header 2</code>
                  </div>
                  <div>
                    <code>**Bold text**</code>
                  </div>
                  <div>
                    <code>*Italic text*</code>
                  </div>
                  <div>
                    <code>`Inline code`</code>
                  </div>
                  <div>
                    <code>```Code block```</code>
                  </div>
                  <div>
                    <code>- List item</code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
