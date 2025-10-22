from pydantic import BaseModel, Field
from typing import Optional, List, Dict
from datetime import datetime


class ChallengeRequest(BaseModel):
    """Request to challenge a player"""
    attacker_id: str
    defender_id: str
    battle_type: str = "duel"  # duel, arena, ambush


class ChallengeResponse(BaseModel):
    """Response after sending challenge"""
    battle_id: str
    status: str
    message: str


class ActionRequest(BaseModel):
    """Request to execute combat action"""
    battle_id: str
    actor_id: str
    action_type: str  # attack, defend, use_power, use_item, flee
    target_id: Optional[str] = None
    ability_name: Optional[str] = None


class ActionResponse(BaseModel):
    """Response after action execution"""
    success: bool
    description: str
    damage: Optional[int] = None
    battle_status: str
    winner_id: Optional[str] = None
    rewards: Optional[Dict] = None


class BattleStateResponse(BaseModel):
    """Current battle state"""
    battle_id: str
    battle_type: str
    status: str
    current_turn: int
    active_participant_id: Optional[str] = None
    participants: List[Dict]
    winner_id: Optional[str] = None


class BattleHistoryResponse(BaseModel):
    """Battle history item"""
    battle_id: str
    battle_type: str
    opponent_username: str
    result: str  # won, lost, draw
    ended_at: datetime
    rewards: Dict
