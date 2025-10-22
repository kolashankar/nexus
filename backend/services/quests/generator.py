from typing import List, Dict
from datetime import datetime, timedelta
import random


class QuestGenerator:
    """Generates quests (non-AI fallback)."""
    
    def __init__(self):
        self.quest_templates = self._load_templates()
    
    def _load_templates(self) -> Dict:
        """Load quest templates."""
        return {
            "daily": [
                {
                    "title": "Daily Training",
                    "description": "Complete training exercises",
                    "objectives": [
                        {
                            "description": "Train any skill",
                            "type": "train",
                            "target": "any",
                            "required": 5
                        }
                    ],
                    "rewards": {"credits": 1000, "xp": 100},
                    "difficulty": "easy"
                },
                {
                    "title": "Helpful Citizen",
                    "description": "Help other players",
                    "objectives": [
                        {
                            "description": "Help players",
                            "type": "help",
                            "target": "players",
                            "required": 3
                        }
                    ],
                    "rewards": {"credits": 1500, "xp": 150, "karma": 10},
                    "difficulty": "easy"
                },
                {
                    "title": "Market Trader",
                    "description": "Complete trades",
                    "objectives": [
                        {
                            "description": "Trade with players",
                            "type": "trade",
                            "target": "players",
                            "required": 2
                        }
                    ],
                    "rewards": {"credits": 2000, "xp": 200},
                    "difficulty": "medium"
                }
            ]
        }
    
    async def generate_daily_quests(
        self,
        player: Dict,
        count: int = 3
    ) -> List[Dict]:
        """Generate daily quests."""
        templates = self.quest_templates.get("daily", [])
        selected = random.sample(templates, min(count, len(templates)))
        
        quests = []
        for template in selected:
            quest = template.copy()
            quest["quest_type"] = "daily"
            quest["expires_at"] = datetime.utcnow() + timedelta(days=1)
            quest["lore"] = f"A daily task for {player.get('username', 'player')}"
            quests.append(quest)
        
        return quests
    
    async def generate_weekly_quests(
        self,
        player: Dict,
        count: int = 5
    ) -> List[Dict]:
        """Generate weekly quests."""
        # Similar to daily but harder
        return []
