from pydantic import BaseModel, Field


class HashtagBundle(BaseModel):
    instagram: list[str]
    twitter: list[str]
    linkedin: list[str]


class HashtagGenerateRequest(BaseModel):
    topic: str = Field(..., min_length=1, max_length=200)


class HashtagGenerateResult(BaseModel):
    topic: str
    hashtags: HashtagBundle
    cached: bool = False
