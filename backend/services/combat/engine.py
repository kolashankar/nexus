from typing import Dict, List, Optional, Tuple
from datetime import datetime
import random
from ...models.combat.battle import Battle, BattleParticipant, BattleAction, BattleTurn
from ...models.combat.stats import CombatStats
from .calculator import CombatCalculator
from .abilities import AbilitySystem
from .turn_manager import TurnManager


class CombatEngine:
    """
    Main combat engine for Karma Nexus
    Handles turn-based combat mechanics
    """
    
    def __init__(self):
        self.calculator = CombatCalculator()
        self.ability_system = AbilitySystem()
        self.turn_manager = TurnManager()
    
    def initialize_battle(self, 
                         attacker: Dict,
                         defender: Dict,
                         battle_type: str = "duel") -> Battle:
        """
        Initialize a new battle
        
        Args:
            attacker: Player initiating the battle
            defender: Target player
            battle_type: Type of battle (duel, arena, ambush)
        
        Returns:
            Initialized Battle object
        """
        # Calculate combat stats for both players
        attacker_stats = self.calculator.calculate_combat_stats(attacker)
        defender_stats = self.calculator.calculate_combat_stats(defender)
        
        # Roll initiative
        attacker_initiative = self.calculator.roll_initiative(attacker)
        defender_initiative = self.calculator.roll_initiative(defender)
        
        # Create participants
        participants = [
            BattleParticipant(
                player_id=attacker["player_id"],
                username=attacker.get("username", "Player1"),
                hp=attacker_stats["max_hp"],
                max_hp=attacker_stats["max_hp"],
                initiative=attacker_initiative,
                position=0 if attacker_initiative >= defender_initiative else 1,
                combat_stats=attacker_stats,
                equipped_abilities=attacker.get("equipped_abilities", [])
            ),
            BattleParticipant(
                player_id=defender["player_id"],
                username=defender.get("username", "Player2"),
                hp=defender_stats["max_hp"],
                max_hp=defender_stats["max_hp"],
                initiative=defender_initiative,
                position=1 if attacker_initiative >= defender_initiative else 0,
                combat_stats=defender_stats,
                equipped_abilities=defender.get("equipped_abilities", [])
            )
        ]
        
        # Sort by position (higher initiative goes first)
        participants.sort(key=lambda p: p.position)
        
        # Create battle
        battle = Battle(
            battle_type=battle_type,
            status="active",
            participants=participants,
            attacker_id=attacker["player_id"],
            defender_id=defender["player_id"],
            active_participant_id=participants[0].player_id,
            started_at=datetime.utcnow()
        )
        
        return battle
    
    def execute_action(self, 
                      battle: Battle,
                      action_type: str,
                      actor_id: str,
                      target_id: Optional[str] = None,
                      ability_name: Optional[str] = None) -> Tuple[Battle, BattleAction]:
        """
        Execute a combat action
        
        Args:
            battle: Current battle state
            action_type: Type of action (attack, defend, use_power, use_item, flee)
            actor_id: Player performing the action
            target_id: Target of the action (if applicable)
            ability_name: Name of ability to use (if applicable)
        
        Returns:
            Tuple of updated battle and action result
        """
        # Get actor and target
        actor = next((p for p in battle.participants if p.player_id == actor_id), None)
        target = next((p for p in battle.participants if p.player_id == target_id), None) if target_id else None
        
        if not actor:
            raise ValueError(f"Actor {actor_id} not found in battle")
        
        # Determine AP cost
        ap_cost = self._get_action_cost(action_type, ability_name)
        
        # Check if actor has enough AP
        if actor.action_points < ap_cost:
            raise ValueError(f"Insufficient action points. Need {ap_cost}, have {actor.action_points}")
        
        # Execute action based on type
        if action_type == "attack":
            action_result = self._execute_attack(actor, target, battle)
        elif action_type == "defend":
            action_result = self._execute_defend(actor)
        elif action_type == "use_power":
            action_result = self._execute_ability(actor, target, ability_name, battle)
        elif action_type == "flee":
            action_result = self._execute_flee(actor, battle)
        else:
            raise ValueError(f"Unknown action type: {action_type}")
        
        # Deduct AP
        actor.action_points -= ap_cost
        
        # Create action record
        action = BattleAction(
            actor_id=actor_id,
            action_type=action_type,
            target_id=target_id,
            ability_name=ability_name,
            ap_cost=ap_cost,
            **action_result
        )
        
        # Update battle
        battle = self._update_battle_state(battle, action)
        
        return battle, action
    
    def _execute_attack(self, actor: BattleParticipant, target: BattleParticipant, battle: Battle) -> Dict:
        """Execute basic attack"""
        # Calculate damage
        base_damage = self.calculator.calculate_damage(
            actor.combat_stats,
            target.combat_stats
        )
        
        # Check for critical hit
        is_critical = random.randint(1, 100) <= actor.combat_stats.get("critical_chance", 5)
        if is_critical:
            base_damage = int(base_damage * 1.5)
        
        # Check for evasion
        is_evaded = random.randint(1, 100) <= target.combat_stats.get("evasion", 5)
        
        if is_evaded:
            damage = 0
            success = False
            description = f"{actor.username}'s attack missed {target.username}!"
        else:
            damage = max(1, base_damage)  # Minimum 1 damage
            target.hp = max(0, target.hp - damage)
            success = True
            crit_text = " Critical hit!" if is_critical else ""
            description = f"{actor.username} attacks {target.username} for {damage} damage!{crit_text}"
        
        return {
            "damage": damage,
            "success": success,
            "description": description,
            "effects": [{"type": "critical", "value": True}] if is_critical else []
        }
    
    def _execute_defend(self, actor: BattleParticipant) -> Dict:
        """Execute defend action (increases defense temporarily)"""
        # Add defense buff
        defense_boost = int(actor.combat_stats.get("defense", 10) * 0.5)
        effect = {
            "type": "defense_boost",
            "value": defense_boost,
            "duration": 1  # lasts 1 turn
        }
        actor.status_effects.append(effect)
        
        return {
            "damage": None,
            "success": True,
            "description": f"{actor.username} takes a defensive stance! (+{defense_boost} defense)",
            "effects": [effect]
        }
    
    def _execute_ability(self, actor: BattleParticipant, target: BattleParticipant, 
                        ability_name: str, battle: Battle) -> Dict:
        """Execute superpower/ability"""
        # Use ability system
        result = self.ability_system.use_ability(
            ability_name=ability_name,
            actor=actor,
            target=target
        )
        
        return result
    
    def _execute_flee(self, actor: BattleParticipant, battle: Battle) -> Dict:
        """Attempt to flee from battle"""
        # Calculate flee chance based on speed
        speed_diff = actor.combat_stats.get("speed", 10)
        flee_chance = min(75, 50 + (speed_diff // 2))  # Base 50%, max 75%
        
        success = random.randint(1, 100) <= flee_chance
        
        if success:
            actor.has_fled = True
            battle.status = "completed"
            battle.victory_type = "fled"
            description = f"{actor.username} successfully fled from battle!"
        else:
            description = f"{actor.username} failed to flee!"
        
        return {
            "damage": None,
            "success": success,
            "description": description,
            "effects": []
        }
    
    def _get_action_cost(self, action_type: str, ability_name: Optional[str] = None) -> int:
        """Get AP cost for an action"""
        costs = {
            "attack": 1,
            "defend": 1,
            "use_item": 1,
            "flee": 3
        }
        
        if action_type == "use_power":
            # Ability costs vary, default to 2
            return self.ability_system.get_ability_cost(ability_name) if ability_name else 2
        
        return costs.get(action_type, 1)
    
    def _update_battle_state(self, battle: Battle, action: BattleAction) -> Battle:
        """Update battle state after an action"""
        # Check for battle end conditions
        alive_participants = [p for p in battle.participants if p.hp > 0 and not p.has_fled]
        
        if len(alive_participants) <= 1:
            battle.status = "completed"
            battle.ended_at = datetime.utcnow()
            
            if alive_participants:
                winner = alive_participants[0]
                battle.winner_id = winner.player_id
                loser = next((p for p in battle.participants if p.player_id != winner.player_id), None)
                if loser:
                    battle.loser_id = loser.player_id
                battle.victory_type = "knockout"
        
        # Check for turn end (actor out of AP)
        active_participant = next((p for p in battle.participants if p.player_id == battle.active_participant_id), None)
        if active_participant and active_participant.action_points == 0:
            battle = self.turn_manager.end_turn(battle)
            battle = self.turn_manager.start_new_turn(battle)
        
        return battle
    
    def calculate_rewards(self, battle: Battle) -> Dict:
        """Calculate rewards for battle outcome"""
        if not battle.winner_id:
            return {}
        
        winner = next((p for p in battle.participants if p.player_id == battle.winner_id), None)
        loser = next((p for p in battle.participants if p.player_id == battle.loser_id), None)
        
        if not winner or not loser:
            return {}
        
        # Base rewards
        rewards = {
            "xp": 100,
            "credits": 50,
            "karma": 5
        }
        
        # Bonus for battle type
        if battle.battle_type == "arena":
            rewards["xp"] *= 1.5
            rewards["credits"] *= 1.5
        
        # Bonus for perfect victory
        if winner.hp == winner.max_hp:
            rewards["xp"] *= 1.3
            rewards["bonus"] = "Perfect Victory"
        
        return rewards
