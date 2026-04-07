"use client"

import { motion } from "framer-motion"

interface VideoResultsListProps {
  videos: {
    title: string
    video_id: string
    channel_title: string
    view_count?: number | null
    tags: string[]
    url: string
  }[]
}

export function VideoResultsList({ videos }: VideoResultsListProps) {
  if (videos.length === 0) {
    return (
      <div className="h-[300px] flex flex-col items-center justify-center border border-dashed border-outline-variant/10 bg-surface-container-lowest rounded-3xl">
        <span className="material-symbols-outlined text-outline-variant/20 text-3xl mb-4">video_library</span>
        <p className="text-[10px] font-mono text-on-background/50 text-center">
          No video artifacts identified
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {videos.map((video, idx) => (
        <motion.a
          key={video.video_id}
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          className="group flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8 bg-surface-container-low p-4 sm:p-6 md:p-8 border border-outline-variant/5 hover:border-primary/20 hover:bg-surface-container transition-all duration-300 rounded-2xl md:rounded-3xl relative overflow-x-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="flex-1 relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-[9px] text-on-background/10 group-hover:text-primary transition-colors font-bold">
                REF-{String(idx + 1).padStart(3, '0')}
              </span>
              <div className="flex items-center gap-2 px-2.5 py-1 bg-surface-container-highest/50 rounded-lg border border-outline-variant/5">
                <span className="text-[9px] font-black text-on-background/60 ">YT_LEDGER</span>
              </div>
            </div>
            
            <h3 className="text-base sm:text-xl font-black font-headline tracking-tight text-on-background uppercase group-hover:text-primary transition-colors mb-4 sm:mb-6 leading-tight max-w-2xl overflow-x-hidden">
              {video.title}
            </h3>
            
            <div className="flex flex-wrap gap-4">
               {video.tags.slice(0, 5).map((tag) => (
                  <div key={tag} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-outline-variant/30" />
                    <span className="text-[10px] font-black font-body text-on-background/60  hover:text-secondary transition-colors cursor-pointer">
                      {tag}
                    </span>
                  </div>
               ))}
               {video.tags.length > 5 && (
                 <span className="text-[10px] font-black font-body text-on-background/10 ">
                   +{video.tags.length - 5} MORE
                 </span>
               )}
            </div>
          </div>

          <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 sm:gap-6 md:border-l md:border-outline-variant/10 md:pl-8 lg:pl-12 min-w-[120px] sm:min-w-[160px] relative z-10">
             <div className="text-right space-y-1">
                <span className="block text-[10px] font-black text-on-background/50 ">Imprint Vol</span>
                <span className="block text-2xl font-black font-headline text-secondary tracking-tighter">
                   {video.view_count != null ? (video.view_count / 1000).toFixed(1) + 'K+' : '---'}
                </span>
             </div>
             <div className="flex items-center gap-2 group-hover:text-primary transition-colors">
                <span className="text-[9px] font-black text-on-background/60 group-hover:text-primary">Egress</span>
                <span className="material-symbols-outlined text-lg translate-y-0.5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform">
                   north_east
                </span>
             </div>
          </div>
        </motion.a>
      ))}
    </div>
  )
}
