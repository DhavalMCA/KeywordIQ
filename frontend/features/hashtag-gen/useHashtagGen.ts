"use client"

import { useState, useEffect } from "react"
import { apiPost } from "@/lib/api-client"
import type { HashtagResult } from "@/lib/validators"
import { HashtagResultSchema } from "@/lib/validators"

export function useHashtagGen(topic: string) {
  const [data, setData] = useState<HashtagResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function fetchData() {
    if (!topic.trim()) return
    setIsLoading(true)
    setError(null)
    try {
      const raw = await apiPost<unknown>("/hashtag/generate", { topic })
      const parsed = HashtagResultSchema.parse(raw)
      setData(parsed)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate hashtags")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [topic])

  return { data, isLoading, error }
}
