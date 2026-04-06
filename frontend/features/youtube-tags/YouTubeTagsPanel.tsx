interface YouTubeTagsPanelProps {
  tags: { tag: string; frequency?: number | null }[]
}

export function YouTubeTagsPanel({ tags }: YouTubeTagsPanelProps) {
  return (
    <div className="bg-surface-container-low border border-outline-variant/10 p-8 rounded-3xl group relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex items-center justify-between mb-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
             <span className="material-symbols-outlined text-xs text-primary">smart_display</span>
             <h2 className="text-[10px] font-black  font-headline text-on-background uppercase">
               YouTube Keyword Extraction
             </h2>
          </div>
          <p className="text-[8px] font-medium font-body text-on-background/50 pl-6">Channel Mapping Active V4.2</p>
        </div>
      </div>
      
      {tags.length === 0 ? (
        <div className="h-[150px] flex flex-col items-center justify-center border border-dashed border-outline-variant/10 bg-background/50 rounded-2xl">
          <span className="material-symbols-outlined text-outline-variant/20 text-3xl mb-4">videocam_off</span>
          <p className="text-[10px] font-mono text-on-background/50 text-center">
            No tags identified in scope
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tags.map((t, i) => (
            <div
              key={i}
              className="px-5 py-4 bg-background border border-outline-variant/5 rounded-2xl group/item hover:border-primary/20 hover:bg-surface-container-high transition-all cursor-default relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-primary/5 opacity-0 group-hover/item:opacity-100 transition-opacity" />
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <span className="text-[9px] font-mono text-on-background/50 group-hover/item:text-primary transition-colors font-bold tracking-widest">
                     {String(i + 1).padStart(2, '0')}
                   </span>
                   <span className="text-[11px] font-black font-headline text-on-background uppercase tracking-wider group-hover/item:text-on-background transition-colors">
                     {t.tag}
                   </span>
                </div>
                <span className="material-symbols-outlined text-xs text-on-background/10 group-hover/item:text-primary transition-colors">tag</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 pt-6 border-t border-outline-variant/5 flex items-center justify-between">
         <span className="text-[8px] font-black text-on-background/50">Index volume: {tags.length} elements</span>
         <span className="text-[8px] font-bold text-on-background/10  italic font-body">Source: Index_v4_YouTube_Pipe</span>
      </div>
    </div>
  )
}
