from fastapi import APIRouter, Depends, HTTPException
from typing import List, Optional
from datetime import datetime, timedelta
from ....core.database import get_database
from .schemas import (
    TournamentCreate,
    TournamentResponse,
    TournamentRegistration,
    BracketResponse
)

router = APIRouter(prefix="/tournaments", tags=["tournaments"])


@router.get("/active", response_model=List[TournamentResponse])
async def get_active_tournaments(
    db = Depends(get_database)
):
    """
    Get all active tournaments
    """
    tournaments = await db.tournaments.find({
        "status": {"$in": ["registration", "in_progress"]}
    }).to_list(length=50)
    
    return tournaments


@router.post("/register")
async def register_for_tournament(
    registration: TournamentRegistration,
    db = Depends(get_database)
):
    """
    Register a player for a tournament
    """
    # Get tournament
    tournament = await db.tournaments.find_one({
        "tournament_id": registration.tournament_id
    })
    
    if not tournament:
        raise HTTPException(status_code=404, detail="Tournament not found")
    
    if tournament["status"] != "registration":
        raise HTTPException(status_code=400, detail="Registration closed")
    
    # Check if already registered
    if registration.player_id in tournament.get("participants", []):
        raise HTTPException(status_code=400, detail="Already registered")
    
    # Check if full
    max_participants = tournament.get("max_participants", 32)
    if len(tournament.get("participants", [])) >= max_participants:
        raise HTTPException(status_code=400, detail="Tournament full")
    
    # Add participant
    await db.tournaments.update_one(
        {"tournament_id": registration.tournament_id},
        {"$push": {"participants": registration.player_id}}
    )
    
    return {"message": "Registered successfully"}


@router.get("/{tournament_id}", response_model=TournamentResponse)
async def get_tournament(
    tournament_id: str,
    db = Depends(get_database)
):
    """
    Get tournament details
    """
    tournament = await db.tournaments.find_one({"tournament_id": tournament_id})
    
    if not tournament:
        raise HTTPException(status_code=404, detail="Tournament not found")
    
    return tournament


@router.get("/{tournament_id}/bracket", response_model=BracketResponse)
async def get_tournament_bracket(
    tournament_id: str,
    db = Depends(get_database)
):
    """
    Get tournament bracket
    """
    tournament = await db.tournaments.find_one({"tournament_id": tournament_id})
    
    if not tournament:
        raise HTTPException(status_code=404, detail="Tournament not found")
    
    bracket = tournament.get("bracket", {})
    
    return BracketResponse(
        tournament_id=tournament_id,
        bracket=bracket,
        current_round=tournament.get("current_round", 1)
    )


@router.get("/{tournament_id}/my-match")
async def get_my_match(
    tournament_id: str,
    player_id: str,
    db = Depends(get_database)
):
    """
    Get player's current match in tournament
    """
    tournament = await db.tournaments.find_one({"tournament_id": tournament_id})
    
    if not tournament:
        raise HTTPException(status_code=404, detail="Tournament not found")
    
    # Find player's match in current round
    bracket = tournament.get("bracket", {})
    current_round = tournament.get("current_round", 1)
    
    round_matches = bracket.get(f"round_{current_round}", [])
    
    for match in round_matches:
        if player_id in [match.get("player1_id"), match.get("player2_id")]:
            return {"match": match}
    
    return {"match": None, "message": "No active match"}


@router.get("/history")
async def get_tournament_history(
    player_id: Optional[str] = None,
    limit: int = 10,
    db = Depends(get_database)
):
    """
    Get tournament history
    """
    query = {"status": "completed"}
    
    if player_id:
        query["participants"] = player_id
    
    tournaments = await db.tournaments.find(query).sort(
        "ended_at", -1
    ).limit(limit).to_list(length=limit)
    
    return {"tournaments": tournaments}


@router.post("/create", response_model=TournamentResponse)
async def create_tournament(
    tournament: TournamentCreate,
    db = Depends(get_database)
):
    """
    Create a new tournament (admin only)
    """
    import uuid
    
    tournament_data = {
        "tournament_id": str(uuid.uuid4()),
        "name": tournament.name,
        "description": tournament.description,
        "tournament_type": tournament.tournament_type,
        "max_participants": tournament.max_participants,
        "entry_fee": tournament.entry_fee,
        "prize_pool": tournament.prize_pool,
        "status": "registration",
        "participants": [],
        "bracket": {},
        "current_round": 0,
        "created_at": datetime.utcnow(),
        "registration_ends": datetime.utcnow() + timedelta(hours=24),
        "starts_at": tournament.starts_at
    }
    
    await db.tournaments.insert_one(tournament_data)
    
    return tournament_data
