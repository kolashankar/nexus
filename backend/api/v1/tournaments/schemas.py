from pydantic import BaseModel, Field
from typing import Optional, List, Dict
from datetime import datetime


class TournamentCreate(BaseModel):
    """Create new tournament"""
    name: str
    description: str
    tournament_type: str = "single_elimination"  # single_elimination, double_elimination
    max_participants: int = 32
    entry_fee: int = 0
    prize_pool: Dict = Field(default_factory=dict)
    starts_at: datetime


class TournamentResponse(BaseModel):
    """Tournament information"""
    tournament_id: str
    name: str
    description: str
    tournament_type: str
    max_participants: int
    participants: List[str] = Field(default_factory=list)
    status: str
    current_round: int = 0
    prize_pool: Dict = Field(default_factory=dict)
    created_at: datetime
    starts_at: Optional[datetime] = None


class TournamentRegistration(BaseModel):
    """Register for tournament"""
    tournament_id: str
    player_id: str


class BracketResponse(BaseModel):
    """Tournament bracket"""
    tournament_id: str
    bracket: Dict
    current_round: int
