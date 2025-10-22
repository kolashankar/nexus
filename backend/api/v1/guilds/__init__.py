from fastapi import APIRouter
from .router import router as guilds_router
from .management import router as management_router
from .territories import router as territories_router
from .wars import router as wars_router

router = APIRouter(prefix="/guilds", tags=["guilds"])

router.include_router(guilds_router)
router.include_router(management_router, prefix="/management")
router.include_router(territories_router, prefix="/territories")
router.include_router(wars_router, prefix="/wars")

__all__ = ["router"]
