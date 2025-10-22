from typing import Dict
import random
from ...models.combat.stats import CombatStats


class CombatCalculator:
    """
    Handles all combat calculations:
    - Stat calculations from traits
    - Damage calculations
    - Initiative rolls
    - Combat formulas
    """
    
    def calculate_combat_stats(self, player: Dict) -> Dict:
        """
        Calculate combat stats from player traits
        
        Stats derived from traits:
        - HP = Endurance × 10
        - Attack = (Strength + Dexterity) / 2
        - Defense = (Resilience + Perception) / 2
        - Critical Chance = Luck (hidden stat, based on karma)
        - Evasion = Speed / 2
        """
        traits = player.get("traits", {})
        
        # Get relevant traits (0-100 scale)
        endurance = traits.get("endurance", 50)
        strength = traits.get("physical_strength", 50)
        dexterity = traits.get("dexterity", 50)
        resilience = traits.get("resilience", 50)
        perception = traits.get("perception", 50)
        speed = traits.get("speed", 50)
        
        # Calculate derived stats
        max_hp = int(endurance * 2)  # 0-200 HP range
        attack = int((strength + dexterity) / 2)
        defense = int((resilience + perception) / 2)
        evasion = int(speed / 2)
        
        # Luck based on karma
        karma = player.get("karma_points", 0)
        luck = min(20, 5 + (karma // 100))  # 5-20% based on karma
        critical_chance = luck
        
        return {
            "hp": max_hp,
            "max_hp": max_hp,
            "attack": attack,
            "defense": defense,
            "speed": speed,
            "evasion": evasion,
            "critical_chance": critical_chance
        }
    
    def roll_initiative(self, player: Dict) -> int:
        """
        Roll initiative to determine turn order
        Initiative = Speed + Perception + 1d20
        """
        traits = player.get("traits", {})
        speed = traits.get("speed", 50)
        perception = traits.get("perception", 50)
        
        roll = random.randint(1, 20)
        initiative = speed + perception + roll
        
        return initiative
    
    def calculate_damage(self, attacker_stats: Dict, defender_stats: Dict) -> int:
        """
        Calculate damage from an attack
        Damage = Attack - (Defense / 2) + random(1-10)
        Minimum damage: 1
        """
        attack = attacker_stats.get("attack", 10)
        defense = defender_stats.get("defense", 10)
        
        base_damage = attack - (defense // 2)
        random_factor = random.randint(1, 10)
        
        damage = max(1, base_damage + random_factor)
        
        return damage
    
    def calculate_healing(self, healer_stats: Dict, amount: int) -> int:
        """
        Calculate healing amount (can be boosted by traits)
        """
        # Could add healing bonuses from traits like Medicine, Kindness
        return amount
    
    def calculate_elo_change(self, winner_rating: int, loser_rating: int, k_factor: int = 32) -> tuple[int, int]:
        """
        Calculate Elo rating changes for ranked battles
        
        Args:
            winner_rating: Current rating of winner
            loser_rating: Current rating of loser
            k_factor: How much ratings change (default 32)
        
        Returns:
            Tuple of (winner_change, loser_change)
        """
        # Expected scores
        expected_winner = 1 / (1 + 10 ** ((loser_rating - winner_rating) / 400))
        expected_loser = 1 / (1 + 10 ** ((winner_rating - loser_rating) / 400))
        
        # Actual scores (1 for win, 0 for loss)
        winner_change = int(k_factor * (1 - expected_winner))
        loser_change = int(k_factor * (0 - expected_loser))
        
        return winner_change, loser_change
