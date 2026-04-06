import asyncio
from datetime import datetime, timezone

from core.database import get_table


async def get_cached(keyword: str) -> dict | None:
    """Retrieve cached result for a normalized keyword."""
    normalized = keyword.strip().lower()
    try:
        table = get_table("keyword_cache")
        result = table.select("*").eq("normalized_keyword", normalized).execute()
        if result.data:
            entry = result.data[0]
            created_at = entry.get("created_at", "")
            if _is_fresh(created_at):
                return entry
        return None
    except Exception:
        return None


async def clear_cache(keyword: str | None = None) -> int:
    """Clear all cache or cache for a specific keyword. Returns count of deleted rows."""
    try:
        table = get_table("keyword_cache")
        if keyword:
            normalized = keyword.strip().lower()
            result = table.delete().eq("normalized_keyword", normalized).execute()
        else:
            result = table.delete().execute()
        return len(result.data) if result.data else 0
    except Exception:
        return 0


async def get_cache_stats() -> dict:
    """Return cache statistics."""
    try:
        table = get_table("keyword_cache")
        result = table.select("normalized_keyword", count="exact").execute()
        total = result.count or 0
        return {"total_entries": total}
    except Exception:
        return {"total_entries": 0, "error": "Could not fetch stats"}


def _is_fresh(created_at: str, ttl_minutes: int = 60) -> bool:
    try:
        created = datetime.fromisoformat(created_at.replace("Z", "+00:00"))
        now = datetime.now(timezone.utc)
        return (now - created).total_seconds() < ttl_minutes * 60
    except Exception:
        return False
