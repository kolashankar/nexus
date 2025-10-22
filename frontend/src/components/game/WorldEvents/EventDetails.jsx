import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Clock, Users, Sparkles, Target } from 'lucide-react';



export const EventDetails: React.FC = ({
  event,
  onClose,
  onParticipate
}) => {
  const formatDateTime = (date) => {
    return new Date(date).toLocaleString('en-US', {
      dateStyle,
      timeStyle);
  };

  return (
    
      
        
          
            {event.event_type}
            {event.severity}
            {event.estimated_impact}
          
          {event.name}
          
            {event.description}
          
        

        
          
            {/* Event Lore */}
            
              
                
                The Story
              
              
                
                  {event.lore}
                
              
            

            

            {/* Effects */}
            
              
                
                Active Effects
              
              
                {event.effects.map((effect, idx) => (
                  
                    
                      {effect.effect_type}
                      {effect.duration_hours}h
                    
                    {effect.description}
                    
                      Value))}
              
            

            

            {/* Timing */}
            
              
                
                Event Timeline
              
              
                
                  Duration)}
                  
                )}
                {event.ends_at && (
                  
                    Ends)}
                  
                )}
              
            

            {/* Participation */}
            {event.requires_participation && (
              
                
                
                  
                    
                    Participation
                  
                  
                    {event.participation_mechanics}
                    
                      
                        {event.total_participants} players participating
                      
                      {event.status === 'active' && (
                         onParticipate(event.event_id)} size="sm">
                          Participate Now
                        
                      )}
                    
                  
                
              
            )}

            {/* The Architect's Reasoning */}
            
              The Architect's Reasoning
              
                "{event.architect_reasoning}"
              
            

            {/* Trigger Reason */}
            
              
                Triggered);
};
