import asyncio
from typing import Any

from pytrends.request import TrendReq


async def fetch_interest_over_time(keyword: str) -> list[dict[str, Any]]:
    """Fetch Google Trends interest over time for a keyword."""
    try:
        pytrends = TrendReq(hl="en-US", tz=360, timeout=(5, 15))
        await asyncio.to_thread(pytrends.build_payload, [keyword], cat=0, timeframe="today 12-m")

        interest_data = await asyncio.to_thread(pytrends.interest_over_time)

        result = []
        if not interest_data.empty:
            for date, row in interest_data.iterrows():
                result.append({
                    "date": date.strftime("%Y-%m-%d"),
                    "value": int(row[keyword]) if keyword in row else 0,
                })

        return result
    except Exception:
        return []
