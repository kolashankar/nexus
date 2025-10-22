import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { BookOpen, Lock, CheckCircle2, Play } from 'lucide-react';
import { toast } from '../ui/sonner';





export const CampaignViewer: React.FC = () => {
  const [activeCampaign, setActiveCampaign] = useState(null);
  const [availableCampaigns, setAvailableCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActiveCampaign();
    fetchAvailableCampaigns();
  }, []);

  const fetchActiveCampaign = async () => {
    try {
      const response = await fetch('/api/quests/campaigns/active', {
        headers)}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        if (data) {
          // Fetch progress
          const progressResponse = await fetch('/api/quests/campaigns/progress', {
            headers)}`
            }
          });
          const progressData = await progressResponse.json();
          setActiveCampaign(progressData);
        }
      }
    } catch (error) {
      console.error('Failed to fetch campaign, error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableCampaigns = async () => {
    try {
      const response = await fetch('/api/quests/campaigns/available', {
        headers)}`
        }
      });
      const data = await response.json();
      setAvailableCampaigns(data.campaigns || []);
    } catch (error) {
      console.error('Failed to fetch available campaigns, error);
    }
  };

  const startCampaign = async (campaignType) => {
    try {
      const response = await fetch('/api/quests/campaigns/start', {
        method,
        headers,
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body)
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Campaign started!', {
          description);
        fetchActiveCampaign();
      } else {
        toast.error('Failed to start campaign', {
          description);
      }
    } catch (error) {
      toast.error('Failed to start campaign');
    }
  };

  if (loading) {
    return Loading...;
  }

  return (
    
      
        
          
            
            Story Campaigns
          
          
            Epic storylines with lasting consequences
          
        
      

      {activeCampaign ? (
        
          
            
              
                {activeCampaign.title}
                
                  Chapter {activeCampaign.current_chapter} of {activeCampaign.total_chapters}
                
              

              
                
                  Overall Progress
                  {activeCampaign.completion_percentage.toFixed(0)}%
                
                
              
            
          

          
            Chapters
            
              {activeCampaign.chapters.map(chapter => (
                
                  
                    
                      
                        {chapter.title}
                        
                          Chapter {chapter.chapter_number}
                        
                      
                      {chapter.completed ? (
                        
                      ) : chapter.unlocked ? (
                        
                      ) : (
                        
                      )}
                    

                    
                      {chapter.description}
                    

                    {chapter.unlocked && !chapter.completed && (
                      
                        Continue
                      
                    )}
                  
                
              ))}
            
          
        
      ) : (
        
          
            
            
              Start an epic campaign to experience a unique story
            
          

          
            Available Campaigns
            
              {availableCampaigns.map(campaign => (
                
                  
                    
                      {campaign.title}
                      
                        {campaign.description}
                      
                    

                    
                      
                        Chapters)}
                    >
                      Start Campaign
                    
                  
                
              ))}
            
          
        
      )}
    
  );
};
