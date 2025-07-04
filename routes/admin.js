const express = require("express")
const fs = require("fs-extra")
const path = require("path")
const { body, validationResult } = require("express-validator")
const router = express.Router()

const BLOG_DATA_FILE = path.join(__dirname, "../data/blog-posts.json")
const CONTACT_DATA_FILE = path.join(__dirname, "../data/contact-submissions.json")

// Authentication middleware
function requireAuth(req, res, next) {
  if (!req.session.user) {
    req.flash("error", "Please log in to access the admin area")
    return res.redirect("/auth/login")
  }
  next()
}

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

async function getContactSubmissions() {
  try {
    const exists = await fs.pathExists(CONTACT_DATA_FILE)
    if (!exists) return []
    return await fs.readJson(CONTACT_DATA_FILE)
  } catch (error) {
    console.error("Error reading contact submissions:", error)
    return []
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

// Apply auth middleware to all admin routes
router.use(requireAuth)

// Admin dashboard
router.get("/", async (req, res) => {
  try {
    const posts = await getBlogPosts()
    const contacts = await getContactSubmissions()

    const stats = {
      totalPosts: posts.length,
      publishedPosts: posts.filter((p) => p.status === "published").length,
      draftPosts: posts.filter((p) => p.status === "draft").length,
      totalContacts: contacts.length,
      unreadContacts: contacts.filter((c) => !c.read).length,
      recentPosts: posts.slice(-5).reverse(),
      recentContacts: contacts.slice(-5).reverse(),
    }

    res.render("admin/dashboard", {
      title: "Admin Dashboard",
      pageClass: "admin-dashboard",
      stats,
    })
  } catch (error) {
    console.error("Error loading dashboard:", error)
    res.render("admin/dashboard", {
      title: "Admin Dashboard",
      pageClass: "admin-dashboard",
      stats: {},
    })
  }
})

// Blog management
router.get("/blog", async (req, res) => {
  try {
    const posts = await getBlogPosts()
    const sortedPosts = posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    res.render("admin/blog-list", {
      title: "Manage Blog Posts",
      pageClass: "admin-blog",
      posts: sortedPosts,
    })
  } catch (error) {
    console.error("Error loading blog posts:", error)
    res.render("admin/blog-list", {
      title: "Manage Blog Posts",
      pageClass: "admin-blog",
      posts: [],
    })
  }
})

// New blog post form
router.get("/blog/new", (req, res) => {
  res.render("admin/blog-editor", {
    title: "Create New Post",
    pageClass: "admin-blog-editor",
    post: null,
    isEdit: false,
  })
})

// Edit blog post form
router.get("/blog/edit/:id", async (req, res) => {
  try {
    const posts = await getBlogPosts()
    const post = posts.find((p) => p.id === Number.parseInt(req.params.id))

    if (!post) {
      req.flash("error", "Post not found")
      return res.redirect("/admin/blog")
    }

    res.render("admin/blog-editor", {
      title: "Edit Post",
      pageClass: "admin-blog-editor",
      post,
      isEdit: true,
    })
  } catch (error) {
    console.error("Error loading post for editing:", error)
    req.flash("error", "Error loading post")
    res.redirect("/admin/blog")
  }
})

// Create/Update blog post
router.post(
  "/blog/save",
  [
    body("title").trim().isLength({ min: 1 }).withMessage("Title is required"),
    body("content").trim().isLength({ min: 1 }).withMessage("Content is required"),
    body("excerpt").trim().isLength({ min: 1 }).withMessage("Excerpt is required"),
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

      const { id, title, content, excerpt, category, tags, status, featured } = req.body
      const posts = await getBlogPosts()

      const postData = {
        title: title.trim(),
        slug: generateSlug(title),
        content: content.trim(),
        excerpt: excerpt.trim(),
        category: category || "General",
        tags: tags
          ? tags
              .split(",")
              .map((tag) => tag.trim())
              .filter((tag) => tag)
          : [],
        status: status || "draft",
        featured: featured === "on",
        updatedAt: new Date().toISOString(),
      }

      if (id) {
        // Update existing post
        const postIndex = posts.findIndex((p) => p.id === Number.parseInt(id))
        if (postIndex !== -1) {
          posts[postIndex] = { ...posts[postIndex], ...postData }
          req.flash("success", "Post updated successfully")
        }
      } else {
        // Create new post
        const newPost = {
          id: Date.now(),
          ...postData,
          createdAt: new Date().toISOString(),
          author: req.session.user.username,
        }
        posts.push(newPost)
        req.flash("success", "Post created successfully")
      }

      await saveBlogPosts(posts)
      res.redirect("/admin/blog")
    } catch (error) {
      console.error("Error saving post:", error)
      req.flash("error", "Error saving post")
      res.redirect("back")
    }
  },
)

// Delete blog post
router.post("/blog/delete/:id", async (req, res) => {
  try {
    const posts = await getBlogPosts()
    const filteredPosts = posts.filter((p) => p.id !== Number.parseInt(req.params.id))

    await saveBlogPosts(filteredPosts)
    req.flash("success", "Post deleted successfully")
    res.redirect("/admin/blog")
  } catch (error) {
    console.error("Error deleting post:", error)
    req.flash("error", "Error deleting post")
    res.redirect("/admin/blog")
  }
})

// Contact submissions
router.get("/contacts", async (req, res) => {
  try {
    const contacts = await getContactSubmissions()
    const sortedContacts = contacts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    res.render("admin/contacts", {
      title: "Contact Submissions",
      pageClass: "admin-contacts",
      contacts: sortedContacts,
    })
  } catch (error) {
    console.error("Error loading contacts:", error)
    res.render("admin/contacts", {
      title: "Contact Submissions",
      pageClass: "admin-contacts",
      contacts: [],
    })
  }
})

module.exports = router
