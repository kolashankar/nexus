from fastapi import APIRouter, Depends
from .....core.security import get_current_user
from .....services.quests.world import WorldQuestService

router = APIRouter(prefix="/world", tags=["world-quests"])


@router.get("")
async def get_world_quests(
    current_user: dict = Depends(get_current_user)
):
    """Get active world quests."""
    world_service = WorldQuestService()
    quests = await world_service.get_world_quests()
    return {"quests": quests}


@router.get("/participate/{quest_id}")
async def participate_in_world_quest(
    quest_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Participate in a world quest."""
    world_service = WorldQuestService()
    result = await world_service.participate(current_user["_id"], quest_id)
    return result
