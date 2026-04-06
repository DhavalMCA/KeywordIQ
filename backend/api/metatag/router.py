from fastapi import APIRouter, HTTPException

from api.metatag.schemas import MetaTagGenerateResult, MetaTagInput
from api.metatag.service import generate_meta_tags

router = APIRouter(prefix="/metatag")


@router.post("/generate", response_model=MetaTagGenerateResult)
async def generate(req: MetaTagInput):
    if not req.url and not req.description:
        raise HTTPException(status_code=400, detail="Either URL or description must be provided")

    if req.url and len(req.url) > 2000:
        raise HTTPException(status_code=400, detail="URL too long (max 2000 characters)")
    if req.description and len(req.description) > 5000:
        raise HTTPException(status_code=400, detail="Description too long (max 5000 characters)")

    return await generate_meta_tags(req)
