from pydantic import BaseModel, Field


class AnalyzeRequest(BaseModel):
    q: str = Field(..., min_length=1, max_length=200)


class InterestDataPoint(BaseModel):
    date: str
    value: float | None


class AutocompleteSuggestion(BaseModel):
    text: str
    score: float | None = None


class YouTubeTag(BaseModel):
    tag: str
    frequency: float | None = None


class KeywordAnalysisResult(BaseModel):
    keyword: str
    interest_over_time: list[InterestDataPoint]
    autocomplete: list[AutocompleteSuggestion]
    youtube_tags: list[YouTubeTag]
    ai_meta_tags: list[str] | None = None
    cached: bool = False
