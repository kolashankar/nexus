"""Load tests for API endpoints."""
import pytest
import asyncio
from httpx import AsyncClient
from backend.server import app
from time import time


class TestAPIPerformance:
    """Test API endpoint performance under load."""
    
    @pytest.mark.asyncio
    async def test_concurrent_registrations(self, clean_db):
        """Test handling multiple concurrent registrations."""
        async def register_user(index):
            async with AsyncClient(app=app, base_url="http://test") as client:
                response = await client.post("/api/auth/register", json={
                    "username": f"user{index}",
                    "email": f"user{index}@example.com",
                    "password": "pass123"
                })
                return response.status_code
        
        # Create 50 concurrent registrations
        start = time()
        tasks = [register_user(i) for i in range(50)]
        results = await asyncio.gather(*tasks)
        duration = time() - start
        
        # Check results
        successful = sum(1 for r in results if r == 200)
        assert successful >= 45  # At least 90% success rate
        assert duration < 10  # Should complete within 10 seconds
    
    @pytest.mark.asyncio
    async def test_concurrent_profile_reads(self, test_user, clean_db):
        """Test handling multiple concurrent profile reads."""
        from backend.utils.auth import create_access_token
        
        async def read_profile():
            token = create_access_token(data={"sub": test_user["username"]})
            headers = {"Authorization": f"Bearer {token}"}
            
            async with AsyncClient(app=app, base_url="http://test") as client:
                response = await client.get("/api/player/profile", headers=headers)
                return response.status_code
        
        # Create 100 concurrent reads
        start = time()
        tasks = [read_profile() for _ in range(100)]
        results = await asyncio.gather(*tasks)
        duration = time() - start
        
        # All should succeed
        assert all(r == 200 for r in results)
        assert duration < 5  # Should complete within 5 seconds
    
    @pytest.mark.asyncio
    async def test_action_processing_performance(self, clean_db):
        """Test action processing performance."""
        # Create test users
        users = []
        for i in range(10):
            user = {
                "username": f"user{i}",
                "email": f"user{i}@example.com",
                "currencies": {"credits": 1000},
                "karma_points": 0,
                "moral_class": "average"
            }
            await clean_db.players.insert_one(user)
            users.append(user["username"])
        
        from backend.utils.auth import create_access_token
        
        async def perform_action(actor_index):
            token = create_access_token(data={"sub": users[actor_index]})
            headers = {"Authorization": f"Bearer {token}"}
            target_index = (actor_index + 1) % len(users)
            
            async with AsyncClient(app=app, base_url="http://test") as client:
                response = await client.post(
                    "/api/actions/help",
                    headers=headers,
                    json={
                        "target_username": users[target_index],
                        "amount": 50
                    }
                )
                return response.status_code
        
        # Process 50 actions concurrently
        start = time()
        tasks = [perform_action(i % 10) for i in range(50)]
        results = await asyncio.gather(*tasks)
        duration = time() - start
        
        successful = sum(1 for r in results if r == 200)
        assert successful >= 40  # At least 80% success rate
        print(f"\nProcessed 50 actions in {duration:.2f}s")


class TestDatabasePerformance:
    """Test database query performance."""
    
    @pytest.mark.asyncio
    async def test_leaderboard_query_performance(self, clean_db):
        """Test leaderboard query with large dataset."""
        # Insert 1000 players
        players = [
            {
                "username": f"player{i}",
                "karma_points": i * 10,
                "currencies": {"credits": i * 100}
            }
            for i in range(1000)
        ]
        await clean_db.players.insert_many(players)
        
        # Query leaderboard
        start = time()
        cursor = clean_db.players.find().sort("karma_points", -1).limit(100)
        results = await cursor.to_list(length=100)
        duration = time() - start
        
        assert len(results) == 100
        assert duration < 0.5  # Should be fast (<500ms)
    
    @pytest.mark.asyncio
    async def test_player_search_performance(self, clean_db):
        """Test player search query performance."""
        # Insert many players
        players = [
            {"username": f"player{i}", "email": f"player{i}@example.com"}
            for i in range(1000)
        ]
        await clean_db.players.insert_many(players)
        
        # Search by username
        start = time()
        result = await clean_db.players.find_one({"username": "player500"})
        duration = time() - start
        
        assert result is not None
        assert duration < 0.1  # Should be very fast (<100ms)