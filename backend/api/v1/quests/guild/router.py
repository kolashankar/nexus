from fastapi import APIRouter, Depends, HTTPException, status
from .....core.security import get_current_user
from .....services.quests.guild import GuildQuestService
from .schemas import CreateGuildQuestRequest

router = APIRouter(prefix="/guild", tags=["guild-quests"])


@router.get("")
async def get_guild_quests(
    current_user: dict = Depends(get_current_user)
):
    """Get guild quests for player's guild."""
    guild_quest_service = GuildQuestService()
    
    if not current_user.get("guild_id"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Must be in a guild"
        )
    
    quests = await guild_quest_service.get_guild_quests(current_user["guild_id"])
    return {"quests": quests}


@router.post("/create")
async def create_guild_quest(
    request: CreateGuildQuestRequest,
    current_user: dict = Depends(get_current_user)
):
    """Create a new guild quest (leader/officer only)."""
    guild_quest_service = GuildQuestService()
    
    result = await guild_quest_service.create_guild_quest(
        current_user["_id"],
        current_user.get("guild_id"),
        request.dict()
    )
    
    if not result["success"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=result.get("error", "Unable to create guild quest")
        )
    
    return result


@router.post("/contribute/{quest_id}")
async def contribute_to_guild_quest(
    quest_id: str,
    contribution: dict,
    current_user: dict = Depends(get_current_user)
):
    """Contribute to a guild quest objective."""
    guild_quest_service = GuildQuestService()
    
    result = await guild_quest_service.contribute(
        current_user["_id"],
        quest_id,
        contribution
    )
    
    return result
