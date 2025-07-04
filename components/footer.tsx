import Link from "next/link"
import { Github, Linkedin, Mail, Twitter, Phone, MapPin, Code } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center">
                <Code className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-xl font-poppins gradient-text">Ian Muiruri Waigango</span>
            </Link>
            <p className="text-muted-foreground max-w-md mb-6">
              Full-stack developer passionate about creating exceptional digital experiences with modern technologies.
              Based in Nairobi, Kenya, available for exciting projects worldwide.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full hover-lift" asChild>
                <Link href="https://github.com/ianmuiruri" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover-lift" asChild>
                <Link href="https://linkedin.com/in/ianmuiruri" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover-lift" asChild>
                <Link href="https://twitter.com/ianmuiruri" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover-lift" asChild>
                <Link href="mailto:ian@ianmuiruri.dev">
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Link>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Me
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-muted-foreground hover:text-primary transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/skills" className="text-muted-foreground hover:text-primary transition-colors">
                  Skills
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Get in Touch
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a
                  href="mailto:ian@ianmuiruri.dev"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  ian@ianmuiruri.dev
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a
                  href="tel:+254748264231"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  +254 748 264 231
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground text-sm">Nairobi, Kenya</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Ian Muiruri Waigango. All rights reserved.
            </p>
            <p className="text-muted-foreground text-sm mt-2 md:mt-0">Built with Next.js, TypeScript & Tailwind CSS</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
