from typing import Dict, List, Optional
from ...models.combat.battle import BattleParticipant
import random


class AbilitySystem:
    """
    Manages combat abilities and superpowers
    Trait-based abilities unlock at 80% trait level
    """
    
    def __init__(self):
        self.abilities = self._load_abilities()
    
    def _load_abilities(self) -> Dict:
        """
        Define all trait-based combat abilities
        Each trait at 80%+ unlocks a combat ability
        """
        return {
            # Hacking abilities
            "emp_blast": {
                "name": "EMP Blast",
                "required_trait": "hacking",
                "required_level": 80,
                "ap_cost": 2,
                "target": "enemy",
                "effect_type": "disable",
                "description": "Disables enemy robots and tech-based abilities",
                "damage": 0,
                "special": "disable_robots"
            },
            
            # Kindness abilities
            "mercy": {
                "name": "Mercy",
                "required_trait": "kindness",
                "required_level": 80,
                "ap_cost": 2,
                "target": "enemy",
                "effect_type": "spare",
                "description": "Spare enemy, gain karma bonus",
                "damage": 0,
                "special": "end_battle_mercy"
            },
            
            # Wrath abilities  
            "berserker_rage": {
                "name": "Berserker Rage",
                "required_trait": "wrath",
                "required_level": 80,
                "ap_cost": 3,
                "target": "self",
                "effect_type": "buff",
                "description": "Double damage for 2 turns, lose all defense",
                "damage": 0,
                "special": "damage_buff_defense_debuff"
            },
            
            # Strategy abilities
            "tactical_advantage": {
                "name": "Tactical Advantage",
                "required_trait": "strategy",
                "required_level": 80,
                "ap_cost": 2,
                "target": "self",
                "effect_type": "buff",
                "description": "Gain +2 AP this turn",
                "damage": 0,
                "special": "extra_ap"
            },
            
            # Meditation abilities
            "inner_peace": {
                "name": "Inner Peace",
                "required_trait": "meditation",
                "required_level": 80,
                "ap_cost": 2,
                "target": "self",
                "effect_type": "heal",
                "description": "Restore 30% of max HP",
                "damage": 0,
                "special": "heal_percentage"
            },
            
            # Stealth abilities
            "shadow_strike": {
                "name": "Shadow Strike",
                "required_trait": "stealth",
                "required_level": 80,
                "ap_cost": 3,
                "target": "enemy",
                "effect_type": "attack",
                "description": "Guaranteed critical hit from shadows",
                "damage": 0,
                "special": "guaranteed_crit"
            },
            
            # Strength abilities
            "power_strike": {
                "name": "Power Strike",
                "required_trait": "physical_strength",
                "required_level": 80,
                "ap_cost": 2,
                "target": "enemy",
                "effect_type": "attack",
                "description": "Devastating physical attack",
                "damage": 0,
                "special": "triple_damage"
            },
            
            # Superpowers - Tier 1
            "mind_reading": {
                "name": "Mind Reading",
                "required_trait": "empathy",
                "required_level": 80,
                "ap_cost": 1,
                "target": "enemy",
                "effect_type": "reveal",
                "description": "See enemy's next move",
                "damage": 0,
                "special": "reveal_intent"
            },
            
            # Superpowers - Tier 2
            "telekinesis": {
                "name": "Telekinesis",
                "required_trait": "meditation",
                "required_level": 80,
                "ap_cost": 3,
                "target": "enemy",
                "effect_type": "attack",
                "description": "Psychic force attack",
                "damage": 0,
                "special": "psychic_damage"
            },
            
            "energy_shield": {
                "name": "Energy Shield",
                "required_trait": "resilience",
                "required_level": 85,
                "ap_cost": 2,
                "target": "self",
                "effect_type": "shield",
                "description": "Absorb next attack completely",
                "damage": 0,
                "special": "full_block"
            }
        }
    
    def use_ability(self, ability_name: str, actor: BattleParticipant, 
                    target: Optional[BattleParticipant] = None) -> Dict:
        """
        Execute an ability
        
        Args:
            ability_name: Name of ability to use
            actor: Player using the ability
            target: Target player (if applicable)
        
        Returns:
            Dict with ability results
        """
        ability = self.abilities.get(ability_name.lower().replace(" ", "_"))
        
        if not ability:
            return {
                "damage": 0,
                "success": False,
                "description": f"Unknown ability: {ability_name}",
                "effects": []
            }
        
        # Execute based on special effect
        special = ability.get("special")
        
        if special == "heal_percentage":
            return self._heal_percentage(actor, 30)
        elif special == "guaranteed_crit":
            return self._guaranteed_crit(actor, target)
        elif special == "triple_damage":
            return self._triple_damage(actor, target)
        elif special == "extra_ap":
            return self._extra_ap(actor)
        elif special == "damage_buff_defense_debuff":
            return self._berserker_rage(actor)
        elif special == "full_block":
            return self._energy_shield(actor)
        elif special == "psychic_damage":
            return self._psychic_damage(actor, target)
        else:
            # Default ability execution
            return {
                "damage": 0,
                "success": True,
                "description": f"{actor.username} uses {ability['name']}!",
                "effects": [{"type": ability["effect_type"], "ability": ability_name}]
            }
    
    def _heal_percentage(self, actor: BattleParticipant, percentage: int) -> Dict:
        """Heal by percentage of max HP"""
        heal_amount = int(actor.max_hp * (percentage / 100))
        old_hp = actor.hp
        actor.hp = min(actor.max_hp, actor.hp + heal_amount)
        actual_heal = actor.hp - old_hp
        
        return {
            "damage": -actual_heal,  # Negative damage = healing
            "success": True,
            "description": f"{actor.username} restores {actual_heal} HP through Inner Peace!",
            "effects": [{"type": "heal", "amount": actual_heal}]
        }
    
    def _guaranteed_crit(self, actor: BattleParticipant, target: BattleParticipant) -> Dict:
        """Shadow strike - guaranteed critical"""
        base_damage = actor.combat_stats.get("attack", 10)
        damage = int(base_damage * 2.5)  # Massive critical
        target.hp = max(0, target.hp - damage)
        
        return {
            "damage": damage,
            "success": True,
            "description": f"{actor.username} strikes from the shadows! Critical hit for {damage} damage!",
            "effects": [{"type": "critical", "multiplier": 2.5}]
        }
    
    def _triple_damage(self, actor: BattleParticipant, target: BattleParticipant) -> Dict:
        """Power strike - triple damage"""
        base_damage = actor.combat_stats.get("attack", 10)
        damage = int(base_damage * 3)
        target.hp = max(0, target.hp - damage)
        
        return {
            "damage": damage,
            "success": True,
            "description": f"{actor.username} unleashes a devastating Power Strike for {damage} damage!",
            "effects": [{"type": "power_attack", "multiplier": 3}]
        }
    
    def _extra_ap(self, actor: BattleParticipant) -> Dict:
        """Tactical advantage - gain extra AP"""
        actor.action_points += 2
        
        return {
            "damage": 0,
            "success": True,
            "description": f"{actor.username} gains Tactical Advantage! (+2 AP)",
            "effects": [{"type": "ap_boost", "amount": 2}]
        }
    
    def _berserker_rage(self, actor: BattleParticipant) -> Dict:
        """Berserker rage - double damage, lose defense"""
        effect = {
            "type": "berserker",
            "damage_multiplier": 2.0,
            "defense_multiplier": 0,
            "duration": 2
        }
        actor.status_effects.append(effect)
        
        return {
            "damage": 0,
            "success": True,
            "description": f"{actor.username} enters Berserker Rage! Double damage, no defense!",
            "effects": [effect]
        }
    
    def _energy_shield(self, actor: BattleParticipant) -> Dict:
        """Energy shield - block next attack"""
        effect = {
            "type": "shield",
            "blocks": 1,
            "duration": 3
        }
        actor.status_effects.append(effect)
        
        return {
            "damage": 0,
            "success": True,
            "description": f"{actor.username} activates Energy Shield! Next attack blocked!",
            "effects": [effect]
        }
    
    def _psychic_damage(self, actor: BattleParticipant, target: BattleParticipant) -> Dict:
        """Telekinesis - psychic damage (ignores defense)"""
        damage = int(actor.combat_stats.get("attack", 10) * 1.5)
        target.hp = max(0, target.hp - damage)
        
        return {
            "damage": damage,
            "success": True,
            "description": f"{actor.username} attacks {target.username} with Telekinesis for {damage} psychic damage!",
            "effects": [{"type": "psychic", "ignores_defense": True}]
        }
    
    def get_ability_cost(self, ability_name: str) -> int:
        """Get AP cost for an ability"""
        ability = self.abilities.get(ability_name.lower().replace(" ", "_"))
        return ability.get("ap_cost", 2) if ability else 2
    
    def get_available_abilities(self, player: Dict) -> List[Dict]:
        """
        Get list of abilities available to player based on traits
        
        Args:
            player: Player dict with traits
        
        Returns:
            List of available abilities
        """
        traits = player.get("traits", {})
        available = []
        
        for ability_id, ability in self.abilities.items():
            required_trait = ability.get("required_trait")
            required_level = ability.get("required_level", 80)
            
            if required_trait and traits.get(required_trait, 0) >= required_level:
                available.append({
                    "id": ability_id,
                    "name": ability["name"],
                    "description": ability["description"],
                    "ap_cost": ability["ap_cost"],
                    "target": ability["target"]
                })
        
        return available
