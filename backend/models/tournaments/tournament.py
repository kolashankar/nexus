from pydantic import BaseModel, Field
from typing import List, Optional, Dict
from datetime import datetime
import uuid


class TournamentMatch(BaseModel):
    """Single match in tournament bracket"""
    match_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    round_number: int
    match_number: int
    player1_id: Optional[str] = None
    player2_id: Optional[str] = None
    winner_id: Optional[str] = None
    battle_id: Optional[str] = None
    status: str = "pending"  # pending, in_progress, completed
    next_match_id: Optional[str] = None  # Winner advances to this match


class TournamentBracket(BaseModel):
    """Tournament bracket structure"""
    total_rounds: int
    matches: List[TournamentMatch] = Field(default_factory=list)
    

class Tournament(BaseModel):
    """Tournament model"""
    tournament_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    
    # Tournament settings
    tournament_type: str = "single_elimination"  # single_elimination, double_elimination
    max_participants: int = 32
    entry_fee: int = 0
    
    # Status
    status: str = "registration"  # registration, in_progress, completed, cancelled
    current_round: int = 0
    
    # Participants
    participants: List[str] = Field(default_factory=list)
    
    # Bracket
    bracket: Dict = Field(default_factory=dict)
    
    # Prize pool
    prize_pool: Dict = Field(default_factory=dict)
    
    # Timing
    created_at: datetime = Field(default_factory=datetime.utcnow)
    registration_ends: Optional[datetime] = None
    starts_at: Optional[datetime] = None
    ended_at: Optional[datetime] = None
    
    # Results
    champion_id: Optional[str] = None
    runner_up_id: Optional[str] = None
    third_place_id: Optional[str] = None
    
    class Config:
        json_schema_extra = {
            "example": {
                "tournament_id": "550e8400-e29b-41d4-a716-446655440000",
                "name": "Grand Arena Championship",
                "description": "Monthly tournament for top fighters",
                "tournament_type": "single_elimination",
                "max_participants": 32,
                "status": "registration",
                "prize_pool": {
                    "1st": 10000,
                    "2nd": 5000,
                    "3rd": 2500
                }
            }
        }
