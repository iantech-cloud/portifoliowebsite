const express = require("express")
const fs = require("fs-extra")
const path = require("path")
const { body, validationResult } = require("express-validator")
const router = express.Router()

const BLOG_DATA_FILE = path.join(__dirname, "../data/blog-posts.json")

// Helper functions
async function getBlogPosts() {
  try {
    const exists = await fs.pathExists(BLOG_DATA_FILE)
    if (!exists) {
      await fs.writeJson(BLOG_DATA_FILE, [])
      return []
    }
    return await fs.readJson(BLOG_DATA_FILE)
  } catch (error) {
    console.error("Error reading blog posts:", error)
    return []
  }
}

async function saveBlogPosts(posts) {
  try {
    await fs.writeJson(BLOG_DATA_FILE, posts, { spaces: 2 })
  } catch (error) {
    console.error("Error saving blog posts:", error)
  }
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim("-")
}

// Blog listing page
router.get("/", async (req, res) => {
  try {
    const allPosts = await getBlogPosts()
    const publishedPosts = allPosts
      .filter((post) => post.status === "published")
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    const page = Number.parseInt(req.query.page) || 1
    const limit = 6
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const posts = publishedPosts.slice(startIndex, endIndex)
    const totalPages = Math.ceil(publishedPosts.length / limit)

    res.render("blog", {
      title: "Blog - Insights & Expertise",
      pageClass: "blog-page",
      posts,
      currentPage: page,
      totalPages,
      hasNextPage: endIndex < publishedPosts.length,
      hasPrevPage: page > 1,
    })
  } catch (error) {
    console.error("Error loading blog posts:", error)
    res.render("blog", {
      title: "Blog - Insights & Expertise",
      pageClass: "blog-page",
      posts: [],
      currentPage: 1,
      totalPages: 1,
      hasNextPage: false,
      hasPrevPage: false,
    })
  }
})

// Individual blog post
router.get("/:slug", async (req, res) => {
  try {
    const posts = await getBlogPosts()
    const post = posts.find((p) => p.slug === req.params.slug && p.status === "published")

    if (!post) {
      return res.status(404).render("404", {
        title: "Post Not Found",
        message: "The blog post you're looking for doesn't exist.",
      })
    }

    // Get related posts
    const relatedPosts = posts
      .filter((p) => p.id !== post.id && p.status === "published")
      .filter((p) => p.category === post.category || p.tags.some((tag) => post.tags.includes(tag)))
      .slice(0, 3)

    res.render("blog-post", {
      title: `${post.title} - Blog`,
      pageClass: "blog-post-page",
      post,
      relatedPosts,
    })
  } catch (error) {
    console.error("Error loading blog post:", error)
    res.status(500).render("error", {
      title: "Error",
      message: "An error occurred while loading the blog post.",
    })
  }
})

module.exports = router
