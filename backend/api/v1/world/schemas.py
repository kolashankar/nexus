"""Schemas for World & Events API"""

from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime


# Event Schemas
class EventEffectSchema(BaseModel):
    """Event effect schema"""
    effect_type: str
    value: float
    affected_players: str
    duration_hours: float
    description: str


class EventParticipantSchema(BaseModel):
    """Event participant schema"""
    player_id: str
    username: str
    participation_count: int
    rewards_claimed: bool
    first_participated: datetime
    last_participated: datetime


class EventResponse(BaseModel):
    """World event response"""
    event_id: str
    event_type: str
    severity: str
    name: str
    description: str
    lore: str
    effects: List[EventEffectSchema]
    duration_hours: float
    is_global: bool
    affected_territories: List[int]
    requires_participation: bool
    participation_mechanics: Optional[str]
    status: str
    trigger_reason: str
    estimated_impact: str
    architect_reasoning: str
    started_at: Optional[datetime]
    ends_at: Optional[datetime]
    total_participants: int
    created_at: datetime
    
    @classmethod
    def from_model(cls, event):
        """Convert model to response schema"""
        return cls(
            event_id=event.event_id,
            event_type=event.event_type,
            severity=event.severity,
            name=event.name,
            description=event.description,
            lore=event.lore,
            effects=[EventEffectSchema(**e.dict()) for e in event.effects],
            duration_hours=event.duration_hours,
            is_global=event.is_global,
            affected_territories=event.affected_territories,
            requires_participation=event.requires_participation,
            participation_mechanics=event.participation_mechanics,
            status=event.status.value,
            trigger_reason=event.trigger_reason,
            estimated_impact=event.estimated_impact,
            architect_reasoning=event.architect_reasoning,
            started_at=event.started_at,
            ends_at=event.ends_at,
            total_participants=event.total_participants,
            created_at=event.created_at
        )


class EventListResponse(BaseModel):
    """List of events"""
    events: List[EventResponse]
    total: int


class TriggerEventRequest(BaseModel):
    """Request to trigger an event"""
    event_type: Optional[str] = Field(default=None, description="Specific event type to trigger")
    force: bool = Field(default=False, description="Force trigger even if conditions not met")


class TriggerEventResponse(BaseModel):
    """Response from triggering event"""
    success: bool
    message: str
    event: Optional[EventResponse]


class ParticipationRequest(BaseModel):
    """Request to participate in event"""
    event_id: str = Field(..., description="Event ID to participate in")


class ParticipationResponse(BaseModel):
    """Response from participation"""
    success: bool
    message: str
    event_id: str


# World State Schemas
class WorldStateResponse(BaseModel):
    """World state response"""
    collective_karma: float
    average_karma: float
    karma_trend: str
    total_players: int
    active_players_24h: int
    online_players: int
    total_actions_24h: int
    positive_actions_24h: int
    negative_actions_24h: int
    guild_wars_active: int
    territories_contested: int
    total_guilds: int
    total_wealth: float
    market_health: str
    active_global_event: Optional[Dict[str, Any]]
    current_season: int
    last_updated: datetime
    
    @classmethod
    def from_model(cls, state):
        """Convert model to response schema"""
        return cls(
            collective_karma=state.collective_karma,
            average_karma=state.average_karma,
            karma_trend=state.karma_trend,
            total_players=state.total_players,
            active_players_24h=state.active_players_24h,
            online_players=state.online_players,
            total_actions_24h=state.total_actions_24h,
            positive_actions_24h=state.positive_actions_24h,
            negative_actions_24h=state.negative_actions_24h,
            guild_wars_active=state.guild_wars_active,
            territories_contested=state.territories_contested,
            total_guilds=state.total_guilds,
            total_wealth=state.total_wealth,
            market_health=state.market_health,
            active_global_event=state.active_global_event,
            current_season=state.current_season,
            last_updated=state.last_updated
        )


class KarmaStatsResponse(BaseModel):
    """Karma statistics response"""
    collective_karma: float
    average_karma: float
    karma_trend: str
    distribution: Dict[str, int]
    action_ratio: Dict[str, Any]


class KarmaDistributionResponse(BaseModel):
    """Karma distribution response"""
    distribution: Dict[str, int]


class TopPlayersResponse(BaseModel):
    """Top/bottom players by karma"""
    players: List[Dict[str, Any]]
    total: int


# Territory Schemas
class TerritoryEventSchema(BaseModel):
    """Territory event schema"""
    event_id: str
    event_type: str
    name: str
    started_at: datetime
    ends_at: datetime
    is_active: bool


class TerritoryResponse(BaseModel):
    """Territory response"""
    territory_id: int
    name: str
    description: str
    region: str
    status: str
    controlling_guild_id: Optional[str]
    controlling_guild_name: Optional[str]
    controlled_since: Optional[datetime]
    contested: bool
    challenger_guild_id: Optional[str]
    challenger_guild_name: Optional[str]
    total_residents: int
    active_players: int
    online_players: int
    local_karma: float
    average_karma: float
    prosperity_level: float
    conflict_level: float
    resources: Dict[str, int]
    active_events: List[TerritoryEventSchema]
    strategic_value: int
    
    @classmethod
    def from_model(cls, territory):
        """Convert model to response schema"""
        return cls(
            territory_id=territory.territory_id,
            name=territory.name,
            description=territory.description,
            region=territory.region,
            status=territory.status.value,
            controlling_guild_id=territory.controlling_guild_id,
            controlling_guild_name=territory.controlling_guild_name,
            controlled_since=territory.controlled_since,
            contested=territory.contested,
            challenger_guild_id=territory.challenger_guild_id,
            challenger_guild_name=territory.challenger_guild_name,
            total_residents=territory.total_residents,
            active_players=territory.active_players,
            online_players=territory.online_players,
            local_karma=territory.local_karma,
            average_karma=territory.average_karma,
            prosperity_level=territory.prosperity_level,
            conflict_level=territory.conflict_level,
            resources=territory.resources,
            active_events=[TerritoryEventSchema(**e.dict()) for e in territory.active_events],
            strategic_value=territory.strategic_value
        )


class TerritoryListResponse(BaseModel):
    """List of territories"""
    territories: List[TerritoryResponse]
    total: int
