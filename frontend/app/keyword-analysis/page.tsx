"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { motion } from "framer-motion"

export default function KeywordAnalysisPage() {
  const router = useRouter()
  const [q, setQ] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (q?.trim()?.length > 0) {
      router.push(`/results?q=${encodeURIComponent(q.trim())}`)
    }
  }

  return (
    <div className="flex flex-col min-h-screen pt-[56px] bg-background overflow-hidden relative">
      {/* Background Orbital Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-on-background/5 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-on-background/5 rounded-full pointer-events-none opacity-50" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/4" />
      
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 -mt-24 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-low border border-outline-variant/30 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.2em] font-body text-primary uppercase">
               Protocol: Precision Ingestion 
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black font-headline tracking-tighter text-on-background uppercase mb-6 leading-none">
            Keyword<br />
            <span className="text-secondary opacity-80 underline decoration-secondary/20 underline-offset-8">Analysis</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-[10px] font-medium font-body text-on-background/60 uppercase tracking-[0.3em] leading-relaxed">
            Multimodal Data Ingestion through direct channel mapping. 
            Real-time density extraction. 
            High-performance SEO discovery.
          </p>
        </motion.div>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit} 
          className="w-full max-w-3xl relative"
        >
          <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full pointer-events-none" />
          
          <div className={`
            relative flex items-center bg-surface-container-low border p-1 rounded-2xl transition-all duration-300
            ${isFocused ? "border-primary/50 editorial-focus ring-1 ring-primary/20 bg-surface-container shadow-2xl" : "border-outline-variant/20 hover:border-outline-variant/40 shadow-xl"}
          `}>
            <span className={`material-symbols-outlined ml-6 transition-colors duration-300 ${isFocused ? "text-primary" : "text-outline"}`}>
              database
            </span>
            <input 
              type="text" 
              value={q}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Enter keyword..."
              className="flex-1 bg-transparent border-none outline-none px-6 py-6 font-mono text-sm tracking-wider text-on-background placeholder:text-on-background/40 focus:ring-0"
              autoFocus
            />
            <button 
              type="submit"
              className={`
                px-8 py-5 rounded-xl font-black font-headline tracking-tighter uppercase transition-all duration-150 active:scale-95 group flex items-center gap-3
                ${isFocused ? "bg-primary text-on-primary" : "bg-surface-container-highest text-on-surface hover:bg-primary hover:text-on-primary"}
              `}
            >
              Analyze
              <span className="material-symbols-outlined text-sm font-bold transition-transform group-hover:rotate-45">
                bolt
              </span>
            </button>
          </div>
          
          {/* Status Indicators */}
          <div className="mt-12 flex justify-center gap-16">
              <div className="flex flex-col items-center gap-2">
                  <span className="text-[10px] font-black text-on-background/50 uppercase tracking-[0.2em]">Pkt Latency</span>
                  <span className="text-[10px] font-mono text-secondary font-bold tracking-widest">12.4ms</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                  <span className="text-[10px] font-black text-on-background/50 uppercase tracking-[0.2em]">Confidence</span>
                  <span className="text-[10px] font-mono text-secondary font-bold tracking-widest">99.8%</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                  <span className="text-[10px] font-black text-on-background/50 uppercase tracking-[0.2em]">Network</span>
                  <span className="text-[10px] font-mono text-secondary font-bold tracking-widest">Engine V5.1</span>
              </div>
          </div>
        </motion.form>
      </main>
    </div>
  )
}
