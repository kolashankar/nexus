"""Superpower model and definitions."""

from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
from enum import Enum

class PowerTier(str, Enum):
    """Superpower tier levels."""
    TIER_1 = "tier_1"  # Basic Powers
    TIER_2 = "tier_2"  # Intermediate Powers
    TIER_3 = "tier_3"  # Advanced Powers
    TIER_4 = "tier_4"  # Master Powers
    TIER_5 = "tier_5"  # Legendary Powers

class SuperpowerModel(BaseModel):
    """Model for a single superpower."""
    name: str
    tier: PowerTier
    unlocked_at: Optional[datetime] = None
    usage_count: int = Field(default=0)
    cooldown_until: Optional[datetime] = None
    level: int = Field(default=1, ge=1, le=10)
    
class Superpower(BaseModel):
    """Superpower definition with requirements."""
    id: str
    name: str
    tier: PowerTier
    description: str
    requirements: dict  # Trait requirements
    cooldown_seconds: int
    max_level: int = 10
    
# Define all 25 superpowers
ALL_SUPERPOWERS = [
    # Tier 1 - Basic Powers
    Superpower(
        id="mind_reading",
        name="Mind Reading",
        tier=PowerTier.TIER_1,
        description="Know others' intentions",
        requirements={"empathy": 80, "perception": 70},
        cooldown_seconds=300
    ),
    Superpower(
        id="enhanced_reflexes",
        name="Enhanced Reflexes",
        tier=PowerTier.TIER_1,
        description="Faster reactions",
        requirements={"speed": 75, "dexterity": 70},
        cooldown_seconds=180
    ),
    Superpower(
        id="persuasion_aura",
        name="Persuasion Aura",
        tier=PowerTier.TIER_1,
        description="Influence emotions",
        requirements={"charisma": 80, "negotiation": 75},
        cooldown_seconds=240
    ),
    Superpower(
        id="danger_sense",
        name="Danger Sense",
        tier=PowerTier.TIER_1,
        description="Detect threats",
        requirements={"perception": 80, "survival_instinct": 70},
        cooldown_seconds=120
    ),
    Superpower(
        id="quick_heal",
        name="Quick Heal",
        tier=PowerTier.TIER_1,
        description="Fast recovery",
        requirements={"medicine": 75, "resilience": 70},
        cooldown_seconds=600
    ),
    
    # Tier 2 - Intermediate Powers
    Superpower(
        id="telekinesis",
        name="Telekinesis",
        tier=PowerTier.TIER_2,
        description="Move objects with mind",
        requirements={"meditation": 80, "intelligence": 75},
        cooldown_seconds=360
    ),
    Superpower(
        id="invisibility",
        name="Invisibility",
        tier=PowerTier.TIER_2,
        description="Become unseen",
        requirements={"stealth": 90, "patience": 70},
        cooldown_seconds=480
    ),
    Superpower(
        id="energy_shield",
        name="Energy Shield",
        tier=PowerTier.TIER_2,
        description="Protect from attacks",
        requirements={"resilience": 85, "endurance": 80},
        cooldown_seconds=420
    ),
    Superpower(
        id="psychic_vision",
        name="Psychic Vision",
        tier=PowerTier.TIER_2,
        description="See past events",
        requirements={"meditation": 90, "perception": 85},
        cooldown_seconds=600
    ),
    Superpower(
        id="tech_control",
        name="Tech Control",
        tier=PowerTier.TIER_2,
        description="Control electronics",
        requirements={"hacking": 85, "technical_knowledge": 80},
        cooldown_seconds=300
    ),
    
    # Tier 3 - Advanced Powers
    Superpower(
        id="time_slow",
        name="Time Slow",
        tier=PowerTier.TIER_3,
        description="Slow perceived time",
        requirements={"focus": 85, "wisdom": 75},
        cooldown_seconds=900
    ),
    Superpower(
        id="healing_touch",
        name="Healing Touch",
        tier=PowerTier.TIER_3,
        description="Heal others",
        requirements={"kindness": 85, "medicine": 80},
        cooldown_seconds=720
    ),
    Superpower(
        id="probability_manipulation",
        name="Probability Manipulation",
        tier=PowerTier.TIER_3,
        description="Alter outcomes slightly",
        requirements={"vision": 90, "strategy": 85},
        cooldown_seconds=1200
    ),
    Superpower(
        id="empathic_link",
        name="Empathic Link",
        tier=PowerTier.TIER_3,
        description="Share emotions",
        requirements={"empathy": 90, "loveability": 80},
        cooldown_seconds=600
    ),
    Superpower(
        id="shadow_walk",
        name="Shadow Walk",
        tier=PowerTier.TIER_3,
        description="Teleport short distances",
        requirements={"stealth": 85, "speed": 80},
        cooldown_seconds=480
    ),
    
    # Tier 4 - Master Powers
    Superpower(
        id="charm_mastery",
        name="Charm Mastery",
        tier=PowerTier.TIER_4,
        description="Control emotions",
        requirements={"charisma": 90, "negotiation": 85, "manipulation": 70},
        cooldown_seconds=900
    ),
    Superpower(
        id="combat_supremacy",
        name="Combat Supremacy",
        tier=PowerTier.TIER_4,
        description="Enhanced fighting",
        requirements={"physical_strength": 80, "dexterity": 80, "courage": 75},
        cooldown_seconds=600
    ),
    Superpower(
        id="memory_vault",
        name="Memory Vault",
        tier=PowerTier.TIER_4,
        description="Perfect recall",
        requirements={"memory": 95, "focus": 90},
        cooldown_seconds=1800
    ),
    Superpower(
        id="future_glimpse",
        name="Future Glimpse",
        tier=PowerTier.TIER_4,
        description="See potential outcomes",
        requirements={"meditation": 95, "vision": 90, "wisdom": 85},
        cooldown_seconds=1200
    ),
    Superpower(
        id="reality_bend",
        name="Reality Bend",
        tier=PowerTier.TIER_4,
        description="Minor reality manipulation",
        requirements={"enlightenment": 90, "karmic_balance": 85},
        cooldown_seconds=1800
    ),
    
    # Tier 5 - Legendary Powers
    Superpower(
        id="karmic_transfer",
        name="Karmic Transfer",
        tier=PowerTier.TIER_5,
        description="Give/take karma from others",
        requirements={"divine_favor": 95, "wisdom": 90},
        cooldown_seconds=3600
    ),
    Superpower(
        id="soul_bond",
        name="Soul Bond",
        tier=PowerTier.TIER_5,
        description="Permanent connection with another",
        requirements={"loveability": 95, "loyalty": 90},
        cooldown_seconds=86400  # 24 hours
    ),
    Superpower(
        id="temporal_echo",
        name="Temporal Echo",
        tier=PowerTier.TIER_5,
        description="Rewind personal time 10 seconds",
        requirements={"meditation": 95, "wisdom": 95, "focus": 90},
        cooldown_seconds=3600
    ),
    Superpower(
        id="omniscience",
        name="Omniscience",
        tier=PowerTier.TIER_5,
        description="Brief complete awareness",
        requirements={"intelligence": 90, "perception": 90, "wisdom": 90, "enlightenment": 90},
        cooldown_seconds=7200
    ),
    Superpower(
        id="ascension",
        name="Ascension",
        tier=PowerTier.TIER_5,
        description="Temporary god-like state",
        requirements={"enlightenment": 95, "divine_favor": 95, "karmic_balance": 95},
        cooldown_seconds=86400  # 24 hours
    )
]
