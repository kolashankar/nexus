from fastapi import APIRouter, Depends, HTTPException
from .....services.player.skill_trees import SkillTreesService
from .....api.deps import get_current_user
from .schemas import SkillTreeResponse, UnlockNodeRequest

router = APIRouter()

@router.get("/", response_model=dict)
async def get_skill_trees(current_user: dict = Depends(get_current_user)):
    """Get all player's skill trees"""
    service = SkillTreesService()
    return await service.get_player_skill_trees(current_user["_id"])

@router.get("/{trait_name}", response_model=dict)
async def get_trait_skill_tree(
    trait_name: str,
    current_user: dict = Depends(get_current_user)
):
    """Get specific trait's skill tree"""
    service = SkillTreesService()
    try:
        return await service.get_trait_skill_tree(current_user["_id"], trait_name)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.post("/unlock")
async def unlock_skill_node(
    request: UnlockNodeRequest,
    current_user: dict = Depends(get_current_user)
):
    """Unlock a skill tree node"""
    service = SkillTreesService()
    try:
        result = await service.unlock_node(
            current_user["_id"],
            request.trait_name,
            request.node_id
        )
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
