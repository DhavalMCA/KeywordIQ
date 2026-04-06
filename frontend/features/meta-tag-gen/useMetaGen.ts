"use client"

import { useState, useEffect } from "react"
import { apiPost } from "@/lib/api-client"
import type { MetaTagResult } from "@/lib/validators"
import { MetaTagResultSchema } from "@/lib/validators"

export function useMetaGen(url: string, description: string) {
  const [data, setData] = useState<MetaTagResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function fetchData() {
    if (!url.trim() && !description.trim()) return
    setIsLoading(true)
    setError(null)
    try {
      const raw = await apiPost<unknown>("/metatag/generate", { url: url || null, description: description || null })
      const parsed = MetaTagResultSchema.parse(raw)
      setData(parsed)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate meta tags")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [url, description])

  return { data, isLoading, error }
}
