from typing import List, Dict
from datetime import datetime, timedelta
from ...models.player.player import Player
from .generator import QuestGenerator
from .manager import QuestService


class DailyQuestService:
    """Service for managing daily quests."""
    
    def __init__(self):
        self.generator = QuestGenerator()
        self.quest_service = QuestService()
    
    async def get_daily_quests(self, player_id: str) -> List[Dict]:
        """Get or generate daily quests for today."""
        player = await Player.find_one({"_id": player_id})
        if not player:
            return []
        
        # Check if player has quests for today
        today = datetime.utcnow().date()
        last_daily_reset = player.get("last_daily_quest_reset")
        
        # Generate new quests if needed
        if not last_daily_reset or last_daily_reset.date() < today:
            await self._generate_new_daily_quests(player_id)
        
        # Return today's daily quests
        return await self.quest_service.get_available_quests(
            player_id,
            quest_type="daily"
        )
    
    async def _generate_new_daily_quests(self, player_id: str) -> None:
        """Generate new daily quests."""
        player = await Player.find_one({"_id": player_id})
        
        # Generate 3 daily quests
        quest_data_list = await self.generator.generate_daily_quests(player, count=3)
        
        for quest_data in quest_data_list:
            await self.quest_service.create_quest(player_id, quest_data)
        
        # Update player's last reset time
        await Player.update_one(
            {"_id": player_id},
            {"$set": {"last_daily_quest_reset": datetime.utcnow()}}
        )
    
    async def refresh_daily_quests(self, player_id: str) -> Dict:
        """Manually refresh daily quests."""
        player = await Player.find_one({"_id": player_id})
        if not player:
            return {"success": False, "error": "Player not found"}
        
        # Check if already refreshed today
        last_refresh = player.get("last_daily_refresh")
        if last_refresh and last_refresh.date() == datetime.utcnow().date():
            return {"success": False, "error": "Already refreshed today"}
        
        # Generate new quests
        await self._generate_new_daily_quests(player_id)
        
        # Update refresh timestamp
        await Player.update_one(
            {"_id": player_id},
            {"$set": {"last_daily_refresh": datetime.utcnow()}}
        )
        
        return {"success": True, "message": "Daily quests refreshed"}
    
    def get_reset_time(self) -> datetime:
        """Get next daily reset time."""
        now = datetime.utcnow()
        tomorrow = now.date() + timedelta(days=1)
        return datetime.combine(tomorrow, datetime.min.time())
