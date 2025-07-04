const express = require("express")
const router = express.Router()

// Services page
router.get("/", (req, res) => {
  const services = [
    {
      id: "educational-technology",
      title: "Educational Technology Development",
      description:
        "Comprehensive educational technology solutions designed to enhance learning experiences and institutional efficiency.",
      icon: "graduation-cap",
      features: [
        "Learning Management Systems (LMS)",
        "E-learning Platform Development",
        "Educational Mobile Applications",
        "Student Assessment Tools",
        "Virtual Classroom Solutions",
        "Educational Content Management",
        "Integration with Existing Systems",
        "Training and Support",
      ],
      pricing: "Starting from $2,000",
      timeline: "2-8 weeks",
      technologies: ["PHP", "JavaScript", "Python", "MySQL", "React", "Node.js"],
    },
    {
      id: "data-science",
      title: "Data Science & Analytics",
      description:
        "Advanced data analysis, machine learning, and business intelligence solutions to drive informed decision-making.",
      icon: "chart-bar",
      features: [
        "Data Analysis & Visualization",
        "Machine Learning Models",
        "Predictive Analytics",
        "Business Intelligence Dashboards",
        "Statistical Analysis",
        "Data Mining & Processing",
        "Custom Analytics Solutions",
        "Performance Reporting",
      ],
      pricing: "Starting from $1,500",
      timeline: "1-6 weeks",
      technologies: ["Python", "R", "SQL", "Tableau", "Power BI", "TensorFlow", "Pandas", "NumPy"],
    },
    {
      id: "digital-marketing",
      title: "Digital Marketing Solutions",
      description: "Comprehensive digital marketing strategies to boost online presence and drive business growth.",
      icon: "megaphone",
      features: [
        "Search Engine Optimization (SEO)",
        "Pay-Per-Click (PPC) Campaigns",
        "Social Media Marketing",
        "Content Marketing Strategy",
        "Email Marketing Automation",
        "Conversion Rate Optimization",
        "Analytics & Performance Tracking",
        "Brand Development",
      ],
      pricing: "Starting from $800/month",
      timeline: "Ongoing",
      technologies: ["Google Ads", "Facebook Ads", "Google Analytics", "SEMrush", "Mailchimp", "WordPress"],
    },
    {
      id: "cybersecurity",
      title: "Cybersecurity Consulting",
      description:
        "Comprehensive cybersecurity services to protect your digital assets and ensure business continuity.",
      icon: "shield-check",
      features: [
        "Security Risk Assessment",
        "Vulnerability Testing",
        "Penetration Testing",
        "Security Policy Development",
        "Incident Response Planning",
        "Employee Security Training",
        "Compliance Auditing",
        "Network Security Implementation",
      ],
      pricing: "Starting from $1,200",
      timeline: "1-4 weeks",
      technologies: ["Kali Linux", "Metasploit", "Wireshark", "Nmap", "OWASP", "Burp Suite"],
    },
    {
      id: "custom-software",
      title: "Custom Software Development",
      description: "Tailored software solutions designed to meet specific business requirements and objectives.",
      icon: "code",
      features: [
        "Web Application Development",
        "Mobile App Development",
        "Desktop Application Development",
        "API Development & Integration",
        "Database Design & Management",
        "System Architecture Planning",
        "Quality Assurance Testing",
        "Maintenance & Support",
      ],
      pricing: "Starting from $3,000",
      timeline: "4-16 weeks",
      technologies: ["PHP", "JavaScript", "Python", "C++", "React", "Node.js", "MySQL", "MongoDB"],
    },
    {
      id: "mathematical-computation",
      title: "Mathematical Computation Services",
      description:
        "Advanced mathematical modeling, statistical analysis, and computational solutions for complex problems.",
      icon: "calculator",
      features: [
        "Mathematical Modeling",
        "Statistical Analysis",
        "Numerical Computation",
        "Algorithm Development",
        "Optimization Problems",
        "Scientific Computing",
        "Research Data Analysis",
        "Custom Mathematical Tools",
      ],
      pricing: "Starting from $500",
      timeline: "1-3 weeks",
      technologies: ["Python", "MATLAB", "R", "Mathematica", "NumPy", "SciPy", "Jupyter"],
    },
  ]

  res.render("services", {
    title: "Services - Goldmine Portfolio",
    description:
      "Professional services in educational technology, data science, digital marketing, cybersecurity, and custom software development.",
    services,
  })
})

// Individual service page
router.get("/:serviceId", (req, res) => {
  const serviceId = req.params.serviceId

  // This would typically fetch from a database
  const services = [
    {
      id: "educational-technology",
      title: "Educational Technology Development",
      description:
        "Comprehensive educational technology solutions designed to enhance learning experiences and institutional efficiency.",
      icon: "graduation-cap",
      features: [
        "Learning Management Systems (LMS)",
        "E-learning Platform Development",
        "Educational Mobile Applications",
        "Student Assessment Tools",
        "Virtual Classroom Solutions",
        "Educational Content Management",
        "Integration with Existing Systems",
        "Training and Support",
      ],
      pricing: "Starting from $2,000",
      timeline: "2-8 weeks",
      technologies: ["PHP", "JavaScript", "Python", "MySQL", "React", "Node.js"],
    },
    {
      id: "data-science",
      title: "Data Science & Analytics",
      description:
        "Advanced data analysis, machine learning, and business intelligence solutions to drive informed decision-making.",
      icon: "chart-bar",
      features: [
        "Data Analysis & Visualization",
        "Machine Learning Models",
        "Predictive Analytics",
        "Business Intelligence Dashboards",
        "Statistical Analysis",
        "Data Mining & Processing",
        "Custom Analytics Solutions",
        "Performance Reporting",
      ],
      pricing: "Starting from $1,500",
      timeline: "1-6 weeks",
      technologies: ["Python", "R", "SQL", "Tableau", "Power BI", "TensorFlow", "Pandas", "NumPy"],
    },
    {
      id: "digital-marketing",
      title: "Digital Marketing Solutions",
      description: "Comprehensive digital marketing strategies to boost online presence and drive business growth.",
      icon: "megaphone",
      features: [
        "Search Engine Optimization (SEO)",
        "Pay-Per-Click (PPC) Campaigns",
        "Social Media Marketing",
        "Content Marketing Strategy",
        "Email Marketing Automation",
        "Conversion Rate Optimization",
        "Analytics & Performance Tracking",
        "Brand Development",
      ],
      pricing: "Starting from $800/month",
      timeline: "Ongoing",
      technologies: ["Google Ads", "Facebook Ads", "Google Analytics", "SEMrush", "Mailchimp", "WordPress"],
    },
    {
      id: "cybersecurity",
      title: "Cybersecurity Consulting",
      description:
        "Comprehensive cybersecurity services to protect your digital assets and ensure business continuity.",
      icon: "shield-check",
      features: [
        "Security Risk Assessment",
        "Vulnerability Testing",
        "Penetration Testing",
        "Security Policy Development",
        "Incident Response Planning",
        "Employee Security Training",
        "Compliance Auditing",
        "Network Security Implementation",
      ],
      pricing: "Starting from $1,200",
      timeline: "1-4 weeks",
      technologies: ["Kali Linux", "Metasploit", "Wireshark", "Nmap", "OWASP", "Burp Suite"],
    },
    {
      id: "custom-software",
      title: "Custom Software Development",
      description: "Tailored software solutions designed to meet specific business requirements and objectives.",
      icon: "code",
      features: [
        "Web Application Development",
        "Mobile App Development",
        "Desktop Application Development",
        "API Development & Integration",
        "Database Design & Management",
        "System Architecture Planning",
        "Quality Assurance Testing",
        "Maintenance & Support",
      ],
      pricing: "Starting from $3,000",
      timeline: "4-16 weeks",
      technologies: ["PHP", "JavaScript", "Python", "C++", "React", "Node.js", "MySQL", "MongoDB"],
    },
    {
      id: "mathematical-computation",
      title: "Mathematical Computation Services",
      description:
        "Advanced mathematical modeling, statistical analysis, and computational solutions for complex problems.",
      icon: "calculator",
      features: [
        "Mathematical Modeling",
        "Statistical Analysis",
        "Numerical Computation",
        "Algorithm Development",
        "Optimization Problems",
        "Scientific Computing",
        "Research Data Analysis",
        "Custom Mathematical Tools",
      ],
      pricing: "Starting from $500",
      timeline: "1-3 weeks",
      technologies: ["Python", "MATLAB", "R", "Mathematica", "NumPy", "SciPy", "Jupyter"],
    },
  ]

  const service = services.find((s) => s.id === serviceId)

  if (!service) {
    return res.status(404).render("404", {
      title: "Service Not Found",
      message: "The service you are looking for does not exist.",
    })
  }

  res.render("service-detail", {
    title: `${service.title} - Goldmine Portfolio`,
    description: service.description,
    service,
    relatedServices: services.filter((s) => s.id !== serviceId).slice(0, 3),
  })
})

module.exports = router
