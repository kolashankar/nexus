from fastapi import APIRouter
from .router import router as main_router
from .traits.router import router as traits_router
from .superpowers.router import router as superpowers_router
from .skill_trees.router import router as skill_trees_router
from .privacy.router import router as privacy_router

player_router = APIRouter()

# Include all player sub-routers
player_router.include_router(main_router, tags=["player"])
player_router.include_router(traits_router, prefix="/traits", tags=["traits"])
player_router.include_router(superpowers_router, prefix="/superpowers", tags=["superpowers"])
player_router.include_router(skill_trees_router, prefix="/skill-trees", tags=["skill-trees"])
player_router.include_router(privacy_router, prefix="/privacy", tags=["privacy"])
