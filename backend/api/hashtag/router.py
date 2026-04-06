from fastapi import APIRouter, HTTPException

from api.hashtag.schemas import HashtagGenerateRequest, HashtagGenerateResult
from api.hashtag.service import generate_hashtags

router = APIRouter(prefix="/hashtag")


@router.post("/generate", response_model=HashtagGenerateResult)
async def generate(req: HashtagGenerateRequest):
    topic = req.topic.strip()
    if not topic:
        raise HTTPException(status_code=400, detail="Topic cannot be empty")
    if len(topic) > 200:
        raise HTTPException(status_code=400, detail="Topic too long (max 200 characters)")

    return await generate_hashtags(topic)
