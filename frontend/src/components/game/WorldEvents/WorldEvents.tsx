import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sparkles, Zap, AlertTriangle, Globe, Clock, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { EventCard } from './EventCard';
import { EventDetails } from './EventDetails';
import { KarmaDisplay } from './KarmaDisplay';
import { worldService } from '@/services/api/worldService';
import './WorldEvents.css';

interface WorldEvent {
  event_id: string;
  event_type: string;
  severity: string;
  name: string;
  description: string;
  lore: string;
  effects: Array<{
    effect_type: string;
    value: number;
    affected_players: string;
    duration_hours: number;
    description: string;
  }>;
  duration_hours: number;
  is_global: boolean;
  status: string;
  estimated_impact: string;
  started_at?: string;
  ends_at?: string;
  requires_participation: boolean;
  total_participants: number;
}

interface WorldState {
  collective_karma: number;
  average_karma: number;
  karma_trend: string;
  total_players: number;
  online_players: number;
  total_actions_24h: number;
  positive_actions_24h: number;
  negative_actions_24h: number;
}

export const WorldEvents: React.FC = () => {
  const [activeEvent, setActiveEvent] = useState<WorldEvent | null>(null);
  const [recentEvents, setRecentEvents] = useState<WorldEvent[]>([]);
  const [worldState, setWorldState] = useState<WorldState | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<WorldEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
    
    // Poll for updates every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const [eventData, eventsData, stateData] = await Promise.all([
        worldService.getActiveEvent(),
        worldService.getRecentEvents(10),
        worldService.getWorldState()
      ]);

      setActiveEvent(eventData);
      setRecentEvents(eventsData.events);
      setWorldState(stateData);
    } catch (error) {
      console.error('Error fetching world data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleParticipate = async (eventId: string) => {
    try {
      const result = await worldService.participateInEvent(eventId);
      
      if (result.success) {
        toast({
          title: "Participation Recorded!",
          description: result.message,
        });
        
        // Refresh data
        fetchData();
      }
    } catch (error: any) {
      toast({
        title: "Participation Failed",
        description: error.message || "Could not record participation",
        variant: "destructive"
      });
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'orange';
      case 'medium': return 'yellow';
      case 'low': return 'green';
      default: return 'secondary';
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'world_changing': return <Sparkles className="w-5 h-5 text-purple-500" />;
      case 'high': return <Zap className="w-5 h-5 text-yellow-500" />;
      case 'medium': return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      default: return <Globe className="w-5 h-5 text-blue-500" />;
    }
  };

  const calculateTimeRemaining = (endsAt: string) => {
    const end = new Date(endsAt);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Ending soon';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m remaining`;
    }
    return `${minutes}m remaining`;
  };

  if (loading) {
    return (
      <div className="world-events-container">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="world-events-container p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Globe className="w-8 h-8 text-primary" />
            World Events
          </h1>
          <p className="text-muted-foreground mt-1">
            Dynamic events triggered by collective karma
          </p>
        </div>
        
        {worldState && (
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Collective Karma</div>
            <div className="text-2xl font-bold">
              {worldState.collective_karma.toLocaleString()}
            </div>
            <Badge variant={worldState.karma_trend === 'rising' ? 'default' : worldState.karma_trend === 'falling' ? 'destructive' : 'secondary'}>
              {worldState.karma_trend}
            </Badge>
          </div>
        )}
      </div>

      {/* Active Event - Prominent Display */}
      {activeEvent && (
        <Card className="active-event-card border-2 border-primary shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {getImpactIcon(activeEvent.estimated_impact)}
                  <Badge variant={getSeverityColor(activeEvent.severity)}>
                    {activeEvent.severity}
                  </Badge>
                  {activeEvent.is_global && (
                    <Badge variant="outline">
                      <Globe className="w-3 h-3 mr-1" />
                      Global
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-2xl">{activeEvent.name}</CardTitle>
                <CardDescription className="text-base mt-2">
                  {activeEvent.description}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Time Remaining */}
            {activeEvent.ends_at && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="font-semibold">
                  {calculateTimeRemaining(activeEvent.ends_at)}
                </span>
              </div>
            )}

            {/* Event Lore */}
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm leading-relaxed">{activeEvent.lore}</p>
            </div>

            {/* Effects */}
            <div className="space-y-2">
              <h4 className="font-semibold">Active Effects:</h4>
              <div className="grid gap-2">
                {activeEvent.effects.map((effect, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-muted/30 p-3 rounded">
                    <span className="text-sm">{effect.description}</span>
                    <Badge variant="outline">
                      {effect.duration_hours}h
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Participation */}
            {activeEvent.requires_participation && (
              <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold mb-1">Participation Required</h4>
                    <p className="text-sm text-muted-foreground">
                      {activeEvent.total_participants} players participating
                    </p>
                  </div>
                  <Button onClick={() => handleParticipate(activeEvent.event_id)}>
                    <Users className="w-4 h-4 mr-2" />
                    Participate
                  </Button>
                </div>
              </div>
            )}

            {/* View Details */}
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setSelectedEvent(activeEvent)}
            >
              View Full Details
            </Button>
          </CardContent>
        </Card>
      )}

      {/* No Active Event */}
      {!activeEvent && (
        <Card>
          <CardContent className="py-12 text-center">
            <Globe className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No Active Events</h3>
            <p className="text-muted-foreground">
              The Architect is watching... Events are triggered by collective player karma.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Recent Events & World State Tabs */}
      <Tabs defaultValue="recent" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="recent">Recent Events</TabsTrigger>
          <TabsTrigger value="karma">World Karma</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recent" className="space-y-4 mt-4">
          {recentEvents.length > 0 ? (
            <ScrollArea className="h-[600px]">
              <div className="space-y-3 pr-4">
                {recentEvents.map((event) => (
                  <EventCard
                    key={event.event_id}
                    event={event}
                    onViewDetails={() => setSelectedEvent(event)}
                    getSeverityColor={getSeverityColor}
                    getImpactIcon={getImpactIcon}
                  />
                ))}
              </div>
            </ScrollArea>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No recent events</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="karma" className="mt-4">
          {worldState && <KarmaDisplay worldState={worldState} />}
        </TabsContent>
      </Tabs>

      {/* Event Details Modal */}
      {selectedEvent && (
        <EventDetails
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onParticipate={handleParticipate}
        />
      )}
    </div>
  );
};
