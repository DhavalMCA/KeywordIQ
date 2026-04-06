"use client"

import { motion } from "framer-motion"

interface TagCloudProps {
  tags: string[]
}

export function TagCloud({ tags }: TagCloudProps) {
  if (tags.length === 0) return (
    <div className="h-[200px] flex flex-col items-center justify-center border border-dashed border-outline-variant/10 bg-background/50 rounded-3xl">
      <span className="material-symbols-outlined text-outline-variant/20 text-3xl mb-4">tag</span>
      <p className="text-[10px] font-mono text-on-background/50 text-center">
        No tags indexed
      </p>
    </div>
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        {tags.map((tag, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03 }}
            className="group relative px-4 py-3 bg-surface-container-high border border-outline-variant/10 rounded-xl cursor-default overflow-hidden transition-all hover:border-secondary/40 hover:-translate-y-0.5"
          >
            <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex items-center gap-2">
               <span className="text-[9px] font-black text-on-background/50 group-hover:text-secondary mb-0.5">#</span>
               <span className="text-[10px] font-black font-headline text-on-background group-hover:text-on-background">
                 {tag}
               </span>
            </div>
          </motion.span>
        ))}
      </div>
      
      <div className="pt-6 border-t border-outline-variant/5">
         <div className="flex justify-between items-center">
            <div className="flex flex-col gap-1">
               <span className="text-[8px] font-black text-on-background/50">Tag Density</span>
               <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((idx) => (
                    <div key={idx} className={`h-1 w-4 rounded-full ${idx <= 4 ? "bg-secondary" : "bg-outline-variant/20"}`} />
                  ))}
               </div>
            </div>
            <span className="text-[8px] font-mono text-secondary font-bold">HIGH_SATURATION</span>
         </div>
      </div>
    </div>
  )
}
