from typing import Dict, Any, List
from datetime import datetime, timedelta
from ...core.database import get_database
from ...core.constants import SUPERPOWERS_CONFIG

class SuperpowersService:
    """Service for managing player superpowers"""
    
    def __init__(self):
        self.db = get_database()
    
    async def get_player_superpowers(self, player_id: str) -> List[Dict[str, Any]]:
        """Get all player's superpowers"""
        player = await self.db.players.find_one({"_id": player_id})
        if not player:
            raise ValueError("Player not found")
        
        return player.get("superpowers", [])
    
    async def get_available_superpowers(self, player_id: str) -> List[Dict[str, Any]]:
        """Get superpowers available for unlock based on traits"""
        player = await self.db.players.find_one({"_id": player_id})
        if not player:
            raise ValueError("Player not found")
        
        unlocked_powers = {p["name"] for p in player.get("superpowers", [])}
        available = []
        
        # Check each superpower's requirements
        for power_name, config in SUPERPOWERS_CONFIG.items():
            if power_name in unlocked_powers:
                continue
            
            # Check trait requirements
            can_unlock = True
            for trait, required_value in config["requirements"].items():
                if player["traits"].get(trait, 0) < required_value:
                    can_unlock = False
                    break
            
            if can_unlock:
                available.append({
                    "name": power_name,
                    "tier": config["tier"],
                    "description": config["description"],
                    "requirements": config["requirements"]
                })
        
        return available
    
    async def unlock_superpower(self, player_id: str, power_name: str) -> Dict[str, Any]:
        """Unlock a superpower"""
        player = await self.db.players.find_one({"_id": player_id})
        if not player:
            raise ValueError("Player not found")
        
        # Check if already unlocked
        if any(p["name"] == power_name for p in player.get("superpowers", [])):
            raise ValueError("Superpower already unlocked")
        
        # Check requirements
        if power_name not in SUPERPOWERS_CONFIG:
            raise ValueError("Invalid superpower name")
        
        config = SUPERPOWERS_CONFIG[power_name]
        for trait, required_value in config["requirements"].items():
            if player["traits"].get(trait, 0) < required_value:
                raise ValueError(f"Insufficient {trait}: {required_value} required")
        
        # Unlock the superpower
        new_power = {
            "name": power_name,
            "tier": config["tier"],
            "unlocked_at": datetime.utcnow(),
            "usage_count": 0,
            "cooldown_until": None
        }
        
        await self.db.players.update_one(
            {"_id": player_id},
            {"$push": {"superpowers": new_power}}
        )
        
        return {
            "success": True,
            "message": f"Unlocked superpower: {power_name}",
            "superpower": new_power
        }
    
    async def activate_superpower(
        self,
        player_id: str,
        power_name: str
    ) -> Dict[str, Any]:
        """Activate a superpower"""
        player = await self.db.players.find_one({"_id": player_id})
        if not player:
            raise ValueError("Player not found")
        
        # Find the superpower
        power = None
        for p in player.get("superpowers", []):
            if p["name"] == power_name:
                power = p
                break
        
        if not power:
            raise ValueError("Superpower not unlocked")
        
        # Check cooldown
        if power.get("cooldown_until"):
            if datetime.utcnow() < power["cooldown_until"]:
                raise ValueError("Superpower is on cooldown")
        
        # Activate power (set cooldown)
        config = SUPERPOWERS_CONFIG[power_name]
        cooldown_duration = timedelta(minutes=config.get("cooldown_minutes", 5))
        
        await self.db.players.update_one(
            {"_id": player_id, "superpowers.name": power_name},
            {
                "$set": {
                    "superpowers.$.cooldown_until": datetime.utcnow() + cooldown_duration
                },
                "$inc": {"superpowers.$.usage_count": 1}
            }
        )
        
        return {
            "success": True,
            "message": f"Activated superpower: {power_name}",
            "cooldown_until": datetime.utcnow() + cooldown_duration
        }
