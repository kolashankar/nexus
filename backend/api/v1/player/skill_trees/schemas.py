from pydantic import BaseModel
from typing import List, Optional

class SkillTreeResponse(BaseModel):
    trait_name: str
    nodes_unlocked: List[int]
    active_branch: Optional[str] = None
    total_points: int

class UnlockNodeRequest(BaseModel):
    trait_name: str
    node_id: int

class SkillNodeInfo(BaseModel):
    node_id: int
    name: str
    description: str
    unlocked: bool
    requirements: dict
