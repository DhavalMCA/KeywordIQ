const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"

interface ApiError {
  detail: string
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const error: ApiError = await res.json().catch(() => ({ detail: `HTTP ${res.status}` }))
    throw new Error(error.detail)
  }
  return res.json() as Promise<T>
}

export async function apiPost<T, B = unknown>(path: string, body: B): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  return handleResponse<T>(res)
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, { method: "GET" })
  return handleResponse<T>(res)
}
