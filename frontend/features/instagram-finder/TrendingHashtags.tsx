"use client"

import { motion } from "framer-motion"

interface TrendingHashtagsProps {
  hashtags: { tag: string; post_count?: number | null }[]
}

export function TrendingHashtags({ hashtags }: TrendingHashtagsProps) {
  return (
    <div className="bg-surface-container-low border border-outline-variant/10 p-8 rounded-3xl group relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex items-center justify-between mb-10">
        <div className="flex flex-col gap-1">
           <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary text-lg">trending_up</span>
              <h2 className="text-[10px] font-black  font-headline text-on-background uppercase">
                Propulsion Trends
              </h2>
           </div>
           <p className="text-[8px] font-medium font-body text-on-background/50 pl-8">High Velocity Index V4.2</p>
        </div>
        <div className="px-3 py-1 bg-surface-container-high rounded-lg border border-outline-variant/5">
           <span className="text-[9px] font-mono text-secondary font-bold">CRITICAL</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {hashtags.map((h, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03 }}
            className="px-5 py-3 bg-background border border-outline-variant/5 rounded-2xl group/item hover:border-secondary/40 hover:bg-surface-container-high transition-all cursor-default relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover/item:opacity-100 transition-opacity" />
            <span className="relative z-10 text-[11px] font-black font-headline text-on-background/60 group-hover/item:text-secondary transition-colors">
              #{h.tag}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 pt-6 border-t border-outline-variant/5">
         <span className="text-[8px] font-bold text-on-background/10  italic font-body text-center block">Source: Meta_Trend_Buffer</span>
      </div>
    </div>
  )
}
