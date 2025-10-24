import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Scroll, CheckCircle2, Clock, Star, Target } from 'lucide-react';
import { toast } from '../ui/sonner';



  status;
  expires_at
}

export const QuestLog = () => {
  const [activeQuests, setActiveQuests] = useState([]);
  const [availableQuests, setAvailableQuests] = useState([]);
  const [completedQuests, setCompletedQuests] = useState([]);
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [activeTab, setActiveTab] = useState('active');

  useEffect(() => {
    fetchActiveQuests();
    fetchAvailableQuests();
    fetchCompletedQuests();
  }, []);

  const fetchActiveQuests = async () => {
    try {
      const response = await fetch('/api/quests/active', {
        headers)}`
        }
      });
      const data = await response.json();
      setActiveQuests(data.quests || []);
    } catch (error) {
      console.error('Failed to fetch active quests', error);
    }
  };

  const fetchAvailableQuests = async () => {
    try {
      const response = await fetch('/api/quests/available', {
        headers)}`
        }
      });
      const data = await response.json();
      setAvailableQuests(data.quests || []);
    } catch (error) {
      console.error('Failed to fetch available quests', error);
    }
  };

  const fetchCompletedQuests = async () => {
    try {
      const response = await fetch('/api/quests/completed', {
        headers)}`
        }
      });
      const data = await response.json();
      setCompletedQuests(data.quests || []);
    } catch (error) {
      console.error('Failed to fetch completed quests', error);
    }
  };

  const acceptQuest = async (questId) => {
    try {
      const response = await fetch('/api/quests/accept', {
        method,
        headers,
          'Authorization')}`
        },
        body)
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Quest accepted!', {
          description);
        fetchActiveQuests();
        fetchAvailableQuests();
      } else {
        toast.error('Failed to accept quest', {
          description);
      }
    } catch (error) {
      toast.error('Failed to accept quest');
    }
  };

  const completeQuest = async (questId) => {
    try {
      const response = await fetch('/api/quests/complete', {
        method,
        headers,
          'Authorization')}`
        },
        body)
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Quest completed!', {
          description, +${data.rewards.credits} credits`
        });
        fetchActiveQuests();
        fetchCompletedQuests();
      } else {
        toast.error('Failed to complete quest', {
          description);
      }
    } catch (error) {
      toast.error('Failed to complete quest');
    }
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy,
      medium,
      hard,
      legendary
    };
    return colors[difficulty] || 'bg-gray-500';
  };

  const calculateProgress = (objectives) => {
    if (objectives.length === 0) return 0;
    const completed = objectives.filter(obj => obj.completed).length;
    return (completed / objectives.length) * 100;
  };

  const canComplete = (quest) => {
    return quest.objectives.every(obj => obj.completed);
  };

  const QuestCard = ({ quest, showAccept = false, showComplete = false }) => (
     setSelectedQuest(quest)}
    >
      
        
          
            {quest.title}
            
              
                {quest.difficulty}
              
              {quest.quest_type}
            
          
          
        

        {quest.description}

        {quest.status === 'active' && (
          
            
              Progress
              {calculateProgress(quest.objectives).toFixed(0)}%
            
            
          
        )}

        
          Objectives, 3).map((obj, index) => (
            
              {obj.completed ? (
                
              ) 
                
              )}
              
                {obj.description} ({obj.current}/{obj.required})
              
            
          ))}
        

        
          
            💰 {quest.rewards.credits}
            ⭐ {quest.rewards.xp} XP
            {quest.rewards.karma !== 0 && (
              ✨ {quest.rewards.karma > 0 ? '+' 
            )}
          
        

        {showAccept && (
           {
              e.stopPropagation();
              acceptQuest(quest.id);
            }}
          >
            Accept Quest
          
        )}

        {showComplete && canComplete(quest) && (
           {
              e.stopPropagation();
              completeQuest(quest.id);
            }}
          >
            Complete Quest
          
        )}
      
    
  );

  return (
    
      
        
          
            
            Quest Log
          
          
            Your adventure awaits
          
        
      

      
        
          
            Active ({activeQuests.length})
          
          
            Available ({availableQuests.length})
          
          
            Completed ({completedQuests.length})
          
        

        
          {activeQuests.length === 0 ? (
            
              
              
                No active quests. Check available quests!
              
               setActiveTab('available')}>
                Browse Quests
              
            
          ) 
            
              {activeQuests.map(quest => (
                
              ))}
            
          )}
        

        
          
            {availableQuests.map(quest => (
              
            ))}
          
        

        
          
            {completedQuests.map(quest => (
              
            ))}
          
        
      
    
  );
};
