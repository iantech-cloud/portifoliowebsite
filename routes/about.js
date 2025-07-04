const express = require("express")
const router = express.Router()

// About page
router.get("/", (req, res) => {
  const timeline = [
    {
      year: "2022",
      title: "Bachelor of Education (Science)",
      description:
        "Graduated with a Bachelor of Education degree specializing in Science, building a strong foundation in educational methodologies and scientific principles.",
      type: "education",
    },
    {
      year: "2022-2024",
      title: "Director, Goldmine Agencies",
      description:
        "Founded and led Goldmine Agencies for over 2 years, providing comprehensive business solutions and educational technology services.",
      type: "career",
    },
    {
      year: "2023-Present",
      title: "Cybersecurity Studies",
      description:
        "Currently pursuing advanced studies in cybersecurity to enhance digital security expertise and consulting capabilities.",
      type: "education",
    },
    {
      year: "2024",
      title: "Full-Stack Development",
      description:
        "Expanded technical expertise in Python, PHP, C++, and JavaScript development, focusing on data science and web applications.",
      type: "skill",
    },
  ]

  const expertise = [
    {
      category: "Programming Languages",
      skills: [
        { name: "Python", description: "Data science, automation, and web development" },
        { name: "JavaScript", description: "Frontend and backend web development" },
        { name: "PHP", description: "Server-side development and CMS solutions" },
        { name: "C++", description: "System programming and performance optimization" },
      ],
    },
    {
      category: "Specialized Skills",
      skills: [
        { name: "Data Science", description: "Statistical analysis, machine learning, and data visualization" },
        { name: "Mathematical Computation", description: "Advanced mathematical modeling and computational analysis" },
        { name: "Digital Marketing", description: "SEO, social media strategy, and online presence optimization" },
        { name: "Cybersecurity", description: "Security assessment, risk analysis, and protection strategies" },
      ],
    },
    {
      category: "Business & Education",
      skills: [
        { name: "Educational Technology", description: "E-learning platforms and educational software development" },
        { name: "Business Consultation", description: "Strategic planning and operational optimization" },
        { name: "Project Management", description: "Agile methodologies and team leadership" },
        { name: "Training & Workshops", description: "Technical training and professional development" },
      ],
    },
  ]

  res.render("about", {
    title: "About - Professional Background & Expertise",
    pageClass: "about-page",
    timeline,
    expertise,
  })
})

module.exports = router
