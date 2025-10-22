from fastapi import APIRouter, Depends, HTTPException, status
from typing import Optional
from ....core.database import get_database
from ....services.combat.engine import CombatEngine
from .schemas import (
    ChallengeRequest,
    ChallengeResponse,
    ActionRequest,
    ActionResponse,
    BattleStateResponse,
    BattleHistoryResponse
)

router = APIRouter(prefix="/combat", tags=["combat"])
combat_engine = CombatEngine()


@router.post("/challenge", response_model=ChallengeResponse)
async def challenge_player(
    request: ChallengeRequest,
    db = Depends(get_database),
    current_user: dict = None  # Add auth dependency
):
    """
    Challenge another player to combat
    """
    # Get attacker (current user)
    attacker = await db.players.find_one({"player_id": request.attacker_id})
    if not attacker:
        raise HTTPException(status_code=404, detail="Attacker not found")
    
    # Get defender
    defender = await db.players.find_one({"player_id": request.defender_id})
    if not defender:
        raise HTTPException(status_code=404, detail="Defender not found")
    
    # Check if defender is online (optional)
    if not defender.get("online", False) and request.battle_type == "duel":
        raise HTTPException(status_code=400, detail="Player is offline")
    
    # Initialize battle
    battle = combat_engine.initialize_battle(
        attacker=attacker,
        defender=defender,
        battle_type=request.battle_type
    )
    
    # Save battle to database
    await db.battles.insert_one(battle.dict())
    
    # Notify defender via WebSocket (TODO: implement)
    
    return ChallengeResponse(
        battle_id=battle.battle_id,
        status="pending",
        message=f"Challenge sent to {defender['username']}"
    )


@router.post("/accept/{battle_id}")
async def accept_challenge(
    battle_id: str,
    db = Depends(get_database)
):
    """
    Accept a combat challenge
    """
    battle = await db.battles.find_one({"battle_id": battle_id})
    if not battle:
        raise HTTPException(status_code=404, detail="Battle not found")
    
    if battle["status"] != "pending":
        raise HTTPException(status_code=400, detail="Battle already started or completed")
    
    # Update battle status
    await db.battles.update_one(
        {"battle_id": battle_id},
        {"$set": {"status": "active", "started_at": datetime.utcnow()}}
    )
    
    return {"message": "Challenge accepted", "battle_id": battle_id}


@router.post("/decline/{battle_id}")
async def decline_challenge(
    battle_id: str,
    db = Depends(get_database)
):
    """
    Decline a combat challenge
    """
    battle = await db.battles.find_one({"battle_id": battle_id})
    if not battle:
        raise HTTPException(status_code=404, detail="Battle not found")
    
    # Update battle status
    await db.battles.update_one(
        {"battle_id": battle_id},
        {"$set": {"status": "declined"}}
    )
    
    return {"message": "Challenge declined"}


@router.get("/active")
async def get_active_battles(
    player_id: str,
    db = Depends(get_database)
):
    """
    Get all active battles for a player
    """
    battles = await db.battles.find({
        "$or": [
            {"attacker_id": player_id},
            {"defender_id": player_id}
        ],
        "status": {"$in": ["pending", "active"]}
    }).to_list(length=10)
    
    return {"battles": battles}


@router.post("/action", response_model=ActionResponse)
async def execute_action(
    request: ActionRequest,
    db = Depends(get_database)
):
    """
    Execute a combat action
    """
    # Get battle
    battle_dict = await db.battles.find_one({"battle_id": request.battle_id})
    if not battle_dict:
        raise HTTPException(status_code=404, detail="Battle not found")
    
    # Convert to Battle model
    from ....models.combat.battle import Battle
    battle = Battle(**battle_dict)
    
    if battle.status != "active":
        raise HTTPException(status_code=400, detail="Battle is not active")
    
    # Check if it's player's turn
    if battle.active_participant_id != request.actor_id:
        raise HTTPException(status_code=400, detail="Not your turn")
    
    try:
        # Execute action
        updated_battle, action = combat_engine.execute_action(
            battle=battle,
            action_type=request.action_type,
            actor_id=request.actor_id,
            target_id=request.target_id,
            ability_name=request.ability_name
        )
        
        # Save updated battle
        await db.battles.update_one(
            {"battle_id": request.battle_id},
            {"$set": updated_battle.dict()}
        )
        
        # If battle ended, calculate rewards
        if updated_battle.status == "completed":
            rewards = combat_engine.calculate_rewards(updated_battle)
            updated_battle.rewards = rewards
            
            # Update player stats
            await _update_player_combat_stats(db, updated_battle)
        
        return ActionResponse(
            success=action.success,
            description=action.description,
            damage=action.damage,
            battle_status=updated_battle.status,
            winner_id=updated_battle.winner_id,
            rewards=updated_battle.rewards if updated_battle.status == "completed" else None
        )
    
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/state/{battle_id}", response_model=BattleStateResponse)
async def get_battle_state(
    battle_id: str,
    db = Depends(get_database)
):
    """
    Get current battle state
    """
    battle = await db.battles.find_one({"battle_id": battle_id})
    if not battle:
        raise HTTPException(status_code=404, detail="Battle not found")
    
    return BattleStateResponse(**battle)


@router.post("/flee/{battle_id}")
async def flee_battle(
    battle_id: str,
    player_id: str,
    db = Depends(get_database)
):
    """
    Attempt to flee from battle
    """
    battle_dict = await db.battles.find_one({"battle_id": battle_id})
    if not battle_dict:
        raise HTTPException(status_code=404, detail="Battle not found")
    
    from ....models.combat.battle import Battle
    battle = Battle(**battle_dict)
    
    # Execute flee action
    updated_battle, action = combat_engine.execute_action(
        battle=battle,
        action_type="flee",
        actor_id=player_id
    )
    
    # Save
    await db.battles.update_one(
        {"battle_id": battle_id},
        {"$set": updated_battle.dict()}
    )
    
    return {
        "success": action.success,
        "message": action.description
    }


@router.get("/history")
async def get_combat_history(
    player_id: str,
    limit: int = 10,
    db = Depends(get_database)
):
    """
    Get combat history for a player
    """
    battles = await db.battles.find({
        "$or": [
            {"attacker_id": player_id},
            {"defender_id": player_id}
        ],
        "status": "completed"
    }).sort("ended_at", -1).limit(limit).to_list(length=limit)
    
    return {"battles": battles}


@router.get("/stats/{player_id}")
async def get_combat_stats(
    player_id: str,
    db = Depends(get_database)
):
    """
    Get combat statistics for a player
    """
    player = await db.players.find_one({"player_id": player_id})
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")
    
    combat_stats = player.get("combat_stats", {})
    
    return {"stats": combat_stats}


async def _update_player_combat_stats(db, battle):
    """
    Update combat stats for both players after battle
    """
    from datetime import datetime
    
    winner_id = battle.winner_id
    loser_id = battle.loser_id
    
    if winner_id:
        # Update winner stats
        await db.players.update_one(
            {"player_id": winner_id},
            {
                "$inc": {
                    "combat_stats.total_battles": 1,
                    "combat_stats.wins": 1,
                    f"combat_stats.{battle.battle_type}_wins": 1,
                    "combat_stats.current_win_streak": 1
                }
            }
        )
    
    if loser_id:
        # Update loser stats
        await db.players.update_one(
            {"player_id": loser_id},
            {
                "$inc": {
                    "combat_stats.total_battles": 1,
                    "combat_stats.losses": 1,
                    f"combat_stats.{battle.battle_type}_losses": 1
                },
                "$set": {
                    "combat_stats.current_win_streak": 0
                }
            }
        )


from datetime import datetime
