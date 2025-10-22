"""Regional Event Generation System"""

import logging
import random
from typing import Dict, Any, Optional
from motor.motor_asyncio import AsyncIOMotorDatabase

from ..ai.architect.architect import Architect
from ..ai.architect.schemas import EventType
from .territory_manager import TerritoryManager

logger = logging.getLogger(__name__)


class RegionalEventGenerator:
    """
    Generates territory-specific regional events
    Smaller scale than global events, more frequent
    """
    
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
        self.architect = Architect()
        self.territory_manager = TerritoryManager(db)
        logger.info("RegionalEventGenerator initialized")
    
    async def generate_regional_event(self, territory_id: int) -> Optional[Dict[str, Any]]:
        """
        Generate a regional event for a specific territory
        
        Args:
            territory_id: Territory ID
        
        Returns:
            Event data or None
        """
        # Get territory state
        territory_state = await self.territory_manager.get_territory_state(territory_id)
        
        if not territory_state:
            logger.warning(f"Territory {territory_id} not found")
            return None
        
        # Determine if event should trigger
        if not self._should_trigger_regional_event(territory_state):
            return None
        
        # Generate context
        context = self._build_regional_context(territory_state)
        
        try:
            # Generate event using The Architect
            event = await self.architect.generate_regional_event(
                territory_state=territory_state,
                context=context
            )
            
            logger.info(f"Generated regional event for territory {territory_id}: {event.name}")
            return event.dict()
            
        except Exception as e:
            logger.error(f"Error generating regional event: {e}")
            return None
    
    def _should_trigger_regional_event(self, territory_state: Dict[str, Any]) -> bool:
        """
        Determine if a regional event should trigger
        
        Args:
            territory_state: Territory state data
        
        Returns:
            True if event should trigger
        """
        # Check if contested
        if territory_state.get("contested"):
            # Higher chance during contests
            return random.random() < 0.4
        
        # Check prosperity level
        prosperity = territory_state.get("prosperity_level", 50)
        if prosperity > 80 or prosperity < 20:
            # Extreme prosperity triggers events
            return random.random() < 0.3
        
        # Check conflict level
        conflict = territory_state.get("conflict_level", 0)
        if conflict > 60:
            return random.random() < 0.35
        
        # Check local karma
        local_karma = territory_state.get("local_karma", 0)
        if abs(local_karma) > 1000:
            return random.random() < 0.25
        
        # Base chance
        return random.random() < 0.1
    
    def _build_regional_context(self, territory_state: Dict[str, Any]) -> str:
        """
        Build context string for regional event generation
        
        Args:
            territory_state: Territory state
        
        Returns:
            Context string
        """
        context_parts = []
        
        # Territory name
        context_parts.append(f"Territory: {territory_state.get('name')}")
        
        # Control status
        if territory_state.get("guild_name"):
            context_parts.append(f"Controlled by {territory_state['guild_name']}")
        else:
            context_parts.append("Neutral territory")
        
        # Contested
        if territory_state.get("contested"):
            context_parts.append("Under siege - territory is contested")
        
        # Population
        pop = territory_state.get("population", 0)
        context_parts.append(f"Population: {pop} residents")
        
        # Karma
        karma = territory_state.get("local_karma", 0)
        if karma > 500:
            context_parts.append(f"High positive local karma ({karma:.0f})")
        elif karma < -500:
            context_parts.append(f"High negative local karma ({karma:.0f})")
        
        # Prosperity
        prosperity = territory_state.get("prosperity_level", 50)
        if prosperity > 70:
            context_parts.append("Very prosperous")
        elif prosperity < 30:
            context_parts.append("Struggling economically")
        
        # Conflict
        conflict = territory_state.get("conflict_level", 0)
        if conflict > 50:
            context_parts.append(f"High conflict level ({conflict:.0f}%)")
        
        return ". ".join(context_parts)
    
    async def check_all_territories_for_events(self) -> int:
        """
        Check all territories and generate regional events where appropriate
        
        Returns:
            Number of events generated
        """
        territories = await self.territory_manager.get_all_territories()
        
        events_generated = 0
        for territory in territories:
            event = await self.generate_regional_event(territory.territory_id)
            if event:
                events_generated += 1
        
        if events_generated > 0:
            logger.info(f"Generated {events_generated} regional events")
        
        return events_generated
