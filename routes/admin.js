const express = require("express")
const router = express.Router()
const fs = require("fs-extra")
const path = require("path")
const { body, validationResult } = require("express-validator")

// Middleware to check if user is authenticated
const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/auth/login")
  }
  next()
}

// Blog post validation
const blogValidation = [
  body("title").trim().isLength({ min: 5, max: 200 }).withMessage("Title must be between 5 and 200 characters"),
  body("content").trim().isLength({ min: 50 }).withMessage("Content must be at least 50 characters"),
  body("excerpt").trim().isLength({ min: 10, max: 500 }).withMessage("Excerpt must be between 10 and 500 characters"),
  body("category").trim().notEmpty().withMessage("Category is required"),
  body("tags").optional().isString(),
  body("status").isIn(["draft", "published"]).withMessage("Invalid status"),
]

// GET admin dashboard
router.get("/", requireAuth, async (req, res) => {
  try {
    // Get blog posts count
    const blogFile = path.join(__dirname, "../data/blog-posts.json")
    const blogStats = { total: 0, published: 0, drafts: 0 }

    if (await fs.pathExists(blogFile)) {
      const posts = await fs.readJson(blogFile)
      blogStats.total = posts.length
      blogStats.published = posts.filter((p) => p.status === "published").length
      blogStats.drafts = posts.filter((p) => p.status === "draft").length
    }

    // Get contact submissions count
    const contactFile = path.join(__dirname, "../data/contact-submissions.json")
    const contactStats = { total: 0, new: 0, responded: 0 }

    if (await fs.pathExists(contactFile)) {
      const submissions = await fs.readJson(contactFile)
      contactStats.total = submissions.length
      contactStats.new = submissions.filter((s) => s.status === "new").length
      contactStats.responded = submissions.filter((s) => s.status === "responded").length
    }

    res.render("admin/dashboard", {
      title: "Admin Dashboard - Goldmine Portfolio",
      blogStats,
      contactStats,
      user: req.session.user,
    })
  } catch (error) {
    console.error("Admin dashboard error:", error)
    res.render("admin/dashboard", {
      title: "Admin Dashboard - Goldmine Portfolio",
      blogStats: { total: 0, published: 0, drafts: 0 },
      contactStats: { total: 0, new: 0, responded: 0 },
      user: req.session.user,
    })
  }
})

// GET blog posts management
router.get("/blog", requireAuth, async (req, res) => {
  try {
    const blogFile = path.join(__dirname, "../data/blog-posts.json")
    let posts = []

    if (await fs.pathExists(blogFile)) {
      posts = await fs.readJson(blogFile)
      posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }

    res.render("admin/blog-list", {
      title: "Manage Blog Posts - Admin",
      posts,
      user: req.session.user,
    })
  } catch (error) {
    console.error("Blog management error:", error)
    res.render("admin/blog-list", {
      title: "Manage Blog Posts - Admin",
      posts: [],
      user: req.session.user,
    })
  }
})

// GET create new blog post
router.get("/blog/new", requireAuth, (req, res) => {
  res.render("admin/blog-editor", {
    title: "Create New Post - Admin",
    post: null,
    errors: null,
    user: req.session.user,
  })
})

// GET edit blog post
router.get("/blog/edit/:id", requireAuth, async (req, res) => {
  try {
    const postId = Number.parseInt(req.params.id)
    const blogFile = path.join(__dirname, "../data/blog-posts.json")

    if (!(await fs.pathExists(blogFile))) {
      return res.status(404).render("404", {
        title: "Post Not Found",
        message: "The blog post you are trying to edit does not exist.",
      })
    }

    const posts = await fs.readJson(blogFile)
    const post = posts.find((p) => p.id === postId)

    if (!post) {
      return res.status(404).render("404", {
        title: "Post Not Found",
        message: "The blog post you are trying to edit does not exist.",
      })
    }

    res.render("admin/blog-editor", {
      title: `Edit: ${post.title} - Admin`,
      post,
      errors: null,
      user: req.session.user,
    })
  } catch (error) {
    console.error("Edit blog post error:", error)
    res.status(500).render("error", {
      title: "Server Error",
      message: "An error occurred while loading the blog post.",
    })
  }
})

// POST create/update blog post
router.post("/blog/save", requireAuth, blogValidation, async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.render("admin/blog-editor", {
        title: req.body.id ? "Edit Post - Admin" : "Create New Post - Admin",
        post: req.body.id ? req.body : null,
        errors: errors.array(),
        user: req.session.user,
      })
    }

    const { id, title, content, excerpt, category, tags, status, featuredImage } = req.body
    const blogFile = path.join(__dirname, "../data/blog-posts.json")

    let posts = []
    if (await fs.pathExists(blogFile)) {
      posts = await fs.readJson(blogFile)
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim("-")

    const postData = {
      title,
      slug,
      content,
      excerpt,
      category,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
      status,
      featuredImage: featuredImage || null,
      author: req.session.user.username,
      authorId: req.session.user.id,
    }

    if (id) {
      // Update existing post
      const postIndex = posts.findIndex((p) => p.id === Number.parseInt(id))
      if (postIndex !== -1) {
        posts[postIndex] = {
          ...posts[postIndex],
          ...postData,
          updatedAt: new Date().toISOString(),
        }

        if (status === "published" && !posts[postIndex].publishedAt) {
          posts[postIndex].publishedAt = new Date().toISOString()
        }
      }
    } else {
      // Create new post
      const newPost = {
        id: Date.now(),
        ...postData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: status === "published" ? new Date().toISOString() : null,
        views: 0,
      }
      posts.unshift(newPost)
    }

    await fs.writeJson(blogFile, posts, { spaces: 2 })

    req.flash("success", `Blog post ${id ? "updated" : "created"} successfully!`)
    res.redirect("/admin/blog")
  } catch (error) {
    console.error("Save blog post error:", error)
    res.render("admin/blog-editor", {
      title: req.body.id ? "Edit Post - Admin" : "Create New Post - Admin",
      post: req.body.id ? req.body : null,
      errors: [{ msg: "An error occurred while saving the post" }],
      user: req.session.user,
    })
  }
})

// POST delete blog post
router.post("/blog/delete/:id", requireAuth, async (req, res) => {
  try {
    const postId = Number.parseInt(req.params.id)
    const blogFile = path.join(__dirname, "../data/blog-posts.json")

    if (await fs.pathExists(blogFile)) {
      let posts = await fs.readJson(blogFile)
      posts = posts.filter((p) => p.id !== postId)
      await fs.writeJson(blogFile, posts, { spaces: 2 })
    }

    req.flash("success", "Blog post deleted successfully!")
    res.redirect("/admin/blog")
  } catch (error) {
    console.error("Delete blog post error:", error)
    req.flash("error", "An error occurred while deleting the post")
    res.redirect("/admin/blog")
  }
})

// GET contact submissions
router.get("/contacts", requireAuth, async (req, res) => {
  try {
    const contactFile = path.join(__dirname, "../data/contact-submissions.json")
    let submissions = []

    if (await fs.pathExists(contactFile)) {
      submissions = await fs.readJson(contactFile)
      submissions.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
    }

    res.render("admin/contacts", {
      title: "Contact Submissions - Admin",
      submissions,
      user: req.session.user,
    })
  } catch (error) {
    console.error("Contact submissions error:", error)
    res.render("admin/contacts", {
      title: "Contact Submissions - Admin",
      submissions: [],
      user: req.session.user,
    })
  }
})

module.exports = router
