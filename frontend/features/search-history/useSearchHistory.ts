const STORAGE_KEY = "keywordiq_search_history"
const MAX_ITEMS = 20

export function getSearchHistory(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as string[]
  } catch {
    return []
  }
}

export function addToHistory(keyword: string) {
  const history = getSearchHistory()
  const normalized = keyword.trim().toLowerCase()
  const filtered = history.filter((k) => k.toLowerCase() !== normalized)
  const updated = [keyword.trim(), ...filtered].slice(0, MAX_ITEMS)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY)
}
