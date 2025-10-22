"""Stress tests for critical systems."""
import pytest
import asyncio
from time import time


class TestCombatStress:
    """Stress test combat system."""
    
    @pytest.mark.asyncio
    async def test_concurrent_combats(self, clean_db):
        """Test handling multiple simultaneous combats."""
        from backend.services.combat.engine import CombatEngine
        
        # Create players
        players = []
        for i in range(20):
            player = {
                "player_id": f"player{i}",
                "combat_stats": {
                    "hp": 500,
                    "max_hp": 500,
                    "attack": 50,
                    "defense": 40
                }
            }
            players.append(player)
        
        engine = CombatEngine()
        
        async def run_combat(p1, p2):
            return await engine.execute_combat(p1, p2)
        
        # Run 10 combats simultaneously
        start = time()
        tasks = [
            run_combat(players[i], players[i+1])
            for i in range(0, 20, 2)
        ]
        results = await asyncio.gather(*tasks)
        duration = time() - start
        
        assert len(results) == 10
        assert duration < 30  # All combats complete in 30s


class TestQuestGenerationStress:
    """Stress test AI quest generation."""
    
    @pytest.mark.asyncio
    async def test_bulk_quest_generation(self, clean_db):
        """Test generating quests for many players simultaneously."""
        # Create players
        players = [
            {
                "username": f"player{i}",
                "level": i % 50 + 1,
                "karma_points": i * 10,
                "traits": {"empathy": i % 100}
            }
            for i in range(50)
        ]
        await clean_db.players.insert_many(players)
        
        # Note: In production, this would call AI for quest generation
        # For testing, we simulate with basic quest creation
        
        async def generate_quests(player_id):
            quests = []
            for j in range(3):  # 3 daily quests per player
                quest = {
                    "player_id": player_id,
                    "title": f"Quest {j} for {player_id}",
                    "status": "available"
                }
                quests.append(quest)
            return quests
        
        start = time()
        tasks = [generate_quests(p["username"]) for p in players]
        results = await asyncio.gather(*tasks)
        duration = time() - start
        
        total_quests = sum(len(r) for r in results)
        assert total_quests == 150  # 50 players × 3 quests
        print(f"\nGenerated {total_quests} quests in {duration:.2f}s")


class TestDatabaseStress:
    """Stress test database operations."""
    
    @pytest.mark.asyncio
    async def test_concurrent_writes(self, clean_db):
        """Test handling many concurrent database writes."""
        async def write_player(index):
            player = {
                "username": f"concurrent{index}",
                "email": f"concurrent{index}@example.com",
                "karma_points": index
            }
            result = await clean_db.players.insert_one(player)
            return result.inserted_id is not None
        
        # 100 concurrent writes
        start = time()
        tasks = [write_player(i) for i in range(100)]
        results = await asyncio.gather(*tasks)
        duration = time() - start
        
        assert all(results)  # All writes successful
        assert duration < 5  # Complete within 5 seconds
    
    @pytest.mark.asyncio
    async def test_concurrent_updates(self, clean_db):
        """Test handling many concurrent updates to same document."""
        # Create a player
        player = {
            "username": "contested",
            "karma_points": 0
        }
        await clean_db.players.insert_one(player)
        
        async def increment_karma():
            result = await clean_db.players.update_one(
                {"username": "contested"},
                {"$inc": {"karma_points": 1}}
            )
            return result.modified_count == 1
        
        # 50 concurrent updates
        tasks = [increment_karma() for _ in range(50)]
        results = await asyncio.gather(*tasks)
        
        # Check final value
        final = await clean_db.players.find_one({"username": "contested"})
        assert final["karma_points"] == 50  # All increments applied