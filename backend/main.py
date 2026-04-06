from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.keyword.router import router as keyword_router
from api.youtube.router import router as youtube_router
from api.instagram.router import router as instagram_router
from api.hashtag.router import router as hashtag_router
from api.metatag.router import router as metatag_router
from api.contact.router import router as contact_router
from api.cache.cache_router import router as cache_router
from core.config import settings
from core.middleware import setup_middleware


def create_app() -> FastAPI:
    app = FastAPI(
        title="KeywordIQ API",
        description="Free SEO Keyword Research Tool API",
        version="1.0.0",
    )

    setup_middleware(app)

    app.include_router(keyword_router, prefix="/api", tags=["keyword"])
    app.include_router(youtube_router, prefix="/api", tags=["youtube"])
    app.include_router(instagram_router, prefix="/api", tags=["instagram"])
    app.include_router(hashtag_router, prefix="/api", tags=["hashtag"])
    app.include_router(metatag_router, prefix="/api", tags=["metatag"])
    app.include_router(contact_router, prefix="/api", tags=["contact"])
    app.include_router(cache_router, prefix="/api", tags=["cache"])

    @app.get("/health")
    def health_check():
        return {"status": "ok", "version": "1.0.0"}

    @app.get("/debug")
    def debug_check():
        return {
            "groq_key_set": bool(settings.GROQ_API_KEY),
            "supabase_url_set": bool(settings.SUPABASE_URL),
            "supabase_key_set": bool(settings.SUPABASE_KEY),
        }

    return app


app = create_app()
