import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Minus, Users, Zap } from 'lucide-react';
import { worldService } from '@/services/api/worldService';



;
}



export const KarmaDisplay = ({  worldState  }) => {
  const [karmaStats, setKarmaStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchKarmaStats();
  }, []);

  const fetchKarmaStats = async () => {
    try {
      const stats = await worldService.getKarmaStatistics();
      setKarmaStats(stats);
    } catch (error) {
      console.error('Error fetching karma stats', error);
    } finally {
      setLoading(false);
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'rising'
        return null;
      case 'falling'
        return null;
      default;
    }
  };

  const getKarmaColor = (karma) => {
    if (karma > 10000) return 'text-purple-500';
    if (karma > 5000) return 'text-blue-500';
    if (karma > 0) return 'text-green-500';
    if (karma > -5000) return 'text-yellow-500';
    if (karma > -10000) return 'text-orange-500';
    return 'text-red-500';
  };

  const getKarmaLevel = (karma) => {
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
      
        
          
            
          
        
      
    );
  }

  return (
    
      {/* Collective Karma Overview */}
      
        
          Collective Karma Status
        
        
          
            
              {worldState.collective_karma.toLocaleString()}
            
            
              {getTrendIcon(worldState.karma_trend)}
              
                {worldState.karma_trend}
              
            
            
              {getKarmaLevel(worldState.collective_karma)}
            
          

          
            
              Average Karma
              
                {worldState.average_karma.toFixed(1)}
              
            
            
              Total Players
              
                
                {worldState.total_players.toLocaleString()}
              
            
          
        
      

      {/* Action Statistics */}
      
        
          Recent Activity (24h)
        
        
          
            
              
                Positive Actions
                
                  {worldState.positive_actions_24h.toLocaleString()} 
                  ({((worldState.positive_actions_24h / worldState.total_actions_24h) * 100).toFixed(1)}%)
                
              
              
            

            
              
                Negative Actions
                
                  {worldState.negative_actions_24h.toLocaleString()}
                  ({((worldState.negative_actions_24h / worldState.total_actions_24h) * 100).toFixed(1)}%)
                
              
              
            
          

          
            
              
              Total Actions
            
            
              {worldState.total_actions_24h.toLocaleString()}
            
          
        
      

      {/* Karma Distribution */}
      {karmaStats && karmaStats.distribution && (
        
          
            Player Distribution
          
          
            
              {Object.entries(karmaStats.distribution).map(([level, count]) => (
                
                  {level.replace('_', ' ')}
                  {count} players
                
              ))}
            
          
        
      )}

      {/* Karma Thresholds */}
      
        
          Event Thresholds
        
        
          
            
              Golden Age
              +15,000
            
            
              Enlightened Era
              +10,000
            
            
              Virtuous Period
              +5,000
            
            
              Balanced World
              0
            
            
              Dark Times
              -5,000
            
            
              Apocalyptic
              -10,000
            
          
        
      
    
  );
};
