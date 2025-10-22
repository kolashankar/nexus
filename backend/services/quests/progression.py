from typing import Dict, Optional
from ...models.quests.quest import Quest
from ...models.player.player import Player


class QuestProgressionService:
    """Handles quest progression and objective tracking."""
    
    async def update_objective_progress(
        self,
        player_id: str,
        quest_id: str,
        objective_type: str,
        target: str,
        amount: int = 1
    ) -> Dict:
        """Update progress on a quest objective."""
        quest = await Quest.find_one({
            "_id": quest_id,
            "player_id": player_id,
            "status": "active"
        })
        
        if not quest:
            return {"success": False, "error": "Quest not found or not active"}
        
        objectives = quest.get("objectives", [])
        updated = False
        
        for objective in objectives:
            if objective.get("type") == objective_type and objective.get("target") == target:
                if not objective.get("completed", False):
                    objective["current"] = min(
                        objective.get("current", 0) + amount,
                        objective.get("required", 0)
                    )
                    
                    if objective["current"] >= objective["required"]:
                        objective["completed"] = True
                    
                    updated = True
        
        if updated:
            await Quest.update_one(
                {"_id": quest_id},
                {"$set": {"objectives": objectives}}
            )
        
        return {"success": True, "objectives": objectives}
    
    async def check_auto_complete(
        self,
        player_id: str,
        quest_id: str
    ) -> Optional[Dict]:
        """Check if quest can be auto-completed."""
        quest = await Quest.find_one({"_id": quest_id})
        
        if not quest:
            return None
        
        objectives = quest.get("objectives", [])
        all_complete = all(obj.get("completed", False) for obj in objectives)
        
        if all_complete:
            return {"can_complete": True, "quest_id": quest_id}
        
        return {"can_complete": False}
