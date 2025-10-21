"""API v1 package initialization."""

from fastapi import APIRouter
from backend.api.v1.auth.router import router as auth_router
from backend.api.v1.actions.router import router as actions_router

api_router = APIRouter()

api_router.include_router(auth_router, prefix="/auth", tags=["authentication"])
api_router.include_router(actions_router, prefix="/actions", tags=["actions"])
