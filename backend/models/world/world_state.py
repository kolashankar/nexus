"""World state model"""

from datetime import datetime
from typing import Dict, Any, Optional
from pydantic import BaseModel, Field
from enum import Enum


class KarmaTrend(str, Enum):
    """Global karma trend"""
    RISING = "rising"
    FALLING = "falling"
    STABLE = "stable"


class GlobalKarma(BaseModel):
    """Global karma state"""
    collective_karma: int = 0
    karma_trend: KarmaTrend = KarmaTrend.STABLE
    positive_actions_today: int = 0
    negative_actions_today: int = 0
    total_actions_today: int = 0
    
    class Config:
        use_enum_values = True


class WorldState(BaseModel):
    """World state model"""
    id: str = Field(alias="_id", default="world_state")
    
    # Global karma
    global_karma: GlobalKarma = Field(default_factory=GlobalKarma)
    
    # Active global event
    active_event: Optional[Dict[str, Any]] = None
    
    # Season info
    current_season: int = 1
    season_start: datetime = Field(default_factory=datetime.utcnow)
    season_end: Optional[datetime] = None
    
    # World stats
    total_players: int = 0
    online_players: int = 0
    total_karma_generated: int = 0
    total_wealth: int = 0
    
    # Timestamps
    last_event_trigger: Optional[datetime] = None
    last_updated: datetime = Field(default_factory=datetime.utcnow)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        populate_by_name = True
        use_enum_values = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }
    
    def to_dict(self) -> dict:
        """Convert to dictionary"""
        return self.model_dump(by_alias=True)
