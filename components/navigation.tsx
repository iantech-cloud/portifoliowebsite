"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Skills", href: "/skills" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Achievements", href: "/achievements" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.getElementById("mobile-menu")
      const button = document.getElementById("hamburger-button")

      if (isOpen && nav && button && !nav.contains(event.target as Node) && !button.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Portfolio
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative",
                pathname === item.href
                  ? "text-foreground after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-blue-600"
                  : "text-foreground/60 hover:text-foreground",
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Hamburger Button */}
        <button
          id="hamburger-button"
          onClick={toggleMenu}
          className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center space-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <span
            className={cn(
              "block w-6 h-0.5 bg-gray-600 transition-all duration-300 ease-in-out",
              isOpen ? "rotate-45 translate-y-1.5" : "",
            )}
          />
          <span
            className={cn(
              "block w-6 h-0.5 bg-gray-600 transition-all duration-300 ease-in-out",
              isOpen ? "opacity-0" : "",
            )}
          />
          <span
            className={cn(
              "block w-6 h-0.5 bg-gray-600 transition-all duration-300 ease-in-out",
              isOpen ? "-rotate-45 -translate-y-1.5" : "",
            )}
          />
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={cn(
            "fixed inset-0 bg-black/50 transition-opacity duration-300 md:hidden",
            isOpen ? "opacity-100 visible" : "opacity-0 invisible",
          )}
          onClick={() => setIsOpen(false)}
        />

        {/* Mobile Navigation Menu */}
        <nav
          id="mobile-menu"
          className={cn(
            "fixed top-16 right-0 h-[calc(100vh-4rem)] w-80 max-w-[85vw] bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:hidden overflow-y-auto",
            isOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex flex-col p-6 space-y-1">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center px-4 py-3 text-lg font-medium rounded-lg transition-all duration-200",
                  pathname === item.href
                    ? "text-blue-600 bg-blue-50 border-l-4 border-blue-600"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50",
                )}
                style={{
                  animationDelay: isOpen ? `${index * 50}ms` : "0ms",
                }}
              >
                <span className="flex-1">{item.name}</span>
                {pathname === item.href && <span className="w-2 h-2 bg-blue-600 rounded-full" />}
              </Link>
            ))}

            {/* Contact Info in Mobile Menu */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center space-x-3">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>your.email@example.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
