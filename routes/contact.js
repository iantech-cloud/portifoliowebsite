const express = require("express")
const { body, validationResult } = require("express-validator")
const nodemailer = require("nodemailer")
const router = express.Router()

// Contact page
router.get("/", (req, res) => {
  res.render("contact", {
    title: "Contact - Get In Touch",
    pageClass: "contact-page",
  })
})

// Handle contact form submission
router.post(
  "/",
  [
    body("name").trim().isLength({ min: 2 }).withMessage("Name must be at least 2 characters long"),
    body("email").isEmail().withMessage("Please provide a valid email address"),
    body("subject").trim().isLength({ min: 5 }).withMessage("Subject must be at least 5 characters long"),
    body("message").trim().isLength({ min: 10 }).withMessage("Message must be at least 10 characters long"),
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
        return res.redirect("/contact")
      }

      const { name, email, subject, message } = req.body

      // Create email transporter (configure with your email service)
      const transporter = nodemailer.createTransporter({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: process.env.SMTP_PORT || 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })

      // Email options
      const mailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.CONTACT_EMAIL || "your.email@example.com",
        subject: `Portfolio Contact: ${subject}`,
        html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
      }

      // Send email (comment out if no email service configured)
      // await transporter.sendMail(mailOptions);

      // For demo purposes, just log the message
      console.log("Contact form submission:", { name, email, subject, message })

      req.flash("success", "Thank you for your message! I'll get back to you within 24 hours.")
      res.redirect("/contact")
    } catch (error) {
      console.error("Error sending contact email:", error)
      req.flash("error", "There was an error sending your message. Please try again.")
      res.redirect("/contact")
    }
  },
)

module.exports = router
