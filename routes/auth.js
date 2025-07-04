const express = require("express")
const bcrypt = require("bcryptjs")
const fs = require("fs-extra")
const path = require("path")
const { body, validationResult } = require("express-validator")
const router = express.Router()

const USERS_DATA_FILE = path.join(__dirname, "../data/users.json")

// Helper functions
async function getUsers() {
  try {
    const exists = await fs.pathExists(USERS_DATA_FILE)
    if (!exists) return []
    return await fs.readJson(USERS_DATA_FILE)
  } catch (error) {
    console.error("Error reading users:", error)
    return []
  }
}

// Login page
router.get("/login", (req, res) => {
  if (req.session.user) {
    return res.redirect("/admin")
  }

  res.render("auth/login", {
    title: "Admin Login",
    pageClass: "login-page",
  })
})

// Handle login
router.post(
  "/login",
  [
    body("username").trim().notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
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
        return res.redirect("/auth/login")
      }

      const { username, password } = req.body
      const users = await getUsers()
      const user = users.find((u) => u.username === username || u.email === username)

      if (!user || !(await bcrypt.compare(password, user.password))) {
        req.flash("error", "Invalid username or password")
        return res.redirect("/auth/login")
      }

      // Set session
      req.session.user = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      }

      req.flash("success", "Welcome back!")
      res.redirect("/admin")
    } catch (error) {
      console.error("Login error:", error)
      req.flash("error", "An error occurred during login")
      res.redirect("/auth/login")
    }
  },
)

// Logout
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err)
    }
    res.redirect("/")
  })
})

module.exports = router
