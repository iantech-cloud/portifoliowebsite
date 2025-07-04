const express = require("express")
const fs = require("fs-extra")
const path = require("path")
const router = express.Router()

const BLOG_DATA_FILE = path.join(__dirname, "../data/blog-posts.json")

// Get recent blog posts
async function getRecentBlogPosts(limit = 3) {
  try {
    const exists = await fs.pathExists(BLOG_DATA_FILE)
    if (!exists) return []

    const posts = await fs.readJson(BLOG_DATA_FILE)
    return posts
      .filter((post) => post.status === "published")
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit)
  } catch (error) {
    console.error("Error reading blog posts:", error)
    return []
  }
}

// Home page
router.get("/", async (req, res) => {
  try {
    const recentPosts = await getRecentBlogPosts(3)

    res.render("home", {
      title: "Goldmine Agencies - Professional Services & Solutions",
      pageClass: "home-page",
      recentPosts,
      skills: [
        { name: "Python", level: 90, category: "Programming" },
        { name: "JavaScript", level: 85, category: "Programming" },
        { name: "PHP", level: 80, category: "Programming" },
        { name: "C++", level: 75, category: "Programming" },
        { name: "Data Science", level: 88, category: "Analytics" },
        { name: "Digital Marketing", level: 85, category: "Marketing" },
        { name: "Cybersecurity", level: 70, category: "Security" },
        { name: "Mathematical Computation", level: 92, category: "Analytics" },
      ],
      services: [
        {
          title: "Educational Technology",
          description: "Innovative solutions for modern education",
          icon: "🎓",
        },
        {
          title: "Data Science & Analytics",
          description: "Transform data into actionable insights",
          icon: "📊",
        },
        {
          title: "Digital Marketing",
          description: "Strategic online presence and growth",
          icon: "📱",
        },
        {
          title: "Cybersecurity Consulting",
          description: "Protect your digital assets",
          icon: "🔒",
        },
      ],
    })
  } catch (error) {
    console.error("Error loading home page:", error)
    res.render("home", {
      title: "Goldmine Agencies - Professional Services & Solutions",
      pageClass: "home-page",
      recentPosts: [],
      skills: [],
      services: [],
    })
  }
})

module.exports = router
