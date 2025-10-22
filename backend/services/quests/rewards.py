from typing import Dict
from ...models.player.player import Player
from ...models.economy.transaction import Transaction
from datetime import datetime


class QuestRewardService:
    """Service for distributing quest rewards."""
    
    async def distribute_rewards(
        self,
        player_id: str,
        rewards: Dict
    ) -> Dict:
        """Distribute quest rewards to player."""
        player = await Player.find_one({"_id": player_id})
        if not player:
            return {"success": False, "error": "Player not found"}
        
        # Credits
        credits = rewards.get("credits", 0)
        player_credits = player.get("currencies", {}).get("credits", 0)
        new_credits = player_credits + credits
        
        # XP
        xp = rewards.get("xp", 0)
        player_xp = player.get("xp", 0)
        new_xp = player_xp + xp
        
        # Check level up
        old_level = player.get("level", 1)
        new_level = self._calculate_level(new_xp)
        leveled_up = new_level > old_level
        
        # Karma
        karma = rewards.get("karma", 0)
        player_karma = player.get("karma_points", 0)
        new_karma = player_karma + karma
        
        # Trait boosts
        trait_boosts = rewards.get("trait_boosts", {})
        player_traits = player.get("traits", {})
        for trait, boost in trait_boosts.items():
            current = player_traits.get(trait, 50)
            player_traits[trait] = min(100, current + boost)
        
        # Items
        items = rewards.get("items", [])
        player_inventory = player.get("items", [])
        for item_id in items:
            player_inventory.append({
                "item_id": item_id,
                "quantity": 1,
                "acquired_at": datetime.utcnow()
            })
        
        # Update player
        await Player.update_one(
            {"_id": player_id},
            {
                "$set": {
                    "currencies.credits": new_credits,
                    "xp": new_xp,
                    "level": new_level,
                    "karma_points": new_karma,
                    "traits": player_traits,
                    "items": player_inventory
                }
            }
        )
        
        # Log transaction
        await Transaction.insert_one({
            "player_id": player_id,
            "type": "quest_reward",
            "details": rewards,
            "timestamp": datetime.utcnow()
        })
        
        return {
            "success": True,
            "rewards_given": rewards,
            "leveled_up": leveled_up,
            "new_level": new_level if leveled_up else None
        }
    
    def _calculate_level(self, xp: int) -> int:
        """Calculate player level from XP."""
        # Simple formula: level = sqrt(xp / 100)
        import math
        return min(100, int(math.sqrt(xp / 100)) + 1)
