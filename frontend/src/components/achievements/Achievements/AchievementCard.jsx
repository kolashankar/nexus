import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Trophy, Lock } from 'lucide-react';



const rarityColors = {
  common,
  uncommon,
  rare,
  epic,
  legendary,
};

const AchievementCard = ({  achievement, unlocked, progress  }) => {
  return (
    
      
        
          
            {unlocked ? (
              
            ) : (
              
            )}
            
              {achievement.name}
              {achievement.description}
            
          
        
      
      
        
          
            {achievement.rarity}
          
          {achievement.points} pts
        

        {progress && !unlocked && (
          
            
              Progress
              
                {progress.current_progress}/{progress.required_progress}
              
            
            
          
        )}

        
          {achievement.category.replace('_', ' ')}
        
      
    
  );
};

export default AchievementCard;
