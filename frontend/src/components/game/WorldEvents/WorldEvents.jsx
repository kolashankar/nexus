import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sparkles, Zap, AlertTriangle, Globe, Clock, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { EventCard } from './EventCard';
import { EventDetails } from './EventDetails';
import { KarmaDisplay } from './KarmaDisplay';
import { worldService } from '@/services/api/worldService';
import './WorldEvents.css';

>;
  duration_hours;
  is_global;
  status;
  estimated_impact;
  started_at?: string;
  ends_at?: string;
  requires_participation;
  total_participants;
}



export const WorldEvents: React.FC = () => {
  const [activeEvent, setActiveEvent] = useState(null);
  const [recentEvents, setRecentEvents] = useState([]);
  const [worldState, setWorldState] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
    
    // Poll for updates every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const [eventData, eventsData, stateData] = await Promise.all([
        worldService.getActiveEvent(),
        worldService.getRecentEvents(10),
        worldService.getWorldState()
      ]);

      setActiveEvent(eventData);
      setRecentEvents(eventsData.events);
      setWorldState(stateData);
    } catch (error) {
      console.error('Error fetching world data, error);
    } finally {
      setLoading(false);
    }
  };

  const handleParticipate = async (eventId) => {
    try {
      const result = await worldService.participateInEvent(eventId);
      
      if (result.success) {
        toast({
          title,
          description,
        });
        
        // Refresh data
        fetchData();
      }
    } catch (error) {
      toast({
        title,
        description,
        variant);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'orange';
      case 'medium': return 'yellow';
      case 'low': return 'green';
      default;
    }
  };

  const getImpactIcon = (impact) => {
    switch (impact) {
      case 'world_changing': return null;
      case 'high': return null;
      case 'medium': return null;
      default;
    }
  };

  const calculateTimeRemaining = (endsAt) => {
    const end = new Date(endsAt);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    
    if (diff  0) {
      return `${hours}h ${minutes}m remaining`;
    }
    return `${minutes}m remaining`;
  };

  if (loading) {
    return (
      
        
          
        
      
    );
  }

  return (
    
      {/* Header */}
      
        
          
            
            World Events
          
          
            Dynamic events triggered by collective karma
          
        
        
        {worldState && (
          
            Collective Karma
            
              {worldState.collective_karma.toLocaleString()}
            
            
              {worldState.karma_trend}
            
          
        )}
      

      {/* Active Event - Prominent Display */}
      {activeEvent && (
        
          
            
              
                
                  {getImpactIcon(activeEvent.estimated_impact)}
                  
                    {activeEvent.severity}
                  
                  {activeEvent.is_global && (
                    
                      
                      Global
                    
                  )}
                
                {activeEvent.name}
                
                  {activeEvent.description}
                
              
            
          
          
          
            {/* Time Remaining */}
            {activeEvent.ends_at && (
              
                
                
                  {calculateTimeRemaining(activeEvent.ends_at)}
                
              
            )}

            {/* Event Lore */}
            
              {activeEvent.lore}
            

            {/* Effects */}
            
              Active Effects, idx) => (
                  
                    {effect.description}
                    
                      {effect.duration_hours}h
                    
                  
                ))}
              
            

            {/* Participation */}
            {activeEvent.requires_participation && (
              
                
                  
                    Participation Required
                    
                      {activeEvent.total_participants} players participating
                    
                  
                   handleParticipate(activeEvent.event_id)}>
                    
                    Participate
                  
                
              
            )}

            {/* View Details */}
             setSelectedEvent(activeEvent)}
            >
              View Full Details
            
          
        
      )}

      {/* No Active Event */}
      {!activeEvent && (
        
          
            
            No Active Events
            
              The Architect is watching... Events are triggered by collective player karma.
            
          
        
      )}

      {/* Recent Events & World State Tabs */}
      
        
          Recent Events
          World Karma
        
        
        
          {recentEvents.length > 0 ? (
            
              
                {recentEvents.map((event) => (
                   setSelectedEvent(event)}
                    getSeverityColor={getSeverityColor}
                    getImpactIcon={getImpactIcon} />
                ))}
              
            
          ) : (
            
              
                No recent events
              
            
          )}
        
        
        
          {worldState && }
        
      

      {/* Event Details Modal */}
      {selectedEvent && (
         setSelectedEvent(null)}
          onParticipate={handleParticipate} />
      )}
    
  );
};
