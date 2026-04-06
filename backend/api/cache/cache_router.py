from fastapi import APIRouter, Header, HTTPException

from core.config import settings
from core.database import get_table

router = APIRouter(prefix="/cache")


def _check_admin_key(x_admin_key: str | None) -> bool:
    return x_admin_key is not None and x_admin_key == settings.SUPABASE_KEY


@router.delete("/clear")
async def clear_cache(x_admin_key: str | None = Header(None)):
    if not _check_admin_key(x_admin_key):
        raise HTTPException(status_code=401, detail="Unauthorized")

    try:
        table = get_table("keyword_cache")
        result = table.delete().execute()
        return {"success": True, "deleted": len(result.data) if result.data else 0}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to clear cache")


@router.delete("/clear/{keyword}")
async def clear_keyword_cache(keyword: str, x_admin_key: str | None = Header(None)):
    if not _check_admin_key(x_admin_key):
        raise HTTPException(status_code=401, detail="Unauthorized")

    try:
        table = get_table("keyword_cache")
        normalized = keyword.strip().lower()
        result = table.delete().eq("normalized_keyword", normalized).execute()
        return {"success": True, "deleted": len(result.data) if result.data else 0}
    except Exception:
        raise HTTPException(status_code=500, detail="Failed to clear keyword cache")


@router.get("/stats")
async def cache_stats(x_admin_key: str | None = Header(None)):
    if not _check_admin_key(x_admin_key):
        raise HTTPException(status_code=401, detail="Unauthorized")

    try:
        table = get_table("keyword_cache")
        result = table.select("normalized_keyword", count="exact").execute()
        return {"total_entries": result.count or 0}
    except Exception:
        raise HTTPException(status_code=500, detail="Failed to fetch cache stats")
