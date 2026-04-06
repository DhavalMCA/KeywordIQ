from pydantic import BaseModel, Field


class InstagramHashtag(BaseModel):
    tag: str
    post_count: int | None = None


class NicheCluster(BaseModel):
    topic: str
    hashtags: list[str]


class InstagramSearchResult(BaseModel):
    hashtags: list[InstagramHashtag]
    trending: list[InstagramHashtag]
    niches: list[NicheCluster]


class InstagramSearchRequest(BaseModel):
    q: str = Field(..., min_length=1, max_length=200)
