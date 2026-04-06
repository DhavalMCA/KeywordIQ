"use client"

import { useState, useEffect } from "react"
import { apiPost } from "@/lib/api-client"
import type { InstagramSearch } from "@/lib/validators"
import { InstagramSearchSchema } from "@/lib/validators"

export function useInstagramFinder(query: string) {
  const [data, setData] = useState<InstagramSearch | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function fetchData() {
    if (!query.trim()) return
    setIsLoading(true)
    setError(null)
    try {
      const raw = await apiPost<unknown>("/instagram/search", { q: query })
      const parsed = InstagramSearchSchema.parse(raw)
      setData(parsed)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to find hashtags")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [query])

  return { data, isLoading, error }
}
