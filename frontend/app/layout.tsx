import type { Metadata } from "next"
import { Space_Grotesk, Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "KeywordIQ - Free SEO Keyword Research Tool",
  description: "Free SEO keyword research powered by Google Trends, YouTube, Instagram, and AI. No login required.",
}

export const viewport = {
  themeColor: "#0A0A0F",
  colorScheme: "dark",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} dark`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-background text-on-background selection:bg-primary-container selection:text-on-primary-container">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 overflow-x-hidden pb-20 lg:pb-0">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
