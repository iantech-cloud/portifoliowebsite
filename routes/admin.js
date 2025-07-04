const express = require("express")
const fs = require("fs-extra")
const path = require("path")
const slugify = require("slugify")
const { body, validationResult } = require("express-validator")
const router = express.Router()

const BLOG_DATA_FILE = path.join(__dirname, "../data/blog-posts.json")

// Simple authentication middleware
function requireAuth(req, res, next) {
  if (req.session.isAdmin) {
    return next()
  }
  res.redirect("/admin/login")
}

// Admin login page
router.get("/login", (req, res) => {
  res.render("admin/login", {
    title: "Admin Login",
    layout: "admin-layout",
  })
})

// Handle login
router.post("/login", (req, res) => {
  const { username, password } = req.body

  // Simple authentication (use proper authentication in production)
  if (username === "admin" && password === "password123") {
    req.session.isAdmin = true
    req.flash("success", "Welcome to the admin panel!")
    res.redirect("/admin/blog")
  } else {
    req.flash("error", "Invalid credentials")
    res.redirect("/admin/login")
  }
})

// Admin logout
router.get("/logout", (req, res) => {
  req.session.destroy()
  res.redirect("/admin/login")
})

// Blog management
router.get("/blog", requireAuth, async (req, res) => {
  try {
    const posts = await fs.readJson(BLOG_DATA_FILE).catch(() => [])
    res.render("admin/blog", {
      title: "Blog Management",
      posts,
      layout: "admin-layout",
    })
  } catch (error) {
    console.error("Error loading blog posts:", error)
    res.status(500).render("error", { title: "Error", message: "Unable to load blog posts" })
  }
})

// New blog post form
router.get("/blog/new", requireAuth, (req, res) => {
  res.render("admin/blog-editor", {
    title: "New Blog Post",
    post: {},
    isEdit: false,
    layout: "admin-layout",
  })
})

// Edit blog post form
router.get("/blog/edit/:id", requireAuth, async (req, res) => {
  try {
    const posts = await fs.readJson(BLOG_DATA_FILE).catch(() => [])
    const post = posts.find((p) => p.id === Number.parseInt(req.params.id))

    if (!post) {
      req.flash("error", "Post not found")
      return res.redirect("/admin/blog")
    }

    res.render("admin/blog-editor", {
      title: "Edit Blog Post",
      post,
      isEdit: true,
      layout: "admin-layout",
    })
  } catch (error) {
    console.error("Error loading blog post:", error)
    res.status(500).render("error", { title: "Error", message: "Unable to load blog post" })
  }
})

// Save blog post
router.post(
  "/blog/save",
  requireAuth,
  [
    body("title").trim().isLength({ min: 1 }).withMessage("Title is required"),
    body("excerpt").trim().isLength({ min: 1 }).withMessage("Excerpt is required"),
    body("content").trim().isLength({ min: 1 }).withMessage("Content is required"),
    body("category").trim().isLength({ min: 1 }).withMessage("Category is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        req.flash(
          "error",
          errors
            .array()
            .map((err) => err.msg)
            .join(", "),
        )
        return res.redirect("back")
      }

      const { id, title, excerpt, content, category, tags, featured, published } = req.body
      const posts = await fs.readJson(BLOG_DATA_FILE).catch(() => [])

      const postData = {
        title,
        excerpt,
        content,
        category,
        tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
        featured: featured === "on",
        published: published === "on",
        slug: slugify(title, { lower: true, strict: true }),
        date: new Date().toISOString(),
      }

      if (id) {
        // Update existing post
        const index = posts.findIndex((p) => p.id === Number.parseInt(id))
        if (index !== -1) {
          posts[index] = { ...posts[index], ...postData }
        }
      } else {
        // Create new post
        postData.id = posts.length > 0 ? Math.max(...posts.map((p) => p.id)) + 1 : 1
        posts.push(postData)
      }

      await fs.writeJson(BLOG_DATA_FILE, posts, { spaces: 2 })

      req.flash("success", "Blog post saved successfully!")
      res.redirect("/admin/blog")
    } catch (error) {
      console.error("Error saving blog post:", error)
      req.flash("error", "Error saving blog post")
      res.redirect("back")
    }
  },
)

// Delete blog post
router.post("/blog/delete/:id", requireAuth, async (req, res) => {
  try {
    const posts = await fs.readJson(BLOG_DATA_FILE).catch(() => [])
    const filteredPosts = posts.filter((p) => p.id !== Number.parseInt(req.params.id))

    await fs.writeJson(BLOG_DATA_FILE, filteredPosts, { spaces: 2 })

    req.flash("success", "Blog post deleted successfully!")
    res.redirect("/admin/blog")
  } catch (error) {
    console.error("Error deleting blog post:", error)
    req.flash("error", "Error deleting blog post")
    res.redirect("/admin/blog")
  }
})

module.exports = router
