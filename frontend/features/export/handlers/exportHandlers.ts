import type { KeywordAnalysis } from "@/lib/validators"

export function exportJson(data: KeywordAnalysis): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
  downloadBlob(blob, `${data.keyword.replace(/\s+/g, "_")}_analysis.json`)
}

export function exportCsv(data: KeywordAnalysis): void {
  const rows: string[][] = [
    ["Keyword", "Source", "Value"],
  ]

  for (const pt of data.interest_over_time) {
    rows.push([data.keyword, `Interest ${pt.date}`, String(pt.value ?? "")])
  }

  for (const s of data.autocomplete) {
    rows.push([data.keyword, "Autocomplete", s.text])
  }

  for (const t of data.youtube_tags) {
    rows.push([data.keyword, "YouTube Tag", t.tag])
  }

  if (data.ai_meta_tags) {
    for (const tag of data.ai_meta_tags) {
      rows.push([data.keyword, "AI Meta Tag", tag])
    }
  }

  const csv = rows
    .map((row) =>
      row.map((cell) => escapeCell(cell)).join(",")
    )
    .join("\n")

  const blob = new Blob([csv], { type: "text/csv" })
  downloadBlob(blob, `${data.keyword.replace(/\s+/g, "_")}_analysis.csv`)
}

export function exportTxt(data: KeywordAnalysis): void {
  const lines = [
    `Keyword: ${data.keyword}`,
    "",
    "Interest Over Time:",
    ...data.interest_over_time.map((pt) => `  ${pt.date}: ${pt.value ?? "N/A"}`),
    "",
    "Autocomplete Suggestions:",
    ...data.autocomplete.map((s) => `  - ${s.text}`),
    "",
    "YouTube Tags:",
    ...data.youtube_tags.map((t) => `  #${t.tag}`),
  ]

  if (data.ai_meta_tags) {
    lines.push("", "AI Meta Tags:")
    lines.push(...data.ai_meta_tags.map((tag) => `  ${tag}`))
  }

  const blob = new Blob([lines.join("\n")], { type: "text/plain" })
  downloadBlob(blob, `${data.keyword.replace(/\s+/g, "_")}_analysis.txt`)
}

function escapeCell(cell: string): string {
  if (cell.includes(",") || cell.includes('"') || cell.includes("\n")) {
    return `"${cell.replace(/"/g, '""')}"`
  }
  return cell
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
