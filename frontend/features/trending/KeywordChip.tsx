interface KeywordChipProps {
  keyword: string
  onClick?: (keyword: string) => void
}

export function KeywordChip({ keyword, onClick }: KeywordChipProps) {
  return (
    <button
      onClick={() => onClick?.(keyword)}
      className="text-sm px-3 py-1 rounded-full bg-[#6E56CF]/10 text-[#CBDEFF] hover:bg-[#6E56CF]/20 transition-colors border border-[#6E56CF]/20"
    >
      {keyword}
    </button>
  )
}
