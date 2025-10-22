import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Calendar, Trophy } from 'lucide-react';
import LeaderboardPanel from '../Leaderboard/LeaderboardPanel';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

interface Season {
  season_id: string;
  season_number: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  status: string;
  duration_days: number;
  total_players: number;
  active_players: number;
}

const SeasonalLeaderboard: React.FC = () => {
  const [season, setSeason] = useState<Season | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCurrentSeason();
  }, []);

  const fetchCurrentSeason = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/seasonal/season/current`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSeason(response.data);
    } catch (error) {
      console.error('Error fetching current season:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateDaysRemaining = (): number => {
    if (!season) return 0;
    const end = new Date(season.end_date);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Season Info */}
      {season && (
        <Card className="border-primary/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-primary" />
                  {season.name}
                </CardTitle>
                <CardDescription>{season.description}</CardDescription>
              </div>
              <Badge variant="default" className="text-lg px-4 py-2">
                Season {season.season_number}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Days Remaining</p>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <p className="text-2xl font-bold">{calculateDaysRemaining()}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Active Players</p>
                <p className="text-2xl font-bold">{season.active_players.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Players</p>
                <p className="text-2xl font-bold">{season.total_players.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Leaderboards */}
      <LeaderboardPanel />
    </div>
  );
};

export default SeasonalLeaderboard;
