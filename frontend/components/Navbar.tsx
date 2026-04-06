"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

const navLinks = [
  { href: "/keyword-analysis", label: "Analysis" },
  { href: "/youtube-finder", label: "YouTube" },
  { href: "/instagram-finder", label: "Instagram" },
  { href: "/hashtag-gen", label: "Hashtags" },
  { href: "/meta-tag-gen", label: "Meta Tags" },
  { href: "/about", label: "Intel" },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 w-full h-[64px] z-50 bg-background/60 backdrop-blur-xl flex items-center justify-between px-10 border-b border-outline-variant/5">
      <div className="flex items-center gap-16">
        <Link href="/" className="flex items-center gap-3 group relative">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center rotate-45 group-hover:rotate-90 transition-transform duration-500 shadow-lg shadow-primary/20">
             <span className="material-symbols-outlined text-on-primary -rotate-45 group-hover:-rotate-90 transition-transform duration-500 text-lg">bolt</span>
          </div>
          <span className="text-xl font-black tracking-tighter text-on-background font-headline  group-hover:text-primary transition-colors">
            Keyword<span className="text-primary group-hover:text-on-background">IQ</span>
          </span>
          <div className="absolute -top-1 -right-4 px-1.5 py-0.5 bg-secondary/10 border border-secondary/20 rounded text-[7px] font-black text-secondary ">v4.2</div>
        </Link>

        <div className="hidden lg:flex gap-10 items-center">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-[10px] font-black  transition-all py-1 group/link ${
                  isActive
                    ? "text-primary"
                    : "text-on-background/70 hover:text-on-background"
                }`}
              >
                {link.label}
                <div className={`
                  absolute -bottom-1.5 left-0 h-[2px] bg-primary transition-all duration-300
                  ${isActive ? "w-full" : "w-0 group-hover/link:w-4"}
                `} />
              </Link>
            )
          })}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/contact"
          className="px-5 py-2 bg-primary text-on-primary text-[11px] font-semibold rounded-lg hover:bg-primary/90 transition-colors"
        >
          Contact
        </Link>
      </div>
    </nav>
  )
}
