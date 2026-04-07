"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface MetaOutputCardProps {
  label: string
  value: string
  onCopy: (text: string) => void
  color?: string
}

export function MetaOutputCard({ label, value, onCopy, color = "text-primary" }: MetaOutputCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    onCopy(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-surface-container-low border border-outline-variant/10 p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl group relative overflow-hidden transition-all hover:bg-surface-container">
      <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-1.5 h-1.5 rounded-full ${color.replace('text-', 'bg-')}`} />
          <span className="text-[10px] font-black font-headline text-on-background/50  group-hover:text-on-background/60 transition-colors">{label}</span>
        </div>
        <button
          onClick={handleCopy}
          className={`
            flex items-center gap-2 px-3 py-1.5 rounded-lg text-[9px] font-black transition-all active:scale-95 border
            ${copied 
              ? "bg-secondary text-on-secondary border-secondary shadow-lg shadow-secondary/20" 
              : "bg-surface-container-highest text-on-surface border-outline-variant/5 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"}
          `}
          title="Copy"
        >
          <span className="material-symbols-outlined text-[14px]">
            {copied ? "check_circle" : "content_copy"}
          </span>
          {copied ? "ALLOCATED" : "COPY"}
        </button>
      </div>

      <div className="bg-background/50 border border-outline-variant/5 p-5 rounded-2xl relative overflow-hidden group/text">
        <div className="absolute top-0 right-0 p-2 opacity-0 group-hover/text:opacity-100 transition-opacity">
           <span className="text-[8px] font-mono text-on-background/10 font-bold">Buffer_Sync_v4.2</span>
        </div>
        <p className="text-[11px] font-mono text-on-background break-all leading-relaxed tracking-tight group-hover:text-primary transition-colors">
          {value || <span className="text-on-background/10 italic">NULL_VALUE_EXPECTED</span>}
        </p>
      </div>
      
      <div className="mt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
         <span className="text-[8px] font-black text-on-background/10 italic tracking-widest">Token Integrity: Validated</span>
         <div className="flex gap-1">
            <div className="w-1 h-1 rounded-full bg-on-background/10" />
            <div className="w-1 h-1 rounded-full bg-on-background/10" />
            <div className="w-1 h-1 rounded-full bg-on-background/10" />
         </div>
      </div>
    </div>
  )
}
