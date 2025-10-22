from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional
from ....core.security import get_current_user
from ....services.quests.manager import QuestService
from ....services.ai.oracle.oracle import Oracle
from .schemas import (
    QuestListResponse,
    QuestDetailResponse,
    AcceptQuestRequest,
    CompleteQuestRequest,
    QuestProgressResponse
)

router = APIRouter(prefix="/quests", tags=["quests"])


@router.get("/available", response_model=QuestListResponse)
async def get_available_quests(
    quest_type: Optional[str] = None,
    current_user: dict = Depends(get_current_user)
):
    """Get available quests for the player."""
    quest_service = QuestService()
    quests = await quest_service.get_available_quests(
        current_user["_id"],
        quest_type=quest_type
    )
    return {"quests": quests, "total": len(quests)}


@router.get("/active", response_model=QuestListResponse)
async def get_active_quests(
    current_user: dict = Depends(get_current_user)
):
    """Get player's active quests."""
    quest_service = QuestService()
    quests = await quest_service.get_active_quests(current_user["_id"])
    return {"quests": quests, "total": len(quests)}


@router.get("/completed", response_model=QuestListResponse)
async def get_completed_quests(
    limit: int = 50,
    current_user: dict = Depends(get_current_user)
):
    """Get player's completed quests."""
    quest_service = QuestService()
    quests = await quest_service.get_completed_quests(
        current_user["_id"],
        limit=limit
    )
    return {"quests": quests, "total": len(quests)}


@router.get("/{quest_id}", response_model=QuestDetailResponse)
async def get_quest_details(
    quest_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Get detailed information about a quest."""
    quest_service = QuestService()
    quest = await quest_service.get_quest_details(quest_id)
    
    if not quest:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Quest not found"
        )
    
    return quest


@router.post("/accept")
async def accept_quest(
    request: AcceptQuestRequest,
    current_user: dict = Depends(get_current_user)
):
    """Accept a quest."""
    quest_service = QuestService()
    
    result = await quest_service.accept_quest(
        current_user["_id"],
        request.quest_id
    )
    
    if not result["success"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=result.get("error", "Unable to accept quest")
        )
    
    return result


@router.post("/abandon/{quest_id}")
async def abandon_quest(
    quest_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Abandon an active quest."""
    quest_service = QuestService()
    
    result = await quest_service.abandon_quest(
        current_user["_id"],
        quest_id
    )
    
    if not result["success"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=result.get("error", "Unable to abandon quest")
        )
    
    return result


@router.post("/complete")
async def complete_quest(
    request: CompleteQuestRequest,
    current_user: dict = Depends(get_current_user)
):
    """Complete a quest and claim rewards."""
    quest_service = QuestService()
    
    result = await quest_service.complete_quest(
        current_user["_id"],
        request.quest_id
    )
    
    if not result["success"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=result.get("error", "Unable to complete quest")
        )
    
    return result


@router.get("/progress/{quest_id}", response_model=QuestProgressResponse)
async def get_quest_progress(
    quest_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Get progress on an active quest."""
    quest_service = QuestService()
    progress = await quest_service.get_quest_progress(
        current_user["_id"],
        quest_id
    )
    
    if not progress:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Quest not found or not active"
        )
    
    return progress


@router.post("/generate")
async def generate_personal_quest(
    quest_type: str = "personal",
    current_user: dict = Depends(get_current_user)
):
    """Generate a new personalized quest using AI."""
    oracle = Oracle()
    quest_service = QuestService()
    
    # Get player data for context
    player_data = current_user
    
    # Generate quest using Oracle AI
    quest_data = await oracle.generate_quest(player_data, quest_type=quest_type)
    
    # Save quest to database
    quest = await quest_service.create_quest(
        player_id=current_user["_id"],
        quest_data=quest_data
    )
    
    return {"success": True, "quest": quest}


@router.get("/daily")
async def get_daily_quests(
    current_user: dict = Depends(get_current_user)
):
    """Get today's daily quests."""
    quest_service = QuestService()
    quests = await quest_service.get_daily_quests(current_user["_id"])
    return {"quests": quests}


@router.get("/weekly")
async def get_weekly_quests(
    current_user: dict = Depends(get_current_user)
):
    """Get this week's weekly challenges."""
    quest_service = QuestService()
    quests = await quest_service.get_weekly_quests(current_user["_id"])
    return {"quests": quests}
