import asyncio

import groq
from groq.types.chat import ChatCompletionMessageParam

from core.config import settings


async def generate_meta_tags(keyword: str) -> list[str]:
    """Generate meta tag suggestions for a keyword using Groq Llama 3."""
    prompt = f"""You are an SEO expert. Generate exactly 10 SEO meta tag keywords for the keyword: "{keyword}"
Return ONLY a JSON array of strings, nothing else. Example: ["keyword1", "keyword2", ...]"""

    client = groq.Groq(api_key=settings.GROQ_API_KEY)
    messages: list[ChatCompletionMessageParam] = [
        {"role": "user", "content": prompt}
    ]

    try:
        response = await asyncio.to_thread(
            client.chat.completions.create,
            model=settings.GROQ_MODEL,
            messages=messages,
            temperature=0.7,
            max_tokens=256,
        )
        content = response.choices[0].message.content or "[]"
        import json
        # Strip markdown code blocks if present
        content = content.strip()
        if content.startswith("```"):
            lines = content.split("\n")
            content = "\n".join(lines[1:-1] if lines[-1] == "```" else lines[1:])
        tags = json.loads(content)
        if isinstance(tags, list):
            return [str(t) for t in tags if t]
        return []
    except Exception:
        return []


async def generate_hashtags(topic: str, platform: str) -> list[str]:
    """Generate hashtags for a topic using Groq Llama 3."""
    platform_prompt = {
        "instagram": "Generate exactly 30 Instagram hashtags for the topic",
        "twitter": "Generate exactly 5 Twitter/X hashtags for the topic",
        "linkedin": "Generate exactly 10 LinkedIn hashtags for the topic",
    }
    prompt_template = platform_prompt.get(platform, f"Generate hashtags for the topic: {topic}")
    prompt = f"""{prompt_template}: "{topic}"
Return ONLY a JSON array of strings (with # prefix for Instagram/Twitter, none for LinkedIn), nothing else.
Example for Instagram: ["#keyword1", "#keyword2", ...]"""

    client = groq.Groq(api_key=settings.GROQ_API_KEY)
    messages: list[ChatCompletionMessageParam] = [
        {"role": "user", "content": prompt}
    ]

    try:
        response = await asyncio.to_thread(
            client.chat.completions.create,
            model=settings.GROQ_MODEL,
            messages=messages,
            temperature=0.8,
            max_tokens=512,
        )
        content = response.choices[0].message.content or "[]"
        import json
        # Strip markdown code blocks if present
        content = content.strip()
        if content.startswith("```"):
            lines = content.split("\n")
            content = "\n".join(lines[1:-1] if lines[-1] == "```" else lines[1:])
        hashtags = json.loads(content)
        if isinstance(hashtags, list):
            return [str(h) for h in hashtags if h]
        return []
    except Exception:
        return []


async def generate_page_meta_tags(url: str, description: str | None) -> dict[str, str]:
    """Generate SEO meta tags for a page URL or description using Groq Llama 3."""
    prompt = f"""You are an SEO expert. Generate SEO meta tags for this page.
{"URL: " + url if url else ""}
{"Description: " + description if description else ""}

Return ONLY a valid JSON object with exactly these keys (no markdown, no explanation):
{{"title": "...", "description": "...", "og_title": "...", "og_description": "...", "twitter_card": "summary_large_image", "twitter_title": "...", "twitter_description": "..."}}

Keep each value under 60 characters for title and 155 for description. Be concise and descriptive."""

    client = groq.Groq(api_key=settings.GROQ_API_KEY)
    messages: list[ChatCompletionMessageParam] = [
        {"role": "user", "content": prompt}
    ]

    try:
        response = await asyncio.to_thread(
            client.chat.completions.create,
            model=settings.GROQ_MODEL,
            messages=messages,
            temperature=0.5,
            max_tokens=512,
        )
        content = response.choices[0].message.content or "{}"
        import json
        # Strip markdown code blocks if present
        content = content.strip()
        if content.startswith("```"):
            lines = content.split("\n")
            content = "\n".join(lines[1:-1] if lines[-1] == "```" else lines[1:])
        tags = json.loads(content)
        if isinstance(tags, dict):
            return {k: str(v) for k, v in tags.items()}
        return {
            "title": "",
            "description": "",
            "og_title": "",
            "og_description": "",
            "twitter_card": "summary_large_image",
            "twitter_title": "",
            "twitter_description": "",
        }
    except Exception:
        return {
            "title": "",
            "description": "",
            "og_title": "",
            "og_description": "",
            "twitter_card": "summary_large_image",
            "twitter_title": "",
            "twitter_description": "",
        }
