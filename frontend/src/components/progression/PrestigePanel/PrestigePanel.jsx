import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Sparkles, Trophy, Star, AlertTriangle } from 'lucide-react';

;
  permanent_bonuses;
  prestige_points_awarded;
  unlocks;
}



export const PrestigePanel = ({ 
  currentPrestige,
  playerLevel,
  karmaPoints,
  achievementsUnlocked,
  prestigeConfig,
  onPrestige
 }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const requirements = prestigeConfig.requirements;
  const meetsLevelReq = playerLevel >= requirements.min_player_level;
  const meetsKarmaReq = Math.abs(karmaPoints) >= requirements.karma_threshold;
  const meetsAchievementReq = achievementsUnlocked >= requirements.achievements_required;
  const canPrestige = meetsLevelReq && meetsKarmaReq && meetsAchievementReq;

  const getRequirementColor = (met) => met ? 'text-green-500' : 'text-red-500';

  return (
    
      
        
          
          Prestige System
        
        
          Reset your progress for permanent bonuses and exclusive rewards
        
      
      
        {/* Current Prestige */}
        
          
            Current Prestige
            {prestigeConfig.name}
          
          
            
            Level {currentPrestige}
          
        

        {/* Next Prestige Requirements */}
        
          Requirements for Next Prestige
          
            
              Player Level
              
                {playerLevel} / {requirements.min_player_level}
              
            
            
              Karma Points
              
                {Math.abs(karmaPoints)} / {requirements.karma_threshold}
              
            
            
              Achievements
              
                {achievementsUnlocked} / {requirements.achievements_required}
              
            
          
        

        {/* Permanent Bonuses */}
        
          Permanent Bonuses
          
            {Object.entries(prestigeConfig.permanent_bonuses).map(([key, value]) => (
              
                
                
                  {key.replace(/_/g, ' ')}: +{(value * 100).toFixed(0)}%
                
              
            ))}
          
        

        {/* Unlocks */}
        
          Unlocks
          
            {prestigeConfig.unlocks.map((unlock) => (
              
                • {unlock.replace(/_/g, ' ')}
              
            ))}
          
        

        {/* Prestige Points Award */}
        
          Prestige Points Awarded
          
            +{prestigeConfig.prestige_points_awarded}
          
        

        {/* Warning */}
        
          
          
            Warning) * 100}%).
            Some currencies and items will be lost. This action cannot be undone!
          
        

        {/* Prestige Button */}
        {!confirmOpen ? (
           setConfirmOpen(true)}
          >
            {canPrestige ? 'Prestige Now' : 'Requirements Not Met'}
          
        ) : (
          
             {
                onPrestige();
                setConfirmOpen(false);
              }}
            >
              Confirm Prestige - I Understand
            
             setConfirmOpen(false)}
            >
              Cancel
            
          
        )}

        {/* Progress to Next */}
        
          Overall Progress
          
        
      
    
  );
};
