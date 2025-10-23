import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Eye, Lock, MapPin, Clock } from 'lucide-react';
import { useToast } from '../../hooks/useToast';



export const HiddenQuests: React.FC = () => {
  const [discoveredQuests, setDiscoveredQuests] = useState([]);
  const [hints, setHints] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchHiddenQuests();
    fetchHints();
  }, []);

  const fetchHiddenQuests = async () => {
    try {
      const response = await fetch('/api/quests/hidden/discovered', {
        headers)}`
        }
      });
      const data = await response.json();
      setDiscoveredQuests(data.quests || []);
    } catch (error) {
      console.error('Failed to fetch hidden quests', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchHints = async () => {
    try {
      const response = await fetch('/api/quests/hidden/hints', {
        headers)}`
        }
      });
      const data = await response.json();
      setHints(data.hints || []);
    } catch (error) {
      console.error('Failed to fetch hints', error);
    }
  };

  const acceptQuest = async (questId) => {
    try {
      const response = await fetch('/api/quests/accept', {
        method,
        headers,
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body)
      });

      if (response.ok) {
        toast({
          title,
          description,
        });
        fetchHiddenQuests();
      }
    } catch (error) {
      toast({
        title,
        description,
        variant);
    }
  };

  if (loading) {
    return (
      
        
      
    );
  }

  return (
    
      {/* Discovered Hidden Quests */}
      
        
          
          Discovered Hidden Quests
        
        
        {discoveredQuests.length === 0 ? (
          
            
              
                No hidden quests discovered yet. Explore the world to find them!
              
            
          
        ) : (
          
            {discoveredQuests.map((quest) => (
              
                
                  
                    
                      
                        {quest.title}
                        
                          {quest.difficulty}
                        
                      
                      
                        {quest.description}
                      
                    
                    {quest.status === 'available' && (
                       acceptQuest(quest._id)}
                        size="sm"
                        className="bg-purple-600 hover)}
                  
                
                {quest.discovered_at && (
                  
                    
                      
                      Discovered).toLocaleDateString()}
                    
                  
                )}
              
            ))}
          
        )}
      

      {/* Cryptic Hints */}
      
        
          
          Cryptic Hints
        
        
        {hints.length === 0 ? (
          
            
              
                No hints available at this time.
              
            
          
        ) : (
          
            {hints.map((hint, index) => (
              
                
                  
                    
                    Mystery Quest
                  
                
                
                  "{hint.hint}"
                  
                    
                      {hint.difficulty}
                    
                    
                      {hint.category}
                    
                  
                
              
            ))}
          
        )}
      
    
  );
};
