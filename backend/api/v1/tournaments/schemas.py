"""Tournament schemas."""

from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


class TournamentRegistrationRequest(BaseModel):
    """Request to register for a tournament."""
    tournament_id: str = Field(..., description="ID of the tournament")


class TournamentResponse(BaseModel):
    """Tournament response."""
    id: str
    name: str
    description: str
    status: str  # registration, in_progress, completed
    max_participants: int
    current_participants: int
    prize_pool: dict
    starts_at: datetime
    ends_at: Optional[datetime] = None
