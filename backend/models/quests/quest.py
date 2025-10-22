"""Quest Model"""

from typing import Dict, Optional, List
from datetime import datetime
from pydantic import BaseModel, Field


class QuestObjective(BaseModel):
    """Quest objective"""
    description: str
    type: str
    target: str
    required: int
    current: int = 0
    completed: bool = False


class QuestRewards(BaseModel):
    """Quest rewards"""
    credits: int = 0
    xp: int = 0
    karma: int = 0
    items: List[str] = Field(default_factory=list)
    trait_boosts: Dict[str, float] = Field(default_factory=dict)
    special: Optional[str] = None


class Quest(BaseModel):
    """Quest model"""
    
    quest_id: str = Field(default_factory=lambda: str(datetime.utcnow().timestamp()))
    player_id: str
    quest_type: str = "personal"  # personal, daily, weekly, campaign, guild, world, hidden
    title: str
    description: str
    lore: str
    objectives: List[QuestObjective]
    rewards: QuestRewards
    status: str = "available"  # available, active, completed, failed, expired
    difficulty: str = "medium"
    estimated_time_minutes: int = 30
    
    # Timestamps
    generated_at: datetime = Field(default_factory=datetime.utcnow)
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    expires_at: Optional[datetime] = None
    
    # Generation metadata
    generated_by: str = "oracle"
    seed: Optional[str] = None
    
    class Config:
        json_schema_extra = {
            "example": {
                "quest_id": "quest_123",
                "player_id": "player_456",
                "quest_type": "personal",
                "title": "The Path of Empathy",
                "description": "Help 5 players in need",
                "status": "active"
            }
        }
