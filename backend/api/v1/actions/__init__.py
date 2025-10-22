from fastapi import APIRouter
from .hack import router as hack_router
from .help import router as help_router
from .steal import router as steal_router
from .donate import router as donate_router
from .trade import router as trade_router

actions_router = APIRouter()

# Include all action sub-routers
actions_router.include_router(hack_router, tags=["actions"])
actions_router.include_router(help_router, tags=["actions"])
actions_router.include_router(steal_router, tags=["actions"])
actions_router.include_router(donate_router, tags=["actions"])
actions_router.include_router(trade_router, tags=["actions"])
