const express = require("express")
const router = express.Router()
const fs = require("fs-extra")
const path = require("path")

// GET home page
router.get("/", async (req, res) => {
  try {
    // Get recent blog posts for homepage
    const blogFile = path.join(__dirname, "../data/blog-posts.json")
    let recentPosts = []

    if (await fs.pathExists(blogFile)) {
      const posts = await fs.readJson(blogFile)
      recentPosts = posts
        .filter((post) => post.status === "published")
        .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
        .slice(0, 3)
    }

    res.render("home", {
      title: "Goldmine Portfolio - Educational Technology & Data Science Expert",
      description:
        "Bachelor of Education (Science) graduate and Director of Goldmine Agencies. Specializing in educational technology, data science, digital marketing, and cybersecurity solutions.",
      recentPosts,
      skills: [
        { name: "Python", level: 90, category: "Programming" },
        { name: "JavaScript", level: 85, category: "Programming" },
        { name: "PHP", level: 80, category: "Programming" },
        { name: "C++", level: 75, category: "Programming" },
        { name: "Data Science", level: 88, category: "Analytics" },
        { name: "Machine Learning", level: 82, category: "Analytics" },
        { name: "Digital Marketing", level: 90, category: "Marketing" },
        { name: "SEO/SEM", level: 85, category: "Marketing" },
        { name: "Cybersecurity", level: 78, category: "Security" },
        { name: "Network Security", level: 75, category: "Security" },
      ],
      services: [
        {
          title: "Educational Technology",
          description: "Developing innovative educational solutions and learning management systems",
          icon: "graduation-cap",
          features: ["LMS Development", "E-learning Platforms", "Educational Apps", "Assessment Tools"],
        },
        {
          title: "Data Science & Analytics",
          description: "Advanced data analysis, visualization, and machine learning solutions",
          icon: "chart-bar",
          features: ["Data Analysis", "Machine Learning", "Predictive Modeling", "Data Visualization"],
        },
        {
          title: "Digital Marketing",
          description: "Comprehensive digital marketing strategies and campaign management",
          icon: "megaphone",
          features: ["SEO/SEM", "Social Media Marketing", "Content Strategy", "Analytics & Reporting"],
        },
        {
          title: "Cybersecurity Consulting",
          description: "Security assessments, vulnerability testing, and protection strategies",
          icon: "shield-check",
          features: ["Security Audits", "Penetration Testing", "Risk Assessment", "Security Training"],
        },
      ],
    })
  } catch (error) {
    console.error("Home page error:", error)
    res.render("home", {
      title: "Goldmine Portfolio - Educational Technology & Data Science Expert",
      description:
        "Bachelor of Education (Science) graduate and Director of Goldmine Agencies. Specializing in educational technology, data science, digital marketing, and cybersecurity solutions.",
      recentPosts: [],
      skills: [],
      services: [],
    })
  }
})

module.exports = router
