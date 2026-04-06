import re

from fastapi import APIRouter, HTTPException

from api.youtube.schemas import YouTubeSearchRequest, YouTubeSearchResult
from api.youtube.service import search_youtube_videos

router = APIRouter(prefix="/youtube")


@router.post("/search", response_model=YouTubeSearchResult)
async def search(req: YouTubeSearchRequest):
    q = req.q.strip()
    if not q:
        raise HTTPException(status_code=400, detail="Keyword cannot be empty")
    if len(q) > 200:
        raise HTTPException(status_code=400, detail="Keyword too long (max 200 characters)")
    if not re.match(r"^[\w\s\-\.\'\ ]+$", q):
        raise HTTPException(status_code=400, detail="Invalid characters in keyword")

    return await search_youtube_videos(q)
