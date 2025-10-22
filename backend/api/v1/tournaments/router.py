"""Tournament routes - competitive brackets."""

from fastapi import APIRouter, Depends, HTTPException, status
from typing import Dict, Any, List
from datetime import datetime, timedelta

from backend.core.security import get_current_user
from backend.core.database import get_database
from .schemas import TournamentRegistrationRequest, TournamentResponse

router = APIRouter(prefix="/tournaments", tags=["tournaments"])


@router.get("/active", response_model=List[TournamentResponse])
async def get_active_tournaments():
    """Get all active tournaments."""
    db = await get_database()
    
    tournaments = await db.tournaments.find({
        "status": {"$in": ["registration", "in_progress"]}
    }).to_list(length=50)
    
    return tournaments


@router.post("/register")
async def register_for_tournament(
    request: TournamentRegistrationRequest,
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Register for a tournament."""
    db = await get_database()
    
    tournament = await db.tournaments.find_one({"_id": request.tournament_id})
    
    if not tournament:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tournament not found"
        )
    
    if tournament["status"] != "registration":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Tournament registration closed"
        )
    
    # Check if already registered
    if current_user["_id"] in tournament.get("participants", []):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Already registered"
        )
    
    # Add participant
    await db.tournaments.update_one(
        {"_id": request.tournament_id},
        {"$push": {"participants": current_user["_id"]}}
    )
    
    return {
        "status": "registered",
        "message": f"Successfully registered for {tournament['name']}"
    }


@router.get("/{tournament_id}")
async def get_tournament_details(tournament_id: str):
    """Get detailed information about a tournament."""
    db = await get_database()
    from bson import ObjectId
    
    tournament = await db.tournaments.find_one({"_id": ObjectId(tournament_id)})
    
    if not tournament:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tournament not found"
        )
    
    return tournament


@router.get("/{tournament_id}/bracket")
async def get_tournament_bracket(tournament_id: str):
    """Get tournament bracket."""
    db = await get_database()
    from bson import ObjectId
    
    tournament = await db.tournaments.find_one({"_id": ObjectId(tournament_id)})
    
    if not tournament:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tournament not found"
        )
    
    return {
        "bracket": tournament.get("bracket", []),
        "current_round": tournament.get("current_round", 1),
        "total_rounds": tournament.get("total_rounds", 3)
    }
