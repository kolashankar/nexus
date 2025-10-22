from fastapi import APIRouter
from .router import router as social_router
from .alliances import router as alliances_router
from .marriage import router as marriage_router
from .mentorship import router as mentorship_router

router = APIRouter(prefix="/social", tags=["social"])

router.include_router(social_router)
router.include_router(alliances_router, prefix="/alliances")
router.include_router(marriage_router, prefix="/marriage")
router.include_router(mentorship_router, prefix="/mentorship")

__all__ = ["router"]
