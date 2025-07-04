const express = require("express")
const router = express.Router()

// GET about page
router.get("/", (req, res) => {
  res.render("about", {
    title: "About - Goldmine Portfolio",
    description:
      "Learn about my background as a Bachelor of Education (Science) graduate, Director of Goldmine Agencies, and expertise in educational technology, data science, and cybersecurity.",
    education: [
      {
        degree: "Bachelor of Education (Science)",
        institution: "University",
        year: "2022",
        description:
          "Specialized in science education with focus on technology integration and innovative teaching methodologies.",
      },
      {
        degree: "Cybersecurity Studies",
        institution: "Professional Development",
        year: "2024 - Present",
        description:
          "Advanced studies in cybersecurity, network security, and digital forensics to enhance expertise in protecting digital assets.",
      },
    ],
    experience: [
      {
        position: "Director",
        company: "Goldmine Agencies",
        period: "2022 - Present (2+ years)",
        description:
          "Leading a team of professionals in delivering educational technology, data science, and digital marketing solutions to clients across various industries.",
        achievements: [
          "Successfully managed 50+ client projects",
          "Developed innovative educational technology solutions",
          "Implemented data-driven marketing strategies",
          "Built comprehensive cybersecurity frameworks",
        ],
      },
      {
        position: "Educational Technology Consultant",
        company: "Freelance",
        period: "2021 - 2022",
        description:
          "Provided consulting services for educational institutions looking to integrate technology into their curriculum and operations.",
      },
    ],
    certifications: [
      "Google Analytics Certified",
      "Facebook Blueprint Certified",
      "Python for Data Science",
      "Cybersecurity Fundamentals",
      "Digital Marketing Professional",
    ],
    personalInfo: {
      location: "Kenya",
      languages: ["English", "Swahili"],
      interests: [
        "Technology Innovation",
        "Data Science",
        "Educational Research",
        "Cybersecurity",
        "Digital Marketing",
      ],
    },
  })
})

module.exports = router
