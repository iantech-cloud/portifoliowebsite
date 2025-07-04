const express = require("express")
const router = express.Router()

// Services page
router.get("/", (req, res) => {
  const services = [
    {
      id: "educational-technology",
      title: "Educational Technology Development",
      description: "Custom e-learning platforms, educational software, and digital learning solutions",
      features: [
        "Learning Management Systems (LMS)",
        "Interactive Educational Content",
        "Student Assessment Tools",
        "Virtual Classroom Solutions",
        "Educational Mobile Apps",
      ],
      technologies: ["Python", "JavaScript", "PHP", "React", "Node.js"],
      pricing: "Starting from $2,000",
      timeline: "4-8 weeks",
    },
    {
      id: "data-science",
      title: "Data Science & Analytics",
      description: "Transform your data into actionable insights with advanced analytics and machine learning",
      features: [
        "Data Analysis & Visualization",
        "Predictive Modeling",
        "Machine Learning Solutions",
        "Statistical Analysis",
        "Business Intelligence Dashboards",
      ],
      technologies: ["Python", "R", "SQL", "TensorFlow", "Pandas"],
      pricing: "Starting from $1,500",
      timeline: "3-6 weeks",
    },
    {
      id: "digital-marketing",
      title: "Digital Marketing Solutions",
      description: "Comprehensive digital marketing strategies to grow your online presence",
      features: [
        "SEO Optimization",
        "Social Media Strategy",
        "Content Marketing",
        "PPC Campaign Management",
        "Analytics & Reporting",
      ],
      technologies: ["Google Analytics", "SEMrush", "Social Media APIs"],
      pricing: "Starting from $800/month",
      timeline: "Ongoing",
    },
    {
      id: "cybersecurity",
      title: "Cybersecurity Consulting",
      description: "Protect your digital assets with comprehensive security assessments and solutions",
      features: [
        "Security Audits",
        "Vulnerability Assessments",
        "Risk Analysis",
        "Security Policy Development",
        "Incident Response Planning",
      ],
      technologies: ["Security Tools", "Penetration Testing", "Risk Assessment"],
      pricing: "Starting from $1,200",
      timeline: "2-4 weeks",
    },
    {
      id: "software-development",
      title: "Custom Software Development",
      description: "Tailored software solutions built with modern technologies",
      features: ["Web Applications", "Desktop Software", "API Development", "Database Design", "System Integration"],
      technologies: ["Python", "JavaScript", "PHP", "C++", "MySQL"],
      pricing: "Starting from $3,000",
      timeline: "6-12 weeks",
    },
    {
      id: "mathematical-computation",
      title: "Mathematical Computation Services",
      description: "Advanced mathematical modeling and computational analysis",
      features: [
        "Statistical Modeling",
        "Numerical Analysis",
        "Algorithm Development",
        "Mathematical Optimization",
        "Scientific Computing",
      ],
      technologies: ["Python", "MATLAB", "R", "NumPy", "SciPy"],
      pricing: "Starting from $1,000",
      timeline: "2-5 weeks",
    },
  ]

  const packages = [
    {
      name: "Starter Package",
      price: "$2,500",
      description: "Perfect for small businesses and startups",
      features: ["Basic website development", "SEO optimization", "Social media setup", "3 months support"],
    },
    {
      name: "Professional Package",
      price: "$5,000",
      description: "Comprehensive solution for growing businesses",
      features: [
        "Custom web application",
        "Data analytics dashboard",
        "Digital marketing strategy",
        "6 months support",
        "Training included",
      ],
    },
    {
      name: "Enterprise Package",
      price: "$10,000+",
      description: "Full-scale solutions for large organizations",
      features: [
        "Complete system development",
        "Advanced analytics & AI",
        "Cybersecurity assessment",
        "12 months support",
        "Dedicated project manager",
      ],
    },
  ]

  res.render("services", {
    title: "Professional Services - Goldmine Agencies",
    pageClass: "services-page",
    services,
    packages,
  })
})

// Individual service page
router.get("/:serviceId", (req, res) => {
  const serviceId = req.params.serviceId

  // This would typically fetch from a database
  const serviceDetails = {
    "educational-technology": {
      id: "educational-technology",
      title: "Educational Technology Development",
      description: "Custom e-learning platforms, educational software, and digital learning solutions",
      longDescription:
        "As an educator with a Bachelor of Education (Science) and extensive experience in technology, I specialize in creating innovative educational technology solutions that bridge the gap between traditional teaching methods and modern digital learning environments.",
      features: [
        "Learning Management Systems (LMS)",
        "Interactive Educational Content",
        "Student Assessment Tools",
        "Virtual Classroom Solutions",
        "Educational Mobile Apps",
      ],
      benefits: [
        "Improved student engagement and learning outcomes",
        "Streamlined administrative processes",
        "Real-time progress tracking and analytics",
        "Scalable solutions for institutions of all sizes",
        "Integration with existing educational systems",
      ],
      process: [
        "Initial consultation and needs assessment",
        "Custom solution design and planning",
        "Development and testing phases",
        "Implementation and staff training",
        "Ongoing support and maintenance",
      ],
      technologies: ["Python", "JavaScript", "PHP", "React", "Node.js"],
      pricing: "Starting from $2,000",
      timeline: "4-8 weeks",
      portfolio: [
        "University Learning Management System",
        "K-12 Interactive Science Platform",
        "Professional Development Portal",
      ],
    },
    "data-science": {
      id: "data-science",
      title: "Data Science & Analytics",
      description: "Transform your data into actionable insights with advanced analytics and machine learning",
      longDescription:
        "Our data science and analytics services leverage cutting-edge technologies to provide you with deep insights and actionable strategies based on your data.",
      features: [
        "Data Analysis & Visualization",
        "Predictive Modeling",
        "Machine Learning Solutions",
        "Statistical Analysis",
        "Business Intelligence Dashboards",
      ],
      benefits: [
        "Data-driven decision making",
        "Enhanced operational efficiency",
        "Improved customer insights",
        "Scalable solutions for data growth",
        "Integration with existing data systems",
      ],
      process: [
        "Data collection and preparation",
        "Model design and development",
        "Testing and validation",
        "Deployment and monitoring",
        "Ongoing support and updates",
      ],
      technologies: ["Python", "R", "SQL", "TensorFlow", "Pandas"],
      pricing: "Starting from $1,500",
      timeline: "3-6 weeks",
      portfolio: ["Financial Market Analysis", "Customer Behavior Prediction", "Healthcare Data Insights"],
    },
    "digital-marketing": {
      id: "digital-marketing",
      title: "Digital Marketing Solutions",
      description: "Comprehensive digital marketing strategies to grow your online presence",
      longDescription:
        "Our digital marketing solutions are designed to help you reach your target audience effectively and grow your online presence.",
      features: [
        "SEO Optimization",
        "Social Media Strategy",
        "Content Marketing",
        "PPC Campaign Management",
        "Analytics & Reporting",
      ],
      benefits: [
        "Increased website traffic",
        "Higher conversion rates",
        "Enhanced brand visibility",
        "Cost-effective marketing strategies",
        "Data-driven optimization",
      ],
      process: [
        "Market research and analysis",
        "Strategy development",
        "Implementation of campaigns",
        "Monitoring and reporting",
        "Adjustments based on performance",
      ],
      technologies: ["Google Analytics", "SEMrush", "Social Media APIs"],
      pricing: "Starting from $800/month",
      timeline: "Ongoing",
      portfolio: ["E-commerce Marketing Campaign", "Corporate Branding Strategy", "Non-profit Fundraising Campaign"],
    },
    cybersecurity: {
      id: "cybersecurity",
      title: "Cybersecurity Consulting",
      description: "Protect your digital assets with comprehensive security assessments and solutions",
      longDescription:
        "Our cybersecurity consulting services help you identify and mitigate potential security risks to protect your digital assets.",
      features: [
        "Security Audits",
        "Vulnerability Assessments",
        "Risk Analysis",
        "Security Policy Development",
        "Incident Response Planning",
      ],
      benefits: [
        "Enhanced security posture",
        "Protection against cyber threats",
        "Compliance with industry standards",
        "Reduced risk of data breaches",
        "Customized security solutions",
      ],
      process: [
        "Risk assessment and vulnerability scanning",
        "Security policy development",
        "Implementation of security measures",
        "Staff training and awareness programs",
        "Ongoing monitoring and support",
      ],
      technologies: ["Security Tools", "Penetration Testing", "Risk Assessment"],
      pricing: "Starting from $1,200",
      timeline: "2-4 weeks",
      portfolio: [
        "Financial Institution Security Audit",
        "Healthcare Data Protection",
        "Corporate Cybersecurity Strategy",
      ],
    },
    "software-development": {
      id: "software-development",
      title: "Custom Software Development",
      description: "Tailored software solutions built with modern technologies",
      longDescription:
        "Our custom software development services create tailored solutions that meet your unique business needs.",
      features: ["Web Applications", "Desktop Software", "API Development", "Database Design", "System Integration"],
      benefits: [
        "Increased productivity",
        "Enhanced user experience",
        "Scalable solutions",
        "Customized features",
        "Integration with existing systems",
      ],
      process: [
        "Requirements gathering and analysis",
        "Design and architecture planning",
        "Development and testing",
        "Deployment and implementation",
        "Ongoing support and maintenance",
      ],
      technologies: ["Python", "JavaScript", "PHP", "C++", "MySQL"],
      pricing: "Starting from $3,000",
      timeline: "6-12 weeks",
      portfolio: [
        "E-commerce Platform",
        "Enterprise Resource Planning (ERP) System",
        "Customer Relationship Management (CRM) Software",
      ],
    },
    "mathematical-computation": {
      id: "mathematical-computation",
      title: "Mathematical Computation Services",
      description: "Advanced mathematical modeling and computational analysis",
      longDescription:
        "Our mathematical computation services provide advanced modeling and analysis to solve complex problems.",
      features: [
        "Statistical Modeling",
        "Numerical Analysis",
        "Algorithm Development",
        "Mathematical Optimization",
        "Scientific Computing",
      ],
      benefits: [
        "Accurate predictions and insights",
        "Efficient problem-solving",
        "Improved decision-making",
        "Scalable computational solutions",
        "Integration with existing systems",
      ],
      process: [
        "Problem definition and requirements",
        "Model design and development",
        "Implementation and testing",
        "Deployment and monitoring",
        "Ongoing support and updates",
      ],
      technologies: ["Python", "MATLAB", "R", "NumPy", "SciPy"],
      pricing: "Starting from $1,000",
      timeline: "2-5 weeks",
      portfolio: ["Financial Modeling", "Scientific Research Analysis", "Engineering Simulation Tools"],
    },
  }

  const service = serviceDetails[serviceId]

  if (!service) {
    return res.status(404).render("404", {
      title: "Service Not Found",
      message: "The requested service could not be found.",
    })
  }

  res.render("service-detail", {
    title: `${service.title} - Goldmine Agencies`,
    pageClass: "service-detail-page",
    service,
  })
})

module.exports = router
