from pydantic import BaseModel, Field
from typing import List, Dict, Optional
from datetime import datetime


class Objective(BaseModel):
    """Quest objective."""
    description: str
    type: str  # kill, collect, talk, hack, trade, visit
    target: str
    current: int = 0
    required: int
    completed: bool = False


class QuestRequirements(BaseModel):
    """Quest requirements."""
    min_level: int = 0
    min_karma: Optional[int] = None
    required_traits: Dict[str, int] = {}
    required_items: List[str] = []


class QuestRewards(BaseModel):
    """Quest rewards."""
    credits: int = 0
    xp: int = 0
    karma: int = 0
    items: List[str] = []
    trait_boosts: Dict[str, int] = {}
    special: Optional[str] = None


class Quest(BaseModel):
    """Quest model."""
    id: str = Field(..., description="Unique quest ID")
    player_id: Optional[str] = Field(default=None, description="Player ID (None for world quests)")
    guild_id: Optional[str] = Field(default=None, description="Guild ID (for guild quests)")
    
    quest_type: str = Field(
        ...,
        description="Quest type (personal, daily, weekly, guild, world, hidden, campaign)"
    )
    
    title: str = Field(..., description="Quest title")
    description: str = Field(..., description="Quest description")
    lore: str = Field(default="", description="Background story")
    
    difficulty: str = Field(default="medium", description="Difficulty level")
    
    objectives: List[Objective] = Field(default_factory=list, description="Quest objectives")
    rewards: QuestRewards = Field(default_factory=QuestRewards, description="Quest rewards")
    requirements: QuestRequirements = Field(
        default_factory=QuestRequirements,
        description="Quest requirements"
    )
    
    status: str = Field(default="available", description="Quest status")
    
    generated_by: str = Field(default="system", description="Generator (oracle, system)")
    generated_at: datetime = Field(default_factory=datetime.utcnow)
    
    accepted_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    expires_at: Optional[datetime] = None
    
    story_data: Optional[Dict] = Field(default=None, description="Campaign story data")
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "quest_123",
                "player_id": "player_1",
                "quest_type": "personal",
                "title": "The Lost Data",
                "description": "Recover stolen data from hackers",
                "lore": "A mysterious group has stolen valuable data...",
                "difficulty": "medium",
                "objectives": [
                    {
                        "description": "Hack into 3 systems",
                        "type": "hack",
                        "target": "systems",
                        "current": 0,
                        "required": 3,
                        "completed": False
                    }
                ],
                "rewards": {
                    "credits": 5000,
                    "xp": 500,
                    "karma": 25
                },
                "status": "available"
            }
        }
