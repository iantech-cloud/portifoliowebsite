import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ExternalLink, Github, Eye } from "lucide-react"

export default function PortfolioPage() {
  const projects = [
    {
      id: 1,
      title: "Customer Analytics Dashboard",
      category: "Data Science",
      description:
        "A comprehensive analytics platform built with Python and machine learning algorithms to provide customer insights, predictive analytics, and business intelligence. Features include customer segmentation, churn prediction, and revenue forecasting.",
      technologies: ["Python", "Pandas", "Scikit-learn", "Plotly", "Flask", "MySQL"],
      image: "/placeholder.svg?height=300&width=400",
      demoUrl: "#",
      codeUrl: "#",
      featured: true,
      status: "Completed",
    },
    {
      id: 2,
      title: "Security Assessment Tool",
      category: "Cybersecurity",
      description:
        "A comprehensive security assessment tool for identifying vulnerabilities in web applications and networks. Includes automated scanning, detailed reporting, and remediation recommendations.",
      technologies: ["Python", "Nmap", "SQLMap", "BeautifulSoup", "Flask", "PostgreSQL"],
      image: "/placeholder.svg?height=300&width=400",
      demoUrl: "#",
      codeUrl: "#",
      featured: true,
      status: "Completed",
    },
    {
      id: 3,
      title: "E-Learning Platform",
      category: "Education",
      description:
        "An interactive learning platform for teaching Python programming with hands-on exercises, real-time code execution, progress tracking, and automated grading system.",
      technologies: ["PHP", "Laravel", "MySQL", "JavaScript", "Bootstrap", "Docker"],
      image: "/placeholder.svg?height=300&width=400",
      demoUrl: "#",
      codeUrl: "#",
      featured: true,
      status: "Completed",
    },
    {
      id: 4,
      title: "Inventory Management System",
      category: "Web Development",
      description:
        "A full-featured inventory management system with real-time tracking, automated reordering, supplier management, and comprehensive reporting capabilities.",
      technologies: ["PHP", "CodeIgniter", "MySQL", "jQuery", "Chart.js", "Bootstrap"],
      image: "/placeholder.svg?height=300&width=400",
      demoUrl: "#",
      codeUrl: "#",
      featured: false,
      status: "Completed",
    },
    {
      id: 5,
      title: "Data Visualization Suite",
      category: "Data Science",
      description:
        "A powerful data visualization tool that transforms complex datasets into interactive charts, graphs, and dashboards. Supports multiple data sources and export formats.",
      technologies: ["Python", "Streamlit", "Plotly", "Pandas", "NumPy", "SQLAlchemy"],
      image: "/placeholder.svg?height=300&width=400",
      demoUrl: "#",
      codeUrl: "#",
      featured: false,
      status: "Completed",
    },
    {
      id: 6,
      title: "Network Monitoring Dashboard",
      category: "Cybersecurity",
      description:
        "Real-time network monitoring solution with threat detection, traffic analysis, and automated alerting system for suspicious activities.",
      technologies: ["Python", "Scapy", "Flask", "Redis", "D3.js", "WebSocket"],
      image: "/placeholder.svg?height=300&width=400",
      demoUrl: "#",
      codeUrl: "#",
      featured: false,
      status: "In Progress",
    },
    {
      id: 7,
      title: "Student Management Portal",
      category: "Education",
      description:
        "Comprehensive student management system with grade tracking, attendance monitoring, parent communication, and academic performance analytics.",
      technologies: ["PHP", "Laravel", "MySQL", "Vue.js", "Tailwind CSS", "Chart.js"],
      image: "/placeholder.svg?height=300&width=400",
      demoUrl: "#",
      codeUrl: "#",
      featured: false,
      status: "Completed",
    },
    {
      id: 8,
      title: "API Security Scanner",
      category: "Cybersecurity",
      description:
        "Automated API security testing tool that identifies common vulnerabilities like injection attacks, authentication flaws, and data exposure issues.",
      technologies: ["Python", "Requests", "JSON", "SQLite", "Flask", "Swagger"],
      image: "/placeholder.svg?height=300&width=400",
      demoUrl: "#",
      codeUrl: "#",
      featured: false,
      status: "In Progress",
    },
  ]

  const categories = ["All", "Data Science", "Cybersecurity", "Education", "Web Development"]
  const featuredProjects = projects.filter((project) => project.featured)
  const otherProjects = projects.filter((project) => !project.featured)

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Portfolio</h1>
          <p className="text-xl text-gray-600">
            A showcase of my projects across data science, cybersecurity, education, and web development
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Badge
              key={category}
              variant="outline"
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Featured Projects</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-100 relative">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge>{project.category}</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant={project.status === "Completed" ? "default" : "secondary"}>{project.status}</Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button asChild size="sm" className="flex-1">
                      <Link href={project.demoUrl}>
                        <Eye className="h-4 w-4 mr-1" />
                        Demo
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Link href={project.codeUrl}>
                        <Github className="h-4 w-4 mr-1" />
                        Code
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Other Projects */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Other Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    <div className="flex gap-2">
                      <Badge variant="outline">{project.category}</Badge>
                      <Badge variant={project.status === "Completed" ? "default" : "secondary"} className="text-xs">
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 4).map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 4} more
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button asChild size="sm" variant="outline">
                      <Link href={project.demoUrl}>
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View
                      </Link>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <Link href={project.codeUrl}>
                        <Github className="h-3 w-3 mr-1" />
                        Code
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Interested in Working Together?</h2>
          <p className="text-gray-600 mb-6">
            I'm always open to discussing new projects and opportunities. Let's create something amazing together!
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Get In Touch</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
