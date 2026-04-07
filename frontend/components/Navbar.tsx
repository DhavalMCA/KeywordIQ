"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect } from "react"

const navLinks = [
  { href: "/keyword-analysis", label: "Analysis", icon: "analytics" },
  { href: "/youtube-finder", label: "YouTube", icon: "smart_display" },
  { href: "/instagram-finder", label: "Instagram", icon: "photo_camera" },
  { href: "/hashtag-gen", label: "Hashtags", icon: "tag" },
  { href: "/meta-tag-gen", label: "Meta Tags", icon: "settings_input_component" },
  { href: "/about", label: "Intel", icon: "info" },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  // Sync active tab with current route
  useEffect(() => {
    const idx = navLinks.findIndex((l) => l.href === pathname)
    if (idx !== -1) setActiveIndex(idx)
  }, [pathname])

  // Auto-scroll slider to keep active tab visible
  useEffect(() => {
    if (!sliderRef.current) return
    const activeEl = sliderRef.current.children[activeIndex] as HTMLElement
    if (!activeEl) return
    activeEl.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    })
  }, [activeIndex])

  return (
    <>
      {/* ── Top Navbar ── */}
      <nav className="fixed top-0 w-full z-50 bg-background/60 backdrop-blur-xl border-b border-outline-variant/5">
        {/* Logo row */}
        <div className="flex items-center justify-between px-4 h-16">
          <Link href="/" className="flex items-center gap-2 group relative flex-shrink-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center rotate-45 group-hover:rotate-90 transition-transform duration-500 shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-on-primary -rotate-45 group-hover:-rotate-90 transition-transform duration-500 text-lg">bolt</span>
            </div>
            <span className="text-lg font-black tracking-tighter text-on-background font-headline group-hover:text-primary transition-colors">
              Keyword<span className="text-primary group-hover:text-on-background">IQ</span>
            </span>
            <div className="absolute -top-1 -right-3 px-1 py-0.5 bg-secondary/10 border border-secondary/20 rounded text-[7px] font-black text-secondary hidden sm:block">v4.2</div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="px-4 py-2 bg-primary text-on-primary text-[11px] font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Contact
            </Link>
            {/* Hamburger – opens drawer */}
            <button
              onClick={() => setMobileOpen(true)}
              className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-surface-container-high transition-colors"
              aria-label="Open menu"
            >
              <span className="material-symbols-outlined text-on-background">menu</span>
            </button>
          </div>
        </div>

        {/* ── Horizontal Scrollable Tab Slider ── */}
        <div className="relative border-t border-outline-variant/5">
          <div
            ref={sliderRef}
            className="flex overflow-x-auto scrollbar-hide px-2 py-1 gap-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {navLinks.map((link, i) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setActiveIndex(i)}
                  className={`
                    relative flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[10px] font-black
                    whitespace-nowrap flex-shrink-0 transition-all duration-200
                    ${isActive
                      ? "bg-primary text-on-primary shadow-lg shadow-primary/20"
                      : "text-on-background/60 hover:text-on-background hover:bg-surface-container-high"}
                  `}
                >
                  <span className="material-symbols-outlined text-sm">{link.icon}</span>
                  <span>{link.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary rounded-xl -z-10"
                      transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>
      </nav>

      {/* ── Mobile Bottom Nav Strip ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-xl border-t border-outline-variant/10 lg:hidden">
        <div className="flex items-center justify-around px-1 py-1">
          {navLinks.map((link, i) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setActiveIndex(i)}
                className={`
                  flex flex-col items-center justify-center gap-0.5 px-3 py-2 rounded-xl min-w-[56px]
                  transition-all duration-150
                  ${isActive
                    ? "text-primary"
                    : "text-on-background/40 hover:text-on-background/70"}
                `}
              >
                <span className="material-symbols-outlined text-base">{link.icon}</span>
                <span className="text-[8px] font-black leading-none">{link.label}</span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* ── Mobile Drawer (full menu) ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/40 z-40"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-72 bg-surface-container-low border-l border-outline-variant/10 z-50 shadow-2xl"
            >
              <div className="flex flex-col p-8 pt-20">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-colors"
                >
                  <span className="material-symbols-outlined text-on-background">close</span>
                </button>
                <div className="space-y-2">
                  {navLinks.map((link, i) => {
                    const isActive = pathname === link.href
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => { setMobileOpen(false); setActiveIndex(i) }}
                          className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-black transition-all ${
                            isActive
                              ? "bg-primary text-on-primary"
                              : "text-on-background/70 hover:bg-surface-container-high hover:text-on-background"
                          }`}
                        >
                          <span className="material-symbols-outlined text-lg">{link.icon}</span>
                          {link.label}
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>
                <div className="mt-auto pt-8 border-t border-outline-variant/10">
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-on-primary text-sm font-black rounded-2xl"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
