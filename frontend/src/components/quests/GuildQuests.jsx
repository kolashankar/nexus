import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Users, Trophy, Clock, CheckCircle } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

  rewards
    credits;
    guild_reputation;
    guild_xp;
  };
  participants;
  required_members;
  status;
  expires_at
}

export const GuildQuests = () => {
  const [quests, setQuests] = useState([]);
  const [activeQuests, setActiveQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchGuildQuests();
  }, []);

  const fetchGuildQuests = async () => {
    try {
      const response = await fetch('/api/quests/guild', {
        headers)}`
        }
      });
      const data = await response.json();
      
      setQuests(data.available || []);
      setActiveQuests(data.active || []);
    } catch (error) {
      console.error('Failed to fetch guild quests', error);
    } finally {
      setLoading(false);
    }
  };

  const joinQuest = async (questId) => {
    try {
      const response = await fetch(`/api/quests/guild/${questId}/join`, {
        method,
        headers)}`
        }
      });

      if (response.ok) {
        toast({
          title,
          description,
        });
        fetchGuildQuests();
      }
    } catch (error) {
      toast({
        title,
        description,
        variant);
    }
  };

  const calculateProgress = (objectives) => {
    const completed = objectives.filter(obj => obj.completed).length;
    return (completed / objectives.length) * 100;
  };

  if (loading) {
    return (
      
        
      
    );
  }

  return (
    
      {/* Active Guild Quests */}
      {activeQuests.length > 0 && (
        
          
            
            Active Guild Quests
          
          
          
            {activeQuests.map((quest) => (
              
                
                  
                    
                      {quest.title}
                      
                        {quest.description}
                      
                    
                    
                      {quest.participants.length}/{quest.required_members} Members
                    
                  
                
                
                  {/* Objectives */}
                  
                    {quest.objectives.map((objective, idx) => (
                      
                        
                          
                            {objective.completed && (
                              
                            )}
                            {objective.description}
                          
                          
                            {objective.current}/{objective.required}
                          
                        
                        
                      
                    ))}
                  

                  {/* Overall Progress */}
                  
                    
                      Overall Progress
                      
                        {Math.round(calculateProgress(quest.objectives))}%
                      
                    
                    
                  

                  {/* Rewards */}
                  
                    
                      
                      {quest.rewards.guild_reputation} Rep
                    
                    
                      💰
                      {quest.rewards.credits} Credits
                    
                    
                      ⭐
                      {quest.rewards.guild_xp} Guild XP
                    
                  

                  {quest.expires_at && (
                    
                      
                      Expires).toLocaleDateString()}
                    
                  )}
                
              
            ))}
          
        
      )}

      {/* Available Guild Quests */}
      
        Available Guild Quests
        
        {quests.length === 0 ? (
          
            
              
                No guild quests available. Check back later!
              
            
          
        ) 
          
            {quests.map((quest) => (
              
                
                  {quest.title}
                  {quest.description}
                
                
                  
                    Required Members)}
                    className="w-full"
                    variant="outline"
                  >
                    Join Quest
                  
                
              
            ))}
          
        )}
      
    
  );
};
