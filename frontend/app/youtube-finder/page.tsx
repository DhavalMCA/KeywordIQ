"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { VideoResultsList } from "@/features/youtube-finder/VideoResultsList"
import { TagCloud } from "@/features/youtube-finder/TagCloud"
import { useYouTubeFinder } from "@/features/youtube-finder/useYouTubeFinder"

export default function YouTubeFinderPage() {
  const [query, setQuery] = useState("")
  const [inputVal, setInputVal] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const { data, isLoading, error } = useYouTubeFinder(query)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (inputVal.trim()) {
      setQuery(inputVal.trim())
    }
  }

  return (
    <div className="flex flex-col pt-[56px] bg-background min-h-screen">
      {/* Search Header */}
      <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 border-b border-outline-variant/10 overflow-hidden hero-gradient">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-low border border-outline-variant/30 rounded-full mb-10"
          >
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.2em] font-body text-secondary uppercase">
               Engine: YouTube Indexing Active
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-8xl font-black font-headline tracking-tighter text-on-background leading-none mb-8 sm:mb-10 uppercase">
            YouTube<br />
            <span className="text-secondary select-none underline decoration-secondary/20 underline-offset-8">Explorer</span>
          </h1>

          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit} 
            className="w-full max-w-2xl mx-auto relative group"
          >
            <div className={`
              relative flex items-center bg-surface-container-low border p-1 rounded-2xl transition-all duration-300
              ${isFocused ? "border-primary/50 editorial-focus ring-1 ring-primary/20 bg-surface-container shadow-2xl" : "border-outline-variant/20 hover:border-outline-variant/40 shadow-xl"}
            `}>
              <span className={`material-symbols-outlined ml-6 transition-colors duration-300 ${isFocused ? "text-primary" : "text-on-background/50"}`}>
                smart_display
              </span>
              <input 
                type="text" 
                value={inputVal}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Enter a keyword or channel URL..."
                className="flex-1 bg-transparent border-none outline-none px-6 py-5 font-mono text-sm tracking-wider text-on-background placeholder:text-on-background/40 focus:ring-0"
              />
              <button 
                type="submit"
                className={`
                  px-8 py-4 rounded-xl font-black font-headline tracking-tighter uppercase transition-all duration-150 active:scale-95 flex items-center gap-3
                  ${isFocused ? "bg-primary text-on-primary shadow-lg shadow-primary/20" : "bg-surface-container-highest text-on-surface hover:bg-primary hover:text-on-primary"}
                `}
              >
                Scan
                <span className="material-symbols-outlined text-sm font-black transition-transform group-hover:rotate-45">
                  bolt
                </span>
              </button>
            </div>
          </motion.form>
        </div>
      </section>

      {/* Results Content */}
      <main className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto w-full overflow-x-hidden">
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
             <div className="w-16 h-16 relative mb-8">
                <div className="absolute inset-0 border-2 border-secondary/20 rounded-full" />
                <div className="absolute inset-0 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
                <span className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-secondary">database</span>
             </div>
             <span className="text-[10px] font-black tracking-[0.4em] font-body text-on-background/50 uppercase italic">Parsing Remote Buffers...</span>
          </div>
        )}
        
        {error && (
          <div className="flex flex-col items-center justify-center py-32 text-center bg-error-container/5 rounded-3xl border border-error/10">
             <span className="material-symbols-outlined text-5xl text-error mb-6">report</span>
             <h2 className="text-xl font-black font-headline text-error uppercase tracking-tight">Ingestion Refused</h2>
             <p className="text-[10px] font-medium font-body text-on-background/60 uppercase tracking-[0.2em] mt-4 max-w-xs leading-relaxed">
               Critical failure in endpoint handshake. Check API credentials or global quota.
             </p>
          </div>
        )}
        
        {data && !isLoading && (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-12 overflow-x-hidden">
            <div className="xl:col-span-4 space-y-12">
               <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="bg-surface-container-low border border-outline-variant/10 p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl relative overflow-hidden"
               >
                 <div className="absolute top-0 left-0 w-1 h-full bg-secondary/30" />
                 <div className="flex items-center gap-3 mb-8">
                    <span className="material-symbols-outlined text-secondary text-lg">analytics</span>
                    <h2 className="text-[10px] font-black font-headline tracking-[0.3em] text-on-background uppercase">
                      Engagement Profile
                    </h2>
                 </div>
                 <TagCloud tags={data.tag_cloud} />
               </motion.div>
               
               <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.1 }}
                 className="p-4 sm:p-6 md:p-8 bg-surface-container-lowest border border-outline-variant/10 rounded-2xl md:rounded-3xl space-y-6"
               >
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-on-background/50 uppercase tracking-[0.3em]">Channel Insights</span>
                    <div className="h-0.5 w-8 bg-secondary rounded-full" />
                  </div>
                  <p className="text-[10px] font-medium font-body text-on-background/40 leading-relaxed uppercase tracking-[0.2em]">
                    Metadata suggests high velocity in current quadrant. 
                    Recommended deployment duration: 24h.
                    Precision indexing active.
                  </p>
               </motion.div>
            </div>

            <div className="xl:col-span-8 space-y-10">
               <div className="flex items-center justify-between pb-8 border-b border-outline-variant/10">
                  <div className="flex items-center gap-3">
                     <span className="material-symbols-outlined text-primary">view_quilt</span>
                     <h2 className="text-[10px] font-black font-headline tracking-[0.4em] text-on-background uppercase">
                       Result Matrix
                     </h2>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full border border-outline-variant/5">
                    <span className="text-[9px] font-mono text-on-background/40 font-bold uppercase tracking-widest italic">
                      Count: {data.videos.length}
                    </span>
                  </div>
               </div>
               
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
               >
                 <VideoResultsList videos={data.videos} />
               </motion.div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
