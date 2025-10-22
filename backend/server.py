from fastapi import FastAPI, APIRouter, WebSocket, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path

# Import routers
from api.v1.auth.router import router as auth_router
from api.v1.actions import actions_router
from api.v1.player import player_router
from api.v1.karma import karma_router
from api.v1.ai.karma_arbiter.router import router as karma_arbiter_router
from api.v1.ai.oracle.router import router as oracle_router
from api.v1.ai.companion.router import router as companion_router
from api.websocket.handlers import websocket_endpoint
from core.database import Database
from core.redis import redis_manager

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app without a prefix
app = FastAPI(
    title="Karma Nexus 2.0",
    description="AI-Powered Multiplayer Karma-Based RPG",
    version="1.0.0"
)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Root endpoint
@api_router.get("/")
async def root():
    return {
        "message": "Welcome to Karma Nexus 2.0",
        "version": "1.0.0",
        "status": "operational"
    }

@api_router.get("/health")
async def health_check():
    return {"status": "healthy"}

# Include all routers
api_router.include_router(auth_router, prefix="/auth", tags=["authentication"])
api_router.include_router(actions_router, prefix="/actions", tags=["actions"])
api_router.include_router(player_router, prefix="/player", tags=["player"])
api_router.include_router(karma_router, prefix="/karma", tags=["karma"])

# Include the router in the main app
app.include_router(api_router)

# WebSocket endpoint for real-time multiplayer
@app.websocket("/ws")
async def websocket_route(
    websocket: WebSocket,
    player_id: str = Query(...),
    username: str = Query(...)
):
    """WebSocket endpoint for real-time game updates."""
    await websocket_endpoint(websocket, player_id, username)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    logger.info("🚀 Karma Nexus 2.0 starting up...")
    logger.info("📊 Connecting to database...")

@app.on_event("shutdown")
async def shutdown_db_client():
    await Database.close()
    logger.info("Database connection closed")