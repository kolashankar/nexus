/**
 * Karma Feed Component - Displays recent karma events.
 */

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { ScrollArea } from '../../ui/scroll-area';
import { useKarma } from '../../../hooks/useKarma';
import { formatDistanceToNow } from 'date-fns';
import {
  Zap,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Award,
  Skull
} from 'lucide-react';
import './KarmaFeed.css';

interface KarmaEvent {
  _id: string;
  player_id: string;
  action_type: string;
  karma_change: number;
  message: string;
  timestamp: string;
  event_type?: string;
}

export const KarmaFeed: React.FC = () => {
  const { karmaHistory, loading, loadKarmaHistory } = useKarma();
  const [events, setEvents] = useState<KarmaEvent[]>([]);

  useEffect(() => {
    loadKarmaHistory(20);
  }, [loadKarmaHistory]);

  useEffect(() => {
    if (karmaHistory) {
      setEvents(karmaHistory);
    }
  }, [karmaHistory]);

  const getKarmaIcon = (karmaChange: number, eventType?: string) => {
    if (eventType === 'divine_blessing') return <Award className="karma-icon positive" />;
    if (eventType === 'punishment') return <Skull className="karma-icon negative" />;
    if (karmaChange > 50) return <TrendingUp className="karma-icon large-positive" />;
    if (karmaChange > 0) return <TrendingUp className="karma-icon positive" />;
    if (karmaChange < -50) return <TrendingDown className="karma-icon large-negative" />;
    if (karmaChange < 0) return <TrendingDown className="karma-icon negative" />;
    return <Zap className="karma-icon neutral" />;
  };

  const getKarmaBadge = (karmaChange: number) => {
    const value = Math.abs(karmaChange);
    const sign = karmaChange >= 0 ? '+' : '-';
    
    let variant: 'default' | 'secondary' | 'destructive' | 'outline' = 'default';
    if (karmaChange > 50) variant = 'default';
    else if (karmaChange > 0) variant = 'secondary';
    else if (karmaChange < -50) variant = 'destructive';
    else if (karmaChange < 0) variant = 'outline';

    return (
      <Badge variant={variant} className="karma-badge">
        {sign}{value}
      </Badge>
    );
  };

  if (loading && events.length === 0) {
    return (
      <Card className="karma-feed-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Karma Feed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="loading-skeleton">
            <div className="skeleton-item" />
            <div className="skeleton-item" />
            <div className="skeleton-item" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (events.length === 0) {
    return (
      <Card className="karma-feed-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Karma Feed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="empty-state">
            <AlertCircle className="empty-icon" />
            <p>No karma events yet</p>
            <p className="text-sm text-muted-foreground">
              Start performing actions to generate karma
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="karma-feed-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Karma Feed
          <Badge variant="outline" className="ml-auto">
            {events.length} events
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="karma-feed-scroll" style={{ height: '400px' }}>
          <div className="karma-events-list">
            {events.map((event) => (
              <div key={event._id} className="karma-event-item">
                <div className="event-icon">
                  {getKarmaIcon(event.karma_change, event.event_type)}
                </div>
                <div className="event-content">
                  <div className="event-header">
                    <span className="event-action">{event.action_type}</span>
                    {getKarmaBadge(event.karma_change)}
                  </div>
                  <p className="event-message">{event.message}</p>
                  <span className="event-timestamp">
                    {formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
