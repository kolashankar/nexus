"""Quest manager service"""

from datetime import datetime, timedelta
from typing import Optional, List, Dict, Any
import uuid

from ...models.quests.quest import Quest, QuestType, QuestStatus
from .progression import QuestProgressionService
from .rewards import QuestRewardService


class QuestManager:
    """Manages quest operations"""
    
    def __init__(self, db):
        self.db = db
        self.quests = db.quests
        self.players = db.players
        self.progression = QuestProgressionService(db)
        self.rewards = QuestRewardService(db)
    
    async def get_quest(self, quest_id: str) -> Optional[Dict[str, Any]]:
        """Get quest by ID"""
        quest = await self.quests.find_one({"_id": quest_id})
        return quest
    
    async def get_player_quests(
        self,
        player_id: str,
        quest_type: Optional[QuestType] = None,
        status: Optional[QuestStatus] = None,
        limit: int = 100,
    ) -> List[Dict[str, Any]]:
        """Get quests for a player"""
        query = {"player_id": player_id}
        
        if quest_type:
            query["quest_type"] = quest_type.value if isinstance(quest_type, QuestType) else quest_type
        
        if status:
            query["status"] = status.value if isinstance(status, QuestStatus) else status
        
        cursor = self.quests.find(query).sort("generated_at", -1).limit(limit)
        quests = await cursor.to_list(length=limit)
        return quests
    
    async def get_available_quests(
        self,
        player_id: str,
        quest_type: Optional[QuestType] = None,
        player_level: int = 1,
        player_karma: int = 0,
        player_traits: Dict[str, int] = None,
        player_items: List[str] = None,
    ) -> List[Dict[str, Any]]:
        """Get available quests for player"""
        query = {
            "$or": [
                {"player_id": player_id},
                {"quest_type": {"$in": ["world", "guild"]}},
            ],
            "status": "available",
        }
        
        if quest_type:
            query["quest_type"] = quest_type.value if isinstance(quest_type, QuestType) else quest_type
        
        # Check if expired
        query["$or"].append({
            "expires_at": {"$gt": datetime.utcnow()}
        })
        query["$or"].append({
            "expires_at": None
        })
        
        cursor = self.quests.find(query)
        quests = await cursor.to_list(length=100)
        
        # Filter by requirements
        player_traits = player_traits or {}
        player_items = player_items or []
        
        available_quests = []
        for quest_data in quests:
            quest = Quest(**quest_data)
            if quest.is_available(player_level, player_karma, player_traits, player_items):
                available_quests.append(quest_data)
        
        return available_quests
    
    async def accept_quest(
        self,
        quest_id: str,
        player_id: str,
    ) -> Dict[str, Any]:
        """Accept a quest"""
        # Get quest
        quest = await self.get_quest(quest_id)
        if not quest:
            raise ValueError("Quest not found")
        
        # Check status
        if quest["status"] != "available":
            raise ValueError(f"Quest is not available (status: {quest['status']})")
        
        # Check if already accepted
        existing = await self.quests.find_one({
            "_id": quest_id,
            "player_id": player_id,
            "status": "active",
        })
        if existing:
            raise ValueError("Quest already accepted")
        
        # Check max active quests
        active_quests = await self.get_player_quests(
            player_id=player_id,
            status=QuestStatus.ACTIVE,
        )
        if len(active_quests) >= 20:  # Max 20 active quests
            raise ValueError("Too many active quests. Complete some first.")
        
        # Accept quest
        update = {
            "$set": {
                "status": "active",
                "started_at": datetime.utcnow(),
                "updated_at": datetime.utcnow(),
            }
        }
        
        await self.quests.update_one({"_id": quest_id}, update)
        
        # Return updated quest
        return await self.get_quest(quest_id)
    
    async def abandon_quest(
        self,
        quest_id: str,
        player_id: str,
    ) -> bool:
        """Abandon a quest"""
        # Get quest
        quest = await self.get_quest(quest_id)
        if not quest:
            raise ValueError("Quest not found")
        
        # Check ownership
        if quest.get("player_id") != player_id:
            raise ValueError("Not your quest")
        
        # Check status
        if quest["status"] != "active":
            raise ValueError("Quest is not active")
        
        # Abandon
        await self.quests.update_one(
            {"_id": quest_id},
            {
                "$set": {
                    "status": "failed",
                    "updated_at": datetime.utcnow(),
                }
            }
        )
        
        return True
    
    async def update_objective_progress(
        self,
        quest_id: str,
        objective_id: str,
        progress: int,
        player_id: str,
    ) -> Dict[str, Any]:
        """Update quest objective progress"""
        return await self.progression.update_objective(
            quest_id=quest_id,
            objective_id=objective_id,
            progress=progress,
            player_id=player_id,
        )
    
    async def complete_quest(
        self,
        quest_id: str,
        player_id: str,
    ) -> Dict[str, Any]:
        """Complete a quest and give rewards"""
        # Get quest
        quest = await self.get_quest(quest_id)
        if not quest:
            raise ValueError("Quest not found")
        
        # Check ownership
        if quest.get("player_id") != player_id:
            raise ValueError("Not your quest")
        
        # Check status
        if quest["status"] != "active":
            raise ValueError("Quest is not active")
        
        # Check if all objectives completed
        all_completed = all(obj["completed"] for obj in quest["objectives"])
        if not all_completed:
            raise ValueError("Not all objectives completed")
        
        # Calculate completion time
        started_at = quest.get("started_at")
        completion_time = None
        if started_at:
            if isinstance(started_at, str):
                started_at = datetime.fromisoformat(started_at.replace("Z", "+00:00"))
            completion_time = int((datetime.utcnow() - started_at).total_seconds())
        
        # Mark as completed
        await self.quests.update_one(
            {"_id": quest_id},
            {
                "$set": {
                    "status": "completed",
                    "completed_at": datetime.utcnow(),
                    "completion_time": completion_time,
                    "updated_at": datetime.utcnow(),
                }
            }
        )
        
        # Give rewards
        rewards = await self.rewards.give_quest_rewards(
            player_id=player_id,
            rewards=quest["rewards"],
            quest_id=quest_id,
        )
        
        return {
            "success": True,
            "message": "Quest completed!",
            "rewards": rewards,
            "completion_time": completion_time,
        }
    
    async def create_quest(self, quest_data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a new quest"""
        # Generate ID if not provided
        if "_id" not in quest_data:
            quest_data["_id"] = str(uuid.uuid4())
        
        # Set timestamps
        if "generated_at" not in quest_data:
            quest_data["generated_at"] = datetime.utcnow()
        if "created_at" not in quest_data:
            quest_data["created_at"] = datetime.utcnow()
        quest_data["updated_at"] = datetime.utcnow()
        
        # Insert
        await self.quests.insert_one(quest_data)
        
        return quest_data
    
    async def cleanup_expired_quests(self) -> int:
        """Mark expired quests as expired"""
        result = await self.quests.update_many(
            {
                "status": {"$in": ["available", "active"]},
                "expires_at": {"$lt": datetime.utcnow()},
            },
            {
                "$set": {
                    "status": "expired",
                    "updated_at": datetime.utcnow(),
                }
            }
        )
        return result.modified_count
