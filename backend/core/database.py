import supabase
from supabase import Client

from core.config import settings

_client: Client | None = None


def get_client() -> Client:
    global _client
    if _client is None:
        _client = supabase.create_client(
            settings.SUPABASE_URL,
            settings.SUPABASE_KEY,
        )
    return _client


def get_table(table_name: str):
    return get_client().table(table_name)
