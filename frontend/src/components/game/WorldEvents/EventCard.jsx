import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Globe, Users } from 'lucide-react';



export const EventCard = ({ 
  event,
  onViewDetails,
  getSeverityColor,
  getImpactIcon
 }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active'
        return Active;
      case 'ended'
        return Ended;
      case 'scheduled'
        return Scheduled;
      default)}
              
                {event.severity}
              
              {getStatusBadge(event.status)}
              {event.is_global && (
                
                  
                  Global
                
              )}
            
            {event.name}
            
              {event.description}
            
          
        
      
      
      
        
          
            
              
              {event.duration_hours}h
            
            {event.requires_participation && (
              
                
                {event.total_participants} participants
              
            )}
          
          
          {event.started_at && (
            
              {formatDate(event.started_at)}
            
          )}
        
        
        
          
            View Details
          
        
      
    
  );
};
