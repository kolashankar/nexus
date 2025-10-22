from pydantic import BaseModel, Field
from typing import Optional, Dict


class Objective(BaseModel):
    """Quest objective model."""
    description: str = Field(..., description="Objective description")
    type: str = Field(..., description="Objective type")
    target: str = Field(..., description="Target for objective")
    
    current: int = Field(default=0, ge=0, description="Current progress")
    required: int = Field(..., ge=1, description="Required amount")
    
    completed: bool = Field(default=False, description="Completion status")
    
    metadata: Optional[Dict] = Field(default=None, description="Additional metadata")
    
    class Config:
        json_schema_extra = {
            "example": {
                "description": "Collect 10 circuit boards",
                "type": "collect",
                "target": "circuit_boards",
                "current": 0,
                "required": 10,
                "completed": False
            }
        }
