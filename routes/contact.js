const express = require("express")
const { body, validationResult } = require("express-validator")
const fs = require("fs-extra")
const path = require("path")
const nodemailer = require("nodemailer")
const router = express.Router()

const CONTACT_DATA_FILE = path.join(__dirname, "../data/contact-submissions.json")

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

// Get contact submissions
async function getContactSubmissions() {
  try {
    await fs.ensureFile(CONTACT_DATA_FILE)
    const exists = await fs.pathExists(CONTACT_DATA_FILE)
    if (!exists || (await fs.readFile(CONTACT_DATA_FILE, "utf8")).trim() === "") {
      await fs.writeJson(CONTACT_DATA_FILE, [])
      return []
    }
    return await fs.readJson(CONTACT_DATA_FILE)
  } catch (error) {
    console.error("Error reading contact submissions:", error)
    return []
  }
}

// Save contact submission
async function saveContactSubmission(submission) {
  try {
    const submissions = await getContactSubmissions()
    submissions.push(submission)
    await fs.writeJson(CONTACT_DATA_FILE, submissions, { spaces: 2 })
  } catch (error) {
    console.error("Error saving contact submission:", error)
  }
}

// Contact page
router.get("/", (req, res) => {
  const services = [
    "Educational Technology Development",
    "Data Science & Analytics",
    "Digital Marketing Solutions",
    "Cybersecurity Consulting",
    "Custom Software Development",
    "Mathematical Computation Services",
    "Business Consultation",
    "Training & Workshops",
    "Python Development",
    "PHP Web Development",
    "C++ Programming",
    "JavaScript Applications",
  ]

  res.render("contact", {
    title: "Hire Me - Professional Services",
    services,
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

      const { name, email, phone, company, service, budget, timeline, message, projectType, subject } = req.body

      // Create submission object
      const submission = {
        id: Date.now(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : null,
        company: company ? company.trim() : null,
        service: service || "General Inquiry",
        budget: budget || "Not specified",
        timeline: timeline || "Flexible",
        subject: subject ? subject.trim() : "New Contact Inquiry",
        message: message.trim(),
        projectType: projectType || "Not specified",
        createdAt: new Date().toISOString(),
        read: false,
        status: "new",
      }

      // Save to file
      await saveContactSubmission(submission)

      // Send email notification
      try {
        await sendNotificationEmail(submission)
        await sendAutoReply(submission)
      } catch (emailError) {
        console.error("Email notification failed:", emailError)
        // Don't fail the entire request if email fails
      }

      req.flash("success", "Thank you for your inquiry! I'll get back to you within 24 hours.")
      res.redirect("/contact")
    } catch (error) {
      console.error("Error processing contact form:", error)
      req.flash("error", "An error occurred while processing your request. Please try again.")
      res.redirect("/contact")
    }
  },
)

// Send notification email to admin
async function sendNotificationEmail(submission) {
  try {
    const transporter = nodemailer.createTransporter(SMTP_CONFIG)

    const mailOptions = {
      from: `"Goldmine Portfolio" <${SMTP_CONFIG.auth.user}>`,
      to: ADMIN_EMAIL,
      subject: `New Contact Form Submission - ${submission.service}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${submission.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${submission.email}">${submission.email}</a></p>
            <p><strong>Phone:</strong> ${submission.phone || "Not provided"}</p>
            <p><strong>Company:</strong> ${submission.company || "Not provided"}</p>
          </div>

          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Project Details</h3>
            <p><strong>Service:</strong> ${submission.service}</p>
            <p><strong>Project Type:</strong> ${submission.projectType}</p>
            <p><strong>Budget:</strong> ${submission.budget}</p>
            <p><strong>Timeline:</strong> ${submission.timeline}</p>
          </div>

          <div style="background-color: #fefce8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Subject</h3>
            <p>${submission.subject}</p>
          </div>

          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap;">${submission.message}</p>
          </div>

          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
            <p style="color: #6b7280; font-size: 14px;">
              <strong>Submitted:</strong> ${new Date(submission.createdAt).toLocaleString()}<br>
              <strong>Submission ID:</strong> ${submission.id}
            </p>
          </div>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)
    console.log("Admin notification email sent successfully")
  } catch (error) {
    console.error("Failed to send admin notification email:", error)
    throw error
  }
}

// Send auto-reply to client
async function sendAutoReply(submission) {
  try {
    const transporter = nodemailer.createTransporter(SMTP_CONFIG)

    const mailOptions = {
      from: `"Goldmine Agencies" <${SMTP_CONFIG.auth.user}>`,
      to: submission.email,
      subject: `Thank you for contacting Goldmine Agencies - ${submission.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">Goldmine Agencies</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Professional Services & Solutions</p>
          </div>

          <div style="padding: 30px; background-color: #ffffff; border: 1px solid #e5e7eb;">
            <h2 style="color: #374151; margin-top: 0;">Thank you for your inquiry, ${submission.name}!</h2>
            
            <p style="color: #6b7280; line-height: 1.6;">
              I've received your message regarding <strong>${submission.service}</strong> and will get back to you within 24 hours.
            </p>

            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Your Submission Summary</h3>
              <p><strong>Service:</strong> ${submission.service}</p>
              <p><strong>Project Type:</strong> ${submission.projectType}</p>
              <p><strong>Timeline:</strong> ${submission.timeline}</p>
              <p><strong>Budget:</strong> ${submission.budget}</p>
              <p><strong>Submission ID:</strong> ${submission.id}</p>
            </div>

            <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">About Me</h3>
              <p style="color: #6b7280; line-height: 1.6;">
                I'm a Bachelor of Education (Science) graduate with 2+ years of experience as Director of Goldmine Agencies. 
                I specialize in educational technology, data science, cybersecurity consulting, and custom software development 
                using Python, PHP, C++, and JavaScript.
              </p>
            </div>

            <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">What's Next?</h3>
              <ul style="color: #6b7280; line-height: 1.6; padding-left: 20px;">
                <li>I'll review your requirements in detail</li>
                <li>Prepare a customized proposal for your project</li>
                <li>Schedule a consultation call if needed</li>
                <li>Provide you with a detailed timeline and quote</li>
              </ul>
            </div>

            <p style="color: #6b7280; line-height: 1.6;">
              If you have any urgent questions, feel free to reply to this email or contact me directly.
            </p>

            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #374151; font-weight: bold;">Best regards,</p>
              <p style="color: #6b7280;">Director, Goldmine Agencies</p>
              <p style="color: #6b7280; font-size: 14px;">
                Email: ${ADMIN_EMAIL}<br>
                Specializing in Education Technology, Data Science & Cybersecurity
              </p>
            </div>
          </div>

          <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 12px; margin: 0;">
              This is an automated response. Please do not reply to this email address.
            </p>
          </div>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)
    console.log("Auto-reply email sent successfully")
  } catch (error) {
    console.error("Failed to send auto-reply email:", error)
    throw error
  }
}

module.exports = router
