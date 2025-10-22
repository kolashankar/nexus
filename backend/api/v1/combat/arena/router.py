from fastapi import APIRouter, Depends, HTTPException
from typing import Optional
import random
from .....core.database import get_database
from .....services.combat.engine import CombatEngine
from .....services.combat.calculator import CombatCalculator

router = APIRouter(prefix="/arena", tags=["combat-arena"])
combat_engine = CombatEngine()
calculator = CombatCalculator()


@router.post("/join")
async def join_arena_queue(
    player_id: str,
    ranked: bool = False,
    db = Depends(get_database)
):
    """
    Join the arena matchmaking queue
    """
    player = await db.players.find_one({"player_id": player_id})
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")
    
    # Check if already in queue
    existing = await db.arena_queue.find_one({"player_id": player_id})
    if existing:
        return {"message": "Already in queue", "position": existing.get("position", 0)}
    
    # Add to queue
    combat_rating = player.get("combat_stats", {}).get("combat_rating", 1500)
    queue_entry = {
        "player_id": player_id,
        "username": player.get("username"),
        "combat_rating": combat_rating,
        "ranked": ranked,
        "joined_at": datetime.utcnow()
    }
    
    await db.arena_queue.insert_one(queue_entry)
    
    # Try to find a match
    match = await _find_match(player_id, ranked, db)
    
    if match:
        return {
            "message": "Match found!",
            "battle_id": match["battle_id"],
            "opponent": match["opponent"]
        }
    
    # Get queue position
    position = await db.arena_queue.count_documents({
        "joined_at": {"$lt": queue_entry["joined_at"]}
    })
    
    return {
        "message": "Searching for opponent...",
        "position": position + 1
    }


@router.post("/leave")
async def leave_arena_queue(
    player_id: str,
    db = Depends(get_database)
):
    """
    Leave the arena queue
    """
    result = await db.arena_queue.delete_one({"player_id": player_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Not in queue")
    
    return {"message": "Left queue"}


@router.get("/queue")
async def get_queue_status(
    player_id: str,
    db = Depends(get_database)
):
    """
    Get current queue status
    """
    entry = await db.arena_queue.find_one({"player_id": player_id})
    
    if not entry:
        return {"in_queue": False}
    
    position = await db.arena_queue.count_documents({
        "joined_at": {"$lt": entry["joined_at"]}
    })
    
    total_in_queue = await db.arena_queue.count_documents({})
    
    return {
        "in_queue": True,
        "position": position + 1,
        "total_in_queue": total_in_queue,
        "ranked": entry.get("ranked", False)
    }


@router.get("/leaderboard")
async def get_arena_leaderboard(
    limit: int = 100,
    db = Depends(get_database)
):
    """
    Get arena leaderboard (ranked by combat rating)
    """
    players = await db.players.find(
        {"combat_stats.combat_rating": {"$exists": True}}
    ).sort("combat_stats.combat_rating", -1).limit(limit).to_list(length=limit)
    
    leaderboard = []
    for rank, player in enumerate(players, 1):
        leaderboard.append({
            "rank": rank,
            "player_id": player["player_id"],
            "username": player.get("username"),
            "combat_rating": player.get("combat_stats", {}).get("combat_rating", 1500),
            "wins": player.get("combat_stats", {}).get("arena_wins", 0),
            "losses": player.get("combat_stats", {}).get("arena_losses", 0)
        })
    
    return {"leaderboard": leaderboard}


async def _find_match(player_id: str, ranked: bool, db) -> Optional[dict]:
    """
    Find a suitable opponent from the queue
    """
    player_entry = await db.arena_queue.find_one({"player_id": player_id})
    if not player_entry:
        return None
    
    player_rating = player_entry.get("combat_rating", 1500)
    
    # Find opponent with similar rating (±200 rating)
    if ranked:
        rating_range = 200
        opponents = await db.arena_queue.find({
            "player_id": {"$ne": player_id},
            "ranked": True,
            "combat_rating": {
                "$gte": player_rating - rating_range,
                "$lte": player_rating + rating_range
            }
        }).to_list(length=10)
    else:
        # Casual match - any opponent
        opponents = await db.arena_queue.find({
            "player_id": {"$ne": player_id},
            "ranked": False
        }).to_list(length=10)
    
    if not opponents:
        return None
    
    # Pick random opponent
    opponent_entry = random.choice(opponents)
    
    # Get full player data
    player = await db.players.find_one({"player_id": player_id})
    opponent = await db.players.find_one({"player_id": opponent_entry["player_id"]})
    
    # Create battle
    battle = combat_engine.initialize_battle(
        attacker=player,
        defender=opponent,
        battle_type="arena"
    )
    battle.ranked = ranked
    
    await db.battles.insert_one(battle.dict())
    
    # Remove both from queue
    await db.arena_queue.delete_many({
        "player_id": {"$in": [player_id, opponent_entry["player_id"]]}
    })
    
    return {
        "battle_id": battle.battle_id,
        "opponent": opponent.get("username")
    }


from datetime import datetime
