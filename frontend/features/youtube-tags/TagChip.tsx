interface TagChipProps {
  tag: string
  onClick?: (tag: string) => void
}

export function TagChip({ tag, onClick }: TagChipProps) {
  return (
    <button
      onClick={() => onClick?.(tag)}
      className="text-xs px-2 py-1 rounded-sm bg-[#6E56CF]/10 text-[#CBDEFF] hover:bg-[#6E56CF]/20 transition-colors border border-[#6E56CF]/20"
    >
      {tag}
    </button>
  )
}
