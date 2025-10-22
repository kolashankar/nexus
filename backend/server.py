from fastapi import FastAPI, APIRouter, WebSocket, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
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

# Phase 4: Progression routers
from api.v1.player.skill_trees.router import router as skill_trees_router
from api.v1.player.superpowers.router import router as superpowers_router
from api.v1.achievements.router import router as achievements_router
from api.v1.player.prestige.router import router as prestige_router
from api.v1.player.legacy.router import router as legacy_router

# Phase 5: Social & Guilds routers
from api.v1.guilds import router as guilds_router
from api.v1.social import router as social_router

# Phase 6: Combat & PvP routers
from api.v1.combat.router import router as combat_router
from api.v1.combat.duel.router import router as duel_router
from api.v1.combat.arena.router import router as arena_router
from api.v1.combat.abilities.router import router as combat_abilities_router
from api.v1.tournaments.router import router as tournaments_router

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

# Phase 4: Progression routers
api_router.include_router(skill_trees_router, prefix="/player", tags=["progression"])
api_router.include_router(superpowers_router, prefix="/player", tags=["progression"])
api_router.include_router(achievements_router, prefix="", tags=["progression"])
api_router.include_router(prestige_router, prefix="/player", tags=["progression"])
api_router.include_router(legacy_router, prefix="/player", tags=["progression"])

# AI routers
api_router.include_router(karma_arbiter_router, prefix="/v1/ai", tags=["AI"])
api_router.include_router(oracle_router, prefix="/v1/ai", tags=["AI"])
api_router.include_router(companion_router, prefix="/v1/ai", tags=["AI"])

# Phase 5: Social & Guilds routers
api_router.include_router(guilds_router, prefix="", tags=["guilds"])
api_router.include_router(social_router, prefix="", tags=["social"])

# Phase 6: Combat & PvP routers
api_router.include_router(combat_router, prefix="", tags=["combat"])
api_router.include_router(duel_router, prefix="/combat", tags=["combat-duel"])
api_router.include_router(arena_router, prefix="/combat", tags=["combat-arena"])
api_router.include_router(combat_abilities_router, prefix="/combat", tags=["combat-abilities"])
api_router.include_router(tournaments_router, prefix="", tags=["tournaments"])

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
    
    # Connect to Redis
    logger.info("🔴 Connecting to Redis...")
    await redis_manager.connect()
    
    # Initialize territories (Phase 5)
    logger.info("🏛️ Initializing territories...")
    from core.database import Database
    from services.guilds.territories import TerritoryService
    db = await Database.get_database()
    territory_service = TerritoryService(db)
    await territory_service.initialize_territories()
    
    # Setup AI background tasks
    logger.info("🤖 Setting up AI background tasks...")
    from tasks.ai_scheduler import setup_ai_tasks
    setup_ai_tasks()
    
    logger.info("✅ Karma Nexus 2.0 is ready!")

@app.on_event("shutdown")
async def shutdown_db_client():
    logger.info("🛑 Karma Nexus 2.0 shutting down...")
    
    # Close Redis connection
    await redis_manager.disconnect()
    
    # Shutdown AI scheduler
    from tasks.ai_scheduler import ai_scheduler
    ai_scheduler.shutdown()
    
    # Close database
    await Database.close()
    logger.info("Database connection closed")
    logger.info("👋 Karma Nexus 2.0 shutdown complete")