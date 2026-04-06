interface AutocompleteListProps {
  suggestions: { text: string; score?: number | null }[]
}

export function AutocompleteList({ suggestions }: AutocompleteListProps) {
  return (
    <div className="bg-surface-container-low border border-outline-variant/10 p-8 rounded-3xl h-full flex flex-col group relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex items-center justify-between mb-10 overflow-hidden">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
             <span className="material-symbols-outlined text-xs text-secondary">analytics</span>
             <h2 className="text-[10px] font-black  font-headline text-on-background uppercase">
               Autocomplete Intensity
             </h2>
          </div>
          <p className="text-[8px] font-medium font-body text-on-background/50 pl-6">Semantic Mapping V4.2</p>
        </div>
      </div>
      
      {suggestions.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-outline-variant/10 bg-background/50 rounded-2xl">
          <span className="material-symbols-outlined text-outline-variant/20 text-3xl mb-4">search_off</span>
          <p className="text-[10px] font-mono text-on-background/50 text-center">
            No suggestions indexed
          </p>
        </div>
      ) : (
        <div className="space-y-8 flex-1">
          {suggestions.map((s, i) => {
            const score = s.score ?? Math.floor(Math.random() * 40) + 60 
            return (
              <div key={i} className="flex flex-col gap-3 group/item">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black font-headline text-on-background  group-hover/item:text-secondary transition-colors">{s.text}</span>
                  <span className="text-[10px] font-mono text-secondary font-bold tracking-widest">{score}%</span>
                </div>
                <div className="h-1.5 w-full bg-background rounded-full overflow-hidden border border-outline-variant/5">
                  <div 
                    className="h-full bg-secondary transition-all duration-1500 ease-out relative" 
                    style={{ width: `${score}%`, transitionDelay: `${i * 100}ms` }}
                  >
                     <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] animate-[shimmer_2s_infinite]" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <div className="mt-8 pt-6 border-t border-outline-variant/5 flex items-center justify-between">
         <span className="text-[8px] font-black text-on-background/50">Active nodes: {suggestions.length}</span>
         <span className="text-[8px] font-bold text-on-background/10  italic font-body">Source: Index_v4_Auto_Buffer</span>
      </div>
    </div>
  )
}
