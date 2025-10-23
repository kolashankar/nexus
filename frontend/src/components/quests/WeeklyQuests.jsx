import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Trophy, Clock } from 'lucide-react';



export const WeeklyQuests: React.FC = () => {
  const [quests, setQuests] = useState([]);
  const [resetTime, setResetTime] = useState('');

  useEffect(() => {
    fetchWeeklyQuests();
  }, []);

  const fetchWeeklyQuests = async () => {
    try {
      const response = await fetch('/api/quests/weekly', {
        headers)}`
        }
      });
      const data = await response.json();
      setQuests(data.quests || []);
      setResetTime(data.reset_time);
    } catch (error) {
      console.error('Failed to fetch weekly quests', error);
    }
  };

  const getDifficultyColor = (difficulty) => {
    const colors: Record = {
      medium,
      hard,
      legendary: 'bg-purple-500'
    };
    return colors[difficulty] || 'bg-gray-500';
  };

  return (
    
      
        
          
          Weekly Challenges
        
        
          
          Resets: {resetTime}
        
      

      
        {quests.map(quest => (
          
            
              
                
                  {quest.title}
                  
                    {quest.difficulty}
                  
                
                
              

              
                {quest.description}
              

              
                {quest.objectives.map((obj, idx) => (
                  
                    
                      {obj.description}
                      
                        {obj.current}/{obj.required}
                      
                    
                    
                  
                ))}
              

              
                💰 {quest.rewards.credits}
                ⭐ {quest.rewards.xp} XP
                {quest.rewards.karma !== 0 && (
                  
                    ✨ {quest.rewards.karma > 0 ? '+' : ''}{quest.rewards.karma}
                  
                )}
              

              {quest.status === 'available' && (
                Accept Challenge
              )}
            
          
        ))}
      
    
  );
};
