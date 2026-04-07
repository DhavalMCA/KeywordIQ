"use client"

import { motion } from "framer-motion"

export default function AboutPage() {
  return (
    <div className="flex flex-col pt-[56px] bg-background min-h-screen">
      <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10 border-b border-outline-variant/10 overflow-hidden hero-gradient">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-low border border-outline-variant/30 rounded-full mb-10"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.2em] font-body text-primary uppercase">
               Mission Intel: Open Access Protocol
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-8xl font-black font-headline tracking-tighter text-on-background leading-none mb-8 sm:mb-10 uppercase">
            About<br />
            <span className="text-primary select-none underline decoration-primary/20 underline-offset-8">KeywordIQ</span>
          </h1>
          
          <p className="text-[10px] font-black font-body uppercase tracking-[0.4em] text-on-background/60 max-w-2xl leading-relaxed">
            Free, no-login SEO keyword research for everyone. Low latency, high precision indexing. 
            Designed for bloggers, creators, and researchers. Index_v4_Cross_Sync enabled.
          </p>
        </div>
      </section>

      <main className="py-16 sm:py-24 px-4 sm:px-6 md:px-10 max-w-5xl mx-auto w-full space-y-16 sm:space-y-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 sm:p-8 md:p-10 bg-surface-container-low border border-outline-variant/10 rounded-2xl md:rounded-3xl space-y-6 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-primary/30" />
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-primary">rocket_launch</span>
              <h2 className="text-[11px] font-black font-headline tracking-[0.3em] text-on-background uppercase">
                Our Mission
              </h2>
            </div>
            <p className="text-[11px] font-medium font-body text-on-background/60 leading-relaxed uppercase tracking-[0.15em]">
              KeywordIQ is a free, no-login SEO keyword research tool. We believe keyword intelligence
              should be accessible to everyone — bloggers, creators, and small businesses — without
              paywalls or account requirements. High-performance discovery for the open web.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 sm:p-8 md:p-10 bg-surface-container-low border border-outline-variant/10 rounded-2xl md:rounded-3xl space-y-6 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-secondary/30" />
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-secondary">database</span>
              <h2 className="text-[11px] font-black font-headline tracking-[0.3em] text-on-background uppercase">
                Data Sources
              </h2>
            </div>
            <div className="space-y-4">
              {[
                { src: "Google Trends", desc: "Real-time search patterns" },
                { src: "YouTube Index", desc: "Metadata & cluster mapping" },
                { src: "Instagram Social", desc: "Hashtag discoveries" },
                { src: "Neural Processor", desc: "Llama 3 / Groq synthesis" },
              ].map((src, i) => (
                <div key={i} className="flex items-center justify-between border-b border-outline-variant/5 pb-2">
                  <span className="text-[10px] font-black text-on-background/60 uppercase tracking-widest">{src.src}</span>
                  <span className="text-[9px] font-mono text-secondary font-bold uppercase tracking-widest">{src.desc}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="pt-12 flex flex-col items-center justify-center text-center space-y-8">
           <div className="w-1.5 h-16 bg-gradient-to-b from-primary to-transparent rounded-full" />
           <p className="text-[10px] font-black font-headline text-on-background">
              End of Transmission // KeywordIQ System_v4.2
           </p>
        </div>
      </main>
    </div>
  )
}
