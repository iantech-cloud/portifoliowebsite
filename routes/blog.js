const express = require("express")
const router = express.Router()
const fs = require("fs-extra")
const path = require("path")
const { marked } = require("marked")
const createDOMPurify = require("dompurify")
const { JSDOM } = require("jsdom")

const window = new JSDOM("").window
const DOMPurify = createDOMPurify(window)

// Configure marked options
marked.setOptions({
  breaks: true,
  gfm: true,
})

// GET blog listing page
router.get("/", async (req, res) => {
  try {
    const blogFile = path.join(__dirname, "../data/blog-posts.json")
    let posts = []

    if (await fs.pathExists(blogFile)) {
      const allPosts = await fs.readJson(blogFile)
      posts = allPosts
        .filter((post) => post.status === "published")
        .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    }

    // Pagination
    const page = Number.parseInt(req.query.page) || 1
    const limit = 6
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const totalPosts = posts.length
    const totalPages = Math.ceil(totalPosts / limit)
    const paginatedPosts = posts.slice(startIndex, endIndex)

    res.render("blog", {
      title: "Blog - Goldmine Portfolio",
      description:
        "Insights on educational technology, data science, digital marketing, and cybersecurity from Goldmine Agencies.",
      posts: paginatedPosts,
      currentPage: page,
      totalPages,
      totalPosts,
      hasNextPage: endIndex < totalPosts,
      hasPrevPage: startIndex > 0,
      nextPage: page + 1,
      prevPage: page - 1,
    })
  } catch (error) {
    console.error("Blog listing error:", error)
    res.render("blog", {
      title: "Blog - Goldmine Portfolio",
      description:
        "Insights on educational technology, data science, digital marketing, and cybersecurity from Goldmine Agencies.",
      posts: [],
      currentPage: 1,
      totalPages: 0,
      totalPosts: 0,
      hasNextPage: false,
      hasPrevPage: false,
    })
  }
})

// GET individual blog post
router.get("/:slug", async (req, res) => {
  try {
    const slug = req.params.slug
    const blogFile = path.join(__dirname, "../data/blog-posts.json")

    if (!(await fs.pathExists(blogFile))) {
      return res.status(404).render("404", {
        title: "Post Not Found",
        message: "The blog post you are looking for does not exist.",
      })
    }

    const posts = await fs.readJson(blogFile)
    const post = posts.find((p) => p.slug === slug && p.status === "published")

    if (!post) {
      return res.status(404).render("404", {
        title: "Post Not Found",
        message: "The blog post you are looking for does not exist.",
      })
    }

    // Convert markdown to HTML and sanitize
    const contentHtml = DOMPurify.sanitize(marked(post.content))

    // Get related posts
    const relatedPosts = posts
      .filter((p) => p.id !== post.id && p.status === "published")
      .filter((p) => p.category === post.category || p.tags.some((tag) => post.tags.includes(tag)))
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(0, 3)

    res.render("blog-post", {
      title: `${post.title} - Goldmine Portfolio`,
      description: post.excerpt,
      post: {
        ...post,
        contentHtml,
      },
      relatedPosts,
    })
  } catch (error) {
    console.error("Blog post error:", error)
    res.status(500).render("error", {
      title: "Server Error",
      message: "An error occurred while loading the blog post.",
    })
  }
})

module.exports = router
