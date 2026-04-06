from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.config import settings


def setup_middleware(app: FastAPI) -> None:
    allowed = list(settings.ALLOWED_ORIGINS)
    if settings.RAILWAY_PUBLIC_DOMAIN:
        allowed.append(f"https://{settings.RAILWAY_PUBLIC_DOMAIN}")
    if settings.RENDER_EXTERNAL_URL:
        allowed.append(settings.RENDER_EXTERNAL_URL)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=allowed,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
