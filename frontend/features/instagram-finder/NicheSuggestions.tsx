"use client"

import { motion } from "framer-motion"

interface NicheSuggestionsProps {
  niches: { topic: string; hashtags: string[] }[]
}

export function NicheSuggestions({ niches }: NicheSuggestionsProps) {
  return (
    <div className="bg-surface-container-low border border-outline-variant/10 p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl group relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-10 gap-3 overflow-hidden">
        <div className="flex flex-col gap-1">
           <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-lg">hub</span>
              <h2 className="text-[10px] font-black  font-headline text-on-background uppercase">
                Structural Niche Clusters
              </h2>
           </div>
           <p className="text-[8px] font-medium font-body text-on-background/50 pl-8">Spatial Topography V4.2</p>
        </div>
        <div className="px-3 py-1 bg-surface-container-high rounded-full border border-outline-variant/5">
           <span className="text-[9px] font-mono text-on-background/60 font-bold">MAPS: {niches.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {niches.map((niche, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-4 sm:p-6 md:p-8 bg-background border border-outline-variant/5 rounded-2xl md:rounded-3xl hover:border-primary/20 hover:bg-surface-container-high transition-all group/item relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-primary/5 opacity-0 group-hover/item:opacity-100 transition-opacity" />
            <h3 className="relative z-10 text-[11px] font-black font-headline text-secondary  mb-6 border-b border-outline-variant/10 pb-3 group-hover/item:text-primary transition-colors">
               {niche.topic}
            </h3>
            <div className="relative z-10 flex flex-wrap gap-x-4 gap-y-2">
              {niche.hashtags.map((tag) => (
                <div key={tag} className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-on-background/60 hover:text-primary transition-colors cursor-default lowercase tracking-tighter">
                    #{tag}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 sm:mt-10 pt-4 sm:pt-6 border-t border-outline-variant/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
         <span className="text-[8px] font-black text-on-background/50 italic group-hover:text-on-background/60 transition-colors">Vector mapping synchronized</span>
         <span className="text-[8px] font-bold text-on-background/10  italic font-body">Source: Hub_v4_Social_Nodes</span>
      </div>
    </div>
  )
}
