import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail, ExternalLink, Code, Palette, Database } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Welcome to My Portfolio
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            I'm a passionate developer creating innovative solutions with modern technologies
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              View My Work
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
              Contact Me
            </Button>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Skills & Technologies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-6 w-6" />
                  Frontend Development
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge>React</Badge>
                  <Badge>Next.js</Badge>
                  <Badge>TypeScript</Badge>
                  <Badge>Tailwind CSS</Badge>
                  <Badge>JavaScript</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-6 w-6" />
                  Backend Development
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge>Node.js</Badge>
                  <Badge>Express</Badge>
                  <Badge>MongoDB</Badge>
                  <Badge>PostgreSQL</Badge>
                  <Badge>API Design</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-6 w-6" />
                  Design & Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge>Figma</Badge>
                  <Badge>Git</Badge>
                  <Badge>Docker</Badge>
                  <Badge>AWS</Badge>
                  <Badge>Vercel</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>E-Commerce Platform</CardTitle>
                <CardDescription>Full-stack e-commerce solution with payment integration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">Node.js</Badge>
                  <Badge variant="secondary">MongoDB</Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Github className="h-4 w-4 mr-2" />
                    Code
                  </Button>
                  <Button size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Demo
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Task Management App</CardTitle>
                <CardDescription>Collaborative task management with real-time updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">Next.js</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">Prisma</Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Github className="h-4 w-4 mr-2" />
                    Code
                  </Button>
                  <Button size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Demo
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weather Dashboard</CardTitle>
                <CardDescription>Beautiful weather app with location-based forecasts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">API Integration</Badge>
                  <Badge variant="secondary">Charts</Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Github className="h-4 w-4 mr-2" />
                    Code
                  </Button>
                  <Button size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Let's Work Together</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            I'm always interested in new opportunities and exciting projects. Let's discuss how we can bring your ideas
            to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              <Mail className="h-5 w-5 mr-2" />
              Get In Touch
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
              <Linkedin className="h-5 w-5 mr-2" />
              LinkedIn
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
