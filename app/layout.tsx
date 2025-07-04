import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Ian Muiruri Waigango - Full Stack Developer",
  description:
    "Full Stack Developer & Digital Innovator specializing in modern web applications, mobile solutions, and innovative digital products.",
  keywords: "Full Stack Developer, Web Developer, React, Next.js, TypeScript, Node.js, Kenya Developer",
  authors: [{ name: "Ian Muiruri Waigango" }],
  creator: "Ian Muiruri Waigango",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ianmuiruri.dev",
    title: "Ian Muiruri Waigango - Full Stack Developer",
    description:
      "Full Stack Developer & Digital Innovator specializing in modern web applications and innovative digital solutions.",
    siteName: "Ian Muiruri Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ian Muiruri Waigango - Full Stack Developer",
    description:
      "Full Stack Developer & Digital Innovator specializing in modern web applications and innovative digital solutions.",
    creator: "@ianmuiruri",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-inter antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
