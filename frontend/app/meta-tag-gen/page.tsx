"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MetaOutputCard } from "@/features/meta-tag-gen/MetaOutputCard"
import { useMetaGen } from "@/features/meta-tag-gen/useMetaGen"

export default function MetaTagGenPage() {
  const [url, setUrl] = useState("")
  const [description, setDescription] = useState("")
  const [urlInput, setUrlInput] = useState("")
  const [descInput, setDescInput] = useState("")
  const [isUrlFocused, setIsUrlFocused] = useState(false)
  const [isDescFocused, setIsDescFocused] = useState(false)
  
  const { data, isLoading, error } = useMetaGen(url, description)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setUrl(urlInput.trim())
    setDescription(descInput.trim())
  }

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="flex flex-col pt-[56px] bg-background min-h-screen">
      {/* Header Section */}
      <section className="relative py-32 px-8 border-b border-outline-variant/10 overflow-hidden hero-gradient">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-low border border-outline-variant/30 rounded-full mb-10"
          >
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.2em] font-body text-secondary uppercase">
               Crawler Engine: Metadata Extraction Active
            </span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-black font-headline tracking-tighter text-on-background leading-none mb-10 uppercase">
            Meta<br />
            <span className="text-primary select-none underline decoration-primary/20 underline-offset-8">Generator</span>
          </h1>

          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
            <div className={`
              relative flex items-center bg-surface-container-low border p-1 rounded-2xl transition-all duration-300
              ${isUrlFocused ? "border-primary/50 editorial-focus ring-1 ring-primary/20 bg-surface-container shadow-2xl" : "border-outline-variant/20 hover:border-outline-variant/40 shadow-xl"}
            `}>
              <span className={`material-symbols-outlined ml-6 transition-colors duration-300 ${isUrlFocused ? "text-primary" : "text-on-background/50"}`}>
                link
              </span>
              <input 
                type="text" 
                value={urlInput}
                onFocus={() => setIsUrlFocused(true)}
                onBlur={() => setIsUrlFocused(false)}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Enter a page URL..."
                className="flex-1 bg-transparent border-none outline-none px-6 py-5 font-mono text-sm tracking-wider text-on-background placeholder:text-on-background/40 focus:ring-0"
              />
            </div>
            
            <div className={`
              relative flex flex-col bg-surface-container-low border p-1 rounded-2xl transition-all duration-300
              ${isDescFocused ? "border-primary/50 editorial-focus ring-1 ring-primary/20 bg-surface-container shadow-2xl" : "border-outline-variant/20 hover:border-outline-variant/40 shadow-xl"}
            `}>
              <div className="flex items-center pt-4 px-6 gap-4">
                 <span className={`material-symbols-outlined transition-colors ${isDescFocused ? "text-primary" : "text-on-background/50"}`}>
                   description
                 </span>
                 <span className={`text-[10px] font-black uppercase tracking-[0.3em] font-headline ${isDescFocused ? "text-primary" : "text-on-background/50"}`}>
                   Contextual Buffer
                 </span>
              </div>
              <textarea 
                value={descInput}
                onFocus={() => setIsDescFocused(true)}
                onBlur={() => setIsDescFocused(false)}
                onChange={(e) => setDescInput(e.target.value)}
                placeholder="Describe your page content for AI analysis..."
                className="w-full bg-transparent border-none outline-none px-6 py-6 font-mono text-sm tracking-wider text-on-background placeholder:text-on-background/40 focus:ring-0 min-h-[160px] resize-none"
              />
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className={`
                w-full py-5 rounded-2xl font-black font-headline tracking-tighter uppercase transition-all duration-150 active:scale-[0.98] flex items-center justify-center gap-4 disabled:opacity-50
                ${isUrlFocused || isDescFocused ? "bg-primary text-on-primary shadow-lg shadow-primary/20" : "bg-surface-container-highest text-on-surface hover:bg-primary hover:text-on-primary"}
              `}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-on-primary/20 border-t-on-primary rounded-full animate-spin" />
                  Synthesizing
                </>
              ) : (
                <>
                  Initialize Synthesis
                  <span className="material-symbols-outlined text-sm font-black transition-transform group-hover:rotate-45">
                    settings_input_component
                  </span>
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Results Content */}
      <main className="py-24 px-8 max-w-5xl mx-auto w-full">
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
             <div className="w-16 h-16 relative mb-8">
                <div className="absolute inset-0 border-2 border-secondary/20 rounded-full" />
                <div className="absolute inset-0 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
                <span className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-secondary">schema</span>
             </div>
             <span className="text-[10px] font-black tracking-[0.4em] font-body text-on-background/50 uppercase italic">Mapping Schema Patterns...</span>
          </div>
        )}
        
        {error && (
          <div className="flex flex-col items-center justify-center py-32 text-center bg-error-container/5 rounded-3xl border border-error/10">
             <span className="material-symbols-outlined text-5xl text-error mb-6">report</span>
             <h2 className="text-xl font-black font-headline text-error uppercase tracking-tight">Synthesis Error</h2>
             <p className="text-[10px] font-medium font-body text-on-background/60 uppercase tracking-[0.2em] mt-4 max-w-xs leading-relaxed">
               {error}
             </p>
          </div>
        )}
        
        {data && !isLoading && (
          <div className="space-y-12">
            <div className="flex items-center justify-between pb-8 border-b border-outline-variant/10">
                <div className="flex items-center gap-3">
                   <span className="material-symbols-outlined text-primary">token</span>
                   <h2 className="text-[10px] font-black font-headline tracking-[0.4em] text-on-background uppercase">
                     Identified Schema Tokens
                   </h2>
                </div>
                <div className="flex items-center gap-4">
                   <div className="flex items-center gap-2 px-3 py-1 bg-secondary/10 rounded-full border border-secondary/20">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                      <span className="text-[8px] font-black text-secondary uppercase tracking-[0.2em]">Optimized for Indexing</span>
                   </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <MetaOutputCard label="Core: Title" value={data.tags.title} onCopy={handleCopy} color="text-primary" />
              <MetaOutputCard label="Core: Meta Description" value={data.tags.description} onCopy={handleCopy} color="text-primary" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                 <div className="md:col-span-2 flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-secondary text-sm">public</span>
                    <h3 className="text-[10px] font-black font-headline text-on-background/40 uppercase tracking-[0.4em]">Social Graph Buffer</h3>
                 </div>
                 <MetaOutputCard label="Social: Open Graph Title" value={data.tags.og_title} onCopy={handleCopy} color="text-secondary" />
                 <MetaOutputCard label="Social: Open Graph Description" value={data.tags.og_description} onCopy={handleCopy} color="text-secondary" />
                 <MetaOutputCard label="Social: Twitter Title" value={data.tags.twitter_title} onCopy={handleCopy} color="text-secondary" />
                 <MetaOutputCard label="Social: Twitter Description" value={data.tags.twitter_description} onCopy={handleCopy} color="text-secondary" />
              </div>
              
              <div className="mt-8">
                 <MetaOutputCard label="Social: Twitter Card Type" value={data.tags.twitter_card} onCopy={handleCopy} color="text-on-background/40" />
              </div>
            </div>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5 }}
               className="mt-16 p-10 bg-surface-container-lowest border border-outline-variant/10 rounded-3xl relative overflow-hidden group"
            >
                <div className="absolute top-0 left-0 w-1 h-full bg-primary/30" />
                <div className="flex items-start gap-6">
                   <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                      <span className="material-symbols-outlined text-primary">info</span>
                   </div>
                   <div className="space-y-4">
                      <h4 className="text-[11px] font-black font-headline text-on-background uppercase tracking-[0.3em]">Usage Protocol</h4>
                      <p className="text-[10px] font-medium font-body text-on-background/60 uppercase tracking-[0.2em] leading-relaxed max-w-2xl">
                        Insert these tokens into the &lt;head&gt; section of your HTML document. 
                        Metadata identified is high priority and optimized for crawl-velocity. 
                        Index_v4_Cross_Sync enabled.
                      </p>
                   </div>
                </div>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  )
}
