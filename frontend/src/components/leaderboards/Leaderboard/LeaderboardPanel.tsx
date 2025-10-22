import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Badge } from '../../ui/badge';
import { Avatar, AvatarFallback } from '../../ui/avatar';
import { Trophy, TrendingUp, TrendingDown, Crown, Sword, DollarSign, Target } from 'lucide-react';
import { useLeaderboards } from '../../../hooks/useLeaderboards';

interface LeaderboardEntry {
  rank: number;
  player_id: string;
  username: string;
  value: number;
  level?: number;
  guild_name?: string;
  title?: string;
  change_24h?: number;
}

const LeaderboardPanel: React.FC = () => {
  const { leaderboards, myRanks, loading, fetchLeaderboard, fetchMyRank } = useLeaderboards();
  const [activeTab, setActiveTab] = useState('karma');

  useEffect(() => {
    fetchLeaderboard('karma');
    fetchLeaderboard('wealth');
    fetchLeaderboard('combat');
    fetchLeaderboard('achievement');
    
    fetchMyRank('karma');
    fetchMyRank('wealth');
    fetchMyRank('combat');
    fetchMyRank('achievement');
  }, []);

  const getLeaderboardIcon = (type: string) => {
    const icons: Record<string, React.ReactNode> = {
      karma: <Target className="h-5 w-5" />,
      wealth: <DollarSign className="h-5 w-5" />,
      combat: <Sword className="h-5 w-5" />,
      achievement: <Trophy className="h-5 w-5" />
    };
    return icons[type] || <Trophy className="h-5 w-5" />;
  };

  const getRankColor = (rank: number): string => {
    if (rank === 1) return 'text-yellow-500';
    if (rank === 2) return 'text-gray-400';
    if (rank === 3) return 'text-amber-700';
    return 'text-muted-foreground';
  };

  const getRankIcon = (rank: number) => {
    if (rank <= 3) {
      return <Crown className={`h-5 w-5 ${getRankColor(rank)}`} />;
    }
    return null;
  };

  const formatValue = (type: string, value: number): string => {
    if (type === 'wealth') {
      return `$${value.toLocaleString()}`;
    }
    return value.toLocaleString();
  };

  const renderLeaderboardEntry = (entry: LeaderboardEntry, type: string) => (
    <div
      key={entry.player_id}
      className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/20 transition-colors"
    >
      <div className="flex items-center gap-3 flex-1">
        <div className="flex items-center gap-2 min-w-[60px]">
          <span className={`text-lg font-bold ${getRankColor(entry.rank)}`}>
            #{entry.rank}
          </span>
          {getRankIcon(entry.rank)}
        </div>
        
        <Avatar className="h-10 w-10">
          <AvatarFallback>
            {entry.username.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="font-semibold">{entry.username}</p>
            {entry.title && (
              <Badge variant="outline" className="text-xs">
                {entry.title}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {entry.level && <span>Level {entry.level}</span>}
            {entry.guild_name && (
              <>
                <span>•</span>
                <span>{entry.guild_name}</span>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="font-bold text-lg">{formatValue(type, entry.value)}</p>
          {entry.change_24h !== undefined && entry.change_24h !== 0 && (
            <div className="flex items-center gap-1 text-xs">
              {entry.change_24h > 0 ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span className={entry.change_24h > 0 ? 'text-green-500' : 'text-red-500'}>
                {Math.abs(entry.change_24h)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderMyRank = (type: string) => {
    const rank = myRanks[type];
    if (!rank) return null;

    return (
      <Card className="border-primary/50 bg-primary/5 mb-4">
        <CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`text-2xl font-bold ${getRankColor(rank.rank)}`}>
                #{rank.rank}
              </div>
              <div>
                <p className="font-semibold">Your Rank</p>
                <p className="text-sm text-muted-foreground">
                  Top {rank.percentile.toFixed(1)}%
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{formatValue(type, rank.value)}</p>
              <p className="text-xs text-muted-foreground">
                {rank.total_players.toLocaleString()} players
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
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
      <div>
        <h2 className="text-3xl font-bold">Leaderboards</h2>
        <p className="text-muted-foreground">Compete with players worldwide</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="karma" className="gap-2">
            {getLeaderboardIcon('karma')}
            Karma
          </TabsTrigger>
          <TabsTrigger value="wealth" className="gap-2">
            {getLeaderboardIcon('wealth')}
            Wealth
          </TabsTrigger>
          <TabsTrigger value="combat" className="gap-2">
            {getLeaderboardIcon('combat')}
            Combat
          </TabsTrigger>
          <TabsTrigger value="achievement" className="gap-2">
            {getLeaderboardIcon('achievement')}
            Achievements
          </TabsTrigger>
        </TabsList>

        {['karma', 'wealth', 'combat', 'achievement'].map(type => (
          <TabsContent key={type} value={type} className="space-y-4">
            {renderMyRank(type)}
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getLeaderboardIcon(type)}
                  {type.charAt(0).toUpperCase() + type.slice(1)} Leaderboard
                </CardTitle>
                <CardDescription>
                  Top players ranked by {type}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {leaderboards[type]?.entries?.map((entry: LeaderboardEntry) =>
                    renderLeaderboardEntry(entry, type)
                  )}
                  
                  {(!leaderboards[type] || leaderboards[type].entries?.length === 0) && (
                    <p className="text-center text-muted-foreground py-8">
                      No rankings available yet
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default LeaderboardPanel;
