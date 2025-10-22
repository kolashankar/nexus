from fastapi import APIRouter, Depends, HTTPException
from typing import List
from .....core.database import get_database
from .....services.combat.engine import CombatEngine
from ..schemas import ChallengeRequest, ChallengeResponse

router = APIRouter(prefix="/duel", tags=["combat-duel"])
combat_engine = CombatEngine()


@router.post("/challenge", response_model=ChallengeResponse)
async def challenge_to_duel(
    request: ChallengeRequest,
    db = Depends(get_database)
):
    """
    Challenge another player to a duel
    Both players must agree to the duel
    """
    # Validate players exist
    attacker = await db.players.find_one({"player_id": request.attacker_id})
    defender = await db.players.find_one({"player_id": request.defender_id})
    
    if not attacker or not defender:
        raise HTTPException(status_code=404, detail="Player not found")
    
    # Check if defender is online
    if not defender.get("online", False):
        raise HTTPException(status_code=400, detail="Player must be online to duel")
    
    # Check for existing pending duels
    existing = await db.battles.find_one({
        "attacker_id": request.attacker_id,
        "defender_id": request.defender_id,
        "status": "pending",
        "battle_type": "duel"
    })
    
    if existing:
        raise HTTPException(status_code=400, detail="Duel challenge already pending")
    
    # Create duel
    battle = combat_engine.initialize_battle(
        attacker=attacker,
        defender=defender,
        battle_type="duel"
    )
    battle.status = "pending"  # Requires acceptance
    
    await db.battles.insert_one(battle.dict())
    
    # TODO: Send WebSocket notification to defender
    
    return ChallengeResponse(
        battle_id=battle.battle_id,
        status="pending",
        message=f"Duel challenge sent to {defender['username']}"
    )


@router.get("/pending/{player_id}")
async def get_pending_duels(
    player_id: str,
    db = Depends(get_database)
):
    """
    Get all pending duel challenges for a player
    """
    duels = await db.battles.find({
        "defender_id": player_id,
        "status": "pending",
        "battle_type": "duel"
    }).to_list(length=10)
    
    return {"pending_duels": duels}


@router.get("/history/{player_id}")
async def get_duel_history(
    player_id: str,
    limit: int = 20,
    db = Depends(get_database)
):
    """
    Get duel history for a player
    """
    duels = await db.battles.find({
        "$or": [
            {"attacker_id": player_id},
            {"defender_id": player_id}
        ],
        "battle_type": "duel",
        "status": "completed"
    }).sort("ended_at", -1).limit(limit).to_list(length=limit)
    
    return {"duels": duels}
