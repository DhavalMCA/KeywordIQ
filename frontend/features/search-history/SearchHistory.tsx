interface SearchHistoryProps {
  onSelect: (keyword: string) => void
}

export function SearchHistory({ onSelect }: SearchHistoryProps) {
  const history: string[] = []

  if (history.length === 0) return null

  return (
    <div className="border border-[#2A292F] rounded-sm p-4 bg-[#131318]">
      <h3 className="text-sm font-semibold mb-3 text-[#F0EFF5]">Recent Searches</h3>
      <div className="flex flex-wrap gap-2">
        {history.map((kw) => (
          <button
            key={kw}
            onClick={() => onSelect(kw)}
            className="text-xs px-2 py-1 rounded-sm bg-[#1F1F25] text-[#CAC4D5] hover:bg-[#6E56CF]/10 hover:text-[#CBDEFF] transition-colors border border-[#2A292F]"
          >
            {kw}
          </button>
        ))}
      </div>
    </div>
  )
}
