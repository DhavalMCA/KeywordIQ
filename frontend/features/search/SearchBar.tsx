"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function SearchBar() {
  const router = useRouter()
  const [isFocused, setIsFocused] = useState(false)
  const [os, setOs] = useState<"mac" | "win">("win")

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOs(navigator.platform.toUpperCase().indexOf("MAC") >= 0 ? "mac" : "win")
    }
  }, [])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const q = formData.get("q") as string
    if (q?.trim()?.length > 0) {
      router.push(`/results?q=${encodeURIComponent(q.trim())}`)
    }
  }

  return (
    <div className="w-full max-w-2xl">
      <form 
        onSubmit={handleSubmit} 
        className={`relative group transition-all duration-300 ${isFocused ? "editorial-focus scale-[1.01]" : ""}`}
      >
        <div className={`
          relative flex items-center bg-surface-container-low border rounded-xl overflow-hidden transition-all duration-300
          ${isFocused ? "border-primary/50 bg-surface-container shadow-[0_0_20px_rgba(110,86,207,0.1)]" : "border-outline-variant/20 hover:border-outline-variant/40"}
        `}>
          <span className={`material-symbols-outlined ml-5 transition-colors duration-300 ${isFocused ? "text-primary" : "text-outline"}`}>
            search
          </span>
          <input
            name="q"
            type="text"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Enter a keyword to analyze..."
            className="flex-1 bg-transparent border-none outline-none px-4 py-4 font-body text-sm text-on-background placeholder:text-on-background/40 focus:ring-0"
            autoComplete="off"
          />
          
          <div className="flex items-center gap-3 pr-5">
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 bg-surface-container-highest/50 border border-outline-variant/20 rounded-md">
              <span className="text-[10px] font-bold text-outline uppercase tracking-wider">
                {os === "mac" ? "⌘" : "Ctrl"} K
              </span>
            </div>
            
            <button
              type="submit"
              className={`
                px-5 py-2 rounded-lg text-xs font-bold transition-all
                ${isFocused 
                  ? "bg-primary text-on-primary shadow-lg shadow-primary/20 scale-105" 
                  : "bg-surface-container-highest text-on-surface hover:bg-primary hover:text-on-primary"}
              `}
            >
              Scan
            </button>
          </div>
        </div>
      </form>
      
      <div className="mt-4 flex items-center justify-center gap-6 px-4">
        <div className="flex items-center gap-2 grayscale group hover:grayscale-0 transition-all cursor-pointer">
          <span className="material-symbols-outlined text-xs text-secondary">trending_up</span>
          <span className="text-[10px] font-bold text-outline group-hover:text-secondary">Global trends</span>
        </div>
        <div className="flex items-center gap-2 grayscale group hover:grayscale-0 transition-all cursor-pointer">
          <span className="material-symbols-outlined text-xs text-primary">smart_display</span>
          <span className="text-[10px] font-bold text-outline group-hover:text-primary">Video metrics</span>
        </div>
        <div className="flex items-center gap-2 grayscale group hover:grayscale-0 transition-all cursor-pointer">
          <span className="material-symbols-outlined text-xs text-tertiary">tag</span>
          <span className="text-[10px] font-bold text-outline group-hover:text-tertiary">Semantic tags</span>
        </div>
      </div>
    </div>
  )
}
