const express = require("express")
const router = express.Router()

// Sample data - in production, this would come from a database
const featuredProjects = [
  {
    id: 1,
    title: "Customer Analytics Dashboard",
    description:
      "Built a comprehensive analytics platform using Python and machine learning to provide customer insights and predictive analytics.",
    category: "Data Science",
    technologies: ["Python", "Pandas", "Scikit-learn", "Plotly", "Flask", "MySQL"],
    image: "/images/project1.jpg",
  },
  {
    id: 2,
    title: "Security Assessment Tool",
    description:
      "Developed a comprehensive security assessment tool for identifying vulnerabilities and generating detailed security reports.",
    category: "Cybersecurity",
    technologies: ["Python", "Nmap", "SQLMap", "BeautifulSoup", "Flask", "PostgreSQL"],
    image: "/images/project2.jpg",
  },
  {
    id: 3,
    title: "Programming Course Platform",
    description:
      "Created an interactive learning platform for teaching Python programming with hands-on exercises and real-time feedback.",
    category: "Education",
    technologies: ["PHP", "Laravel", "MySQL", "JavaScript", "Bootstrap", "Docker"],
    image: "/images/project3.jpg",
  },
]

const keySkills = [
  { name: "Python", icon: "code" },
  { name: "Data Science", icon: "brain" },
  { name: "MySQL", icon: "database" },
  { name: "Cybersecurity", icon: "shield" },
  { name: "Teaching", icon: "graduation-cap" },
]

router.get("/", (req, res) => {
  res.render("home", {
    title: "Professional Portfolio - Home",
    featuredProjects,
    keySkills,
    pageClass: "home-page",
  })
})

module.exports = router
