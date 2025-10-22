from pydantic import BaseModel, Field
from typing import List, Dict, Optional
from datetime import datetime


class CampaignChapter(BaseModel):
    """Campaign chapter."""
    chapter_number: int
    title: str
    description: str
    quest_ids: List[str]
    completed: bool = False
    unlocked: bool = False


class Campaign(BaseModel):
    """Story campaign model."""
    id: str = Field(..., description="Campaign ID")
    player_id: str = Field(..., description="Player ID")
    
    campaign_type: str = Field(..., description="Campaign type")
    title: str = Field(..., description="Campaign title")
    description: str = Field(..., description="Campaign description")
    
    chapters: List[CampaignChapter] = Field(default_factory=list)
    
    current_chapter: int = Field(default=1, ge=1)
    total_chapters: int = Field(..., ge=1)
    
    status: str = Field(default="active", description="Campaign status")
    
    started_at: datetime = Field(default_factory=datetime.utcnow)
    completed_at: Optional[datetime] = None
    
    choices_made: List[Dict] = Field(default_factory=list, description="Story choices")
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "campaign_1",
                "player_id": "player_1",
                "campaign_type": "redemption_arc",
                "title": "The Path to Redemption",
                "description": "A journey from darkness to light",
                "current_chapter": 1,
                "total_chapters": 10,
                "status": "active"
            }
        }
