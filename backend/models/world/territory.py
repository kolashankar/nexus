"""Territory model"""

from datetime import datetime
from typing import Optional, Dict, Any
from pydantic import BaseModel, Field


class Territory(BaseModel):
    """Territory model"""
    territory_id: int
    name: str
    description: Optional[str] = None
    
    # Control
    controlling_guild_id: Optional[str] = None
    contested: bool = False
    
    # Resources
    resources: Dict[str, int] = Field(default_factory=dict)
    resource_generation_rate: float = 1.0
    
    # Benefits
    passive_income: int = 100
    tax_rate: float = 0.1
    
    # Population
    resident_count: int = 0
    
    # Status
    status: str = "neutral"  # neutral, controlled, contested, locked
    
    # Last captured
    captured_at: Optional[datetime] = None
    captured_by: Optional[str] = None
    
    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }
