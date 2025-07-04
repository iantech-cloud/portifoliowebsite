const express = require("express")
const router = express.Router()
const fs = require("fs-extra")
const path = require("path")
const nodemailer = require("nodemailer")
const { body, validationResult } = require("express-validator")

// SMTP Configuration
const SMTP_CONFIG = {
  host: "das116.truehost.cloud",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "no-reply@hustlehubafrica.com",
    pass: "Yj2cXv5ZV4W37tT",
  },
  tls: {
    rejectUnauthorized: false,
  },
}

const ADMIN_EMAIL = "support@hustlehubafrica.com"

// Create transporter
const transporter = nodemailer.createTransporter(SMTP_CONFIG)

// Verify SMTP connection
transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP connection error:", error)
  } else {
    console.log("✅ SMTP server is ready to send emails")
  }
})

// Contact form validation rules
const contactValidation = [
  body("name").trim().isLength({ min: 2, max: 100 }).withMessage("Name must be between 2 and 100 characters"),
  body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email address"),
  body("phone").optional().isMobilePhone().withMessage("Please provide a valid phone number"),
  body("subject").trim().isLength({ min: 5, max: 200 }).withMessage("Subject must be between 5 and 200 characters"),
  body("message").trim().isLength({ min: 10, max: 2000 }).withMessage("Message must be between 10 and 2000 characters"),
  body("service")
    .optional()
    .isIn([
      "educational-technology",
      "data-science",
      "digital-marketing",
      "cybersecurity",
      "custom-software",
      "mathematical-computation",
      "consultation",
      "other",
    ])
    .withMessage("Please select a valid service"),
  body("budget")
    .optional()
    .isIn(["under-1000", "1000-5000", "5000-10000", "10000-25000", "25000-plus", "discuss"])
    .withMessage("Please select a valid budget range"),
  body("timeline")
    .optional()
    .isIn(["asap", "1-week", "2-4-weeks", "1-3-months", "3-6-months", "6-months-plus"])
    .withMessage("Please select a valid timeline"),
]

// GET contact page
router.get("/", (req, res) => {
  res.render("contact", {
    title: "Contact - Goldmine Portfolio",
    description:
      "Get in touch with Goldmine Agencies for educational technology, data science, digital marketing, and cybersecurity services.",
    errors: null,
    formData: {},
  })
})

// POST contact form
router.post("/", contactValidation, async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.render("contact", {
        title: "Contact - Goldmine Portfolio",
        description:
          "Get in touch with Goldmine Agencies for educational technology, data science, digital marketing, and cybersecurity services.",
        errors: errors.array(),
        formData: req.body,
      })
    }

    const { name, email, phone, subject, message, service, budget, timeline, company } = req.body

    // Create contact submission object
    const submission = {
      id: Date.now(),
      name,
      email,
      phone: phone || null,
      company: company || null,
      subject,
      message,
      service: service || null,
      budget: budget || null,
      timeline: timeline || null,
      submittedAt: new Date().toISOString(),
      status: "new",
      ipAddress: req.ip,
      userAgent: req.get("User-Agent"),
    }

    // Save to file
    const contactFile = path.join(__dirname, "../data/contact-submissions.json")
    let submissions = []

    if (await fs.pathExists(contactFile)) {
      submissions = await fs.readJson(contactFile)
    }

    submissions.unshift(submission)
    await fs.writeJson(contactFile, submissions, { spaces: 2 })

    // Send email to admin
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">New Contact Form Submission</h1>
          <p style="margin: 5px 0 0 0;">Goldmine Portfolio Website</p>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #333; margin-top: 0;">Contact Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Name:</td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            ${
              phone
                ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td>
              <td style="padding: 8px 0;">${phone}</td>
            </tr>
            `
                : ""
            }
            ${
              company
                ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Company:</td>
              <td style="padding: 8px 0;">${company}</td>
            </tr>
            `
                : ""
            }
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Subject:</td>
              <td style="padding: 8px 0;">${subject}</td>
            </tr>
            ${
              service
                ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Service:</td>
              <td style="padding: 8px 0;">${service.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}</td>
            </tr>
            `
                : ""
            }
            ${
              budget
                ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Budget:</td>
              <td style="padding: 8px 0;">${budget.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}</td>
            </tr>
            `
                : ""
            }
            ${
              timeline
                ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Timeline:</td>
              <td style="padding: 8px 0;">${timeline.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}</td>
            </tr>
            `
                : ""
            }
          </table>
          
          <h3 style="color: #333; margin-top: 30px;">Message</h3>
          <div style="background: white; padding: 20px; border-radius: 5px; border-left: 4px solid #667eea;">
            ${message.replace(/\n/g, "<br>")}
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background: #e9ecef; border-radius: 5px;">
            <small style="color: #666;">
              <strong>Submission Details:</strong><br>
              Time: ${new Date(submission.submittedAt).toLocaleString()}<br>
              IP: ${submission.ipAddress}<br>
              ID: ${submission.id}
            </small>
          </div>
        </div>
        
        <div style="background: #333; color: white; padding: 20px; text-align: center;">
          <p style="margin: 0;">© 2024 Goldmine Agencies. All rights reserved.</p>
        </div>
      </div>
    `

    await transporter.sendMail({
      from: `"Goldmine Portfolio" <no-reply@hustlehubafrica.com>`,
      to: ADMIN_EMAIL,
      subject: `New Contact: ${subject}`,
      html: adminEmailHtml,
    })

    // Send auto-reply to user
    const userEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">Thank You for Contacting Us!</h1>
          <p style="margin: 5px 0 0 0;">Goldmine Agencies</p>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <p>Dear ${name},</p>
          
          <p>Thank you for reaching out to Goldmine Agencies! We have received your message and will get back to you within 24 hours.</p>
          
          <div style="background: white; padding: 20px; border-radius: 5px; border-left: 4px solid #667eea; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Your Message Summary:</h3>
            <p><strong>Subject:</strong> ${subject}</p>
            ${service ? `<p><strong>Service:</strong> ${service.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}</p>` : ""}
            <p><strong>Message:</strong></p>
            <p style="font-style: italic;">${message}</p>
          </div>
          
          <h3 style="color: #333;">About Goldmine Agencies</h3>
          <p>As a Bachelor of Education (Science) graduate and Director of Goldmine Agencies with over 2 years of experience, I specialize in:</p>
          <ul style="color: #555;">
            <li>Educational Technology Development</li>
            <li>Data Science & Analytics</li>
            <li>Digital Marketing Solutions</li>
            <li>Cybersecurity Consulting</li>
            <li>Custom Software Development</li>
            <li>Mathematical Computation Services</li>
          </ul>
          
          <p>I'm currently pursuing advanced studies in cybersecurity to further enhance my expertise in protecting digital assets and systems.</p>
          
          <div style="background: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Need immediate assistance?</strong></p>
            <p style="margin: 5px 0 0 0;">Email: <a href="mailto:${ADMIN_EMAIL}">${ADMIN_EMAIL}</a></p>
          </div>
        </div>
        
        <div style="background: #333; color: white; padding: 20px; text-align: center;">
          <p style="margin: 0;">© 2024 Goldmine Agencies. All rights reserved.</p>
          <p style="margin: 5px 0 0 0; font-size: 12px;">This is an automated response. Please do not reply to this email.</p>
        </div>
      </div>
    `

    await transporter.sendMail({
      from: `"Goldmine Agencies" <no-reply@hustlehubafrica.com>`,
      to: email,
      subject: `Thank you for contacting Goldmine Agencies - ${subject}`,
      html: userEmailHtml,
    })

    req.flash("success", "Thank you for your message! We'll get back to you within 24 hours.")
    res.redirect("/contact")
  } catch (error) {
    console.error("Contact form error:", error)
    req.flash("error", "Sorry, there was an error sending your message. Please try again or contact us directly.")
    res.render("contact", {
      title: "Contact - Goldmine Portfolio",
      description:
        "Get in touch with Goldmine Agencies for educational technology, data science, digital marketing, and cybersecurity services.",
      errors: null,
      formData: req.body,
    })
  }
})

module.exports = router
