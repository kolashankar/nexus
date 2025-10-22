from typing import Dict, Any
from ...core.database import get_database
from ...core.constants import SKILL_TREE_CONFIG

class SkillTreesService:
    """Service for managing player skill trees"""
    
    def __init__(self):
        self.db = get_database()
    
    async def get_player_skill_trees(self, player_id: str) -> Dict[str, Any]:
        """Get all player's skill trees"""
        player = await self.db.players.find_one({"_id": player_id})
        if not player:
            raise ValueError("Player not found")
        
        return player.get("skill_trees", {})
    
    async def get_trait_skill_tree(self, player_id: str, trait_name: str) -> Dict[str, Any]:
        """Get specific trait's skill tree"""
        player = await self.db.players.find_one({"_id": player_id})
        if not player:
            raise ValueError("Player not found")
        
        if trait_name not in player.get("traits", {}):
            raise ValueError(f"Invalid trait: {trait_name}")
        
        skill_trees = player.get("skill_trees", {})
        tree = skill_trees.get(trait_name, {
            "nodes_unlocked": [],
            "active_branch": None,
            "total_points": 0
        })
        
        # Add node information
        tree["nodes"] = self._get_nodes_info(trait_name, tree["nodes_unlocked"])
        
        return tree
    
    def _get_nodes_info(self, trait_name: str, unlocked_nodes: list) -> list:
        """Get information about all nodes in a skill tree"""
        nodes = []
        for i in range(1, 21):  # 20 nodes per trait
            node = {
                "node_id": i,
                "name": f"{trait_name.title()} Level {i}",
                "description": f"Unlock advanced {trait_name} abilities",
                "unlocked": i in unlocked_nodes,
                "requirements": {
                    "level": i * 5,
                    "trait_value": i * 5
                }
            }
            nodes.append(node)
        return nodes
    
    async def unlock_node(
        self,
        player_id: str,
        trait_name: str,
        node_id: int
    ) -> Dict[str, Any]:
        """Unlock a skill tree node"""
        player = await self.db.players.find_one({"_id": player_id})
        if not player:
            raise ValueError("Player not found")
        
        if trait_name not in player.get("traits", {}):
            raise ValueError(f"Invalid trait: {trait_name}")
        
        # Check requirements
        trait_value = player["traits"][trait_name]
        required_value = node_id * 5
        
        if trait_value < required_value:
            raise ValueError(
                f"Insufficient {trait_name}: {required_value} required, have {trait_value}"
            )
        
        # Check if previous nodes are unlocked
        skill_trees = player.get("skill_trees", {})
        tree = skill_trees.get(trait_name, {"nodes_unlocked": [], "total_points": 0})
        
        if node_id > 1 and (node_id - 1) not in tree.get("nodes_unlocked", []):
            raise ValueError("Must unlock previous nodes first")
        
        # Check if already unlocked
        if node_id in tree.get("nodes_unlocked", []):
            raise ValueError("Node already unlocked")
        
        # Unlock the node
        await self.db.players.update_one(
            {"_id": player_id},
            {
                "$push": {f"skill_trees.{trait_name}.nodes_unlocked": node_id},
                "$inc": {f"skill_trees.{trait_name}.total_points": 1}
            }
        )
        
        return {
            "success": True,
            "message": f"Unlocked {trait_name} skill node {node_id}",
            "node_id": node_id
        }
