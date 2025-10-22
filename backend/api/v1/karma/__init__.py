from fastapi import APIRouter
from .router import router as main_router
from .events.router import router as events_router

karma_router = APIRouter()

# Include all karma sub-routers
karma_router.include_router(main_router, tags=["karma"])
karma_router.include_router(events_router, prefix="/events", tags=["karma-events"])
