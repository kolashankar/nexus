/**
 * Action Cooldowns Component - Shows active cooldowns.
 */

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Clock, Zap, AlertCircle } from 'lucide-react';
import { actionService } from '../../../services/action/actionService';
import './ActionCooldowns.css';

interface Cooldown {
  action_type: string;
  expires_at: string;
  remaining_seconds: number;
  remaining_minutes: number;
}

export const ActionCooldowns: React.FC = () => {
  const [cooldowns, setCooldowns] = useState<Record<string, Cooldown>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCooldowns();
    const interval = setInterval(loadCooldowns, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const loadCooldowns = async () => {
    try {
      // In real implementation, call actionService.getAllCooldowns()
      // For now, mock data
      setLoading(false);
    } catch (error) {
      console.error('Failed to load cooldowns:', error);
      setLoading(false);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCooldownPercentage = (cooldown: Cooldown): number => {
    // Calculate based on typical durations
    const typicalDuration = {
      'hack': 300,
      'steal': 600,
      'help': 60,
      'donate': 120,
      'trade': 180
    };

    const duration = typicalDuration[cooldown.action_type as keyof typeof typicalDuration] || 300;
    return ((duration - cooldown.remaining_seconds) / duration) * 100;
  };

  const cooldownEntries = Object.entries(cooldowns);

  if (loading) {
    return (
      <Card className="cooldowns-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Action Cooldowns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Loading cooldowns...</p>
        </CardContent>
      </Card>
    );
  }

  if (cooldownEntries.length === 0) {
    return (
      <Card className="cooldowns-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Action Cooldowns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="empty-cooldowns">
            <AlertCircle className="empty-icon" />
            <p className="text-sm text-muted-foreground">No active cooldowns</p>
            <p className="text-xs text-muted-foreground">All actions are ready!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="cooldowns-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Action Cooldowns
          <Badge variant="outline" className="ml-auto">
            {cooldownEntries.length} active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="cooldowns-list">
          {cooldownEntries.map(([actionType, cooldown]) => (
            <div key={actionType} className="cooldown-item">
              <div className="cooldown-header">
                <span className="cooldown-action">{actionType}</span>
                <Badge variant="secondary" className="cooldown-time">
                  {formatTime(cooldown.remaining_seconds)}
                </Badge>
              </div>
              <Progress 
                value={getCooldownPercentage(cooldown)} 
                className="cooldown-progress"
              />
              <span className="cooldown-remaining">
                {cooldown.remaining_minutes.toFixed(1)} minutes remaining
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
