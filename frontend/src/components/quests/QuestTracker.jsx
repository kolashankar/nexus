import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Target, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { questService } from '../../services/questService';



export const QuestTracker: React.FC = () => {
  const [trackedQuests, setTrackedQuests] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    fetchTrackedQuests();
    const interval = setInterval(fetchTrackedQuests, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const fetchTrackedQuests = async () => {
    try {
      const quests = await questService.getActiveQuests();
      setTrackedQuests(quests.slice(0, 5)); // Track max 5 quests
    } catch (error) {
      console.error('Failed to fetch tracked quests, error);
    }
  };

  const toggleExpanded = (questId) => {
    setExpanded(prev => 
      prev.includes(questId)
        ? prev.filter(id => id !== questId)
        : [...prev, questId]
    );
  };

  const calculateProgress = (objectives) => {
    if (objectives.length === 0) return 0;
    const completed = objectives.filter(obj => obj.completed).length;
    return (completed / objectives.length) * 100;
  };

  if (minimized) {
    return (
      
         setMinimized(false)}
          variant="default"
          size="sm"
        >
          
          Quests ({trackedQuests.length})
        
      
    );
  }

  return (
    
      
        
          
            
              
              Active Quests
            
             setMinimized(true)}
            >
              Minimize
            
          

          {trackedQuests.length === 0 ? (
            
              No active quests
            
          ) : (
            
              {trackedQuests.map(quest => (
                
                   toggleExpanded(quest.id)}
                  >
                    
                      
                        
                          {quest.title}
                        
                        
                          {quest.quest_type}
                        
                      
                      {expanded.includes(quest.id) ? (
                        
                      ) : (
                        
                      )}
                    

                    
                  

                  {expanded.includes(quest.id) && (
                    
                      {quest.objectives.map((obj, idx) => (
                        
                          {obj.completed ? (
                            
                          ) : (
                            
                          )}
                          
                            
                              {obj.description}
                            
                            
                              {obj.current}/{obj.required}
                            
                          
                        
                      ))}
                    
                  )}
                
              ))}
            
          )}
        
      
    
  );
};
