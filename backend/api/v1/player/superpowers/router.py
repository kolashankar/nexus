from fastapi import APIRouter, Depends, HTTPException
from .....services.player.superpowers import SuperpowersService
from .....api.deps import get_current_user
from .schemas import SuperpowerResponse, UnlockSuperpowerRequest

router = APIRouter()

@router.get("/", response_model=list)
async def get_superpowers(current_user: dict = Depends(get_current_user)):
    """Get all player's superpowers"""
    service = SuperpowersService()
    return await service.get_player_superpowers(current_user["_id"])

@router.get("/available", response_model=list)
async def get_available_superpowers(current_user: dict = Depends(get_current_user)):
    """Get superpowers available for unlock"""
    service = SuperpowersService()
    return await service.get_available_superpowers(current_user["_id"])

@router.post("/unlock/{power_name}")
async def unlock_superpower(
    power_name: str,
    current_user: dict = Depends(get_current_user)
):
    """Unlock a superpower"""
    service = SuperpowersService()
    try:
        result = await service.unlock_superpower(current_user["_id"], power_name)
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/activate/{power_name}")
async def activate_superpower(
    power_name: str,
    current_user: dict = Depends(get_current_user)
):
    """Activate a superpower"""
    service = SuperpowersService()
    try:
        result = await service.activate_superpower(current_user["_id"], power_name)
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
