from fastapi import APIRouter, Depends
from .....core.security import get_current_user
from .....services.quests.hidden import HiddenQuestService

router = APIRouter(prefix="/hidden", tags=["hidden-quests"])


@router.post("/discover")
async def discover_hidden_quest(
    location: dict,
    current_user: dict = Depends(get_current_user)
):
    """Attempt to discover a hidden quest at location."""
    hidden_service = HiddenQuestService()
    
    result = await hidden_service.attempt_discovery(
        current_user["_id"],
        location
    )
    
    return result


@router.get("/hints")
async def get_hidden_quest_hints(
    current_user: dict = Depends(get_current_user)
):
    """Get cryptic hints about hidden quests."""
    hidden_service = HiddenQuestService()
    
    hints = await hidden_service.get_hints(current_user["_id"])
    return {"hints": hints}
