"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface PlatformBundleProps {
  platform: string
  hashtags: string[]
  icon: string
  color: string
}

export function PlatformBundle({ platform, hashtags, icon, color }: PlatformBundleProps) {
  const [copied, setCopied] = useState(false)

  function copyAll() {
    navigator.clipboard.writeText(hashtags.join(" "))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-surface-container-low border border-outline-variant/10 p-10 rounded-3xl group relative overflow-hidden transition-all hover:bg-surface-container">
      <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6 pb-6 border-b border-outline-variant/5">
        <div className="flex items-center gap-4">
           <div className={`w-12 h-12 rounded-2xl bg-surface-container-highest flex items-center justify-center border border-outline-variant/10 ${color}`}>
              <span className="material-symbols-outlined text-2xl">{icon}</span>
           </div>
           <div>
              <h3 className={`text-[11px] font-black font-headline  uppercase ${color}`}>
                {platform} <span className="text-on-background/50 ml-2">DATASET</span>
              </h3>
              <p className="text-[9px] font-mono text-on-background/10 font-bold mt-1">Cross-Platform Sync v4.2</p>
           </div>
        </div>
        <button
          onClick={copyAll}
          className={`
            flex items-center gap-3 px-6 py-3 rounded-xl text-[10px] font-black transition-all active:scale-95 border
            ${copied 
              ? "bg-secondary text-on-secondary border-secondary shadow-lg shadow-secondary/20 scale-105" 
              : "bg-surface-container-highest text-on-surface border-outline-variant/5 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"}
          `}
        >
          <span className="material-symbols-outlined text-sm font-bold">
            {copied ? "check_circle" : "content_copy"}
          </span>
          {copied ? "ALLOCATED" : "COPY BUNDLE"}
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        {hashtags.map((tag, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.02 }}
            className="flex items-center gap-2 group/item"
          >
             <div className="w-1 h-1 rounded-full bg-outline-variant/20 group-hover/item:bg-primary transition-colors" />
             <span className="text-[10px] font-mono text-on-background/60 hover:text-on-background transition-colors cursor-pointer tracking-tighter">
               {tag}
             </span>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-10 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
         <span className="text-[8px] font-black text-on-background/10">Bundle density: Optimized</span>
         <span className="text-[8px] font-bold text-on-background/5  font-body">Ref: Platform_Ingest_v4.2.8</span>
      </div>
    </div>
  )
}
