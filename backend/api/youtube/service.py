import asyncio
import shlex
from datetime import datetime, timezone
from typing import Any

import yt_dlp

from api.youtube.schemas import YouTubeSearchResult, YouTubeVideo


async def search_youtube_videos(keyword: str) -> YouTubeSearchResult:
    safe_keyword = shlex.quote(keyword.strip())

    ydl_opts: dict[str, Any] = {
        "quiet": True,
        "no_warnings": True,
        "extract_flat": False,
        "playlist_items": "1-10",
        "default_search": f"ytsearch10:{safe_keyword}",
    }

    async def do_search():
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            return await asyncio.to_thread(
                ydl.extract_info,
                f"ytsearch10:{safe_keyword}",
                download=False,
            )

    try:
        info = await asyncio.wait_for(do_search(), timeout=15)
    except asyncio.TimeoutError:
        return YouTubeSearchResult(videos=[], tag_cloud=[])
    except Exception:
        return YouTubeSearchResult(videos=[], tag_cloud=[])

        videos: list[YouTubeVideo] = []
        all_tags: list[str] = []

        if info and "entries" in info:
            for entry in info["entries"]:
                if not entry:
                    continue
                video = YouTubeVideo(
                    title=entry.get("title", ""),
                    video_id=entry.get("id", ""),
                    channel_title=entry.get("uploader", ""),
                    view_count=entry.get("view_count"),
                    tags=entry.get("tags", []),
                    url=f"https://youtube.com/watch?v={entry.get('id', '')}",
                )
                videos.append(video)
                all_tags.extend([t.lower() for t in entry.get("tags", []) if t])

        seen = set()
        tag_cloud = []
        for tag in all_tags:
            t = tag.strip()
            if t and t not in seen:
                seen.add(t)
                tag_cloud.append(t)

        return YouTubeSearchResult(videos=videos, tag_cloud=tag_cloud[:50])
    except Exception:
        return YouTubeSearchResult(videos=[], tag_cloud=[])
