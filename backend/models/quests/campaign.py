"""Campaign model - Story campaigns"""

from datetime import datetime
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field
from enum import Enum


class CampaignType(str, Enum):
    """Campaign types"""
    REDEMPTION = "redemption"  # For negative karma players
    FALL_FROM_GRACE = "fall_from_grace"  # For positive karma players
    NEUTRAL_PATH = "neutral_path"  # For balanced karma
    POWER_QUEST = "power_quest"  # Unlock special powers
    ORIGIN_STORY = "origin_story"  # Character backstory
    GUILD_SAGA = "guild_saga"  # Guild-related story
    MYSTERY = "mystery"  # Mystery to solve
    REVENGE = "revenge"  # Revenge arc


class CampaignStatus(str, Enum):
    """Campaign status"""
    LOCKED = "locked"  # Not available yet
    AVAILABLE = "available"  # Can be started
    IN_PROGRESS = "in_progress"  # Currently playing
    COMPLETED = "completed"  # Finished
    ABANDONED = "abandoned"  # Player abandoned


class ChoiceOption(BaseModel):
    """A choice option in campaign"""
    option_id: str
    text: str
    consequences: Dict[str, Any] = Field(default_factory=dict)  # What happens if chosen
    requirements: Optional[Dict[str, Any]] = None  # Requirements to see this option


class CampaignChoice(BaseModel):
    """A choice point in campaign"""
    choice_id: str
    chapter_number: int
    prompt: str  # The question/situation
    options: List[ChoiceOption]
    chosen_option: Optional[str] = None
    chosen_at: Optional[datetime] = None


class CampaignChapter(BaseModel):
    """A chapter in a campaign"""
    chapter_id: str
    chapter_number: int
    title: str
    description: str
    lore: str  # Long-form story text
    
    # Quest reference
    quest_id: Optional[str] = None  # Quest for this chapter
    
    # Choices
    choice: Optional[CampaignChoice] = None
    
    # Status
    status: str = "locked"  # locked, available, in_progress, completed
    completed_at: Optional[datetime] = None
    
    # Rewards (chapter completion)
    chapter_rewards: Dict[str, Any] = Field(default_factory=dict)


class CampaignRequirements(BaseModel):
    """Campaign requirements"""
    min_level: int = 1
    min_karma: Optional[int] = None
    max_karma: Optional[int] = None
    required_traits: Dict[str, int] = Field(default_factory=dict)
    required_campaigns: List[str] = Field(default_factory=list)  # Other campaigns


class CampaignRewards(BaseModel):
    """Campaign completion rewards"""
    credits: int = 0
    xp: int = 0
    karma: int = 0
    trait_boosts: Dict[str, int] = Field(default_factory=dict)
    unlock_power: Optional[str] = None
    unlock_title: Optional[str] = None
    special_item: Optional[str] = None


class Campaign(BaseModel):
    """Story campaign model"""
    id: str = Field(alias="_id")
    campaign_type: CampaignType
    
    # Campaign info
    title: str
    subtitle: Optional[str] = None
    description: str  # Short description
    synopsis: str  # Longer story overview
    
    # Player assignment
    player_id: str
    
    # Chapters
    total_chapters: int
    chapters: List[CampaignChapter] = Field(default_factory=list)
    current_chapter: int = 1
    
    # Requirements
    requirements: CampaignRequirements = Field(default_factory=CampaignRequirements)
    
    # Rewards
    rewards: CampaignRewards
    
    # Status
    status: CampaignStatus = CampaignStatus.AVAILABLE
    
    # Generation
    generated_by: str = "oracle"
    generated_at: datetime
    seed: Optional[str] = None
    
    # Progression
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    
    # Choices made throughout campaign
    choices_history: List[Dict[str, Any]] = Field(default_factory=list)
    branching_path: str = "main"  # Which path player is on
    
    # Metadata
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        use_enum_values = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

    def get_current_chapter(self) -> Optional[CampaignChapter]:
        """Get the current chapter"""
        for chapter in self.chapters:
            if chapter.chapter_number == self.current_chapter:
                return chapter
        return None

    def advance_chapter(self) -> bool:
        """Advance to next chapter"""
        if self.current_chapter < self.total_chapters:
            # Complete current chapter
            current = self.get_current_chapter()
            if current:
                current.status = "completed"
                current.completed_at = datetime.utcnow()
            
            # Move to next
            self.current_chapter += 1
            next_chapter = self.get_current_chapter()
            if next_chapter:
                next_chapter.status = "available"
            
            return True
        return False

    def is_completed(self) -> bool:
        """Check if campaign is completed"""
        return all(chapter.status == "completed" for chapter in self.chapters)

    def get_progress_percentage(self) -> float:
        """Get campaign progress as percentage"""
        if self.total_chapters == 0:
            return 0.0
        completed_chapters = sum(1 for ch in self.chapters if ch.status == "completed")
        return (completed_chapters / self.total_chapters) * 100

    def to_dict(self) -> dict:
        """Convert to dictionary"""
        return self.model_dump(by_alias=True)
