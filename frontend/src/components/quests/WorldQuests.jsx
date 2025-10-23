import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Globe, Users } from 'lucide-react';
import { toast } from '../ui/sonner';



export const WorldQuests: React.FC = () => {
  const [quests, setQuests] = useState([]);

  useEffect(() => {
    fetchWorldQuests();
    const interval = setInterval(fetchWorldQuests, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  const fetchWorldQuests = async () => {
    try {
      const response = await fetch('/api/quests/world', {
        headers)}`
        }
      });
      const data = await response.json();
      setQuests(data.quests || []);
    } catch (error) {
      console.error('Failed to fetch world quests', error);
    }
  };

  const participate = async (questId) => {
    try {
      const response = await fetch(`/api/quests/world/participate/${questId}`, {
        headers)}`
        }
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Joined world quest!');
        fetchWorldQuests();
      } else {
        toast.error('Failed to join');
      }
    } catch (error) {
      toast.error('Failed to join quest');
    }
  };

  return (
    
      
        
          
          World Quests
        
        
          Limited-time events open to all players
        
      

      {quests.length === 0 ? (
        
          
          
            No active world quests at the moment
          
        
      ) : (
        
          {quests.map(quest => (
            
              
                
                  
                    {quest.title}
                    
                      
                      {quest.participants?.length || 0} participating
                    
                  
                  
                

                
                  {quest.description}
                

                
                  Objectives, 2).map((obj, idx) => (
                    • {obj.description}
                  ))}
                

                
                  
                    💰 {quest.rewards.credits}
                    ⭐ {quest.rewards.xp} XP
                  
                  {quest.expires_at && (
                    
                      Expires).toLocaleDateString()}
                    
                  )}
                

                 participate(quest.id)}
                >
                  Participate
                
              
            
          ))}
        
      )}
    
  );
};
