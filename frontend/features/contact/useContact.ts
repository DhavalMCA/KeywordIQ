"use client"

import { useState } from "react"
import { apiPost } from "@/lib/api-client"

export function useContact() {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function submit(form: { name: string; email: string; message: string }) {
    setIsLoading(true)
    setError(null)
    try {
      await apiPost("/contact/submit", form)
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message")
    } finally {
      setIsLoading(false)
    }
  }

  return { submit, isLoading, success, error }
}
