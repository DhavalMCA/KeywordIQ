from pydantic import BaseModel, Field


class YouTubeVideo(BaseModel):
    title: str
    video_id: str
    channel_title: str
    view_count: int | None = None
    tags: list[str] = []
    url: str


class YouTubeSearchResult(BaseModel):
    videos: list[YouTubeVideo]
    tag_cloud: list[str]


class YouTubeSearchRequest(BaseModel):
    q: str = Field(..., min_length=1, max_length=200)
