import asyncio

from groq import Groq

from api.instagram.schemas import InstagramHashtag, InstagramSearchResult, NicheCluster
from core.config import settings


async def search_instagram(keyword: str) -> InstagramSearchResult:
    hashtags = await _generate_keyword_hashtags(keyword)
    trending = await _fetch_trending_hashtags()
    niches = await _generate_niche_clusters(keyword)

    return InstagramSearchResult(
        hashtags=hashtags,
        trending=trending,
        niches=niches,
    )


async def _generate_keyword_hashtags(keyword: str) -> list[InstagramHashtag]:
    """Generate hashtags directly related to the keyword using Groq."""
    prompt = f"""You are an Instagram hashtag expert. Generate exactly 20 relevant hashtags for the keyword "{keyword}".
These hashtags MUST all be directly related to "{keyword}" - they should be used by accounts posting about {keyword}.
Return ONLY a JSON array of hashtag strings like: ["#keyword1", "#keyword2", ...]"""

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
        # Strip markdown code blocks if present
        content = content.strip()
        if content.startswith("```"):
            lines = content.split("\n")
            content = "\n".join(lines[1:-1] if lines[-1] == "```" else lines[1:])
        tags = json.loads(content)
        if isinstance(tags, list):
            return [InstagramHashtag(tag=tag if tag.startswith("#") else f"#{tag}") for tag in tags if tag]
        return []
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
    prompt = f"""You are an Instagram marketing expert. For the keyword "{keyword}", suggest exactly 3 niche clusters that are highly relevant to this keyword.
Each cluster must have a topic name that is directly related to "{keyword}" and 8-10 specific hashtags that would be used by someone posting about "{keyword}".
All hashtags MUST be related to "{keyword}" - do not include generic or unrelated hashtags.
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
        # Strip markdown code blocks if present
        content = content.strip()
        if content.startswith("```"):
            lines = content.split("\n")
            content = "\n".join(lines[1:-1] if lines[-1] == "```" else lines[1:])
        clusters = json.loads(content)
        if isinstance(clusters, list):
            return [NicheCluster(**c) for c in clusters if isinstance(c, dict)]
        return []
    except Exception:
        return []
