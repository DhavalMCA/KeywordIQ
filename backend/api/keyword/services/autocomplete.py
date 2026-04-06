import asyncio
from datetime import datetime, timezone

import httpx


async def fetch_autocomplete(keyword: str) -> list[str]:
    """Fetch keyword suggestions from Google Autocomplete."""
    sanitized = keyword.strip().replace(" ", "+")
    url = f"https://suggestqueries.google.com/complete/search?q={sanitized}&client=firefox"

    async with httpx.AsyncClient(timeout=5.0) as client:
        response = await client.get(url)
        response.raise_for_status()
        data = response.json()

    suggestions = []
    if len(data) >= 2 and isinstance(data[1], list):
        for item in data[1]:
            if isinstance(item, str) and item.strip():
                suggestions.append(item.strip())

    return suggestions
