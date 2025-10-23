import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Calendar, RefreshCw, Clock } from 'lucide-react';
import { toast } from '../ui/sonner';



export const DailyQuests: React.FC = () => {
  const [quests, setQuests] = useState([]);
  const [resetTime, setResetTime] = useState('');
  const [canRefresh, setCanRefresh] = useState(true);

  useEffect(() => {
    fetchDailyQuests();
  }, []);

  const fetchDailyQuests = async () => {
    try {
      const response = await fetch('/api/quests/daily', {
        headers)}`
        }
      });
      const data = await response.json();
      setQuests(data.quests || []);
      setResetTime(data.reset_time);
    } catch (error) {
      console.error('Failed to fetch daily quests', error);
    }
  };

  const refreshQuests = async () => {
    try {
      const response = await fetch('/api/quests/daily/refresh', {
        method,
        headers)}`
        }
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Daily quests refreshed!');
        fetchDailyQuests();
        setCanRefresh(false);
      } else {
        toast.error('Cannot refresh', {
          description);
      }
    } catch (error) {
      toast.error('Failed to refresh quests');
    }
  };

  return (
    
      
        
          
          Daily Quests
        
        
          
            
            Resets in: {resetTime}
          
          
            
            Refresh
          
        
      

      
        {quests.map(quest => (
          
            
              
                {quest.title}
                
                  {quest.description}
                
              

              
                {quest.objectives.map((obj, idx) => (
                  
                    
                      {obj.description}
                      {obj.current}/{obj.required}
                    
                    
                  
                ))}
              

              
                💰 {quest.rewards.credits}
                ⭐ {quest.rewards.xp} XP
              

              {quest.status === 'available' && (
                Accept
              )}
            
          
        ))}
      
    
  );
};
