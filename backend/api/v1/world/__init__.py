"""World & Events API"""

from fastapi import APIRouter
from .events import router as events_router
from .state import router as state_router
from .territories import router as territories_router

router = APIRouter()

router.include_router(events_router, prefix="/events", tags=["World Events"])
router.include_router(state_router, prefix="/state", tags=["World State"])
router.include_router(territories_router, prefix="/territories", tags=["Territories"])

__all__ = ["router"]
