"""Quest model - Main quest entity"""

from datetime import datetime
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field
from enum import Enum


class QuestType(str, Enum):
    """Quest types"""
    PERSONAL = "personal"  # AI-generated personal quest
    DAILY = "daily"  # Daily quest
    WEEKLY = "weekly"  # Weekly quest
    GUILD = "guild"  # Guild quest
    WORLD = "world"  # World quest (open to all)
    HIDDEN = "hidden"  # Hidden quest (no markers)
    CAMPAIGN = "campaign"  # Story campaign quest


class QuestStatus(str, Enum):
    """Quest status"""
    AVAILABLE = "available"  # Quest can be accepted
    ACTIVE = "active"  # Quest is in progress
    COMPLETED = "completed"  # Quest completed
    FAILED = "failed"  # Quest failed
    EXPIRED = "expired"  # Quest expired


class ObjectiveType(str, Enum):
    """Objective types"""
    KILL = "kill"  # Kill enemies
    COLLECT = "collect"  # Collect items
    TALK = "talk"  # Talk to NPC
    HACK = "hack"  # Hack systems
    TRADE = "trade"  # Trade items
    VISIT = "visit"  # Visit location
    WIN_COMBAT = "win_combat"  # Win combats
    EARN_KARMA = "earn_karma"  # Earn karma points
    REACH_TRAIT = "reach_trait"  # Reach trait level


class QuestObjective(BaseModel):
    """Quest objective"""
    objective_id: str
    description: str
    type: ObjectiveType
    target: str  # What to do
    current: int = 0
    required: int = 1
    completed: bool = False

    class Config:
        use_enum_values = True


class QuestReward(BaseModel):
    """Quest rewards"""
    credits: int = 0
    xp: int = 0
    karma: int = 0
    karma_tokens: int = 0
    items: List[str] = Field(default_factory=list)
    trait_boosts: Dict[str, int] = Field(default_factory=dict)
    special: Optional[str] = None  # Special reward (e.g., "unlock_power:mind_reading")


class QuestRequirements(BaseModel):
    """Quest requirements"""
    min_level: int = 1
    min_karma: Optional[int] = None
    max_karma: Optional[int] = None
    required_traits: Dict[str, int] = Field(default_factory=dict)
    required_items: List[str] = Field(default_factory=list)
    required_quests: List[str] = Field(default_factory=list)  # Quest IDs that must be completed first


class StoryData(BaseModel):
    """Story campaign data"""
    chapter_number: int
    campaign_id: str
    choices_made: List[str] = Field(default_factory=list)
    branching_path: Optional[str] = None


class Quest(BaseModel):
    """Main quest model"""
    id: str = Field(alias="_id")
    quest_type: QuestType
    
    # Quest info
    title: str
    description: str
    lore: Optional[str] = None  # Background story
    
    # Assignment
    player_id: Optional[str] = None  # For personal/daily/weekly
    guild_id: Optional[str] = None  # For guild quests
    
    # Generation
    generated_by: str = "oracle"  # "oracle" or "system"
    generated_at: datetime
    seed: Optional[str] = None  # For reproducibility
    
    # Progress
    status: QuestStatus = QuestStatus.AVAILABLE
    objectives: List[QuestObjective]
    
    # Rewards
    rewards: QuestReward
    
    # Requirements
    requirements: QuestRequirements = Field(default_factory=QuestRequirements)
    
    # Story (for campaign quests)
    story_data: Optional[StoryData] = None
    
    # Expiry
    expires_at: Optional[datetime] = None
    
    # Completion
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    completion_time: Optional[int] = None  # Seconds
    
    # Metadata
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        use_enum_values = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

    def is_available(self, player_level: int, player_karma: int, 
                    player_traits: Dict[str, int], player_items: List[str]) -> bool:
        """Check if quest is available for player"""
        if self.status != QuestStatus.AVAILABLE:
            return False
        
        # Check level
        if player_level < self.requirements.min_level:
            return False
        
        # Check karma
        if self.requirements.min_karma and player_karma < self.requirements.min_karma:
            return False
        if self.requirements.max_karma and player_karma > self.requirements.max_karma:
            return False
        
        # Check traits
        for trait, required_value in self.requirements.required_traits.items():
            if player_traits.get(trait, 0) < required_value:
                return False
        
        # Check items
        for required_item in self.requirements.required_items:
            if required_item not in player_items:
                return False
        
        return True

    def check_objectives(self) -> bool:
        """Check if all objectives are completed"""
        return all(obj.completed for obj in self.objectives)

    def update_objective(self, objective_id: str, progress: int) -> bool:
        """Update objective progress"""
        for obj in self.objectives:
            if obj.objective_id == objective_id:
                obj.current = min(obj.current + progress, obj.required)
                if obj.current >= obj.required:
                    obj.completed = True
                return True
        return False

    def to_dict(self) -> dict:
        """Convert to dictionary"""
        return self.model_dump(by_alias=True)
