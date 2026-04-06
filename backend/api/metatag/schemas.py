from pydantic import BaseModel, Field


class MetaTagInput(BaseModel):
    url: str | None = Field(default=None, max_length=2000)
    description: str | None = Field(default=None, max_length=5000)


class MetaTagOutput(BaseModel):
    title: str
    description: str
    og_title: str
    og_description: str
    twitter_card: str
    twitter_title: str
    twitter_description: str


class MetaTagGenerateResult(BaseModel):
    input_url: str | None
    input_description: str | None
    tags: MetaTagOutput
    cached: bool = False
