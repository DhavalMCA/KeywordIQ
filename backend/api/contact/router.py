import re
from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException

from api.contact.schemas import ContactRequest, ContactResponse
from core.database import get_table

router = APIRouter(prefix="/contact")


@router.post("/submit", response_model=ContactResponse)
async def submit_contact(req: ContactRequest):
    email = req.email.strip()
    if not re.match(r"^[^\s@]+@[^\s@]+\.[^\s@]+$", email):
        raise HTTPException(status_code=400, detail="Invalid email address")

    if len(req.message) > 5000:
        raise HTTPException(status_code=400, detail="Message too long (max 5000 characters)")

    try:
        table = get_table("contacts")
        table.insert({
            "name": req.name.strip(),
            "email": email,
            "message": req.message.strip(),
            "created_at": datetime.now(timezone.utc).isoformat(),
        }).execute()

        return ContactResponse(success=True, message="Message sent successfully")
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to store contact message")
