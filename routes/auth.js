const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const fs = require("fs-extra")
const path = require("path")
const { body, validationResult } = require("express-validator")

// Login validation
const loginValidation = [
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("password").notEmpty().withMessage("Password is required"),
]

// GET login page
router.get("/login", (req, res) => {
  if (req.session.user) {
    return res.redirect("/admin")
  }

  res.render("auth/login", {
    title: "Admin Login - Goldmine Portfolio",
    errors: null,
  })
})

// POST login
router.post("/login", loginValidation, async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.render("auth/login", {
        title: "Admin Login - Goldmine Portfolio",
        errors: errors.array(),
      })
    }

    const { username, password } = req.body
    const usersFile = path.join(__dirname, "../data/users.json")

    if (!(await fs.pathExists(usersFile))) {
      return res.render("auth/login", {
        title: "Admin Login - Goldmine Portfolio",
        errors: [{ msg: "Invalid credentials" }],
      })
    }

    const users = await fs.readJson(usersFile)
    const user = users.find((u) => u.username === username)

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.render("auth/login", {
        title: "Admin Login - Goldmine Portfolio",
        errors: [{ msg: "Invalid credentials" }],
      })
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
    res.render("auth/login", {
      title: "Admin Login - Goldmine Portfolio",
      errors: [{ msg: "An error occurred during login" }],
    })
  }
})

// POST logout
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err)
    }
    res.redirect("/")
  })
})

module.exports = router
