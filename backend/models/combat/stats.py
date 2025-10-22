from pydantic import BaseModel, Field
from typing import Dict, List


class CombatStats(BaseModel):
    """Combat statistics for a player"""
    player_id: str
    
    # Base stats (derived from traits)
    hp: int = Field(default=100)
    max_hp: int = Field(default=100)
    attack: int = Field(default=10)
    defense: int = Field(default=10)
    speed: int = Field(default=10)
    evasion: int = Field(default=5)
    critical_chance: int = Field(default=5)
    
    # Combat metrics
    total_battles: int = 0
    wins: int = 0
    losses: int = 0
    draws: int = 0
    
    # PvP stats
    duel_wins: int = 0
    duel_losses: int = 0
    arena_wins: int = 0
    arena_losses: int = 0
    ambush_success: int = 0
    ambush_failed: int = 0
    
    # Combat rating (Elo)
    combat_rating: int = 1500
    highest_rating: int = 1500
    
    # Streak tracking
    current_win_streak: int = 0
    best_win_streak: int = 0
    
    # Damage stats
    total_damage_dealt: int = 0
    total_damage_taken: int = 0
    total_healing_done: int = 0
    
    # Abilities
    abilities_used: Dict[str, int] = Field(default_factory=dict)
    favorite_ability: str = ""
    
    # Special achievements
    perfect_victories: int = 0  # Won without taking damage
    comeback_victories: int = 0  # Won from < 20% HP
    flawless_rounds: int = 0
    
    # Tournament stats
    tournaments_entered: int = 0
    tournaments_won: int = 0
    tournament_finals: int = 0

    class Config:
        json_schema_extra = {
            "example": {
                "player_id": "550e8400-e29b-41d4-a716-446655440000",
                "hp": 100,
                "max_hp": 100,
                "attack": 15,
                "defense": 12,
                "speed": 14,
                "total_battles": 50,
                "wins": 32,
                "losses": 18,
                "combat_rating": 1650
            }
        }
