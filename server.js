const express = require("express")
const path = require("path")
const helmet = require("helmet")
const compression = require("compression")
const rateLimit = require("express-rate-limit")
const session = require("express-session")
const flash = require("connect-flash")
const cors = require("cors")
const fs = require("fs-extra")
const multer = require("multer")
const bcrypt = require("bcryptjs")

const app = express()

// Ensure required directories exist
async function ensureDirectories() {
  try {
    await fs.ensureDir(path.join(__dirname, "data"))
    await fs.ensureDir(path.join(__dirname, "public/uploads"))
    await fs.ensureDir(path.join(__dirname, "public/uploads/blog"))

    // Create blog posts file if it doesn't exist
    const blogFile = path.join(__dirname, "data/blog-posts.json")
    if (!(await fs.pathExists(blogFile))) {
      await fs.writeJson(blogFile, [])
    }

    // Create users file if it doesn't exist
    const usersFile = path.join(__dirname, "data/users.json")
    if (!(await fs.pathExists(usersFile))) {
      const defaultUser = {
        id: 1,
        username: "admin",
        email: "admin@goldmineagencies.com",
        password: await bcrypt.hash("admin123", 10),
        role: "admin",
        createdAt: new Date().toISOString(),
      }
      await fs.writeJson(usersFile, [defaultUser])
    }

    // Create contact submissions file
    const contactFile = path.join(__dirname, "data/contact-submissions.json")
    if (!(await fs.pathExists(contactFile))) {
      await fs.writeJson(contactFile, [])
    }
  } catch (error) {
    console.error("Error ensuring directories:", error)
  }
}

// Initialize directories
ensureDirectories()

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/blog/")
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname))
  },
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)

    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error("Only image files are allowed"))
    }
  },
})

// Import routes
const homeRoutes = require("./routes/home")
const aboutRoutes = require("./routes/about")
const skillsRoutes = require("./routes/skills")
const portfolioRoutes = require("./routes/portfolio")
const servicesRoutes = require("./routes/services")
const blogRoutes = require("./routes/blog")
const contactRoutes = require("./routes/contact")
const adminRoutes = require("./routes/admin")
const authRoutes = require("./routes/auth")

// Get port from environment or default
const PORT = process.env.PORT || 3000

// Security middleware with relaxed CSP for shared hosting
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://cdn.tailwindcss.com",
          "https://cdnjs.cloudflare.com",
          "https://cdn.quilljs.com",
          "https://fonts.googleapis.com",
        ],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          "https://cdn.tailwindcss.com",
          "https://cdn.quilljs.com",
        ],
        imgSrc: ["'self'", "data:", "https:", "http:"],
        fontSrc: [
          "'self'",
          "https://cdnjs.cloudflare.com",
          "https://fonts.googleapis.com",
          "https://fonts.gstatic.com",
        ],
        connectSrc: ["'self'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  }),
)

// Rate limiting - more lenient for shared hosting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // increased limit for shared hosting
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
})
app.use(limiter)

// Middleware
app.use(compression())
app.use(cors())
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "goldmine-portfolio-secret-key-2024",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production" && process.env.HTTPS === "true",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      httpOnly: true,
    },
  }),
)

app.use(flash())

// View engine setup
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// Static files with proper caching
app.use(
  express.static(path.join(__dirname, "public"), {
    maxAge: process.env.NODE_ENV === "production" ? "1y" : "0",
    etag: true,
    lastModified: true,
  }),
)

// Global middleware for template variables
app.use((req, res, next) => {
  res.locals.currentPath = req.path
  res.locals.messages = req.flash()
  res.locals.user = req.session.user || null
  res.locals.siteUrl = process.env.SITE_URL || `http://localhost:${PORT}`
  res.locals.siteName = "Goldmine Portfolio"
  res.locals.ownerName = "Director, Goldmine Agencies"
  next()
})

// Health check endpoint for monitoring
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
  })
})

// Routes
app.use("/", homeRoutes)
app.use("/about", aboutRoutes)
app.use("/skills", skillsRoutes)
app.use("/portfolio", portfolioRoutes)
app.use("/services", servicesRoutes)
app.use("/blog", blogRoutes)
app.use("/contact", contactRoutes)
app.use("/admin", adminRoutes)
app.use("/auth", authRoutes)

// File upload endpoint
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" })
  }

  const fileUrl = `/uploads/blog/${req.file.filename}`
  res.json({ url: fileUrl })
})

// 404 handler
app.use((req, res) => {
  res.status(404).render("404", {
    title: "Page Not Found",
    message: "The page you are looking for does not exist.",
  })
})

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.stack)

  // Don't expose error details in production
  const message = process.env.NODE_ENV === "production" ? "Something went wrong!" : err.message

  res.status(err.status || 500).render("error", {
    title: "Server Error",
    message: message,
  })
})

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully")
  process.exit(0)
})

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully")
  process.exit(0)
})

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Goldmine Portfolio Server Started`)
  console.log(`📱 Port: ${PORT}`)
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`)
  console.log(`⏰ Started at: ${new Date().toISOString()}`)
  console.log(`👤 Default Admin: admin / admin123`)

  if (process.env.NODE_ENV !== "production") {
    console.log(`🔗 Local URL: http://localhost:${PORT}`)
  }
})

// Handle server errors
server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} is already in use`)
    process.exit(1)
  } else {
    console.error("❌ Server error:", error)
  }
})

module.exports = app
