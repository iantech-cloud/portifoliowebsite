import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Database,
  Globe,
  Smartphone,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-primary/5 to-emerald-500/10" />
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000' fillOpacity='0.02'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold font-poppins">
                  Hi, I'm <span className="gradient-text">Ian Muiruri</span>
                </h1>
                <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground font-poppins">
                  Full Stack Developer & Digital Innovator
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                  Passionate about creating exceptional digital experiences with modern technologies. I build scalable
                  web applications, mobile solutions, and innovative digital products that make a difference.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8 py-6 rounded-xl hover-lift" asChild>
                  <Link href="/portfolio">
                    <Code className="mr-2 h-5 w-5" />
                    View My Work
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 rounded-xl hover-lift glass-effect bg-transparent"
                  asChild
                >
                  <Link href="/contact">
                    <Mail className="mr-2 h-5 w-5" />
                    Get In Touch
                  </Link>
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full hover-lift" asChild>
                  <Link href="https://github.com/ianmuiruri" target="_blank" rel="noopener noreferrer">
                    <Github className="h-6 w-6" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full hover-lift" asChild>
                  <Link href="https://linkedin.com/in/ianmuiruri" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-6 w-6" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full hover-lift" asChild>
                  <Link href="mailto:ian@ianmuiruri.dev">
                    <Mail className="h-6 w-6" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full hover-lift" asChild>
                  <Link href="tel:+254748264231">
                    <Phone className="h-6 w-6" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-400 to-emerald-400 rounded-3xl blur-2xl opacity-20 animate-pulse" />
                <div className="relative glass-effect rounded-3xl p-8 hover-lift">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                    alt="Ian Muiruri Waigango"
                    width={400}
                    height={400}
                    className="rounded-2xl w-full h-auto"
                    priority
                  />
                  <div className="absolute -bottom-4 -right-4 glass-effect rounded-2xl p-4">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                      Available for work
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-effect hover-lift">
              <CardContent className="p-6 text-center">
                <MapPin className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-1">Location</h3>
                <p className="text-muted-foreground">Nairobi, Kenya</p>
              </CardContent>
            </Card>
            <Card className="glass-effect hover-lift">
              <CardContent className="p-6 text-center">
                <Phone className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-1">Phone</h3>
                <p className="text-muted-foreground">+254 748 264 231</p>
              </CardContent>
            </Card>
            <Card className="glass-effect hover-lift">
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-1">Experience</h3>
                <p className="text-muted-foreground">5+ Years</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-4">
              Technical <span className="gradient-text">Expertise</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Specialized in modern technologies and frameworks to deliver cutting-edge solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="glass-effect hover-lift group">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Code className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="font-poppins">Frontend Development</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    React
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Next.js
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    TypeScript
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Tailwind CSS
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect hover-lift group">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Database className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="font-poppins">Backend Development</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge
                    variant="secondary"
                    className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                  >
                    Node.js
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                  >
                    Python
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                  >
                    PostgreSQL
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                  >
                    MongoDB
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect hover-lift group">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="font-poppins">Cloud & DevOps</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                  >
                    AWS
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                  >
                    Docker
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                  >
                    Vercel
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                  >
                    CI/CD
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect hover-lift group">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Smartphone className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="font-poppins">Mobile Development</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge
                    variant="secondary"
                    className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                  >
                    React Native
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                  >
                    Flutter
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                  >
                    iOS
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                  >
                    Android
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A showcase of my recent work and innovative solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="glass-effect hover-lift group overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
                  alt="E-Commerce Platform"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-emerald-500 text-white">Live</Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between font-poppins">
                  E-Commerce Platform
                  <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardTitle>
                <CardDescription>
                  Full-stack e-commerce solution with advanced features including payment integration, inventory
                  management, and real-time analytics.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">Next.js</Badge>
                  <Badge variant="outline">Stripe</Badge>
                  <Badge variant="outline">PostgreSQL</Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" asChild>
                    <Link href="#" target="_blank">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Live Demo
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <Link href="#" target="_blank">
                      <Github className="h-4 w-4 mr-1" />
                      Code
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect hover-lift group overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop"
                  alt="Task Management App"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-blue-500 text-white">Featured</Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between font-poppins">
                  Task Management App
                  <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardTitle>
                <CardDescription>
                  Collaborative project management tool with real-time updates, team collaboration, and advanced
                  reporting features.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">React</Badge>
                  <Badge variant="outline">Socket.io</Badge>
                  <Badge variant="outline">MongoDB</Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" asChild>
                    <Link href="#" target="_blank">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Live Demo
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <Link href="#" target="_blank">
                      <Github className="h-4 w-4 mr-1" />
                      Code
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect hover-lift group overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
                  alt="Analytics Dashboard"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-purple-500 text-white">New</Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between font-poppins">
                  Analytics Dashboard
                  <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardTitle>
                <CardDescription>
                  Real-time analytics dashboard with interactive charts, data visualization, and comprehensive reporting
                  capabilities.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">Vue.js</Badge>
                  <Badge variant="outline">D3.js</Badge>
                  <Badge variant="outline">Python</Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" asChild>
                    <Link href="#" target="_blank">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Live Demo
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <Link href="#" target="_blank">
                      <Github className="h-4 w-4 mr-1" />
                      Code
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 rounded-xl hover-lift glass-effect bg-transparent"
              asChild
            >
              <Link href="/portfolio">
                View All Projects
                <ExternalLink className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-brand-500/10 via-primary/5 to-emerald-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
            Ready to Start Your Next <span className="gradient-text">Project?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's collaborate to bring your ideas to life. I'm passionate about creating innovative solutions that make
            a real impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6 rounded-xl hover-lift" asChild>
              <Link href="/contact">
                <Mail className="mr-2 h-5 w-5" />
                Start a Conversation
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 rounded-xl hover-lift glass-effect bg-transparent"
              asChild
            >
              <Link href="tel:+254748264231">
                <Phone className="mr-2 h-5 w-5" />
                Call Me Now
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
