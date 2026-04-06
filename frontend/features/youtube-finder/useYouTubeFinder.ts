"use client"

import { useState, useEffect } from "react"
import { apiPost } from "@/lib/api-client"
import type { YouTubeSearch } from "@/lib/validators"
import { YouTubeSearchSchema } from "@/lib/validators"

export function useYouTubeFinder(query: string) {
  const [data, setData] = useState<YouTubeSearch | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function fetchData() {
    if (!query.trim()) return
    setIsLoading(true)
    setError(null)
    try {
      const raw = await apiPost<unknown>("/youtube/search", { q: query })
      const parsed = YouTubeSearchSchema.parse(raw)
      setData(parsed)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to search YouTube")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [query])

  return { data, isLoading, error }
}
