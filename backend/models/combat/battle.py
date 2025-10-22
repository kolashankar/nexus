from datetime import datetime
from typing import List, Optional, Dict
from pydantic import BaseModel, Field
import uuid


class BattleParticipant(BaseModel):
    """Participant in a battle"""
    player_id: str
    username: str
    hp: int
    max_hp: int
    action_points: int = 4
    max_action_points: int = 4
    initiative: int
    position: int  # Position in battle order
    status_effects: List[Dict] = Field(default_factory=list)
    combat_stats: Dict
    equipped_abilities: List[str] = Field(default_factory=list)
    has_fled: bool = False
    

class BattleAction(BaseModel):
    """Single action taken during battle"""
    action_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    actor_id: str
    action_type: str  # attack, defend, use_power, use_item, flee
    target_id: Optional[str] = None
    ability_name: Optional[str] = None
    ap_cost: int
    damage: Optional[int] = None
    effects: List[Dict] = Field(default_factory=list)
    success: bool
    description: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class BattleTurn(BaseModel):
    """Complete turn in battle"""
    turn_number: int
    active_player_id: str
    actions: List[BattleAction] = Field(default_factory=list)
    turn_start: datetime = Field(default_factory=datetime.utcnow)
    turn_end: Optional[datetime] = None


class Battle(BaseModel):
    """Main battle model"""
    battle_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    battle_type: str  # duel, arena, ambush, guild_war, tournament
    status: str = "pending"  # pending, active, completed, cancelled
    
    # Participants
    participants: List[BattleParticipant]
    attacker_id: str
    defender_id: str
    
    # Battle state
    current_turn: int = 0
    active_participant_id: Optional[str] = None
    turn_history: List[BattleTurn] = Field(default_factory=list)
    
    # Timing
    created_at: datetime = Field(default_factory=datetime.utcnow)
    started_at: Optional[datetime] = None
    ended_at: Optional[datetime] = None
    
    # Results
    winner_id: Optional[str] = None
    loser_id: Optional[str] = None
    victory_type: Optional[str] = None  # knockout, fled, timeout
    
    # Rewards
    rewards: Dict = Field(default_factory=dict)
    
    # Settings
    max_turns: int = 50
    turn_timeout: int = 60  # seconds
    
    # Arena specific
    ranked: bool = False
    elo_change: Optional[Dict[str, int]] = None

    class Config:
        json_schema_extra = {
            "example": {
                "battle_id": "550e8400-e29b-41d4-a716-446655440000",
                "battle_type": "duel",
                "status": "active",
                "participants": [
                    {
                        "player_id": "player1",
                        "username": "Hero",
                        "hp": 85,
                        "max_hp": 100,
                        "action_points": 4,
                        "initiative": 15,
                        "position": 0
                    }
                ],
                "attacker_id": "player1",
                "defender_id": "player2",
                "current_turn": 1
            }
        }
