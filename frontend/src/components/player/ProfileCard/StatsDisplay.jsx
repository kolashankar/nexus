import React from 'react';
import { Progress } from '@/components/ui/progress';



const StatsDisplay: React.FC = ({ player }) => {
  // Calculate XP progress
  const calculateXPProgress = () => {
    const xpForCurrentLevel = 100 * (player.level ** 2);
    const xpForNextLevel = 100 * ((player.level + 1) ** 2);
    const xpInLevel = player.xp - xpForCurrentLevel;
    const xpNeeded = xpForNextLevel - xpForCurrentLevel;
    return (xpInLevel / xpNeeded) * 100;
  };

  const xpProgress = calculateXPProgress();

  return (
    
      {/* XP Progress */}
      
        
          Experience
          
            {player.xp} XP
          
        
        
        
          {Math.round(xpProgress)}% to Level {player.level + 1}
        
      

      {/* Player Stats */}
      
        
          Total Actions
          
            {player.stats?.total_actions || 0}
          
        
        
          PvP Wins
          
            {player.stats?.pvp_wins || 0}
          
        
        
          Quests Done
          
            {player.stats?.quests_completed || 0}
          
        
        
          Robots Owned
          
            {player.stats?.robots_owned || 0}
          
        
      

      {/* Prestige Level */}
      {player.prestige_level > 0 && (
        
          
            Prestige Level
            
              ★ {player.prestige_level}
            
          
        
      )}
    
  );
};

export default StatsDisplay;