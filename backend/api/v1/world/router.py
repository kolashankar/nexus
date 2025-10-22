"""World API routes"""

from fastapi import APIRouter, Depends

from ....core.database import get_database
from ....services.world.world_state_service import WorldStateService
from ....services.world.event_service import WorldEventService
from ...deps import get_current_player

router = APIRouter(prefix="/world", tags=["world"])


@router.get("/state")
async def get_world_state(
    db = Depends(get_database),
):
    """Get current world state"""
    service = WorldStateService(db)
    state = await service.get_world_state()
    return {"world_state": state}


@router.get("/stats")
async def get_global_stats(
    db = Depends(get_database),
):
    """Get global statistics"""
    service = WorldStateService(db)
    stats = await service.get_global_stats()
    return stats


@router.get("/events")
async def get_active_events(
    db = Depends(get_database),
):
    """Get active world events"""
    service = WorldEventService(db)
    events = await service.get_active_events()
    return {"events": events, "total": len(events)}


@router.get("/events/{event_id}")
async def get_event(
    event_id: str,
    db = Depends(get_database),
):
    """Get specific event details"""
    service = WorldEventService(db)
    event = await service.get_event(event_id)
    
    if not event:
        return {"error": "Event not found"}
    
    return {"event": event}


@router.get("/karma")
async def get_global_karma(
    db = Depends(get_database),
):
    """Get global karma state"""
    service = WorldStateService(db)
    state = await service.get_world_state()
    return {"global_karma": state.get("global_karma", {})}
