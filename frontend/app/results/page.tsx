"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Suspense, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { InterestGraph } from "@/features/interest-graph/InterestGraph"
import { AutocompleteList } from "@/features/autocomplete/AutocompleteList"
import { YouTubeTagsPanel } from "@/features/youtube-tags/YouTubeTagsPanel"
import { MetaTagsPanel } from "@/features/meta-tags/MetaTagsPanel"
import { useInterestData } from "@/features/interest-graph/useInterestData"

function ResultsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const q = searchParams.get("q") ?? ""

  const { data, isLoading, error } = useInterestData(q)

  if (!q) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-8 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
        <h2 className="text-2xl font-black font-headline text-on-background uppercase tracking-tight mb-4">Null Query Detected</h2>
        <p className="text-[10px] font-medium font-body text-on-background/60 uppercase tracking-[0.2em] mb-10 max-w-sm leading-relaxed">
          The indexing engine requires a valid search parameter to initialize.
        </p>
        <button
          onClick={() => router.push("/keyword-analysis")}
          className="px-8 py-3 bg-primary text-on-primary text-[10px] font-black uppercase tracking-widest rounded-lg transition-transform active:scale-95 shadow-lg shadow-primary/20"
        >
          Initialize Probe
        </button>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="pt-24 px-8 max-w-7xl mx-auto w-full flex flex-col gap-12">
        <div className="space-y-4">
          <div className="h-4 w-24 bg-surface-container-high animate-pulse rounded-full" />
          <div className="h-16 w-1/2 bg-surface-container-high animate-pulse rounded-2xl" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div className="h-[450px] bg-surface-container-low animate-pulse rounded-3xl border border-outline-variant/10" />
            <div className="h-[300px] bg-surface-container-low animate-pulse rounded-3xl border border-outline-variant/10" />
          </div>
          <div className="space-y-8">
            <div className="h-[400px] bg-surface-container-low animate-pulse rounded-3xl border border-outline-variant/10" />
            <div className="h-[350px] bg-surface-container-low animate-pulse rounded-3xl border border-outline-variant/10" />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-8 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-error/5 blur-[80px] rounded-full pointer-events-none" />
        <span className="material-symbols-outlined text-4xl text-error mb-6">warning</span>
        <h2 className="text-2xl font-black font-headline text-on-background uppercase tracking-tight mb-4">Protocol Terminated</h2>
        <p className="text-[10px] font-medium font-body text-on-background/60 uppercase tracking-[0.2em] mb-10 max-w-sm leading-relaxed">
          Critical failure in channel mapping. Database connection could not be established.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-surface-container-high text-on-surface text-[10px] font-black uppercase tracking-widest rounded-lg transition-transform active:scale-95 border border-outline-variant/20 hover:bg-error hover:text-on-error hover:border-error/30"
        >
          Re-Initialize
        </button>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen pt-[56px] bg-background">
      {/* Sidebar for Navigation/Context */}
      <aside className="w-80 border-r border-outline-variant/10 p-8 hidden xl:flex flex-col gap-10 sticky top-[56px] h-[calc(100vh-56px)] overflow-y-auto bg-surface-container-lowest/30 backdrop-blur-sm">
        <div className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-outline-variant">Contextual Mapping</span>
            <div className="h-0.5 w-8 bg-primary rounded-full" />
          </div>
          
          <div className="flex flex-col gap-2">
            {data?.autocomplete?.slice(0, 10).map((s, i) => (
              <button
                key={i}
                onClick={() => router.push(`/results?q=${encodeURIComponent(s.text)}`)}
                className="group flex items-center justify-between py-3 px-4 text-[10px] font-bold text-on-background/60 hover:text-primary bg-surface-container-low/50 hover:bg-surface-container border border-outline-variant/5 rounded-xl transition-all uppercase tracking-widest text-left"
              >
                <span className="truncate pr-2">{s.text}</span>
                <span className="material-symbols-outlined text-xs opacity-0 group-hover:opacity-100 transition-opacity">north_east</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-10 border-t border-outline-variant/5">
           <div className="flex flex-col gap-1 mb-8">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-outline-variant">Engine Specs</span>
              <div className="h-0.5 w-8 bg-secondary rounded-full" />
           </div>
           
           <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-surface-container-low border border-outline-variant/5 rounded-2xl">
                 <span className="text-[8px] font-black text-on-background/50 uppercase tracking-widest block mb-1">Density</span>
                 <span className="text-[10px] font-mono text-secondary font-bold tracking-widest">HIGH</span>
              </div>
              <div className="p-4 bg-surface-container-low border border-outline-variant/5 rounded-2xl">
                 <span className="text-[8px] font-black text-on-background/50 uppercase tracking-widest block mb-1">Variance</span>
                 <span className="text-[10px] font-mono text-secondary font-bold tracking-widest">0.82</span>
              </div>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 xl:p-12 overflow-x-hidden">
        <header className="mb-8 sm:mb-14 relative">
          <div className="flex items-center gap-3 mb-4">
             <span className="material-symbols-outlined text-primary text-lg">data_exploration</span>
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Ledger Artifact</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black font-headline text-on-background tracking-tighter uppercase leading-none">
            {q}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 mt-8">
             <div className="flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-lg border border-outline-variant/10">
                <span className="text-[9px] font-black text-on-background/60 uppercase tracking-widest">Region</span>
                <span className="text-[9px] font-mono text-on-background font-bold uppercase tracking-widest">GLOBAL_INDEX</span>
             </div>
             <div className="flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-lg border border-outline-variant/10">
                <span className="text-[9px] font-black text-on-background/60 uppercase tracking-widest">Timestamp</span>
                <span className="text-[9px] font-mono text-on-background font-bold uppercase tracking-widest">REALTIME_ACTIVE</span>
             </div>
             <div className="flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-lg border border-outline-variant/10">
                <span className="text-[9px] font-black text-on-background/60 uppercase tracking-widest">Protocol</span>
                <span className="text-[9px] font-mono text-on-background font-bold uppercase tracking-widest">V4_DENSE</span>
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          <div className="xl:col-span-8 space-y-8">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5 }}
            >
              <InterestGraph data={data?.interest_over_time ?? []} keyword={q} />
            </motion.div>
            
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.2 }}
            >
              <YouTubeTagsPanel tags={data?.youtube_tags ?? []} />
            </motion.div>
          </div>

          <div className="xl:col-span-4 space-y-8">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.1 }}
            >
              <AutocompleteList suggestions={data?.autocomplete?.slice(0, 8) ?? []} />
            </motion.div>
            
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.3 }}
            >
              <MetaTagsPanel tags={data?.ai_meta_tags ?? []} />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-screen pt-[56px] text-center bg-background">
          <div className="w-16 h-16 relative mb-8">
             <div className="absolute inset-0 border-2 border-primary/20 rounded-full" />
             <div className="absolute inset-0 border-2 border-primary border-t-transparent rounded-full animate-spin" />
             <span className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary" data-icon="search_insights">search_insights</span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-on-background/50">Ingesting Remote Buffers...</span>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  )
}
