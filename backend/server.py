"""Main FastAPI server entry point."""
import sys
from pathlib import Path

# Add parent directory to path for backend imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.api.v1 import (
    auth,
    player,
    actions,
    combat,
    robots,
    guilds,
    quests,
    market,
    social,
    karma,
    leaderboards,
    tournaments,
    achievements,
    ai_companion,
    world,
    seasonal
)

# Create FastAPI app
app = FastAPI(
    title="Karma Nexus API",
    description="Next-generation AI-driven multiplayer game",
    version="2.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify actual origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api")
app.include_router(player.router, prefix="/api")
app.include_router(actions.router, prefix="/api")
app.include_router(combat.router, prefix="/api")
app.include_router(robots.router, prefix="/api")
app.include_router(guilds.router, prefix="/api")
app.include_router(quests.router, prefix="/api")
app.include_router(market.router, prefix="/api")
app.include_router(social.router, prefix="/api")
app.include_router(karma.router, prefix="/api")
app.include_router(leaderboards.router, prefix="/api")
app.include_router(tournaments.router, prefix="/api")
app.include_router(achievements.router, prefix="/api")
app.include_router(ai_companion.router, prefix="/api")
app.include_router(world.router, prefix="/api")
app.include_router(seasonal.router, prefix="/api")


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "name": "Karma Nexus API",
        "version": "2.0.0",
        "status": "operational"
    }


@app.get("/health")
async def health():
    """Health check endpoint."""
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
