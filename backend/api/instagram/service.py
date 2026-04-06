import asyncio

import httpx
from groq import Groq

from api.instagram.schemas import InstagramHashtag, InstagramSearchResult, NicheCluster
from api.keyword.services import groq_llm
from core.config import settings


async def search_instagram(keyword: str) -> InstagramSearchResult:
    autocomplete_suggestions = await _fetch_google_autocomplete(keyword)
    hashtags = [InstagramHashtag(tag=f"#{kw.replace(' ', '')}") for kw in autocomplete_suggestions[:20]]

    trending = await _fetch_trending_hashtags()
    niches = await _generate_niche_clusters(keyword)

    return InstagramSearchResult(
        hashtags=hashtags,
        trending=trending,
        niches=niches,
    )


async def _fetch_google_autocomplete(keyword: str) -> list[str]:
    sanitized = keyword.strip().replace(" ", "+")
    url = f"https://suggestqueries.google.com/complete/search?q={sanitized}&client=firefox"

    try:
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
    except Exception:
        return []


async def _fetch_trending_hashtags() -> list[InstagramHashtag]:
    trending_topics = [
        "fyp", "viral", "trending", "explore", "instagood",
        "photography", "food", "travel", "fitness", "fashion",
        "beauty", "nature", "art", "music", "lifestyle",
    ]
    return [InstagramHashtag(tag=f"#{topic}") for topic in trending_topics]


async def _generate_niche_clusters(keyword: str) -> list[NicheCluster]:
    prompt = f"""You are an Instagram marketing expert. For the keyword "{keyword}", suggest 3 niche clusters.
Each cluster should have a topic name and 8-10 related hashtags.
Return ONLY a valid JSON array like:
[{{"topic": "Topic Name", "hashtags": ["#tag1", "#tag2", ...]}}, ...]"""

    try:
        client = Groq(api_key=settings.GROQ_API_KEY)

        def sync_call():
            return client.chat.completions.create(
                model=settings.GROQ_MODEL,
                messages=[{"role": "user", "content": prompt}],
                temperature=0.8,
                max_tokens=512,
            )

        response = await asyncio.wait_for(asyncio.to_thread(sync_call), timeout=10)
        content = response.choices[0].message.content or "[]"
        import json
        clusters = json.loads(content)
        if isinstance(clusters, list):
            return [NicheCluster(**c) for c in clusters if isinstance(c, dict)]
        return []
    except Exception:
        return []
