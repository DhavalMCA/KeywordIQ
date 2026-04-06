import asyncio

from api.hashtag.schemas import HashtagBundle, HashtagGenerateResult
from api.keyword.services import groq_llm


async def generate_hashtags(topic: str) -> HashtagGenerateResult:
    instagram_task = asyncio.create_task(groq_llm.generate_hashtags(topic, "instagram"))
    twitter_task = asyncio.create_task(groq_llm.generate_hashtags(topic, "twitter"))
    linkedin_task = asyncio.create_task(groq_llm.generate_hashtags(topic, "linkedin"))

    instagram_tags, twitter_tags, linkedin_tags = await asyncio.gather(
        asyncio.wait_for(instagram_task, timeout=10),
        asyncio.wait_for(twitter_task, timeout=8),
        asyncio.wait_for(linkedin_task, timeout=8),
        return_exceptions=True,
    )

    def get_list(result, default=list) -> list[str]:
        if isinstance(result, Exception):
            return default()
        return result

    return HashtagGenerateResult(
        topic=topic,
        hashtags=HashtagBundle(
            instagram=get_list(instagram_tags),
            twitter=get_list(twitter_tags),
            linkedin=get_list(linkedin_tags),
        ),
        cached=False,
    )
