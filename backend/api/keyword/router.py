import re

from fastapi import APIRouter, HTTPException

from api.keyword.schemas import AnalyzeRequest, KeywordAnalysisResult
from api.keyword.service import analyze_keyword

router = APIRouter(prefix="/keyword")


@router.post("/analyze", response_model=KeywordAnalysisResult)
async def analyze(req: AnalyzeRequest):
    q = req.q.strip()
    if not q:
        raise HTTPException(status_code=400, detail="Keyword cannot be empty")
    if len(q) > 200:
        raise HTTPException(status_code=400, detail="Keyword too long (max 200 characters)")
    if not re.match(r"^[\w\s\-\.\'\#]+$", q):
        raise HTTPException(status_code=400, detail="Invalid characters in keyword")

    return await analyze_keyword(req)
