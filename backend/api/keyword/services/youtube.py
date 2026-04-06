import asyncio
import shlex
from typing import Any

import yt_dlp


def _sanitize_keyword(keyword: str) -> str:
    """Sanitize keyword to prevent argument injection in yt-dlp."""
    return shlex.quote(keyword.strip())


async def fetch_youtube_tags(keyword: str) -> list[str]:
    """Fetch top YouTube video tags for a keyword using yt-dlp."""
    safe_keyword = _sanitize_keyword(keyword)
    ydl_opts: dict[str, Any] = {
        "quiet": True,
        "no_warnings": True,
        "extract_flat": False,
        "playlist_items": "1-5",
        "default_search": f"ytsearch5:{safe_keyword}",
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = await asyncio.to_thread(
                ydl.extract_info,
                f"ytsearch5:{safe_keyword}",
                download=False,
            )

        tags: list[str] = []
        if info and "entries" in info:
            for entry in info["entries"]:
                if entry and entry.get("tags"):
                    tags.extend(entry["tags"])

        seen = set()
        unique_tags = []
        for tag in tags:
            t = tag.lower().strip()
            if t and t not in seen:
                seen.add(t)
                unique_tags.append(t)

        return unique_tags[:50]
    except Exception:
        return []
