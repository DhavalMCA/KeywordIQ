"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { HashtagResults } from "@/features/instagram-finder/HashtagResults"
import { TrendingHashtags } from "@/features/instagram-finder/TrendingHashtags"
import { NicheSuggestions } from "@/features/instagram-finder/NicheSuggestions"
import { useInstagramFinder } from "@/features/instagram-finder/useInstagramFinder"

export default function InstagramFinderPage() {
  const [query, setQuery] = useState("")
  const [inputVal, setInputVal] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const { data, isLoading, error } = useInstagramFinder(query)

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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-low border border-outline-variant/30 rounded-full mb-10"
          >
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.2em] font-body text-pink-500 uppercase">
               Engine: Insta Cluster Detection Active
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-8xl font-black font-headline tracking-tighter text-on-background leading-none mb-8 sm:mb-10 uppercase">
            Insta<br />
            <span className="text-pink-500 select-none underline decoration-pink-500/20 underline-offset-8">Intelligence</span>
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
              ${isFocused ? "border-pink-500/50 editorial-focus ring-1 ring-pink-500/20 bg-surface-container shadow-2xl" : "border-outline-variant/20 hover:border-outline-variant/40 shadow-xl"}
            `}>
              <span className={`material-symbols-outlined ml-6 transition-colors duration-300 ${isFocused ? "text-pink-500" : "text-on-background/50"}`}>
                explore
              </span>
              <input 
                type="text" 
                value={inputVal}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Enter a keyword..."
                className="flex-1 bg-transparent border-none outline-none px-6 py-5 font-mono text-sm tracking-wider text-on-background placeholder:text-on-background/40 focus:ring-0"
              />
              <button 
                type="submit"
                className={`
                  px-8 py-4 rounded-xl font-black font-headline tracking-tighter uppercase transition-all duration-150 active:scale-95 flex items-center gap-3
                  ${isFocused ? "bg-pink-500 text-white shadow-lg shadow-pink-500/20" : "bg-surface-container-highest text-on-surface hover:bg-pink-500 hover:text-white"}
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
                <div className="absolute inset-0 border-2 border-pink-500/20 rounded-full" />
                <div className="absolute inset-0 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
                <span className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-pink-500">hub</span>
             </div>
             <span className="text-[10px] font-black tracking-[0.4em] font-body text-on-background/50 uppercase italic">Mapping Social Topography...</span>
          </div>
        )}
        
        {error && (
          <div className="flex flex-col items-center justify-center py-32 text-center bg-error-container/5 rounded-3xl border border-error/10">
             <span className="material-symbols-outlined text-5xl text-error mb-6">report</span>
             <h2 className="text-xl font-black font-headline text-error uppercase tracking-tight">Protocol Rejected</h2>
             <p className="text-[10px] font-medium font-body text-on-background/60 uppercase tracking-[0.2em] mt-4 max-w-xs leading-relaxed">
               Endpoint synchronization failure. Cluster mapping terminated due to lack of signals.
             </p>
          </div>
        )}
        
        {data && !isLoading && (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-12 overflow-x-hidden">
            <div className="xl:col-span-8 space-y-12">
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
               >
                 <HashtagResults hashtags={data.hashtags} />
               </motion.div>
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.2 }}
               >
                 <NicheSuggestions niches={data.niches} />
               </motion.div>
            </div>

            <div className="xl:col-span-4 space-y-12">
               <motion.div
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.1 }}
               >
                 <TrendingHashtags hashtags={data.trending} />
               </motion.div>
               
               <motion.div 
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.3 }}
                 className="p-4 sm:p-6 md:p-8 bg-surface-container-low border border-outline-variant/10 rounded-2xl md:rounded-3xl space-y-6 sm:space-y-8 group relative overflow-hidden"
               >
                  <div className="absolute top-0 left-0 w-1 h-full bg-pink-500/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-pink-500">lightbulb</span>
                    <h2 className="text-[10px] font-black font-headline tracking-[0.3em] text-on-background uppercase">
                      Engagement Strategy
                    </h2>
                  </div>
                  <p className="text-[10px] font-medium font-body text-on-background/40 leading-relaxed uppercase tracking-[0.15em]">
                    Clusters identified represent 84% of current niche volume. 
                    Deployment recommended for immediate propulsion.
                    <br/><br/>
                    Peak velocity detected between 12:00 - 15:00 UTC.
                    Precision indexing active.
                  </p>
                  
                  <div className="pt-6 border-t border-outline-variant/5">
                     <div className="flex items-center justify-between">
                        <span className="text-[8px] font-black text-on-background/50 uppercase tracking-widest">Protocol</span>
                        <span className="text-[8px] font-mono text-pink-500 font-bold uppercase tracking-widest">V4.2_SOCIAL</span>
                     </div>
                  </div>
               </motion.div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
