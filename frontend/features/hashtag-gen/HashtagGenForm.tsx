"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface HashtagGenFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isLoading: boolean
  value: string
  onChange: (val: string) => void
}

export function HashtagGenForm({ onSubmit, isLoading, value, onChange }: HashtagGenFormProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <form onSubmit={onSubmit} className="w-full relative group">
      <div className={`
        relative flex items-center bg-surface-container-low border p-1 rounded-2xl transition-all duration-300
        ${isFocused ? "border-primary/50 editorial-focus ring-1 ring-primary/20 bg-surface-container shadow-2xl" : "border-outline-variant/20 hover:border-outline-variant/40 shadow-xl"}
      `}>
        <span className={`material-symbols-outlined ml-6 transition-colors duration-300 ${isFocused ? "text-primary" : "text-on-background/50"}`}>
          memory
        </span>
        <input
          type="text"
          name="topic"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="ENTER TOPICS FOR BUNDLE GENERATION..."
          className="flex-1 bg-transparent border-none outline-none px-6 py-5 font-mono text-sm tracking-widest text-on-background placeholder:text-outline-variant/30 focus:ring-0 uppercase"
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`
            px-10 py-4 rounded-xl font-black font-headline tracking-tighter uppercase transition-all duration-150 active:scale-95 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed
            ${isFocused ? "bg-primary text-on-primary shadow-lg shadow-primary/20" : "bg-surface-container-highest text-on-surface hover:bg-primary hover:text-on-primary"}
          `}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-on-primary/20 border-t-on-primary rounded-full animate-spin" />
              Processing
            </>
          ) : (
            <>
              Generate
              <span className="material-symbols-outlined text-sm font-black transition-transform group-hover:rotate-[30deg]">
                auto_awesome
              </span>
            </>
          )}
        </button>
      </div>
    </form>
  )
}
