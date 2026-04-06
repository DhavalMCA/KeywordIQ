"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { HashtagGenForm } from "@/features/hashtag-gen/HashtagGenForm"
import { PlatformBundle } from "@/features/hashtag-gen/PlatformBundle"
import { useHashtagGen } from "@/features/hashtag-gen/useHashtagGen"

export default function HashtagGenPage() {
  const [topic, setTopic] = useState("")
  const [inputVal, setInputVal] = useState("")
  const { data, isLoading, error } = useHashtagGen(topic)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (inputVal.trim()) {
      setTopic(inputVal.trim())
    }
  }

  return (
    <div className="flex flex-col pt-[56px] bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 px-8 border-b border-outline-variant/10 overflow-hidden hero-gradient">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-low border border-outline-variant/30 rounded-full mb-10"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.2em] font-body text-primary uppercase">
               Neural Processor: Bundle Synthesis
            </span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-black font-headline tracking-tighter text-on-background leading-none mb-10 uppercase">
            Hashtag<br />
            <span className="text-secondary select-none underline decoration-secondary/20 underline-offset-8">Synthesizer</span>
          </h1>

          <div className="max-w-2xl mx-auto">
            <HashtagGenForm 
              onSubmit={handleSubmit} 
              isLoading={isLoading} 
              value={inputVal}
              onChange={setInputVal}
            />
          </div>
        </div>
      </section>

      {/* Results Content */}
      <main className="py-24 px-8 max-w-5xl mx-auto w-full">
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
             <div className="w-16 h-16 relative mb-8">
                <div className="absolute inset-0 border-2 border-secondary/20 rounded-full" />
                <div className="absolute inset-0 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
                <span className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-secondary">memory</span>
             </div>
             <span className="text-[10px] font-black tracking-[0.4em] font-body text-on-background/50 uppercase italic">Synthesizing Cross-Platform Bundles...</span>
          </div>
        )}
        
        {error && (
          <div className="flex flex-col items-center justify-center py-32 text-center bg-error-container/5 rounded-3xl border border-error/10">
             <span className="material-symbols-outlined text-5xl text-error mb-6">report</span>
             <h2 className="text-xl font-black font-headline text-error uppercase tracking-tight">Synthesis Refused</h2>
             <p className="text-[10px] font-medium font-body text-on-background/60 uppercase tracking-[0.2em] mt-4 max-w-xs leading-relaxed">
               {error}
             </p>
          </div>
        )}
        
        {data && !isLoading && (
          <div className="space-y-12">
            <div className="flex items-center justify-between pb-8 border-b border-outline-variant/10">
                <div className="flex items-center gap-3">
                   <span className="material-symbols-outlined text-primary">dynamic_feed</span>
                   <h2 className="text-[10px] font-black font-headline tracking-[0.4em] text-on-background uppercase">
                     Generated Bundles
                   </h2>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full border border-outline-variant/5">
                  <span className="text-[9px] font-mono text-on-background/40 font-bold uppercase tracking-widest italic">
                    Target: {topic}
                  </span>
                </div>
            </div>
            
            <div className="grid gap-8">
              <PlatformBundle platform="Instagram" hashtags={data.hashtags.instagram} icon="photo_camera" color="text-pink-500" />
              <PlatformBundle platform="Twitter / X" hashtags={data.hashtags.twitter} icon="brand_awareness" color="text-sky-400" />
              <PlatformBundle platform="LinkedIn" hashtags={data.hashtags.linkedin} icon="work" color="text-blue-500" />
            </div>

            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.5 }}
               className="mt-16 p-10 border border-outline-variant/10 bg-surface-container-lowest rounded-3xl text-center relative overflow-hidden group"
            >
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-tertiary" />
               <p className="text-[10px] font-black font-body text-on-background/50 uppercase tracking-[0.4em] group-hover:text-on-background/40 transition-colors">
                 Synthesis Complete. Data ready for allocation. Index_v4_Finalized.
               </p>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  )
}
