import Link from "next/link"
import { Github, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold font-poppins">Ian Muiruri</h3>
            <p className="text-sm text-muted-foreground">
              Full Stack Developer & Digital Innovator passionate about creating exceptional digital experiences.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://github.com/ianmuiruri" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://linkedin.com/in/ianmuiruri" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="mailto:ian@ianmuiruri.dev">
                  <Mail className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-muted-foreground hover:text-foreground transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/skills" className="text-muted-foreground hover:text-foreground transition-colors">
                  Skills
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">Web Development</li>
              <li className="text-muted-foreground">Mobile Apps</li>
              <li className="text-muted-foreground">UI/UX Design</li>
              <li className="text-muted-foreground">Consulting</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Nairobi, Kenya</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+254 748 264 231</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>ian@ianmuiruri.dev</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Ian Muiruri Waigango. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
