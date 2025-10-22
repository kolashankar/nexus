import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Badge } from '../../ui/badge';
import { Avatar, AvatarFallback } from '../../ui/avatar';
import { Trophy, TrendingUp, TrendingDown, Crown, Sword, DollarSign, Target } from 'lucide-react';
import { useLeaderboards } from '../../../hooks/useLeaderboards';



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

  const getLeaderboardIcon = (type) => {
    const icons: Record = {
      karma,
      wealth,
      combat,
      achievement;
    return icons[type] || ;
  };

  const getRankColor = (rank)=> {
    if (rank === 1) return 'text-yellow-500';
    if (rank === 2) return 'text-gray-400';
    if (rank === 3) return 'text-amber-700';
    return 'text-muted-foreground';
  };

  const getRankIcon = (rank) => {
    if (rank ;
    }
    return null;
  };

  const formatValue = (type, value)=> {
    if (type === 'wealth') {
      return `$${value.toLocaleString()}`;
    }
    return value.toLocaleString();
  };

  const renderLeaderboardEntry = (entry, type) => (
    
      
        
          
            #{entry.rank}
          
          {getRankIcon(entry.rank)}
        
        
        
          
            {entry.username.substring(0, 2).toUpperCase()}
          
        
        
        
          
            {entry.username}
            {entry.title && (
              
                {entry.title}
              
            )}
          
          
            {entry.level && Level {entry.level}}
            {entry.guild_name && (
              
                •
                {entry.guild_name}
              
            )}
          
        
      
      
      
        
          {formatValue(type, entry.value)}
          {entry.change_24h !== undefined && entry.change_24h !== 0 && (
            
              {entry.change_24h > 0 ? (
                
              ) : (
                
              )}
               0 ? 'text-green-500' : 'text-red-500'}>
                {Math.abs(entry.change_24h)}
              
            
          )}
        
      
    
  );

  const renderMyRank = (type) => {
    const rank = myRanks[type];
    if (!rank) return null;

    return (
      
        
          
            
              
                #{rank.rank}
              
              
                Your Rank
                
                  Top {rank.percentile.toFixed(1)}%
                
              
            
            
              {formatValue(type, rank.value)}
              
                {rank.total_players.toLocaleString()} players
              
            
          
        
      
    );
  };

  if (loading) {
    return (
      
        
      
    );
  }

  return (
    
      
        Leaderboards
        Compete with players worldwide
      

      
        
          
            {getLeaderboardIcon('karma')}
            Karma
          
          
            {getLeaderboardIcon('wealth')}
            Wealth
          
          
            {getLeaderboardIcon('combat')}
            Combat
          
          
            {getLeaderboardIcon('achievement')}
            Achievements
          
        

        {['karma', 'wealth', 'combat', 'achievement'].map(type => (
          
            {renderMyRank(type)}
            
            
              
                
                  {getLeaderboardIcon(type)}
                  {type.charAt(0).toUpperCase() + type.slice(1)} Leaderboard
                
                
                  Top players ranked by {type}
                
              
              
                
                  {leaderboards[type]?.entries?.map((entry) =>
                    renderLeaderboardEntry(entry, type)
                  )}
                  
                  {(!leaderboards[type] || leaderboards[type].entries?.length === 0) && (
                    
                      No rankings available yet
                    
                  )}
                
              
            
          
        ))}
      
    
  );
};

export default LeaderboardPanel;
