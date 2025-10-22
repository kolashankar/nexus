import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Minus, Users, Zap } from 'lucide-react';
import { worldService } from '@/services/api/worldService';

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

interface KarmaStats {
  collective_karma: number;
  average_karma: number;
  karma_trend: string;
  distribution: Record<string, number>;
  action_ratio: {
    positive_count: number;
    negative_count: number;
    neutral_count: number;
    total_count: number;
    positive_ratio: number;
    negative_ratio: number;
  };
}

interface KarmaDisplayProps {
  worldState: WorldState;
}

export const KarmaDisplay: React.FC<KarmaDisplayProps> = ({ worldState }) => {
  const [karmaStats, setKarmaStats] = useState<KarmaStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchKarmaStats();
  }, []);

  const fetchKarmaStats = async () => {
    try {
      const stats = await worldService.getKarmaStatistics();
      setKarmaStats(stats);
    } catch (error) {
      console.error('Error fetching karma stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'rising':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'falling':
        return <TrendingDown className="w-5 h-5 text-red-500" />;
      default:
        return <Minus className="w-5 h-5 text-gray-500" />;
    }
  };

  const getKarmaColor = (karma: number) => {
    if (karma > 10000) return 'text-purple-500';
    if (karma > 5000) return 'text-blue-500';
    if (karma > 0) return 'text-green-500';
    if (karma > -5000) return 'text-yellow-500';
    if (karma > -10000) return 'text-orange-500';
    return 'text-red-500';
  };

  const getKarmaLevel = (karma: number) => {
    if (karma > 15000) return 'Golden Age';
    if (karma > 10000) return 'Enlightened';
    if (karma > 5000) return 'Virtuous';
    if (karma > 0) return 'Balanced (Positive)';
    if (karma > -5000) return 'Balanced (Negative)';
    if (karma > -10000) return 'Corrupt';
    if (karma > -15000) return 'Dark Times';
    return 'Apocalyptic';
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Collective Karma Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Collective Karma Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <div className={`text-5xl font-bold ${getKarmaColor(worldState.collective_karma)}`}>
              {worldState.collective_karma.toLocaleString()}
            </div>
            <div className="flex items-center justify-center gap-2">
              {getTrendIcon(worldState.karma_trend)}
              <span className="text-lg font-semibold capitalize">
                {worldState.karma_trend}
              </span>
            </div>
            <Badge variant="outline" className="text-sm">
              {getKarmaLevel(worldState.collective_karma)}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Average Karma</div>
              <div className="text-2xl font-bold">
                {worldState.average_karma.toFixed(1)}
              </div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Total Players</div>
              <div className="text-2xl font-bold flex items-center justify-center gap-2">
                <Users className="w-5 h-5" />
                {worldState.total_players.toLocaleString()}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity (24h)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2 text-sm">
                <span className="text-green-600 font-medium">Positive Actions</span>
                <span className="font-bold">
                  {worldState.positive_actions_24h.toLocaleString()} 
                  ({((worldState.positive_actions_24h / worldState.total_actions_24h) * 100).toFixed(1)}%)
                </span>
              </div>
              <Progress 
                value={(worldState.positive_actions_24h / worldState.total_actions_24h) * 100} 
                className="h-2 bg-green-100"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2 text-sm">
                <span className="text-red-600 font-medium">Negative Actions</span>
                <span className="font-bold">
                  {worldState.negative_actions_24h.toLocaleString()}
                  ({((worldState.negative_actions_24h / worldState.total_actions_24h) * 100).toFixed(1)}%)
                </span>
              </div>
              <Progress 
                value={(worldState.negative_actions_24h / worldState.total_actions_24h) * 100} 
                className="h-2 bg-red-100"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="w-4 h-4" />
              <span>Total Actions</span>
            </div>
            <span className="text-lg font-bold">
              {worldState.total_actions_24h.toLocaleString()}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Karma Distribution */}
      {karmaStats && karmaStats.distribution && (
        <Card>
          <CardHeader>
            <CardTitle>Player Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(karmaStats.distribution).map(([level, count]) => (
                <div key={level} className="flex items-center justify-between text-sm">
                  <span className="capitalize">{level.replace('_', ' ')}</span>
                  <span className="font-semibold">{count} players</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Karma Thresholds */}
      <Card>
        <CardHeader>
          <CardTitle>Event Thresholds</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-purple-600 font-medium">Golden Age</span>
              <span>+15,000</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-blue-600 font-medium">Enlightened Era</span>
              <span>+10,000</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-green-600 font-medium">Virtuous Period</span>
              <span>+5,000</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">Balanced World</span>
              <span>0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-orange-600 font-medium">Dark Times</span>
              <span>-5,000</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-red-600 font-medium">Apocalyptic</span>
              <span>-10,000</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
