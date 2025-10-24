import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { CheckCircle, Circle, Trophy, Star, Coins } from 'lucide-react';

  rewards
    credits;
    xp;
    karma;
    items
    trait_boosts
  };
  status;
  expires_at
}



export const QuestDetails = ({  quest, onAccept, onAbandon  }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy'
        return 'text-green-500 border-green-500';
      case 'medium'
        return 'text-yellow-500 border-yellow-500';
      case 'hard'
        return 'text-red-500 border-red-500';
      case 'legendary'
        return 'text-purple-500 border-purple-500';
      default;
    }
  };

  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'daily'
        return 'bg-blue-500/20 text-blue-400';
      case 'weekly'
        return 'bg-purple-500/20 text-purple-400';
      case 'guild'
        return 'bg-green-500/20 text-green-400';
      case 'world'
        return 'bg-orange-500/20 text-orange-400';
      case 'hidden'
        return 'bg-pink-500/20 text-pink-400';
      default;
    }
  };

  const calculateOverallProgress = () => {
    if (quest.objectives.length === 0) return 0;
    const completed = quest.objectives.filter(obj => obj.completed).length;
    return (completed / quest.objectives.length) * 100;
  };

  return (
    
      
        
          
            
              {quest.title}
              
                {quest.difficulty}
              
              
                {quest.quest_type}
              
            
            
              {quest.description}
            
          
        
      

      
        {/* Lore Section */}
        {quest.lore && (
          
            Story
            {quest.lore}
          
        )}

        {/* Objectives */}
        
          Objectives
          
            {quest.objectives.map((objective, idx) => (
              
                
                  {objective.completed ? (
                    
                  ) 
                    
                  )}
                  
                    
                      {objective.description}
                    
                    
                      
                      
                        {objective.current}/{objective.required}
                      
                    
                  
                
              
            ))}
          

          {/* Overall Progress */}
          
            
              Overall Progress
              
                {Math.round(calculateOverallProgress())}%
              
            
            
          
        

        {/* Rewards */}
        
          Rewards
          
            {quest.rewards.credits > 0 && (
              
                
                
                  Credits
                  {quest.rewards.credits}
                
              
            )}
            
            {quest.rewards.xp > 0 && (
              
                
                
                  Experience
                  {quest.rewards.xp} XP
                
              
            )}
            
            {quest.rewards.karma !== 0 && (
              
                
                
                  Karma
                   0 ? 'text-green-500' 
                    {quest.rewards.karma > 0 ? '+' 
                  
                
              
            )}

            {quest.rewards.items && quest.rewards.items.length > 0 && (
              
                📦
                
                  Items
                  {quest.rewards.items.length} items
                
              
            )}
          

          {/* Trait Boosts */}
          {quest.rewards.trait_boosts && Object.keys(quest.rewards.trait_boosts).length > 0 && (
            
              Trait Bonuses
              
                {Object.entries(quest.rewards.trait_boosts).map(([trait, boost]) => (
                  
                    {trait}
                  
                ))}
              
            
          )}
        

        {/* Action Buttons */}
        
          {quest.status === 'available' && onAccept && (
             onAccept(quest._id)}
              className="flex-1"
            >
              Accept Quest
            
          )}
          
          {quest.status === 'active' && onAbandon && (
             onAbandon(quest._id)}
              variant="destructive"
              className="flex-1"
            >
              Abandon Quest
            
          )}
        

        {/* Expiry Warning */}
        {quest.expires_at && (
          
            
              ⚠️ This quest expires on {new Date(quest.expires_at).toLocaleString()}
            
          
        )}
      
    
  );
};
