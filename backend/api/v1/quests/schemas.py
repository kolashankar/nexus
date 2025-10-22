from pydantic import BaseModel, Field
from typing import List, Dict, Optional
from datetime import datetime


class ObjectiveSchema(BaseModel):
    """Quest objective schema."""
    description: str
    type: str  # kill, collect, talk, hack, trade, visit
    target: str
    current: int = 0
    required: int
    completed: bool = False


class RewardSchema(BaseModel):
    """Quest reward schema."""
    credits: int = 0
    xp: int = 0
    karma: int = 0
    items: List[str] = []
    trait_boosts: Dict[str, int] = {}
    special: Optional[str] = None


class QuestBase(BaseModel):
    id: str
    title: str
    description: str
    quest_type: str  # personal, daily, weekly, guild, world, hidden, campaign
    difficulty: str  # easy, medium, hard, legendary


class QuestListItem(QuestBase):
    rewards: RewardSchema
    status: str  # available, active, completed, failed, expired
    expires_at: Optional[datetime] = None


class QuestDetailResponse(QuestBase):
    lore: str
    objectives: List[ObjectiveSchema]
    rewards: RewardSchema
    requirements: Dict[str, any]
    status: str
    generated_by: str
    generated_at: datetime
    expires_at: Optional[datetime]
    story_data: Optional[Dict] = None


class QuestListResponse(BaseModel):
    quests: List[QuestListItem]
    total: int


class AcceptQuestRequest(BaseModel):
    quest_id: str = Field(..., description="Quest ID to accept")


class CompleteQuestRequest(BaseModel):
    quest_id: str = Field(..., description="Quest ID to complete")


class QuestProgressResponse(BaseModel):
    quest_id: str
    quest_title: str
    objectives: List[ObjectiveSchema]
    completion_percentage: float
    can_complete: bool
