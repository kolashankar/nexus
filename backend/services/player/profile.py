"""Player profile service."""

from typing import Optional, Dict, Any
from datetime import datetime
from backend.core.database import db
from backend.models.player.player import Player
from bson import ObjectId
from fastapi import HTTPException

class PlayerProfileService:
    """Service for managing player profiles."""
    
    def __init__(self):
        self.collection = db.players
    
    async def get_player_by_id(self, player_id: str) -> Optional[Dict[str, Any]]:
        """Get player by ID."""
        try:
            player = await self.collection.find_one({"_id": ObjectId(player_id)})
            if player:
                player["_id"] = str(player["_id"])
            return player
        except Exception as e:
            print(f"Error getting player: {e}")
            return None
    
    async def get_player_by_username(self, username: str) -> Optional[Dict[str, Any]]:
        """Get player by username."""
        try:
            player = await self.collection.find_one({"username": username})
            if player:
                player["_id"] = str(player["_id"])
            return player
        except Exception as e:
            print(f"Error getting player: {e}")
            return None
    
    async def update_player(self, player_id: str, update_data: Dict[str, Any]) -> bool:
        """Update player data."""
        try:
            update_data["last_action"] = datetime.utcnow()
            result = await self.collection.update_one(
                {"_id": ObjectId(player_id)},
                {"$set": update_data}
            )
            return result.modified_count > 0
        except Exception as e:
            print(f"Error updating player: {e}")
            return False
    
    async def update_visibility(self, player_id: str, visibility_settings: Dict[str, Any]) -> bool:
        """Update player visibility settings."""
        return await self.update_player(
            player_id,
            {"visibility": visibility_settings}
        )
    
    async def get_online_players(self, limit: int = 50) -> list:
        """Get online players."""
        try:
            cursor = self.collection.find({"online": True}).limit(limit)
            players = await cursor.to_list(length=limit)
            for player in players:
                player["_id"] = str(player["_id"])
            return players
        except Exception as e:
            print(f"Error getting online players: {e}")
            return []
    
    async def set_online_status(self, player_id: str, online: bool) -> bool:
        """Set player online status."""
        try:
            result = await self.collection.update_one(
                {"_id": ObjectId(player_id)},
                {
                    "$set": {
                        "online": online,
                        "last_action": datetime.utcnow()
                    }
                }
            )
            return result.modified_count > 0
        except Exception as e:
            print(f"Error setting online status: {e}")
            return False
