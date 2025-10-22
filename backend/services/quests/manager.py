from typing import List, Dict, Optional
from datetime import datetime, timedelta
import uuid
from ...models.player.player import Player
from ...models.quests.quest import Quest
from .generator import QuestGenerator


class QuestService:
    """Service for managing quests."""
    
    def __init__(self):
        self.generator = QuestGenerator()
    
    async def get_available_quests(
        self,
        player_id: str,
        quest_type: Optional[str] = None
    ) -> List[Dict]:
        """Get available quests for player."""
        player = await Player.find_one({"_id": player_id})
        if not player:
            return []
        
        query = {
            "$or": [
                {"player_id": player_id},
                {"player_id": None}  # World quests
            ],
            "status": "available",
            "$or": [
                {"expires_at": None},
                {"expires_at": {"$gt": datetime.utcnow()}}
            ]
        }
        
        if quest_type:
            query["quest_type"] = quest_type
        
        quests = await Quest.find(query).to_list()
        
        # Filter by requirements
        available = []
        for quest in quests:
            if self._meets_requirements(player, quest):
                available.append(quest)
        
        return available
    
    async def get_active_quests(self, player_id: str) -> List[Dict]:
        """Get player's active quests."""
        quests = await Quest.find({
            "player_id": player_id,
            "status": "active"
        }).to_list()
        
        return quests
    
    async def get_completed_quests(
        self,
        player_id: str,
        limit: int = 50
    ) -> List[Dict]:
        """Get player's completed quests."""
        quests = await Quest.find({
            "player_id": player_id,
            "status": "completed"
        }).sort("completed_at", -1).limit(limit).to_list()
        
        return quests
    
    async def get_quest_details(self, quest_id: str) -> Optional[Dict]:
        """Get detailed quest information."""
        return await Quest.find_one({"_id": quest_id})
    
    async def accept_quest(self, player_id: str, quest_id: str) -> Dict:
        """Accept a quest."""
        player = await Player.find_one({"_id": player_id})
        quest = await Quest.find_one({"_id": quest_id})
        
        if not player or not quest:
            return {"success": False, "error": "Player or quest not found"}
        
        # Check if already active
        if quest.get("status") != "available":
            return {"success": False, "error": "Quest not available"}
        
        # Check requirements
        if not self._meets_requirements(player, quest):
            return {"success": False, "error": "Requirements not met"}
        
        # Update quest status
        await Quest.update_one(
            {"_id": quest_id},
            {
                "$set": {
                    "status": "active",
                    "accepted_at": datetime.utcnow()
                }
            }
        )
        
        # Add to player's active quests
        active_quests = player.get("active_quests", [])
        if quest_id not in active_quests:
            active_quests.append(quest_id)
            await Player.update_one(
                {"_id": player_id},
                {"$set": {"active_quests": active_quests}}
            )
        
        return {
            "success": True,
            "quest_id": quest_id,
            "quest_title": quest.get("title")
        }
    
    async def abandon_quest(self, player_id: str, quest_id: str) -> Dict:
        """Abandon an active quest."""
        player = await Player.find_one({"_id": player_id})
        
        if not player:
            return {"success": False, "error": "Player not found"}
        
        # Remove from active quests
        active_quests = player.get("active_quests", [])
        if quest_id in active_quests:
            active_quests.remove(quest_id)
            await Player.update_one(
                {"_id": player_id},
                {"$set": {"active_quests": active_quests}}
            )
        
        # Update quest status
        await Quest.update_one(
            {"_id": quest_id},
            {"$set": {"status": "available"}}
        )
        
        return {"success": True, "quest_id": quest_id}
    
    async def complete_quest(self, player_id: str, quest_id: str) -> Dict:
        """Complete a quest and distribute rewards."""
        player = await Player.find_one({"_id": player_id})
        quest = await Quest.find_one({"_id": quest_id})
        
        if not player or not quest:
            return {"success": False, "error": "Player or quest not found"}
        
        # Check if all objectives complete
        objectives = quest.get("objectives", [])
        if not all(obj.get("completed", False) for obj in objectives):
            return {"success": False, "error": "Not all objectives completed"}
        
        # Distribute rewards
        rewards = quest.get("rewards", {})
        
        # Credits
        credits = rewards.get("credits", 0)
        player_credits = player.get("currencies", {}).get("credits", 0)
        
        # XP
        xp = rewards.get("xp", 0)
        player_xp = player.get("xp", 0)
        
        # Karma
        karma = rewards.get("karma", 0)
        player_karma = player.get("karma_points", 0)
        
        # Update player
        await Player.update_one(
            {"_id": player_id},
            {
                "$set": {
                    "currencies.credits": player_credits + credits,
                    "xp": player_xp + xp,
                    "karma_points": player_karma + karma
                },
                "$pull": {"active_quests": quest_id},
                "$inc": {"stats.quests_completed": 1}
            }
        )
        
        # Update quest
        await Quest.update_one(
            {"_id": quest_id},
            {
                "$set": {
                    "status": "completed",
                    "completed_at": datetime.utcnow()
                }
            }
        )
        
        return {
            "success": True,
            "quest_id": quest_id,
            "rewards": rewards
        }
    
    async def get_quest_progress(
        self,
        player_id: str,
        quest_id: str
    ) -> Optional[Dict]:
        """Get quest progress."""
        quest = await Quest.find_one({
            "_id": quest_id,
            "player_id": player_id,
            "status": "active"
        })
        
        if not quest:
            return None
        
        objectives = quest.get("objectives", [])
        completed_objectives = sum(1 for obj in objectives if obj.get("completed", False))
        total_objectives = len(objectives)
        
        completion_percentage = (completed_objectives / total_objectives * 100) if total_objectives > 0 else 0
        can_complete = all(obj.get("completed", False) for obj in objectives)
        
        return {
            "quest_id": quest_id,
            "quest_title": quest.get("title"),
            "objectives": objectives,
            "completion_percentage": completion_percentage,
            "can_complete": can_complete
        }
    
    async def create_quest(
        self,
        player_id: str,
        quest_data: Dict
    ) -> Dict:
        """Create a new quest."""
        quest_id = str(uuid.uuid4())
        
        quest = {
            "_id": quest_id,
            "player_id": player_id,
            "quest_type": quest_data.get("quest_type", "personal"),
            "title": quest_data.get("title"),
            "description": quest_data.get("description"),
            "lore": quest_data.get("lore", ""),
            "objectives": quest_data.get("objectives", []),
            "rewards": quest_data.get("rewards", {}),
            "requirements": quest_data.get("requirements", {}),
            "difficulty": quest_data.get("difficulty", "medium"),
            "status": "available",
            "generated_by": "oracle",
            "generated_at": datetime.utcnow(),
            "expires_at": quest_data.get("expires_at")
        }
        
        await Quest.insert_one(quest)
        return quest
    
    async def get_daily_quests(self, player_id: str) -> List[Dict]:
        """Get or generate daily quests."""
        # Check if player has today's daily quests
        today = datetime.utcnow().date()
        
        existing_quests = await Quest.find({
            "player_id": player_id,
            "quest_type": "daily",
            "generated_at": {
                "$gte": datetime.combine(today, datetime.min.time())
            }
        }).to_list()
        
        if len(existing_quests) >= 3:
            return existing_quests
        
        # Generate new daily quests
        player = await Player.find_one({"_id": player_id})
        new_quests = await self.generator.generate_daily_quests(player, count=3 - len(existing_quests))
        
        for quest_data in new_quests:
            await self.create_quest(player_id, quest_data)
        
        return existing_quests + new_quests
    
    async def get_weekly_quests(self, player_id: str) -> List[Dict]:
        """Get or generate weekly quests."""
        # Similar to daily quests but for weekly
        # Implementation follows same pattern
        return []
    
    def _meets_requirements(self, player: Dict, quest: Dict) -> bool:
        """Check if player meets quest requirements."""
        requirements = quest.get("requirements", {})
        
        # Check level
        min_level = requirements.get("min_level", 0)
        if player.get("level", 1) < min_level:
            return False
        
        # Check karma
        min_karma = requirements.get("min_karma")
        if min_karma is not None and player.get("karma_points", 0) < min_karma:
            return False
        
        # Check traits
        required_traits = requirements.get("required_traits", {})
        player_traits = player.get("traits", {})
        for trait, min_value in required_traits.items():
            if player_traits.get(trait, 0) < min_value:
                return False
        
        return True
