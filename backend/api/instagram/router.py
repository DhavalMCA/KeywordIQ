import re

from fastapi import APIRouter, HTTPException

from api.instagram.schemas import InstagramSearchRequest, InstagramSearchResult
from api.instagram.service import search_instagram

router = APIRouter(prefix="/instagram")


@router.post("/search", response_model=InstagramSearchResult)
async def search(req: InstagramSearchRequest):
    q = req.q.strip()
    if not q:
        raise HTTPException(status_code=400, detail="Keyword cannot be empty")
    if len(q) > 200:
        raise HTTPException(status_code=400, detail="Keyword too long (max 200 characters)")

    return await search_instagram(q)
