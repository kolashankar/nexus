from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class SuperpowerResponse(BaseModel):
    name: str
    tier: int
    unlocked: bool
    unlocked_at: Optional[datetime] = None
    usage_count: int = 0
    cooldown_until: Optional[datetime] = None
    requirements: dict
    description: str

class UnlockSuperpowerRequest(BaseModel):
    power_name: str

class ActivateSuperpowerRequest(BaseModel):
    power_name: str
    target_id: Optional[str] = None
