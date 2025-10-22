import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Sparkles, AlertTriangle, Activity, TrendingUp, TrendingDown } from 'lucide-react';
import { useWorldEvents } from '../../hooks/useWorldEvents';
import { Progress } from '../ui/progress';

interface WorldEvent {
  event_id: string;
  event_type: string;
  name: string;
  description: string;
  started_at: string;
  ends_at: string;
  effects: Record<string, any>;
  participants: number;
  is_active: boolean;
}

interface WorldState {
  collective_karma: number;
  karma_trend: 'rising' | 'falling' | 'stable';
  active_event: WorldEvent | null;
  online_players: number;
  total_players: number;
}

const WorldEventsPanel: React.FC = () => {
  const { worldState, activeEvents, loading } = useWorldEvents();
  const [selectedEvent, setSelectedEvent] = useState<WorldEvent | null>(null);

  const getKarmaTrendIcon = (trend: string) => {
    switch (trend) {
      case 'rising':
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case 'falling':
        return <TrendingDown className="h-5 w-5 text-red-500" />;
      default:
        return <Activity className="h-5 w-5 text-blue-500" />;
    }
  };

  const getEventTypeColor = (eventType: string): string => {
    if (eventType.includes('blessing') || eventType.includes('golden')) {
      return 'bg-green-500';
    }
    if (eventType.includes('purge') || eventType.includes('collapse')) {
      return 'bg-red-500';
    }
    return 'bg-blue-500';
  };

  const calculateTimeRemaining = (endsAt: string): string => {
    const end = new Date(endsAt);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Ended';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m remaining`;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>World Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Global Karma Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Global Karma Status</span>
            {worldState && getKarmaTrendIcon(worldState.karma_trend)}
          </CardTitle>
          <CardDescription>
            Collective karma across all players
          </CardDescription>
        </CardHeader>
        <CardContent>
          {worldState ? (
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Collective Karma</span>
                  <span className="font-bold">{worldState.collective_karma.toFixed(0)}</span>
                </div>
                <Progress 
                  value={Math.abs(worldState.collective_karma) % 100} 
                  className="h-2"
                />
              </div>
              
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Online: {worldState.online_players}</span>
                <span>Total: {worldState.total_players}</span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No data available</p>
          )}
        </CardContent>
      </Card>

      {/* Active Global Event */}
      {worldState?.active_event && (
        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              {worldState.active_event.name}
            </CardTitle>
            <CardDescription>
              {worldState.active_event.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge className={getEventTypeColor(worldState.active_event.event_type)}>
                  {worldState.active_event.event_type.replace('_', ' ').toUpperCase()}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {calculateTimeRemaining(worldState.active_event.ends_at)}
                </span>
              </div>
              
              {/* Event Effects */}
              <div className="bg-secondary/20 rounded-lg p-3 space-y-1">
                <p className="text-sm font-semibold mb-2">Active Effects:</p>
                {Object.entries(worldState.active_event.effects).map(([key, value]) => (
                  <div key={key} className="text-sm flex justify-between">
                    <span className="text-muted-foreground">
                      {key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}:
                    </span>
                    <span className="font-medium">
                      {typeof value === 'number' ? `${value}x` : value.toString()}
                    </span>
                  </div>
                ))}
              </div>
              
              <p className="text-sm text-muted-foreground">
                {worldState.active_event.participants} players participating
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Regional Events */}
      {activeEvents && activeEvents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Active Events</CardTitle>
            <CardDescription>
              Regional and special events currently happening
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeEvents.map((event) => (
                <div
                  key={event.event_id}
                  className="border rounded-lg p-3 hover:bg-secondary/20 cursor-pointer transition-colors"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{event.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {event.description}
                      </p>
                    </div>
                    <Badge variant="outline" className="ml-2">
                      {calculateTimeRemaining(event.ends_at)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Active Events */}
      {(!worldState?.active_event && (!activeEvents || activeEvents.length === 0)) && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-sm text-muted-foreground">
                No active world events at this time
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Collective karma actions will trigger new events
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WorldEventsPanel;
