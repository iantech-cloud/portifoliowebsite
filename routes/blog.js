const express = require("express")
const fs = require("fs-extra")
const path = require("path")
const marked = require("marked")
const slugify = require("slugify")
const moment = require("moment")
const router = express.Router()

const BLOG_DATA_FILE = path.join(__dirname, "../data/blog-posts.json")

// Ensure blog data file exists
async function ensureBlogDataFile() {
  try {
    await fs.ensureFile(BLOG_DATA_FILE)
    const exists = await fs.pathExists(BLOG_DATA_FILE)
    if (!exists || (await fs.readFile(BLOG_DATA_FILE, "utf8")).trim() === "") {
      await fs.writeJson(BLOG_DATA_FILE, [])
    }
  } catch (error) {
    console.error("Error ensuring blog data file:", error)
  }
}

// Get all blog posts
async function getBlogPosts() {
  try {
    await ensureBlogDataFile()
    const posts = await fs.readJson(BLOG_DATA_FILE)
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
  } catch (error) {
    console.error("Error reading blog posts:", error)
    return []
  }
}

// Save blog posts
async function saveBlogPosts(posts) {
  try {
    await fs.writeJson(BLOG_DATA_FILE, posts, { spaces: 2 })
  } catch (error) {
    console.error("Error saving blog posts:", error)
  }
}

// Blog listing page
router.get("/", async (req, res) => {
  try {
    const allPosts = await getBlogPosts()
    const publishedPosts = allPosts.filter((post) => post.published)
    const featuredPosts = publishedPosts.filter((post) => post.featured)
    const recentPosts = publishedPosts.filter((post) => !post.featured).slice(0, 6)

    const categories = [...new Set(publishedPosts.map((post) => post.category))]

    res.render("blog/index", {
      title: "Blog - Insights & Tutorials",
      featuredPosts,
      recentPosts,
      categories,
      pageClass: "blog-page",
    })
  } catch (error) {
    console.error("Error loading blog page:", error)
    res.status(500).render("error", {
      title: "Error",
      message: "Unable to load blog posts",
    })
  }
})

// Individual blog post
router.get("/:slug", async (req, res) => {
  try {
    const posts = await getBlogPosts()
    const post = posts.find((p) => p.slug === req.params.slug && p.published)

    if (!post) {
      return res.status(404).render("404", {
        title: "Post Not Found",
        message: "The blog post you are looking for does not exist.",
      })
    }

    // Convert markdown to HTML
    post.contentHtml = marked.parse(post.content)
    post.formattedDate = moment(post.date).format("MMMM DD, YYYY")

    // Get related posts
    const relatedPosts = posts
      .filter((p) => p.published && p.id !== post.id && p.category === post.category)
      .slice(0, 2)

    res.render("blog/post", {
      title: `${post.title} - Blog`,
      post,
      relatedPosts,
      pageClass: "blog-post-page",
    })
  } catch (error) {
    console.error("Error loading blog post:", error)
    res.status(500).render("error", {
      title: "Error",
      message: "Unable to load blog post",
    })
  }
})

module.exports = router
