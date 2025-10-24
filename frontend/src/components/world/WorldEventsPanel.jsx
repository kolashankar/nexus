import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Sparkles, AlertTriangle, Activity, TrendingUp, TrendingDown } from 'lucide-react';
import { useWorldEvents } from '../../hooks/useWorldEvents';
import { Progress } from '../ui/progress';





const WorldEventsPanel= () => {
  const { worldState, activeEvents, loading } = useWorldEvents();
  const [selectedEvent, setSelectedEvent] = useState(null);

  const getKarmaTrendIcon = (trend) => {
    switch (trend) {
      case 'rising'
        return null;
      case 'falling'
        return null;
      default
    }
  };

  const getEventTypeColor = (eventType)=> {
    if (eventType.includes('blessing') || eventType.includes('golden')) {
      return 'bg-green-500';
    }
    if (eventType.includes('purge') || eventType.includes('collapse')) {
      return 'bg-red-500';
    }
    return 'bg-blue-500';
  };

  const calculateTimeRemaining = (endsAt)=> {
    const end = new Date(endsAt);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    
    if (diff 
        
          World Events
        
        
          
            
          
        
      
    );
  }

  return (
    
      {/* Global Karma Status */}
      
        
          
            Global Karma Status
            {worldState && getKarmaTrendIcon(worldState.karma_trend)}
          
          
            Collective karma across all players
          
        
        
          {worldState ? (
            
              
                
                  Collective Karma
                  {worldState.collective_karma.toFixed(0)}
                
                
              
              
              
                Online) 
            No data available
          )}
        
      

      {/* Active Global Event */}
      {worldState?.active_event && (
        
          
            
              
              {worldState.active_event.name}
            
            
              {worldState.active_event.description}
            
          
          
            
              
                
                  {worldState.active_event.event_type.replace('_', ' ').toUpperCase()}
                
                
                  {calculateTimeRemaining(worldState.active_event.ends_at)}
                
              
              
              {/* Event Effects */}
              
                Active Effects).map(([key, value]) => (
                  
                    
                      {key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    
                    
                      {typeof value === 'number' ? `${value}x` )}
                    
                  
                ))}
              
              
              
                {worldState.active_event.participants} players participating
              
            
          
        
      )}

      {/* Regional Events */}
      {activeEvents && activeEvents.length > 0 && (
        
          
            Active Events
            
              Regional and special events currently happening
            
          
          
            
              {activeEvents.map((event) => (
                 setSelectedEvent(event)}
                >
                  
                    
                      {event.name}
                      
                        {event.description}
                      
                    
                    
                      {calculateTimeRemaining(event.ends_at)}
                    
                  
                
              ))}
            
          
        
      )}

      {/* No Active Events */}
      {(!worldState?.active_event && (!activeEvents || activeEvents.length === 0)) && (
        
          
            
              
              
                No active world events at this time
              
              
                Collective karma actions will trigger new events
              
            
          
        
      )}
    
  );
};

export default WorldEventsPanel;
