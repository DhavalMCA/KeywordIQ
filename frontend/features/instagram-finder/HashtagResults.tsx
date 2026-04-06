"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface HashtagResultsProps {
  hashtags: { tag: string; post_count?: number | null }[]
}

export function HashtagResults({ hashtags }: HashtagResultsProps) {
  const [copied, setCopied] = useState(false)

  function copyAll() {
    navigator.clipboard.writeText(hashtags.map((h) => h.tag).join(" "))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-surface-container-low border border-outline-variant/10 p-8 rounded-3xl group relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex items-center justify-between mb-10">
        <div className="flex flex-col gap-1">
           <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-pink-500 text-lg">tag</span>
              <h2 className="text-[10px] font-black  font-headline text-on-background uppercase">
                Hashtag Intelligence
              </h2>
           </div>
           <p className="text-[8px] font-medium font-body text-on-background/50 pl-8">Cluster Analysis Active V4.2</p>
        </div>
        
        {hashtags.length > 0 && (
          <button
            onClick={copyAll}
            className={`
              flex items-center gap-3 px-6 py-3 rounded-xl text-[10px] font-black transition-all active:scale-95 border
              ${copied 
                ? "bg-secondary text-on-secondary border-secondary shadow-lg shadow-secondary/20" 
                : "bg-surface-container-highest text-on-surface border-outline-variant/5 hover:border-pink-500/30 hover:bg-pink-500/5 hover:text-pink-500"}
            `}
          >
             <span className="material-symbols-outlined text-sm font-bold">
               {copied ? "check_circle" : "content_copy"}
             </span>
             {copied ? "Copied Cluster" : "Copy Cluster"}
          </button>
        )}
      </div>

      {hashtags.length === 0 ? (
        <div className="h-[200px] flex flex-col items-center justify-center border border-dashed border-outline-variant/10 bg-background/50 rounded-2xl">
          <span className="material-symbols-outlined text-outline-variant/20 text-3xl mb-4">analytics</span>
          <p className="text-[10px] font-mono text-on-background/50 text-center">
            No hashtags identified in current scope
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {hashtags.map((h, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.02 }}
              className="px-5 py-3 bg-background border border-outline-variant/5 rounded-2xl group/item hover:border-pink-500/20 hover:bg-surface-container-high transition-all cursor-default relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-pink-500/5 opacity-0 group-hover/item:opacity-100 transition-opacity" />
              <span className="relative z-10 text-[11px] font-black font-headline text-pink-500/50 group-hover/item:text-pink-500 transition-colors uppercase tracking-wider">
                #{h.tag}
              </span>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-10 pt-6 border-t border-outline-variant/5 flex items-center justify-between">
         <span className="text-[8px] font-black text-on-background/50">Cluster size: {hashtags.length} hashtags</span>
         <span className="text-[8px] font-bold text-on-background/10  italic font-body">Source: Index_v4_Insta_Sync</span>
      </div>
    </div>
  )
}
