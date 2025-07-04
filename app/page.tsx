import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight, Code, Database, Brain, Shield, GraduationCap } from "lucide-react"

export default function HomePage() {
  const keySkills = [
    { name: "Python", icon: Code },
    { name: "Data Science", icon: Brain },
    { name: "MySQL", icon: Database },
    { name: "Cybersecurity", icon: Shield },
    { name: "Teaching", icon: GraduationCap },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Welcome to My Portfolio</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            I'm a passionate developer, data scientist, and educator specializing in Python development, data analysis,
            and cybersecurity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/portfolio">
                View My Work <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Key Skills Preview */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Core Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {keySkills.map((skill, index) => {
              const IconComponent = skill.icon
              return (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <IconComponent className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                    <h3 className="font-semibold text-lg">{skill.name}</h3>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quick About */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">About Me</h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            I'm a dedicated professional with expertise in software development, data science, and cybersecurity. As an
            educator, I'm passionate about sharing knowledge and helping others grow in the tech industry. My experience
            spans across multiple programming languages and technologies, with a focus on creating impactful solutions.
          </p>
          <Button asChild variant="outline" size="lg">
            <Link href="/about">Learn More About Me</Link>
          </Button>
        </div>
      </section>

      {/* Recent Work Preview */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Work</h2>
            <p className="text-lg text-gray-600">A glimpse of my recent projects and achievements</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Badge className="mb-4">Data Science</Badge>
                <h3 className="text-xl font-semibold mb-2">Customer Analytics Dashboard</h3>
                <p className="text-gray-600 mb-4">
                  Built a comprehensive analytics platform using Python and machine learning to provide customer
                  insights and predictive analytics.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/portfolio">View Project</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Badge className="mb-4">Cybersecurity</Badge>
                <h3 className="text-xl font-semibold mb-2">Security Assessment Tool</h3>
                <p className="text-gray-600 mb-4">
                  Developed a comprehensive security assessment tool for identifying vulnerabilities and generating
                  detailed security reports.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/portfolio">View Project</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Badge className="mb-4">Education</Badge>
                <h3 className="text-xl font-semibold mb-2">Programming Course Platform</h3>
                <p className="text-gray-600 mb-4">
                  Created an interactive learning platform for teaching Python programming with hands-on exercises and
                  real-time feedback.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/portfolio">View Project</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/portfolio">
                View All Projects <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
