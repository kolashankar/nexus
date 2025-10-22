"""Pytest configuration and fixtures for backend tests."""
import pytest
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi.testclient import TestClient
import os
from typing import AsyncGenerator, Generator

from backend.server import app
from backend.core.database import get_database

# Test database URL
TEST_MONGO_URL = os.getenv("TEST_MONGO_URL", "mongodb://localhost:27017")
TEST_DB_NAME = "karma_nexus_test"


@pytest.fixture(scope="session")
def event_loop():
    """Create event loop for async tests."""
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()


@pytest.fixture(scope="session")
async def test_db():
    """Create test database connection."""
    client = AsyncIOMotorClient(TEST_MONGO_URL)
    db = client[TEST_DB_NAME]
    yield db
    # Cleanup: drop test database
    await client.drop_database(TEST_DB_NAME)
    client.close()


@pytest.fixture
async def clean_db(test_db):
    """Clean database before each test."""
    # Drop all collections
    for collection_name in await test_db.list_collection_names():
        await test_db[collection_name].drop()
    yield test_db


@pytest.fixture
def client() -> Generator:
    """Create test client."""
    with TestClient(app) as test_client:
        yield test_client


@pytest.fixture
async def test_user(clean_db):
    """Create a test user."""
    from backend.models.player.player import Player
    from backend.utils.auth import hash_password
    
    user_data = {
        "username": "test_user",
        "email": "test@example.com",
        "password_hash": hash_password("testpass123"),
        "karma_points": 0,
        "economic_class": "middle",
        "moral_class": "average"
    }
    
    result = await clean_db.players.insert_one(user_data)
    user_data["_id"] = result.inserted_id
    return user_data


@pytest.fixture
def auth_headers(test_user):
    """Generate authentication headers for test user."""
    from backend.utils.auth import create_access_token
    
    token = create_access_token(data={"sub": test_user["username"]})
    return {"Authorization": f"Bearer {token}"}


@pytest.fixture
async def test_player(clean_db, test_user):
    """Create a complete test player with all traits."""
    from backend.models.player.player import initialize_traits
    
    player_data = {
        **test_user,
        "level": 1,
        "xp": 0,
        "currencies": {
            "credits": 1000,
            "karma_tokens": 0,
            "dark_matter": 0,
            "prestige_points": 0,
            "guild_coins": 0,
            "legacy_shards": 0
        },
        "traits": initialize_traits(),
        "meta_traits": {
            "reputation": 50,
            "influence": 50,
            "fame": 0,
            "infamy": 0,
            "trustworthiness": 50
        },
        "superpowers": [],
        "robots": [],
        "stats": {
            "total_actions": 0,
            "total_stolen": 0,
            "total_donated": 0,
            "pvp_wins": 0,
            "pvp_losses": 0
        }
    }
    
    await clean_db.players.update_one(
        {"_id": test_user["_id"]},
        {"$set": player_data}
    )
    
    return player_data