from typing import Optional
from datetime import datetime
from ...models.combat.battle import Battle, BattleTurn


class TurnManager:
    """
    Manages turn order and turn transitions in combat
    """
    
    def start_new_turn(self, battle: Battle) -> Battle:
        """
        Start a new turn
        
        Args:
            battle: Current battle state
        
        Returns:
            Updated battle with new turn
        """
        battle.current_turn += 1
        
        # Get next participant
        current_participant = self._get_next_participant(battle)
        
        if not current_participant:
            # No valid participants, end battle
            battle.status = "completed"
            battle.ended_at = datetime.utcnow()
            return battle
        
        # Set active participant
        battle.active_participant_id = current_participant.player_id
        
        # Reset action points
        current_participant.action_points = current_participant.max_action_points
        
        # Process status effects (reduce duration)
        self._process_status_effects(current_participant)
        
        # Create new turn
        new_turn = BattleTurn(
            turn_number=battle.current_turn,
            active_player_id=current_participant.player_id
        )
        battle.turn_history.append(new_turn)
        
        # Check for max turns reached
        if battle.current_turn >= battle.max_turns:
            battle.status = "completed"
            battle.victory_type = "timeout"
            battle.ended_at = datetime.utcnow()
            # Winner is player with most HP
            participants_by_hp = sorted(battle.participants, key=lambda p: p.hp, reverse=True)
            if participants_by_hp:
                battle.winner_id = participants_by_hp[0].player_id
                if len(participants_by_hp) > 1:
                    battle.loser_id = participants_by_hp[1].player_id
        
        return battle
    
    def end_turn(self, battle: Battle) -> Battle:
        """
        End the current turn
        
        Args:
            battle: Current battle state
        
        Returns:
            Updated battle
        """
        if battle.turn_history:
            current_turn = battle.turn_history[-1]
            current_turn.turn_end = datetime.utcnow()
        
        return battle
    
    def _get_next_participant(self, battle: Battle) -> Optional[object]:
        """
        Get the next participant in turn order
        Cycles through participants by position
        
        Args:
            battle: Current battle state
        
        Returns:
            Next participant or None
        """
        # Get alive participants
        alive = [p for p in battle.participants if p.hp > 0 and not p.has_fled]
        
        if len(alive) <= 1:
            return None
        
        # Sort by position
        alive.sort(key=lambda p: p.position)
        
        # Find current active
        current_index = 0
        for i, p in enumerate(alive):
            if p.player_id == battle.active_participant_id:
                current_index = i
                break
        
        # Get next (cycle back to 0 if at end)
        next_index = (current_index + 1) % len(alive)
        return alive[next_index]
    
    def _process_status_effects(self, participant: object) -> None:
        """
        Process status effects on a participant
        Reduce duration, remove expired effects
        
        Args:
            participant: Battle participant
        """
        if not hasattr(participant, 'status_effects'):
            return
        
        # Reduce duration of all effects
        remaining_effects = []
        for effect in participant.status_effects:
            if effect.get("duration", 0) > 0:
                effect["duration"] -= 1
                if effect["duration"] > 0:
                    remaining_effects.append(effect)
        
        participant.status_effects = remaining_effects
