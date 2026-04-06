import asyncio
from datetime import datetime, timezone

from api.keyword.schemas import (
    AnalyzeRequest,
    AutocompleteSuggestion,
    InterestDataPoint,
    KeywordAnalysisResult,
    YouTubeTag,
)
from api.keyword.services import autocomplete as autocomplete_svc
from api.keyword.services import groq_llm
from api.keyword.services import pytrends as pytrends_svc
from api.keyword.services import youtube as youtube_svc
from core.database import get_table


def _normalize(keyword: str) -> str:
    return keyword.strip().lower()


def _is_cache_valid(created_at: str, ttl_minutes: int = 60) -> bool:
    try:
        created = datetime.fromisoformat(created_at.replace("Z", "+00:00"))
        now = datetime.now(timezone.utc)
        return (now - created).total_seconds() < ttl_minutes * 60
    except Exception:
        return False


async def analyze_keyword(req: AnalyzeRequest) -> KeywordAnalysisResult:
    keyword = req.q.strip()
    normalized = _normalize(keyword)

    # Check cache
    try:
        cache_table = get_table("keyword_cache")
        cached = cache_table.select("*").eq("normalized_keyword", normalized).execute()
        if cached.data:
            entry = cached.data[0]
            created_at: str = entry.get("created_at", "")
            if _is_cache_valid(created_at):
                return KeywordAnalysisResult(
                    keyword=keyword,
                    interest_over_time=entry.get("interest_over_time", []),
                    autocomplete=entry.get("autocomplete", []),
                    youtube_tags=entry.get("youtube_tags", []),
                    ai_meta_tags=entry.get("ai_meta_tags", []),
                    cached=True,
                )
    except Exception:
        pass

    # Fetch all sources in parallel, each with a 12s timeout
    pytrends_task = asyncio.create_task(_safe_interest(keyword))
    autocomplete_task = asyncio.create_task(_safe_autocomplete(keyword))
    youtube_tags_task = asyncio.create_task(_safe_youtube_tags(keyword))
    ai_tags_task = asyncio.create_task(_safe_ai_tags(keyword))

    async def with_timeout(coro, seconds):
        return await asyncio.wait_for(coro, timeout=seconds)

    results = await asyncio.gather(
        with_timeout(pytrends_task, 12),
        with_timeout(autocomplete_task, 8),
        with_timeout(youtube_tags_task, 10),
        with_timeout(ai_tags_task, 10),
        return_exceptions=True,
    )

    interest_over_time = _unwrap_result(results[0], [])
    autocomplete_raw = _unwrap_result(results[1], [])
    youtube_tags = _unwrap_result(results[2], [])
    ai_tags = _unwrap_result(results[3], [])

    autocomplete_suggestions = [
        AutocompleteSuggestion(text=s) for s in autocomplete_raw
    ]
    youtube_tag_objects = [YouTubeTag(tag=t) for t in youtube_tags]

    result = KeywordAnalysisResult(
        keyword=keyword,
        interest_over_time=interest_over_time,
        autocomplete=autocomplete_suggestions,
        youtube_tags=youtube_tag_objects,
        ai_meta_tags=ai_tags,
        cached=False,
    )

    # Store in cache
    try:
        cache_table = get_table("keyword_cache")
        cache_table.insert({
            "normalized_keyword": normalized,
            "keyword": keyword,
            "interest_over_time": [d.model_dump() for d in interest_over_time],
            "autocomplete": [s.model_dump() for s in autocomplete_suggestions],
            "youtube_tags": [t.model_dump() for t in youtube_tag_objects],
            "ai_meta_tags": ai_tags,
            "created_at": datetime.now(timezone.utc).isoformat(),
        }).execute()
    except Exception:
        pass

    return result


async def _safe_interest(keyword: str) -> list[InterestDataPoint]:
    try:
        data = await pytrends_svc.fetch_interest_over_time(keyword)
        return [InterestDataPoint(**d) for d in data]
    except Exception:
        return []


async def _safe_autocomplete(keyword: str) -> list[str]:
    try:
        return await autocomplete_svc.fetch_autocomplete(keyword)
    except Exception:
        return []


async def _safe_youtube_tags(keyword: str) -> list[str]:
    try:
        return await youtube_svc.fetch_youtube_tags(keyword)
    except Exception:
        return []


async def _safe_ai_tags(keyword: str) -> list[str]:
    try:
        return await groq_llm.generate_meta_tags(keyword)
    except Exception:
        return []


def _unwrap_result(result, default):
    if isinstance(result, Exception):
        return default
    return result
