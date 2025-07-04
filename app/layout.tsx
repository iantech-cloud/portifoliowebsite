import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Ian Muiruri Waigango - Full Stack Developer",
  description:
    "Professional portfolio of Ian Muiruri Waigango - Full Stack Developer specializing in modern web technologies, mobile development, and innovative digital solutions.",
  keywords: "Ian Muiruri, Waigango, Full Stack Developer, Web Developer, React, Next.js, Node.js, Kenya Developer",
  authors: [{ name: "Ian Muiruri Waigango" }],
  creator: "Ian Muiruri Waigango",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ianmuiruri.dev",
    title: "Ian Muiruri Waigango - Full Stack Developer",
    description: "Professional portfolio showcasing innovative web solutions and development expertise",
    siteName: "Ian Muiruri Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ian Muiruri Waigango - Full Stack Developer",
    description: "Professional portfolio showcasing innovative web solutions and development expertise",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-inter antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-brand-50/20 dark:to-brand-950/20">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
