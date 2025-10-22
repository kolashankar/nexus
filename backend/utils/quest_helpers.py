from typing import Dict, List
from datetime import datetime, timedelta


def calculate_quest_difficulty_score(objectives: List[Dict]) -> int:
    """Calculate difficulty score based on objectives."""
    score = 0
    for obj in objectives:
        # More required = harder
        score += obj.get("required", 0)
        
        # Certain types are harder
        if obj.get("type") in ["hack", "combat"]:
            score += 20
        elif obj.get("type") in ["collect", "trade"]:
            score += 10
    
    return score


def determine_quest_difficulty(score: int) -> str:
    """Determine difficulty level from score."""
    if score < 30:
        return "easy"
    elif score < 60:
        return "medium"
    elif score < 100:
        return "hard"
    else:
        return "legendary"


def calculate_quest_rewards(
    difficulty: str,
    objectives_count: int,
    quest_type: str
) -> Dict:
    """Calculate appropriate rewards for a quest."""
    base_multipliers = {
        "easy": 1.0,
        "medium": 2.0,
        "hard": 4.0,
        "legendary": 8.0
    }
    
    type_multipliers = {
        "daily": 1.0,
        "weekly": 3.0,
        "personal": 2.0,
        "guild": 4.0,
        "world": 5.0,
        "hidden": 6.0,
        "campaign": 3.0
    }
    
    base_credits = 1000
    base_xp = 100
    base_karma = 10
    
    difficulty_mult = base_multipliers.get(difficulty, 1.0)
    type_mult = type_multipliers.get(quest_type, 1.0)
    objective_mult = max(1.0, objectives_count / 3)
    
    total_mult = difficulty_mult * type_mult * objective_mult
    
    return {
        "credits": int(base_credits * total_mult),
        "xp": int(base_xp * total_mult),
        "karma": int(base_karma * difficulty_mult),
        "items": [],
        "trait_boosts": {}
    }


def generate_quest_expiry(
    quest_type: str
) -> datetime:
    """Generate appropriate expiry time for quest type."""
    now = datetime.utcnow()
    
    if quest_type == "daily":
        # Expires at end of day
        tomorrow = now.date() + timedelta(days=1)
        return datetime.combine(tomorrow, datetime.min.time())
    elif quest_type == "weekly":
        # Expires at end of week
        days_until_monday = (7 - now.weekday()) % 7
        if days_until_monday == 0:
            days_until_monday = 7
        next_monday = now.date() + timedelta(days=days_until_monday)
        return datetime.combine(next_monday, datetime.min.time())
    elif quest_type == "world":
        # Expires in 48 hours
        return now + timedelta(hours=48)
    elif quest_type == "hidden":
        # Expires in 7 days
        return now + timedelta(days=7)
    else:
        # No expiry
        return None


def check_objective_completion(
    objective: Dict,
    action_type: str,
    target: str,
    amount: int = 1
) -> bool:
    """Check if an action progresses an objective."""
    if objective.get("type") != action_type:
        return False
    
    if objective.get("target") != "any" and objective.get("target") != target:
        return False
    
    return True
