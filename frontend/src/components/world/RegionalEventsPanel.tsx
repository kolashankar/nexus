import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { MapPin, Zap, Shield, TrendingUp, AlertTriangle, PartyPopper } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

interface RegionalEvent {
  event_id: string;
  territory_id: number;
  territory_name: string;
  event_type: string;
  name: string;
  description: string;
  started_at: string;
  ends_at: string;
  effects: Record<string, any>;
  is_active: boolean;
}

interface RegionalEventsPanelProps {
  territoryId?: number;
}

const RegionalEventsPanel: React.FC<RegionalEventsPanelProps> = ({ territoryId }) => {
  const [events, setEvents] = useState<RegionalEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (territoryId) {
      fetchRegionalEvents(territoryId);
    }
  }, [territoryId]);

  const fetchRegionalEvents = async (territory: number) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_URL}/api/world/events/regional/${territory}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching regional events:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEventIcon = (eventType: string) => {
    const icons: Record<string, React.ReactNode> = {
      resource_surge: <Zap className="h-5 w-5 text-yellow-500" />,
      hostile_takeover: <Shield className="h-5 w-5 text-red-500" />,
      market_boom: <TrendingUp className="h-5 w-5 text-green-500" />,
      npc_raid: <AlertTriangle className="h-5 w-5 text-orange-500" />,
      festival: <PartyPopper className="h-5 w-5 text-purple-500" />,
      disaster: <AlertTriangle className="h-5 w-5 text-red-600" />
    };
    return icons[eventType] || <MapPin className="h-5 w-5" />;
  };

  const getEventColor = (eventType: string): string => {
    const colors: Record<string, string> = {
      resource_surge: 'border-yellow-500/50',
      hostile_takeover: 'border-red-500/50',
      market_boom: 'border-green-500/50',
      npc_raid: 'border-orange-500/50',
      festival: 'border-purple-500/50',
      disaster: 'border-red-600/50'
    };
    return colors[eventType] || '';
  };

  const calculateTimeRemaining = (endsAt: string): string => {
    const end = new Date(endsAt);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Ended';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const renderEffects = (effects: Record<string, any>) => {
    return Object.entries(effects).map(([key, value]) => {
      let displayValue = value;
      if (typeof value === 'number') {
        if (value > 1) {
          displayValue = `${value}x`;
        } else if (value < 1) {
          displayValue = `${(value * 100).toFixed(0)}%`;
        }
      } else if (typeof value === 'boolean') {
        displayValue = value ? 'Active' : 'Inactive';
      }
      
      return (
        <div key={key} className="text-xs">
          <span className="text-muted-foreground">
            {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:
          </span>
          <span className="ml-1 font-medium">{displayValue.toString()}</span>
        </div>
      );
    });
  };

  if (!territoryId) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-sm text-muted-foreground">
              Select a territory to view regional events
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Regional Events</CardTitle>
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Regional Events
        </CardTitle>
        <CardDescription>
          Active events in this territory
        </CardDescription>
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">
              No active events in this territory
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {events.map((event) => (
              <div
                key={event.event_id}
                className={`border-2 rounded-lg p-4 ${getEventColor(event.event_type)}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getEventIcon(event.event_type)}
                    <div>
                      <h4 className="font-semibold">{event.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {event.territory_name}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">
                    {calculateTimeRemaining(event.ends_at)}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">
                  {event.description}
                </p>
                
                <div className="space-y-1 bg-secondary/20 rounded p-2">
                  <p className="text-xs font-semibold mb-1">Effects:</p>
                  {renderEffects(event.effects)}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RegionalEventsPanel;
