"use client"

import { useState, useEffect } from "react"
import { apiPost } from "@/lib/api-client"
import type { KeywordAnalysis } from "@/lib/validators"
import { KeywordAnalysisSchema } from "@/lib/validators"

export function useInterestData(keyword: string) {
  const [data, setData] = useState<KeywordAnalysis | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function fetchData() {
    if (!keyword.trim()) return
    setIsLoading(true)
    setError(null)
    try {
      const raw = await apiPost<unknown>("/keyword/analyze", { q: keyword })
      const parsed = KeywordAnalysisSchema.parse(raw)
      setData(parsed)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [keyword])

  return { data, isLoading, error }
}
