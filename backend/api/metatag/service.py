import asyncio

from api.keyword.services import groq_llm as llm_svc
from api.metatag.schemas import MetaTagGenerateResult, MetaTagInput, MetaTagOutput


async def generate_meta_tags(input_data: MetaTagInput) -> MetaTagGenerateResult:
    result = await asyncio.wait_for(
        llm_svc.generate_page_meta_tags(url=input_data.url or "", description=input_data.description or ""),
        timeout=10.0,
    )

    tags = MetaTagOutput(
        title=result.get("title", ""),
        description=result.get("description", ""),
        og_title=result.get("og_title", ""),
        og_description=result.get("og_description", ""),
        twitter_card=result.get("twitter_card", "summary_large_image"),
        twitter_title=result.get("twitter_title", ""),
        twitter_description=result.get("twitter_description", ""),
    )

    return MetaTagGenerateResult(
        input_url=input_data.url,
        input_description=input_data.description,
        tags=tags,
        cached=False,
    )
